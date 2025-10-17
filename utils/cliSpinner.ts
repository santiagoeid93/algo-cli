import readline from 'node:readline';

/**
 * Starts a CLI spinner animation with a custom message.
 * @private
 * @param frames - An array of strings representing each frame of the spinner animation.
 * @param message - The message to display next to the spinner.
 * @returns {NodeJS.Timeout}
 *
 * @remarks
 * The spinner updates every 100 milliseconds.
 */
function _startSpinner(frames: string[], message: string): NodeJS.Timeout {
  let i: number = 0;
  return setInterval(() => {
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(frames[i]);
    readline.cursorTo(process.stdout, 2);
    process.stdout.write(message);
    i = (i + 1) % frames.length;
  }, 100); // Adjust interval for speed
}

/**
 * This function clears the spinner interval, removes the spinner line from the terminal,
 * and resets the cursor position to the start of the line.
 * @private
 * @param intervalId - The interval ID returned by `setInterval` that controls the spinner animation.
 * @returns {void}
 */
function _stopSpinner(intervalId: NodeJS.Timeout) {
  clearInterval(intervalId);
  readline.clearLine(process.stdout, 0); // Clear the current line
  readline.cursorTo(process.stdout, 0); // Move cursor to the beginning of the line
}

/**
 * Displays a spinner animation in the CLI, then executes a callback function.
 * @public
 * @param startMessage - The message to display when the spinner starts.
 * @param callback - The function to execute after the spinner runs.
 * @param loadTime - Loading time for the spinner animation.
 * @param endMessage - (Optional) The message to display when the spinner stops.
 * @returns {Promise<void>}
 */
async function loadSpinner(
  startMessage: string,
  callback: () => unknown,
  loadTime: number = 2000,
  endMessage?: string
): Promise<void> {
  const frames: string[] = ['▖', '▘', '▝', '▗'];
  
  const interval = _startSpinner(frames, startMessage);
  
  setTimeout(() => {
    _stopSpinner(interval);
    if (endMessage) console.log(endMessage);
    callback();
  }, loadTime);
}

export { loadSpinner };
