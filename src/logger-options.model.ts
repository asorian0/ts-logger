/**
 * Logger Options
 * @export
 * @interface LoggerOptions
 */
export interface LoggerOptions {
  /**
   * The path pointing to where the log file is
   * @type {string}
   */
  path: string;
  /**
   * The filename to log under
   * @type {string}
   */
  filename: string;
  /**
   * Logger log file URI
   * @type {string}
   */
  loggerLogFile?: string;
}
