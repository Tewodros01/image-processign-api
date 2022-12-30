import express from 'express';

const logger = (
  req: express.Request,
  _: express.Response,
  next: Function
): void => {
  let url = req.url;
  console.log(`${url} wase visited`);
  next();
};

export default logger;
