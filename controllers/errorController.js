const httpStatus = require("http-status-codes");

exports.pageNotFoundError = (req, res) => { //앞에서 처리되지 못한 모든 요청 처리
  let errorCode = httpStatus.NOT_FOUND;
  res.status(errorCode);
  res.render("error");
}

exports.internalServerError = (errors, req, res, next) => { // 내부 서버 에러의 처리
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
  console.log("Error occurred: " + errors.stack);
  res.status(errorCode);
  res.send(errorCode + " | Sorry, our application is taking a nap....");
};
