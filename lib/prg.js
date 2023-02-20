const response_helper = function (req, res, next) {
  const prg = function (resp, status_code = 200) {
    // axios에서 사용하는 기준과 맞춘다.
    // const valid_status = status_code >= 200 && status_code < 300; // default
    let res_obj = null;

    if (status_code !== 200) {
      if (resp instanceof TypeError) { // 에러 오브젝트가 넘어온다면
        // stack: e.stack 이건 잠시 생략하고 e.message만 사용한다.
        res_obj = { status: status_code, msg: resp.message, resp: {}, has_error: true };
      } else {
        res_obj = { status: status_code, msg: resp, resp: {}, has_error: true };
      }
    } else {
      res_obj = { status: status_code, msg: '', resp: resp, has_error: false };
    }

    // 앞으로는 아래의 status 코드에 변화를 줘서 판단해 준다.
    res.raw_data = res_obj; // Todo: debug가 켜져있는 경우에만 동작하도록 수정해야한다.

    res.json(res_obj).end(); // 임시로 http status code와 동기화 시키지 않는다.
  }

  res.prg = prg;
  next();
}

module.exports = {
  response_helper
}