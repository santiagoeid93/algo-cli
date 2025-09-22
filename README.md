## Algo CLI

Algo CLI is a command-line tool designed to help you practice and implement algorithmic challenges in TypeScript. It provides a modular structure for adding, running, and testing algorithm problems, making it easy to extend and contribute new challenges.

### Features
- Modular challenge system (add your own challenges in `src/challenges/`)
- TypeScript-first codebase
- Simple CLI interface for running challenges
- Example challenges included (FizzBuzz, Reverse String, Valid Anagram, etc.)

### Project Structure

```
src/
	program.ts            # CLI entry point
	challenges/           # Algorithm challenge implementations
		base.ts             # Base class for challenges
		fizzBuzz.ts         # Example challenge
		...
	static/               # Static data for challenges
test/
	src/challenges/       # Unit tests for challenges
```

### Getting Started

1. **Install dependencies:**
	 ```sh
	 npm install
	 ```
2. **Run a challenge:**
	 ```sh
	 npm run challenge
	 ```
	 This will execute the CLI and run the default challenge (FizzBuzz).

### Adding a New Challenge
1. Create a new file in `src/challenges/` (e.g., `myChallenge.ts`).
2. Extend the `BaseChallenge` class and implement the `solution` method.
3. Add your challenge to the CLI entry point (`src/program.ts`).
4. (Optional) Add static data in `src/static/` if needed.
5. (Optional) Add a test in `test/src/challenges/`.

### Contributing

Contributions are welcome! To contribute:

1. Fork the repository and create a new branch.
2. Add your feature or fix.
3. Write or update tests as needed.
4. Open a pull request with a clear description of your changes.

#### Coding Guidelines
- Use TypeScript and follow the existing code style.
- Place new challenges in `src/challenges/` and tests in `test/src/challenges/`.
- Keep code modular and well-documented.

### License

ISC License. See `LICENSE` file for details.
