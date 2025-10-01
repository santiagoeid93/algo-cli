import fs from "fs";
import path from 'path';
import ts from "typescript";
import { fileURLToPath } from 'url';

import type { Challenge } from "../types.d.ts";

const SOLUTION_FUNC: string = 'solution';
const factory: ts.NodeFactory = ts.factory;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function _getTypeSyntaxKind(typeString: string): ts.KeywordTypeNode | ts.ArrayTypeNode {
  switch (typeString) {
    default: return factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword);
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
        factory.createIdentifier('params'), undefined,  _getTypeSyntaxKind(types[0])
      )
    ],
    /* type */ _getTypeSyntaxKind(types[1]),
    /* body */ factory.createBlock([], true)
  );

  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const file = ts.createSourceFile(`${fileName}.ts`, '', ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);
  return printer.printNode(ts.EmitHint.Unspecified, functionDeclaration, file);
}

function generateChallenge(content: Challenge<any, any>): void {
  const filePath = path.resolve(__dirname, `${content.name}.ts`);
  const fileContent: string = `
    // ${content.name}

    // Difficulty: ${content.difficulty}
    
    // Problem Set: ${content.problemSet}
  `;

  // Step 1: Create the file with initial content
  fs.writeFileSync(filePath, fileContent, 'utf-8');

  // Step 2: Use the TS Compiler API to parse through the selected solution file.
  const types = _findClassTypes(content.name);
  if (types.length < 1) throw new Error('Can\'t build a challenge file with the provided solution.');

  // Step 3: Generate the function declaration with types and append to solution file.
  const code = _generateChallengeFunc(types, content.name);
  fs.appendFileSync(filePath, `\n${code}\n`, 'utf-8');
}

export { generateChallenge };
