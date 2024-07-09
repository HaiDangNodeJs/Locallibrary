// Import necessary libraries
import express, { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import http from "http";

// Import routers
import indexRouter from "./routes/index";
import { AppDataSource } from "./config/data-source";
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});


AppDataSource.initialize()
  .then(() => {
    console.log('Database initialized')
  })
  .catch((error) => console.log('Initialized database failed: ', error))
export default app
