const prg = require('../lib/prg');
const { STATUS_CODE } = require('../lib/constants');

/**
*  @swagger
*  paths:
*   /stackq/same-number:
*     get:
*       summary: 같은 숫자는 싫어 (Level 1)
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
      for(let i = 0; i < arr.length; i++){
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

/**
*  @swagger
*  paths:
*   /stackq/development:
*     get:
*       summary: 기능개발 (Level 2)
*       description: 기능개발
*       tags: [stack & queue (스택 & 큐)]
*       responses:
*         "200":
*           description: OK
*/
exports.development = async function (req, res) {  
  const progresses = [93, 30, 55];
  const speeds = [1, 30, 5];

  function solution(progresses, speeds){
    try {
      let dayArr = []; // 필요 작업 일수
      
      for(let i = 0; i < progresses.length; i++){
        dayArr[i] = Math.ceil((100 - progresses[i]) / speeds[i]);
      }

      let complete = dayArr[0];
      let completeCount = 0;
      let completeArr = [];
      for(let i = 0; i < dayArr.length; i++){
        if(complete >= dayArr[i]){
          completeCount = completeCount + 1;
        }else{
          completeArr.push(completeCount);
          completeCount = 1;
          complete = dayArr[i];
        }
      }
      completeArr.push(completeCount);

      return completeArr;
    } catch (error) {
      console.log('error: ', error.message);
      return false;
    }
  }
  const result = solution(progresses, speeds);
  
  if(result){
    return res.prg({result: result});
  }else{
    return res.prg('오류가 발생 했습니다.', STATUS_CODE.FAILED);
  }
};

/**
*  @swagger
*  paths:
*   /stackq/bracket:
*     get:
*       summary: 올바른 괄호 (Level 2)
*       description: 올바른 괄호
*       tags: [stack & queue (스택 & 큐)]
*       responses:
*         "200":
*           description: OK
*/
exports.bracket = async function (req, res) {  
  const s = '(()(';

  function solution(s){
    try {
      let flag = true;
      let bracketOpenCnt = 0;
      let bracketCloseCnt = 0;

      for(let i = 0; i < s.length; i++){
        if(s[i] === '('){
          bracketOpenCnt += 1;
        } else if(s[i] === ')'){
          bracketCloseCnt += 1;
        }

        if(bracketCloseCnt > bracketOpenCnt){
          flag = false;
        }
      }
      
      if(bracketOpenCnt !== bracketCloseCnt){
        flag = false;
      }

      return flag;
    } catch (error) {
      console.log('error: ', error.message);
      return false;
    }
  }
  const result = solution(s);
  
  if(result){
    return res.prg({result: result});
  }else{
    return res.prg('오류가 발생 했습니다.', STATUS_CODE.FAILED);
  }
};

/**
*  @swagger
*  paths:
*   /stackq/printer:
*     get:
*       summary: 프린터 (Level 2)
*       description: 프린터
*       tags: [stack & queue (스택 & 큐)]
*       responses:
*         "200":
*           description: OK
*/
exports.printer = async function (req, res) {  
  const priorities = [1, 1, 2, 3, 2, 1];
  const location = 0;

  function solution(priorities, location){
    try {
      let order = 0; // 출력 순서
      let priorityMap = priorities.map((v, i) => ({priority: v, index: i}));

      while(true){
        let firstValue = priorityMap.shift(); // 현재 가장 앞에 있는 값

        if(priorityMap.some(m => m.priority > firstValue.priority)){
          priorityMap.push(firstValue);
        }else{ // 뒤에 더 큰값 없으면 출력
          order += 1; // 출력할때마다 순서 +1
          if(firstValue.index === location){ // 내가 원하는 문서라면 while문 종료
            break;
          }
        }
      }

      return order;
    } catch (error) {
      console.log('error: ', error.message);
      return false;
    }
  }

  const result = solution(priorities, location);
  
  if(result){
    return res.prg({result: result});
  }else{
    return res.prg('오류가 발생 했습니다.', STATUS_CODE.FAILED);
  }
};

/**
*  @swagger
*  paths:
*   /stackq/truck:
*     get:
*       summary: 다리를 지나는 트럭 (Level 2)
*       description: 다리를 지나는 트럭
*       tags: [stack & queue (스택 & 큐)]
*       responses:
*         "200":
*           description: OK
*/
exports.truck = async function (req, res) {  
  const bridge_length = 2;
  const weight = 10;
  const truck_weights = [7,4,5,6];

  function solution(bridge_length, weight, truck_weights){
    try {
      let order = 0; // 출력 순서
      let priorityMap = priorities.map((v, i) => ({priority: v, index: i}));

      while(true){
        let firstValue = priorityMap.shift(); // 현재 가장 앞에 있는 값

        if(priorityMap.some(m => m.priority > firstValue.priority)){
          priorityMap.push(firstValue);
        }else{ // 뒤에 더 큰값 없으면 출력
          order += 1; // 출력할때마다 순서 +1
          if(firstValue.index === location){ // 내가 원하는 문서라면 while문 종료
            break;
          }
        }
      }

      return order;
    } catch (error) {
      console.log('error: ', error.message);
      return false;
    }
  }

  const result = solution(bridge_length, weight, truck_weights);
  
  if(result){
    return res.prg({result: result});
  }else{
    return res.prg('오류가 발생 했습니다.', STATUS_CODE.FAILED);
  }
};
