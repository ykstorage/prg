const STATUS_CODE = {
  OK: 200,
  NOT_FOUND: 204,
  MD_ACCOUNT: 308, // 엠디톡회원으로만 가입되어 있는데 엠디케어 로그인하려고 시도할때 -> 엠디케어 가입하라고 해야함
  FAILED: 400,
  NO_DATA: 404, //(파이썬쪽 요청으로 204 -> 404로 보냄)
  ALREADY_EXISTS: 405, // 회원이 이미 존재할때  
  NOT_LOGIN: 409, // 로그인 차단  
  NOT_EXIST: 410, //회원가입이 되어 있지 않을때
  FIRST_SNS_LOGIN: 420 // SNS 로그인 회원이 존재하지 않을때 
}

module.exports = {
  STATUS_CODE,
}
