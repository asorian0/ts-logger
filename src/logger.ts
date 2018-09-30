import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { LoggerOptions } from './logger-options.model';

/**
 * The Logger class to create logger instances
 *
 * @export
 * @class Logger
 * @author Armando Soriano <asoriano.dev@gmail.com>
 */
export class Logger {
  /**
   * EOL from Node.js to be appended as last character on every line. Cross system ready.
   *
   * @private
   * @type {string}
   * @memberof Logger
   */
  private readonly EOL: string = os.EOL;

  /**
   * URI to logger log file (where logger errors are logged)
   *
   * @private
   * @type {string}
   * @memberof Logger
   */
  private readonly loggerFileUri: string = path.resolve(path.resolve(__dirname), 'logger-log');

  /**
   * Logger options
   *
   * @private
   * @type {LoggerOptions}
   * @memberof Logger
   */
  private options: LoggerOptions = { path: path.resolve(__dirname), filename: 'log' };

  /**
   * Log file URI
   *
   * @private
   * @type {string}
   * @memberof Logger
   */
  private fileUri: string;

  /**
   * Current locale formatted date
   *
   * @readonly
   * @private
   * @type {string}
   * @memberof Logger
   */
  private get date(): string {
    return new Date().toLocaleString().split(' ').slice(0, 5).join(' ');
  }

  /**
   * Creates an instance of Logger.
   *
   * @param {LoggerOptions} [options]
   * @memberof Logger
   */
  constructor(options?: LoggerOptions) {
    Object.assign(this.options, options);
    this.fileUri = `${path.resolve(path.normalize(this.options.path))}/${this.options.filename}`;
    if (options && options.loggerLogFile) {
      this.loggerFileUri = path.resolve(options.loggerLogFile);
    }
  }

  /**
   * LoggerFileUri getter
   *
   * @returns {string}
   * @memberof Logger
   */
  getLoggerFileUri(): string {
    return this.loggerFileUri;
  }

  /**
   * Options getter
   *
   * @returns {LoggerOptions}
   * @memberof Logger
   */
  getOptions(): LoggerOptions {
    return this.options;
  }

  /**
   * FileUri getter
   *
   * @returns {string}
   * @memberof Logger
   */
  getFileUri(): string {
    return this.fileUri;
  }

  /**
   * Prints an error log message
   *
   * @param {string} message
   * @memberof Logger
   */
  error(message: string): void {
    this.log('error', message);
  }

  /**
   * Prints an info log message
   *
   * @param {string} message
   * @memberof Logger
   */
  info(message: string): void {
    this.log('info', message);
  }

  /**
   * Prints a warning log message
   *
   *
   * @param {string} message
   * @memberof Logger
   */
  warning(message: string): void {
    this.log('warning', message);
  }

  /**
   * Prints a data log message
   *
   * @param {string} message
   * @memberof Logger
   */
  data(message: string): void {
    this.log('data', message);
  }

  /**
   * Writes the passed string to the log file
   *
   * @private
   * @param {string} data
   * @memberof Logger
   */
  private write(data: string): void {
    try {
      fs.appendFileSync(this.fileUri, data);
    } catch (err) {
      this.logLoggerError(err);
      throw err;
    }
  }

  /**
   * Convenient method to log messages
   *
   * @private
   * @param {string} mode
   * @param {string} message
   * @memberof Logger
   */
  private log(mode: string, message: string): void {
    this.write(`[${mode.toUpperCase()}][${this.date}]: ${message}${this.EOL}`);
  }

  /**
   * Logs logger error
   *
   * @private
   * @param {NodeJS.ErrnoException} error
   * @memberof Logger
   */
  private logLoggerError(error: NodeJS.ErrnoException): void {
    const message = `[LOGGER ERROR][${this.date}]: ${error.code} :: ${error.message}${this.EOL}`;
    fs.appendFileSync(this.loggerFileUri, message);
  }
}
