// Import necessary libraries
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index";
import 'reflect-metadata';
import { AppDataSource } from './config/data-source';
import i18next from './i18n';
import i18nextMiddleware from 'i18next-http-middleware';
import session from 'express-session';
import flash from 'connect-flash'
require('dotenv').config()

const app = express();

const secret = process.env.SESSION_SECRET || 'secret'

// config pug view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// config middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// i18next middleware
app.use(i18nextMiddleware.handle(i18next));

// flash middleware
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: secret
  })
)

app.use(flash());

app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
})

// config middleware để sử dụng function t
app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.t = req.t;
  next();
});

app.use('/', indexRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new Error('Not Found');
  res.status(404);
  next(err);
});

// Middleware error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(500);
  res.render("error");
});

// initialize DataSource
AppDataSource.initialize()
  .then(() => {
    console.log('Database initialized');
  }).catch((err) => {
    console.error('Initialized database failed:', err);
  });

const PORT = process.env.WEB_PORT || 8083;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
