var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var routerHash = require('./routes/hash');
var routerSort = require('./routes/sort');
var routerBrute = require('./routes/brute');
var routerGreedy = require('./routes/greedy');
var routerStackq = require('./routes/stackq');
var routerBinarySearch = require('./routes/binary-search');
var routerDfsBfs = require('./routes/dfs-bfs');
var routerDynamic = require('./routes/dynamic');
var routerGraph = require('./routes/graph');
var routerHeap = require('./routes/heap');


var prg = require('./lib/prg');
var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");
var app = express();

//swagger 관련
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "programmers",
      version: "0.0.1",
      description:
        "programmers",
    },
  },
  apis: ["./controllers/*.js"],
};
const specs = swaggerJsdoc(options);

app.use(
  '/api-swagger', // http://localhost:3000/api-swagger
  swaggerUi.serve,
  swaggerUi.setup ( specs , { explorer : true })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// response helper
app.use(prg.response_helper);

app.use('/', indexRouter);
app.use('/hash', routerHash); // 해시
app.use('/sort', routerSort); // 정렬
app.use('/brute', routerBrute); // 완전탐색
app.use('/greedy', routerGreedy); // 탐욕법
app.use('/stackq', routerStackq); // 탐욕법
app.use('/binary-search', routerBinarySearch); // 이분탐색
app.use('/dfs-bfs', routerDfsBfs); // 깊이/너비 우선 탐색
app.use('/dynamic', routerDynamic); // Dynamic Programming(동적계획법)
app.use('/graph', routerGraph); // 그래프
app.use('/heap', routerHeap); // Heap

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
