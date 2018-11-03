import fs from 'fs';
import csvWriter from 'csv-write-stream';
import morgan from 'morgan';
import tracer from 'tracer';

export const log = (() => {
  const logger = tracer.colorConsole();
  logger.requestLogger = morgan('dev');
  return logger;
})();

export const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
};

export const delay = (time) => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, time);
});

export const writeToCsv = ({headers, records, filePath}) => {
  const writer = csvWriter({headers});
  writer.pipe(fs.createWriteStream(filePath));
  records.forEach((r) => writer.write(r));
  writer.end();
};
