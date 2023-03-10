const prg = require('../lib/prg');
const { STATUS_CODE } = require('../lib/constants');

/**
*  @swagger
*  paths:
*   /brute/exam:
*     get:
*       summary: 모의고사 (Level 1)
*       description: 모의고사
*       tags: [brute (완전탐색)]
*       parameters:
*         - in: query
*           name: answers
*           required: true
*           schema:
*             type: array
*             items:
*               type: integer
*           default: [1, 3, 2, 4, 2]
*           description: '정답'
*       responses:
*         "200":
*           description: OK
*/
exports.exam = async function (req, res) {  
  const answers = req.query.answers;

  function solution(answers) {
    try {
      let response1 = [1, 2, 3, 4, 5]; // 답변자 1의 답변
      let response2 = [2, 1, 2, 3, 2, 4, 2, 5]; // 답변자 2의 답변
      let response3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]; // 답변자 3의 답변
  
      let count1 = 0;
      let count2 = 0;
      let count3 = 0;
  
      for(let i=0; i<answers.length; i++){
        if(answers[i] == response1[i%5]){
          count1 = count1 + 1;
        }
        if(answers[i] == response2[i%8]){
          count2 = count2 + 1;
        }
        if(answers[i] == response3[i%10]){
          count3 = count3 + 1;
        }
      }
  
      let answerCount = [count1, count2, count3]
      let max = Math.max(count1, count2, count3);
  
      let ranking = new Array;
      for(let i=0; i<answerCount.length; i++){
        if(answerCount[i] == max){
          ranking.push(i+1);
        }
      }
      return ranking;
    } catch (error) {
      console.log('error: ', error.message);
      return false;
    }
  }

  const result = solution(answers);
  
  if(result){
    return res.prg({result: result});
  }else{
    return res.prg('오류가 발생 했습니다.', STATUS_CODE.FAILED);
  }
};


/**
*  @swagger
*  paths:
*   /brute/rectangle:
*     get:
*       summary: 최소직사각형 (Level 1)
*       description: 최소직사각형
*       tags: [brute (완전탐색)]
*       responses:
*         "200":
*           description: OK
*/
exports.rectangle = async function (req, res) {  
  const sizes = [[10, 7], [12, 3], [8, 15], [14, 7], [5, 15]];

  function solution(sizes) {
    try {
      for(let i=0; i<sizes.length; i++){
        if(sizes[i][1] > sizes[i][0]){
          sizes[i].reverse();
        }
      }

      const frontValues = sizes.map((el) => el[0]);
      const backValues = sizes.map((el) => el[1]);
      const frontMax = Math.max(...frontValues);
      const backMax = Math.max(...backValues);
      const size = frontMax * backMax;

      return size;
    } catch (error) {
      console.log('error: ', error.message);
      return false;
    }
  }

  const result = solution(sizes);
  
  if(result){
    return res.prg({result: result});
  }else{
    return res.prg('오류가 발생 했습니다.', STATUS_CODE.FAILED);
  }
};
