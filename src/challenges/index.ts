import fs from 'node:fs';
import ts from "typescript";
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { Challenge } from "../types.d.ts";

const SOLUTION_FUNC: string = 'solution';
const factory: ts.NodeFactory = ts.factory;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Formats a given challenge object into a string representation suitable for documentation.
 *
 * The output is a multi-line string that includes the challenge name, difficulty,
 * and a formatted problem set, all wrapped in a comment block.
 * @private
 * @param content - The challenge object containing the name, difficulty, and problem set.
 * @returns {string}
 */
function _formatProblemSet(content: Challenge<unknown[], unknown>): string {
  return [
    '/**' ,
    ' * ===================',
    ` * ${content.name}`,
    ` * Difficulty: ${content.difficulty} `,
    ' * ===================',
    `${content.problemSet.split('\n').map((step: string, idx: number) => idx === 0 ? ` * ${step}` : ` *${step}`).join('\n')}`,
    ' */',
    ''
  ].join('\n');
}

/**
 * Returns a TypeScript AST node representing the type specified by the given string.
 *
 * Maps common type strings (such as 'number', 'string', 'boolean', 'any', 'void', 'unknown', 'never')
 * and their array forms (e.g., 'string[]', 'number[]', 'boolean[]') to their corresponding
 * `ts.KeywordTypeNode` or `ts.ArrayTypeNode` representations using the TypeScript factory API.
 * If the type string does not match any known type, it defaults to `any`.
 * @private
 * @param typeString - The string representation of the type (e.g., 'number', 'string[]').
 * @returns {ts.KeywordTypeNode | ts.ArrayTypeNode}
 */
function _getTypeSyntaxKind(typeString: string): ts.KeywordTypeNode | ts.ArrayTypeNode {
  switch (typeString) {
    default:          return factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword);
    case 'number':    return factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword);
    case 'string':    return factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
    case 'boolean':   return factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword);
    case 'any':       return factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword);
    case 'void':      return factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword);
    case 'unknown':   return factory.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword);
    case 'never':     return factory.createKeywordTypeNode(ts.SyntaxKind.NeverKeyword);
    case 'string[]':  return factory.createArrayTypeNode(factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword));
    case 'number[]':  return factory.createArrayTypeNode(factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword));
    case 'boolean[]': return factory.createArrayTypeNode(factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword));
  }
}

/**
 * Extracts the type arguments from all parent classes or interfaces of class declarations
 * found in a TypeScript source file corresponding to the given file name.
 *
 * This function resolves the path to a solution file, parses it using the TypeScript compiler API,
 * and traverses its AST to find all class declarations. For each class, it inspects its heritage clauses
 * (i.e., `extends` and `implements`) and collects the textual representation of any type arguments used.
 * @private
 * @param fileName - The base name (without extension) of the TypeScript file located in the `solutions` directory.
 * @returns {string[] | []} An array of strings representing the type arguments found in the parent classes or interfaces,
 *          or an empty array if none are found.
 */
function _findClassTypes(fileName: string): string[] | [] {
  const nodes: string[] = [];
  const classPath = path.resolve(__dirname, '..', `solutions/${fileName}.ts`);

  const program = ts.createProgram([classPath], {});
  program.getTypeChecker();

  const sourceFile = program.getSourceFile(classPath);

  function visit(node: ts.Node): void {
    // Check the file for class declarations.
    if (ts.isClassDeclaration(node) && node.heritageClauses) {
        // If we find classes, check for any parent classes or interfaces.
        node.heritageClauses.forEach((heritageClause: ts.HeritageClause) => {
        // For each parent class or interface, check for type arguments.
        heritageClause.types.forEach((typeNode: ts.TypeNode) => {
          // If we find type arguments, add them to our nodes array.
          if (ts.isExpressionWithTypeArguments(typeNode) && typeNode.typeArguments) {
            typeNode.typeArguments.forEach((typeArg: ts.TypeNode) => {
              nodes.push(typeArg.getText());
            });
          }
        });
      });
    }

    // Recursively visit each child node.
    ts.forEachChild(node, visit);
  };

  if (sourceFile) visit(sourceFile);

  return nodes;
}

/**
 * Generates a TypeScript function expression as a string, representing a challenge function
 * with specified parameter and return types.
 * @private
 * @param types - An array of type names as strings. The first element specifies the parameter type,
 *                and the second element specifies the return type of the generated function.
 * @param fileName - The base name of the file to use when creating the TypeScript source file context.
 * @returns {string} The string representation of the generated function expression.
 */
function _generateChallengeFunc(types: string[], fileName: string): string {
  const functionDeclaration = factory.createFunctionExpression(
    /* modifiers */ undefined,
    /* asteriskToken */ undefined,
    /* name */ factory.createIdentifier(SOLUTION_FUNC),
    /* typeParameters */ undefined,
    /* parameters */ [
      factory.createParameterDeclaration(
        undefined,
        undefined,
        factory.createIdentifier('n'), undefined,  _getTypeSyntaxKind(types[0])
      )
    ],
    /* type */ _getTypeSyntaxKind(types[1]),
    /* body */ factory.createBlock([], true)
  );

  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const file = ts.createSourceFile(`${fileName}.ts`, '', ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);
  return printer.printNode(ts.EmitHint.Unspecified, functionDeclaration, file);
}

/**
 * Generates a new TypeScript challenge file based on the provided challenge content.
 *
 * This function performs the following steps:
 * 1. Creates a new file with initial metadata (name, difficulty, problem set).
 * 2. Uses the TypeScript Compiler API to analyze the solution file and extract class types.
 * 3. Generates a function declaration with appropriate types and appends it to the challenge file.
 * @public
 * @param content - The challenge metadata and solution information used to generate the file.
 * @throws Will throw an error if no class types are found in the provided solution.
 * @returns {void}
 */
function generateChallengeFrom(content: Challenge<unknown[], unknown>): void {
  const filePath = path.resolve(__dirname, `${content.name}.ts`);
  const fileContent: string = _formatProblemSet(content);

  // Step 1: Create the file with initial content
  fs.writeFileSync(filePath, fileContent, 'utf-8');

  // Step 2: Use the TS Compiler API to parse through the selected solution file.
  const types = _findClassTypes(content.name);
  if (types.length < 1) throw new Error('Can\'t build a challenge file with the provided solution.');

  // Step 3: Generate the function declaration with types and append to solution file.
  const code = _generateChallengeFunc(types, content.name);
  fs.appendFileSync(filePath, `\n${code}\n`, 'utf-8');

  // Step 4: Export solution
  fs.appendFileSync(filePath, `\nexport { solution };\n`, 'utf-8');
}

/**
 * Deletes a challenge TypeScript file from the challenges directory.
 *
 * Resolves the absolute path to the file using the provided `fileName` (without extension),
 * checks if the file exists, and deletes it if present.
 * @public
 * @param fileName - The base name of the challenge file (without the `.ts` extension) to delete.
 * @returns {void}
 */
function deleteChallenge(fileName: string): void {
  const filePath = path.resolve(__dirname, `${fileName}.ts`);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
}

export { deleteChallenge, generateChallengeFrom };
