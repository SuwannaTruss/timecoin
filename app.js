var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var fileUpload = require("express-fileupload");

var bodyParser = require("body-parser");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var servicesRouter = require("./routes/services");
var categoriesRouter = require("./routes/categories");
var requestsRouter = require("./routes/requests");
// var chatRouter = require("./routes/chat");

var app = express();

// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp/",
  })
);

// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "/client/build")));
app.use(express.static("public"));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/services", servicesRouter);
app.use("/categories", categoriesRouter);
app.use("/requests", requestsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");

  //instructions from heroku README file
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
});

module.exports = app;
