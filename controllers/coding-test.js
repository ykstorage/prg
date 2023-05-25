const prg = require('../lib/prg');
const { STATUS_CODE } = require('../lib/constants');

/**
*  @swagger
*  paths:
*   /coding-test/transform-string:
*     get:
*       summary: 변형 문자열
*       description: 변형 문자열
*       tags: [coding test (코딩 테스트)]
*       responses:
*         "200":
*           description: OK
*/
exports.transformString = async function (req, res) {
  
  function solution(line1, line2) {
    const line1Arr = [...line1];
    const line2Arr = [...line2];
  
    let newArr = [];
    let newInterval = 1;
    let tempJ = 0;
    
    // TODO: while 문 조건 범위를 더 좁혀야함
    while(newInterval < line1Arr.length){
      for (let i = 0; i < line1Arr.length; i++) {
        let tempArr = [];
        
        // TODO: for 문 조건 범위를 더 좁혀야함
        for(let j = tempJ; j < line1Arr.length; j = j + newInterval){
          tempArr.push(line1Arr[j]);
          if(line2Arr.length === tempArr.length){
            newArr.push(tempArr);
            tempArr = [];
            tempJ = tempJ + 1;
            break;
          }
        }
      }
  
      newInterval++;
      tempJ = 0;
    }
  
    let count = 0;
    for(let i = 0; i < newArr.length; i++) {
      if(newArr[i].join('') === line2) {
        count++;
      }
    }
  
    console.log("개수:", count);
    return count;  
  }
  
  // 정답: 4개
  const line1 = "abbbcbbb";
  const line2 = "bbb";

  // 정답: 4개
  // const line1 = "abcabcabc";
  // const line2 = "abc";

  // 정답: 0개
  // const line1 = "abacaba";
  // const line2 = "acb";

  const result = solution(line1, line2);

  if(result){
    return res.prg({result: result});
  }else{
    return res.prg('오류가 발생 했습니다.', STATUS_CODE.FAILED);
  }
};