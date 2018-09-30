import { LoggerOptions } from './logger-options.model';
import 'mocha';
import { expect } from 'chai';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

import { Logger } from './logger';

describe('Logger', () => {
  describe('with default options', () => {
    it('should instantiate with default options', () => {
      const logger = new Logger();
      const options = logger.getOptions();
      expect(logger, 'Logger not instantiated with default options').not.to.be.undefined;
      expect(options.path).to.be.equal(path.resolve(__dirname));
      expect(options.filename).to.be.equal('log');
    });
  });

  describe('with passed options', () => {
    const mockOptions = {
      path: './test',
      filename: 'logfile',
      loggerLogFile: './test/logger-log'
    };
    const infoMessage = 'Info Message';
    const infoHeader = '[INFO]';
    const dataMessage = 'Data Message';
    const dataHeader = '[DATA]';
    const errorMessage = 'Error Message';
    const errorHeader = '[ERROR]';
    const warningMessage = 'Warning Message';
    const warningHeader = '[WARNING]';
    let instance: Logger;
    let instanceOptions: LoggerOptions;
    let instanceFileUri: string;
    let instanceLoggerFileUri: string;

    beforeEach(() => {
      instance = new Logger(mockOptions);
      instanceOptions = instance.getOptions();
      instanceFileUri = instance.getFileUri();
      instanceLoggerFileUri = instance.getLoggerFileUri();
    });

    it('should instantiate with passed options', () => {
      expect(instance, 'Logger not instantiated with default options').not.to.be.undefined;
      expect(instanceOptions.path).to.be.equal(mockOptions.path);
      expect(instanceOptions.filename).to.be.equal(mockOptions.filename);
      expect(instanceFileUri).to.be.equal(
        `${path.resolve(path.normalize(instanceOptions.path))}/${instanceOptions.filename}`
      );
      expect(instanceLoggerFileUri).to.be.equal(path.resolve(path.resolve(__dirname), '..', mockOptions.loggerLogFile));
    });

    it('should log info', () => {
      instance.info(infoMessage);

      const logData = readLog(instance.getFileUri());
      const lastLine = logData[logData.length - 1];

      expect(lastLine.includes(infoHeader)).to.be.true;
      expect(lastLine.includes(infoMessage)).to.be.true;
    });

    it('should log data', () => {
      instance.data(dataMessage);

      const logData = readLog(instance.getFileUri());
      const lastLine = logData[logData.length - 1];

      expect(lastLine.includes(dataHeader)).to.be.true;
      expect(lastLine.includes(dataMessage)).to.be.true;
    });

    it('should log warning', () => {
      instance.warning(warningMessage);

      const logData = readLog(instance.getFileUri());
      const lastLine = logData[logData.length - 1];

      expect(lastLine.includes(warningHeader)).to.be.true;
      expect(lastLine.includes(warningMessage)).to.be.true;
    });

    it('should log error', () => {
      instance.error(errorMessage);

      const logData = readLog(instance.getFileUri());
      const lastLine = logData[logData.length - 1];

      expect(lastLine.includes(errorHeader)).to.be.true;
      expect(lastLine.includes(errorMessage)).to.be.true;
    });
  });

  describe('logs error', () => {
    const mockOptions = {
      path: 'test/test',
      filename: 'logfile',
      loggerLogFile: './test/logger-log'
    };
    let instance: Logger;

    it('should throw and log the error', () => {
      instance = new Logger(mockOptions);
      try {
        instance.info('Something to log');
      } catch (e) {}

      const logErrorData = readLog(instance.getLoggerFileUri());
      const lastLine = logErrorData[logErrorData.length - 1];

      expect(lastLine.includes('[LOGGER ERROR]')).to.be.true;
    });
  });
});

function readLog(uri: string): string[] {
  const fileData: string = fs.readFileSync(uri, { encoding: 'utf8' });
  const linesArray = fileData.split(os.EOL);
  return linesArray.slice(0, linesArray.length - 1);
}
