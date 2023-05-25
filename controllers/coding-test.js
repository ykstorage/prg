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
    let tempArr = [];

    // TODO: while 문 조건 범위를 더 좁혀야함
    while(newInterval < line1Arr.length){
      for (let i = 0; i < line1Arr.length; i++) {
        tempArr = [];
        
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

  if(result || result === 0){
    return res.prg({result: result});
  }else{
    return res.prg('오류가 발생 했습니다.', STATUS_CODE.FAILED);
  }
};

/**
*  @swagger
*  paths:
*   /coding-test/schedule:
*     get:
*       summary: 시간표
*       description: 시간표
*       tags: [coding test (코딩 테스트)]
*       responses:
*         "200":
*           description: OK
*/
exports.schedule = async function (req, res) {
  
  // let schedule = [
  //   ["MO 12:00 WE 14:30", "MO 12:00", "MO 15:00", "MO 18:00"],
  //   ["TU 09:00", "TU 10:00", "TU 15:00", "MO 18:00"],
  //   ["WE 09:00", "WE 12:00", "WE 15:00", "WE 18:00"],
  //   ["TH 09:30", "TH 11:30", "TH 15:00", "TH 18:00"],
  //   ["FR 15:00", "FR 15:00", "FR 15:00", "FR 15:00"],
  // ]

  let schedule = [
    ["MO 12:00 WE 14:30", "MO 12:00", "MO 15:00", "MO 18:00"],
    ["TU 09:00", "TU 10:00", "TU 15:00", "MO 18:00"],
    ["WE 09:00", "WE 12:00", "WE 15:00", "WE 18:00"],
    ["TH 09:30", "TH 11:30", "TH 15:00", "TH 18:00"],
    ["FR 15:00", "FR 15:00", "FR 15:00", "FR 15:00"],
  ];
  
  function parseTime(timeStr) {
    let [hour, minute] = timeStr.split(':').map(Number);
    let result = hour * 60 + minute;

    // console.log('parseTime result: ', result);
    return result;
  }
  
  function overlap(time1, time2) {
    let [start1, end1] = time1;
    let [start2, end2] = time2;
    let result = (start1 < end2) && (end1 > start2);

    // console.log('overlap result: ', result);
    return result;
  }
  
  let validSchedules = 0;
  
  function backtrack(timetable, index) {
    // console.log('---------------');
    // console.log(index);
    // console.log(schedule.length);
    // console.log('---------------');
    if (index === schedule.length) {

      
      validSchedules += 1;
      return;
    }
    
    for (let i = 0; i < schedule[index].length; i++) {
      let classTimes = schedule[index][i].split(' ');

      // if(i === 0){
      //   console.log(classTimes);
      //   console.log(classTimes.length);
      // }


      let valid = true;
      
      for (let j = 0; j < classTimes.length; j += 2) {
        let day = classTimes[j];
        let start = parseTime(classTimes[j + 1]);
        let end = start + (classTimes.length > 2 ? 90 : 180);
        
        if (timetable[day].some(time => overlap(time, [start, end]))) {
          valid = false;
          break;
        }
      }
      
      if (valid) {
        for (let j = 0; j < classTimes.length; j += 2) {
          let day = classTimes[j];
          let start = parseTime(classTimes[j + 1]);
          let end = start + (classTimes.length > 2 ? 90 : 180);
          timetable[day].push([start, end]);
        }
        
        backtrack(timetable, index + 1);
        
        for (let j = 0; j < classTimes.length; j += 2) {
          let day = classTimes[j];
          timetable[day].pop();
        }
      }
    }
  }
  
  let timetable = { 'MO': [], 'TU': [], 'WE': [], 'TH': [], 'FR': [] };
  
  backtrack(timetable, 0);
  
  console.log(validSchedules);

  
  let result = 1;
  if(result){
    return res.prg({result: result});
  }else{
    return res.prg('오류가 발생 했습니다.', STATUS_CODE.FAILED);
  }
};