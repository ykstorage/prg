const prg = require('../lib/prg');
const { STATUS_CODE } = require('../lib/constants');

/**
*  @swagger
*  paths:
*   /hash/ponketmon:
*     get:
*       summary: 폰켓몬 (Level 1)
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
*       summary: 완주하지 못한 선수 (Level 1)
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

        // console.log('---------------------');
        // console.log('pArr: ', pArr);
        // console.log('pCount: ', pCount);
        // console.log('map: ', map);
  
        if(map.get(cArr)){
          cCount = map.get(cArr) - 1
        }
        map.set(cArr, cCount);

        // console.log('cArr: ', cArr);
        // console.log('cCount: ', cCount);
        // console.log('map: ', map);
        // console.log('---------------------');
      }
  
      for(let [k, v] of map) {
        // console.log('---------------------');
        // console.log('k: ', k);
        // console.log('v: ', v);
        // console.log('---------------------');
        
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

/**
*  @swagger
*  paths:
*   /hash/camouflage:
*     get:
*       summary: 위장 (Level 2)
*       description: 위장
*       tags: [hash (해시)]
*       responses:
*         "200":
*           description: OK
*/
exports.camouflage = async function (req, res) {
  let clothes = [["yellow_hat", "headgear"], ["blue_sunglasses", "eyewear"], ["green_turban", "headgear"]];

  function solution(clothes) {
    try {
      const map = new Map();
          
      for(let i = 0; i < clothes.length; i++) {
        let cTypeArr = clothes[i][1]; // 의상의 종류
        let cCount = 1; // 의상갯수 + 1
  
        if(map.get(cTypeArr)){
          cCount = map.get(cTypeArr) + 1
        }
        map.set(cTypeArr, cCount);
      }
      
      let result = 1;
      for(let [k, v] of map) {
        result = result * (v + 1);
      }
      return result - 1;
    } catch (error) {
      console.log('error: ', error.message);
      return false;
    }
  }

  const result = solution(clothes);
  
  if(result){
    return res.prg({result: result});
  }else{
    return res.prg('오류가 발생 했습니다.', STATUS_CODE.FAILED);
  }
};

/**
*  @swagger
*  paths:
*   /hash/best-album:
*     get:
*       summary: 베스트앨범 (Level 3)
*       description: 베스트앨범
*       tags: [hash (해시)]
*       responses:
*         "200":
*           description: OK
*/
exports.bestAlbum = async function (req, res) {
  let genres = ["classic", "pop", "classic", "classic", "pop"];
  let plays = [500, 600, 150, 800, 2500];

  function solution(genres, plays) {
    try {
      const genreMap = new Map(); // 장르별 총 재생 횟수
      const songInfoMap = new Map(); // 각 노래별

      for(let i = 0; i < genres.length; i++){
        if(genreMap.has(genres[i])){ // 이미 맵에 정보를 추가 한적 있으면
          genreMap.set(genres[i], genreMap.get(genres[i]) + plays[i]);
          songInfoMap.get(genres[i]).push({id: i, play: plays[i]});
        }else{
          genreMap.set(genres[i], plays[i]);
          songInfoMap.set(genres[i], [{id: i, play: plays[i]}]);
        }
      }

      // 재생횟수 순으로 정렬
      const sortedGenre = 
        [...genreMap.entries()].sort((a, b) => b[1] - a[1]).map(entry => entry[0]);

      const bestSong = [];
      for(let i = 0; i < sortedGenre.length; i++){
        let sortedSong = songInfoMap.get(sortedGenre[i]); // 장르별로 노래 가져와서
        sortedSong = sortedSong.sort((a, b) => b.play - a.play || a.id - b.id);

        for(let j = 0; j < Math.min(sortedSong.length, 2); j++){
          bestSong.push(sortedSong[j].id)
        }
      }

      return bestSong;
    } catch (error) {
      console.log('error: ', error.message);
      return false;
    }
  }

  const result = solution(genres, plays);
  
  if(result){
    return res.prg({result: result});
  }else{
    return res.prg('오류가 발생 했습니다.', STATUS_CODE.FAILED);
  }
};