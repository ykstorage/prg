const prg = require('../lib/prg');
const { STATUS_CODE } = require('../lib/constants');

/**
*  @swagger
*  paths:
*   /greedy/jursey:
*     get:
*       summary: 체육복 (Level 1)
*       description: 체육복
*       tags: [greedy (탐욕법)]
*       responses:
*         "200":
*           description: OK
*/
exports.jursey = async function (req, res) {  
  const n = 5
  const lost = [2, 4];
  const reserve = [1, 3, 5];

  function solution(n, lost, reserve) {
    try {
      let answer = 0;
      
      let duplicateArr = lost.filter(x => reserve.includes(x));
      let filteredLost = lost.filter(x => !duplicateArr.includes(x));
      let filteredReserve = reserve.filter(x => !duplicateArr.includes(x));
  
      filteredLost.sort();
      filteredReserve.sort();
  
      answer = n - filteredLost.length;
      for(let i=0; i<filteredReserve.length; i++){
        for(let j=0; j<filteredLost.length; j++){
          if(filteredReserve[i] == filteredLost[j]-1 || filteredReserve[i] == (filteredLost[j]+1)){
            filteredLost.splice(j, 1);
            answer++;
          }
        }
      }
  
      return answer;
    } catch (error) {
      console.log('error: ', error.message);
      return false;
    }
  }

  const result = solution(n, lost, reserve);
  
  if(result){
    return res.prg({result: result});
  }else{
    return res.prg('오류가 발생 했습니다.', STATUS_CODE.FAILED);
  }
};
