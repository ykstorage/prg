const prg = require('../lib/prg');
const { STATUS_CODE } = require('../lib/constants');

/**
*  @swagger
*  paths:
*   /stackq/same-number:
*     get:
*       summary: 같은 숫자는 싫어
*       description: 같은 숫자는 싫어
*       tags: [stack & queue (스택 & 큐)]
*       responses:
*         "200":
*           description: OK
*/
exports.sameNumber = async function (req, res) {  
  const arr = [1, 1, 3, 3, 0, 1, 1];

  function solution(arr){
    try {
      let answer = [];
      let val = arr[0];
      answer.push(arr[0]);
      for(let i=0; i<arr.length; i++){
        if(val != arr[i]){
          answer.push(arr[i]);
        }
        val = arr[i];
      }
  
      return answer;
    } catch (error) {
      console.log('error: ', error.message);
      return false;
    }
  }
  const result = solution(arr);
  
  if(result){
    return res.prg({result: result});
  }else{
    return res.prg('오류가 발생 했습니다.', STATUS_CODE.FAILED);
  }
};
