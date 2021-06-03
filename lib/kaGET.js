const fetch = require('node-fetch');

const fs = require('fs');

let baseUrl = "https://www.khanacademy.org/api/internal";
let options = {
  headers: {},
  method: "GET",
  mode: "cors"
};
module.exports = {
  profile: (kaid, callback) => {
    fetch(`${baseUrl}/user/profile?kaid=${kaid}`, options).then(r => r.json()).then(callback).catch(console.error);
  },
  hotlist: (limit, callback) => {
    console.log(`${baseUrl}/scratchpads/top?sort=3&page=0&limit=${limit}`);
    fetch(`${baseUrl}/scratchpads/top?sort=3&page=0&limit=${limit}`, options).then(r => r.json()).then(callback).catch(console.error);
  },
  scratchpad: (id, callback) => {
    fetch(`${baseUrl}/scratchpads/${id}`, options).then(r => r.json()).then(callback).catch(console.error);
  },
  fetchSpinoffs: (id, callback) => {
    fetch(`${baseUrl}/scratchpads/Scratchpad:${id}/top-forks?limit=1000`, options).then(r => r.json()).then(callback).catch(console.error);
  },
  fetchQuestions: (id, callback) => {
    fetch(`${baseUrl}/discussions/scratchpad/${id}/questions?limit=1000&sort=1`, options).then(r => r.json()).then(callback).catch(console.error);
  },
  fetchTTs: (id, callback, limit) => {
    if (!limit) {
      limit = 1000;
    }

    fetch(`${baseUrl}/discussions/scratchpad/${id}/comments?limit=${limit}&page=0&sort=2`, options).then(r => r.json()).then(callback).catch(console.error);
  },
  fetchComment: (kaencrypted, callback) => {
    fetch(`${baseUrl}/discussions/${kaencrypted}/replies`, options).then(r => r.json()).then(callback).catch(console.error);
  }
};