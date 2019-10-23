import chalk from 'chalk';
import { RequestHandler, Response } from 'express';

const sizeKb = (res: Response) => {
  const sizeBytes = Number.parseInt(res.get('Content-Length') || '0', 10);
  return (sizeBytes / 1000).toFixed(2);
};

export const logger = (): RequestHandler => {
  return (req, res, next) => {
    res.on('finish', () => {
      if (res.statusCode < 300) {
        const size = sizeKb(res);
        // tslint:disable-next-line
        console.log(`${chalk.green(req.method)} ${req.originalUrl} - ${res.statusCode} ${res.statusMessage} ${size}kB`);
      } else if (res.statusCode < 400) {
        // tslint:disable-next-line
        console.log(`${chalk.blue(req.method)} ${req.originalUrl} - ${res.statusCode} ${res.statusMessage}`);
      } else {
        // tslint:disable-next-line
        console.log(`${chalk.red(req.method)} ${req.originalUrl} - ${res.statusCode} ${res.statusMessage}`);
      }
    });
    next();
  };
};
