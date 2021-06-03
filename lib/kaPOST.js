const fetch = require('node-fetch');

const fs = require('fs');

const KAAS = process.env.KAAS,
      fkey = process.env.fkey;
let baseUrl = "https://www.khanacademy.org/api/internal";
let headers = {
  "content-type": "application/json",
  "x-ka-fkey": `lol`,
  "cookie": `KAAS=${KAAS}; fkey=lol`
};

function postComment(content, commentKey, handleResponse) {
  if (!handleResponse) {
    handleResponse = r => console.log("postComment", r.status);
  }

  fetch(`https://www.khanacademy.org/api/internal/discussions/${commentKey}/replies`, {
    "credentials": "include",
    "headers": headers,
    "body": `{ "text": "${content}" }`,
    "method": "POST",
    "mode": "cors"
  }).then(response => {
    handleResponse(response);
  }).catch(console.error);
}

function postTipThanks(content, programID, handleResponse) {
  if (!handleResponse) {
    handleResponse = r => console.log("postTipThanks", r.status);
  }

  fetch("https://www.khanacademy.org/api/internal/discussions/scratchpad/" + programID.toString() + "/comments", {
    "headers": headers,
    "body": `{ "text": "${content}" }`,
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
  }).then(response => {
    handleResponse(response);
  }).catch(console.error);
}

function deleteTipThanks(kaencrypted, programID, handleResponse) {
  if (!handleResponse) {
    handleResponse = r => console.log("deleteTipThanks", r.status);
  }

  fetch(`https://www.khanacademy.org/api/internal/feedback/${kaencrypted}`, {
    "headers": headers,
    "referrer": "https://www.khanacademy.org/cs/i/" + programID,
    "body": "",
    "method": "DELETE",
    "mode": "cors",
    "credentials": "include"
  }).then(response => {
    handleResponse(response);
  }).catch(console.error);
}

function updateProgram(id, newCode, newTitle, newWidth, newHeight, handleResponse) {
  if (!handleResponse) {
    handleResponse = r => console.log("Status", r.status);
  }

  let body = {
    height: newWidth || 600,
    width: newHeight || 600,
    title: newTitle || "New program",
    revision: {
      code: newCode,
      image_url: 'data:image/png;base64,' + fs.readFileSync(thumbnailPath, 'base64'),
      folds: []
    }
  };
  fetch(`https://www.khanacademy.org/api/internal/scratchpads/${id}`, {
    "headers": headers,
    "body": JSON.stringify(body),
    "method": "PUT",
    "mode": "cors"
  }).then(handleResponse).catch(console.error);
}
/**
 * @param {string} code Code of the program to be created
 * @param {string} [thumbnailPath] Absolute path the the thumbnail of the created program. Defaults to blank.png
 * @param {string} [type] The type of the program to be created. Defaults to pjs.
 * @param {string} [handleResponse] Callback that will be called when the request is succeessful. Defaults to consle.log
 */


function createProgram(code, title = "New Program", thumbnailPath = "./blank.png", type = "pjs", handleResponse = console.log) {
  fetch("https://www.khanacademy.org/api/internal/scratchpads", {
    "headers": headers,
    "body": JSON.stringify({
      userAuthoredContentType: type,
      title: title,
      revision: {
        code: code,
        folds: [],
        image_url: 'data:image/png;base64,' + fs.readFileSync(thumbnailPath, 'base64')
      }
    }),
    "method": "POST",
    "mode": "cors"
  }).then(handleResponse).catch(console.error);
}

module.exports = {
  postComment,
  postTipThanks,
  deleteTipThanks,
  createProgram
};