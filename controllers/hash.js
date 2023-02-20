const prg = require('../lib/prg');
const { STATUS_CODE } = require('../lib/constants');

/**
*  @swagger
*  paths:
*   /hash/ponketmon:
*     get:
*       summary: 폰켓몬
*       description: 폰켓몬
*       tags: [hash (해시)]
*       responses:
*         "200":
*           description: OK
*/
exports.ponketmon = async function (req, res) {  
  const nums = [3, 1, 2, 3];
  
  function solution(nums) {
    try {
      const halfPonketmon = Math.floor(nums.length / 2);
      const setPonketmon = new Set(nums).size;

      if(halfPonketmon <= setPonketmon){
        return halfPonketmon;
      }else{
        return setPonketmon;
      }
    } catch (error) {
      console.log('error: ', error.message);
      return false;
    }
  }

  const result = solution(nums);
  
  if(result){
    return res.prg({result: result});
  }else{
    return res.prg('오류가 발생 했습니다.', STATUS_CODE.FAILED);
  }
};

/**
*  @swagger
*  paths:
*   /hash/marathon:
*     get:
*       summary: 완주하지 못한 선수
*       description: 완주하지 못한 선수
*       tags: [hash (해시)]
*       parameters:
*         - in: query
*           name: participant
*           required: true
*           schema:
*             type: array
*             items:
*               type: string
*           default: ["marina", "josipa", "nikola", "vinko", "filipa"]
*           description: '참여자'
*         - in: query
*           name: completion
*           required: true
*           schema:
*             type: array
*             items:
*               type: string
*           default: ["josipa", "filipa", "marina", "nikola"]
*           description: '완주자'
*       responses:
*         "200":
*           description: OK
*/
exports.marathon = async function (req, res) {
  let participant = req.query.participant;
  let completion = req.query.completion;
  
  function solution(participant, completion) {
    try {
      const map = new Map();
          
      for(let i = 0; i < participant.length; i++) {
        let pArr = participant[i];
        let cArr = completion[i];
        let pCount = 1; // 참가했을 경우 +1
        let cCount = -1; // 완료했을경우 -1 을 하여 최종 1보다 큰 key 값이 미 완료자
  
        if(map.get(pArr)){
          pCount = map.get(pArr) + 1
        }
        map.set(pArr, pCount);
  
        if(map.get(cArr)){
          cCount = map.get(cArr) - 1
        }
        map.set(cArr, cCount);
      }
  
      for(let [k, v] of map) {
        if(v > 0){
          return k;
        }
      }

    } catch (error) {
      console.log('error: ', error.message);
      return false;
    }
  }

  const result = solution(participant, completion);
  
  if(result){
    return res.prg({result: result});
  }else{
    return res.prg('오류가 발생 했습니다.', STATUS_CODE.FAILED);
  }
};