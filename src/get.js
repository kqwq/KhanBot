const fetch = require('node-fetch');
const fs = require('fs')

let baseUrl = "https://www.khanacademy.org/api/internal"
let options = { headers: {}, method: "GET", mode: "cors" }

module.exports = {
  profile: (kaid, callback) => {
    fetch(`${baseUrl}/user/profile?kaid=${kaid}`, options)
      .then(r => r.json())
      .then(callback)
      .catch(console.error);
  },
  browse:{
    hot: (limit, callback) => {
        console.log(`${baseUrl}/scratchpads/top?sort=3&page=0&limit=${limit}`)
        fetch(`${baseUrl}/scratchpads/top?sort=3&page=0&limit=${limit}`, options)
        .then(r => r.json())
        .then(callback)
        .catch(console.error);
    },
    recent: (limit, callback) => {
        console.log(`${baseUrl}/scratchpads/top?casing=camel&sort=2&page=0&limit=${limit}&topic_id=xffde7c31`)
        fetch(`${baseUrl}/scratchpads/top?casing=camel&sort=2&page=0&limit=${limit}&topic_id=xffde7c31`, options)
        .then(r => r.json())
        .then(callback)
        .catch(console.error);
    },
    contests: (limit, callback) => {
        console.log(`${baseUrl}/scratchpads/top?casing=camel&sort=4&page=0&limit=${limit}&topic_id=xffde7c31`)
        fetch(`${baseUrl}/scratchpads/top?casing=camel&sort=4&page=0&limit=${limit}&topic_id=xffde7c31`, options)
        .then(r => r.json())
        .then(callback)
        .catch(console.error);
    },
    top: (limit, callback) => {
        console.log(`${baseUrl}/scratchpads/top?casing=camel&sort=5&page=0&limit=${limit}&topic_id=xffde7c31`)
        fetch(`${baseUrl}/scratchpads/top?casing=camel&sort=5&page=0&limit=${limit}&topic_id=xffde7c31`, options)
        .then(r => r.json())
        .then(callback)
        .catch(console.error);
    },
  },
  scratchpad: (id, callback) => {
    fetch(
      `${baseUrl}/scratchpads/${id}`, options)
      .then(r => r.json())
      .then(callback)
      .catch(console.error);
  },
  spinoffs: (id, callback) => {
    fetch(
      `${baseUrl}/scratchpads/Scratchpad:${id}/top-forks?limit=1000`, options)
      .then(r => r.json())
      .then(callback)
      .catch(console.error);
  },
  questions: (id, callback) => {
    fetch(`${baseUrl}/discussions/scratchpad/${id}/questions?limit=1000&sort=1`, options)
      .then(r => r.json())
      .then(callback)
      .catch(console.error);
  },
  feedback: (id, callback, limit) => {
    if (!limit) {
      limit = 1000
    }
    fetch(`${baseUrl}/discussions/scratchpad/${id}/comments?limit=${limit}&page=0&sort=2`, options)
      .then(r => r.json())
      .then(callback)
      .catch(console.error);
  },
  comment: (kaencrypted, callback) => {
    fetch(`${baseUrl}/discussions/${kaencrypted}/replies`, options)
      .then(r => r.json())
      .then(callback)
      .catch(console.error);
  }
}