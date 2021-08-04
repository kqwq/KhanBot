const fetch = require('node-fetch');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config()
const { scratchpad } = require('./get.js');
const { KAAS, fkey } = require('./core.js')

let baseUrl = "https://www.khanacademy.org/api/internal";
let headers = {
  "content-type": "application/json",
  "x-ka-fkey": `lol`,
  "cookie": `KAAS=${process.env.KAAS}; fkey=lol`
};

module.exports = {
	comment: async (content, commentKey) => {
		try {
			return await fetch(`${baseUrl}/discussions/${commentKey}/replies`, {
				"headers": headers,
				"body": JSON.stringify({ text: content }),
				"method": "POST",
			}).then(r => r.json());
		} catch (e) {
			console.error(e);
		}
	},

	feedback: (content, programID) => {
			return fetch(`${baseUrl}/discussions/scratchpad/${programID.toString()}/comments`, {
				"headers": headers,
				"body": JSON.stringify({ text: content }),
				"referrer": "https://www.khanacademy.org/cs/i/"+programID,
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "{\"text\":\""+content+"\",\"shownLowQualityNotice\":false,\"topic_slug\":\"computer-programming\",\"fromVideoAuthor\":false}",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
			})
	},

	del_feedback: async (kaencrypted, programID) => {
		try {
			return await fetch(`${baseUrl}/internal/feedback/${kaencrypted}`, {
				"headers": headers,
				"body": "",
				"method": "DELETE",
			}).then(r => r.json());
		} catch (e) {
			console.error(e);
		}
	},

	updateProgram: async (id, newCode, newTitle, newWidth = 600, newHeight = 600, base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=") => {
		try {
			let body = {
				height: newWidth,
				width: newHeight,
				title: newTitle || "New program",
				revision: {
					code: newCode,
					image_url: base64,
					folds: []
				}
			}
			return await fetch(`${baseUrl}/scratchpads/${id}`, {
				"headers": headers,
				"body": JSON.stringify(body),
				"method": "PUT",
			}).then(r => r.json());
		} catch (e) {
			console.error(e);
		}
	},

	/**
	 * Votes up a program with the specified ID.
	 * @param {string} id ID of the program to vote up
	 * @param {function} [callback] Callback that will be called when the request is succeessful. Defaults to consle.log. Defaults to console.log
	 */
	voteProgram: async (id) => {
		try {
			const data = await scratchpad.data(id);
			return await fetch("https://www.khanacademy.org/api/internal/discussions/voteentity", {
				"headers": Object.assign({}, headers, {
					"content-type": "application/x-www-form-urlencoded;charset=UTF-8"
				}),
				"body": `entity_key=${data.key}&vote_type=1`,
				"method": "POST",
			}).then(r => r.json());
		} catch (e) {
			console.error(e);
		}
	},

	/**
	 * Creates a new program with specified arguments
	 * @param {string} code Code of the program to be created
	 * @param {string} [thumbnailPath] Absolute path the the thumbnail of the created program. Defaults to blank.png
	 * @param {string} [type] The type of the program to be created. Defaults to pjs.	 
	 */
	scratchpad: async (
		code,
		title = "New Program",
		type = "pjs",
    base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=",
	) => {
		try {
			return await fetch(`${baseUrl}/scratchpads`, {
				"headers": headers,
				"body": JSON.stringify({
					userAuthoredContentType: type,
					title: title,
					revision: {
						code: code,
						folds: [],
						image_url: `${base64}`,
					},
				}),
				"method": "POST",
			}).then(r => r.json());
		} catch (e) {
			console.error(e);
		}
	},

	deleteProgram: async (id) => {
		try {
			return await fetch(`${baseUrl}/scratchpads/${id}?client_dt=2021-06-03T20%3A44%3A53-05%3A00&lang=en&_=210603-1727-7caba4343b8f_1622771093947`, {
				"headers": headers,
				"referrer": "https://www.khanacademy.org/cs/i/" + id,
				"body": null,
				"method": "DELETE",
			})

		} catch (e) {
			console.error(e);
		}
	},

	updateProfile: async (nickname, username, bio, kaid) => {
		try {
			return await fetch(`${baseUrl}/graphql/updateProfile?lang=en&_=210603-1727-7caba4343b8f_1622770114786`, {
				"headers": headers,
				"body": `{\"operationName\":\"updateProfile\",\"variables\":{\"bio\":\"${bio}\",\"nickname\":\"${nickname}\",\"username\":\"${username}\"},\"query\":\"mutation updateProfile($avatarName: String, $bio: String, $backgroundName: String, $nickname: String, $username: String) {\\n  setSettings(avatarName: $avatarName, bio: $bio, backgroundName: $backgroundName, nickname: $nickname, username: $username) {\\n    user {\\n      id\\n      avatar {\\n        name\\n        imageSrc\\n        __typename\\n      }\\n      bio\\n      background {\\n        name\\n        imageSrc\\n        __typename\\n      }\\n      nickname\\n      username\\n      __typename\\n    }\\n    errors {\\n      code\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}`,
				"referrer": "https://www.khanacademy.org/profile/" + kaid + "/courses",
				"method": "POST",
				"mode": "cors",
				"credentials": "include"
			}).then(r => r.json());
		} catch (e) {
			console.error(e);
		}
	},

	updateAvatar: async (avatar, kaid) => {
		try {
			return await fetch(`${baseUrl}/graphql/updateProfile?lang=en&_=210603-1727-7caba4343b8f_1622770114786`, {
				"headers": headers,
				"body": `{\"operationName\":\"updateProfile\",\"variables\":{\"avatarName\":\"${avatar}\",\"backgroundName\":\"cosmos\"},\"query\":\"mutation updateProfile($avatarName: String, $bio: String, $backgroundName: String, $nickname: String, $username: String) {\\n  setSettings(avatarName: $avatarName, bio: $bio, backgroundName: $backgroundName, nickname: $nickname, username: $username) {\\n    user {\\n      id\\n      avatar {\\n        name\\n        imageSrc\\n        __typename\\n      }\\n      bio\\n      background {\\n        name\\n        imageSrc\\n        __typename\\n      }\\n      nickname\\n      username\\n      __typename\\n    }\\n    errors {\\n      code\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}`,
				"referrer": "https://www.khanacademy.org/profile/" + kaid + "/courses",
				"method": "POST",
				"mode": "cors",
				"credentials": "include"
			}).then(r => r.json());
		} catch (e) {
			console.error(e);
		}
	},

	askQuestion: async (content, programID) => {
		try {
			return await fetch(`${baseUrl}/discussions/scratchpad/${programID.toString()}/questions?casing=camel&lang=en&_=210603-1727-7caba4343b8f_1622814610284`, {
				"headers": headers,
				"referrer": "https://www.khanacademy.org/cs/i/" + programID,
				"body": JSON.stringify({ text: content, shownLowQualityNotice: false, topic_slug: "computer-programming", "fromVideoAuthor": false }),
				"method": "POST",
			}).then(r => r.json());
		} catch (e) {
			console.error(e);
		}
	},

	answerQuestion: async (content, commentKey) => {
		try {
			return await fetch(`${baseUrl}/questions/${commentKey}/answers?casing=camel&lang=en&_=210603-1727-7caba4343b8f_1622815143646`, {
				"headers": headers,
				"body": `{\"text\":\"${content}\",\"shownLowQualityNotice\":false,\"topic_slug\":\"\",\"fromVideoAuthor\":false}`,
				"method": "POST",
				"mode": "cors",
				"credentials": "include"
			}).then(r => r.text())
				.then(console.log);
		} catch (e) {
			console.error(e);
		}
	},

}