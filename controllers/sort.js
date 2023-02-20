const prg = require('../lib/prg');
const { STATUS_CODE } = require('../lib/constants');

/**
*  @swagger
*  paths:
*   /sort/k:
*     get:
*       summary: k번째수
*       description: k번째수
*       tags: [sort (정렬)]
*       responses:
*         "200":
*           description: OK
*/
exports.k = async function (req, res) {  
  let array = [1, 5, 2, 6, 3, 7, 4];
  let commands = [[2, 5, 3], [4, 4, 1], [1, 7, 3]];

  function solution(array, commands){
    try {
      var answer = [];
  
      for(let i=0; i<commands.length; i++){
        answer[i] = 
          parseInt(
              array
              .slice(commands[i][0]-1, commands[i][1])
              .sort(compareNumbers)
              .slice(commands[i][2]-1, commands[i][2])
          );
      }
  
      return answer;
    } catch (error) {
      console.log('error: ', error.message);
      return false;
    }
  }

  function compareNumbers(a, b){
    return a - b;
  }

  const result = solution(array, commands);
  
  if(result){
    return res.prg({result: result});
  }else{
    return res.prg('오류가 발생 했습니다.', STATUS_CODE.FAILED);
  }
};
