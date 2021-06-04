const fetch = require('node-fetch');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config()
const { scratchpad } = require('./get.js');

const KAAS = process.env.KAAS, fkey = process.env.fkey;

let baseUrl = "https://www.khanacademy.org/api/internal";
let headers = {
	"content-type": "application/json",
	"x-ka-fkey": `lol`,
	"cookie": `KAAS=${KAAS}; fkey=lol`
};

console.log("KAAS", KAAS)

module.exports = {
	comment: async (content, commentKey) => {
		let body = {
			text: content
		}
		try {
			return await fetch(`https://www.khanacademy.org/api/internal/discussions/${commentKey}/replies`, {
				"credentials": "include",
				"headers": headers,
				"body": JSON.stringify(body),
				"method": "POST",
				"mode": "cors"
			})
				.then(r => r.json());
		} catch (e) {
			console.error(e);
		}
	},

	feedback: async (content, programID) => {
		let body = {
			text: content
		}
		try {
			return await fetch(`https://www.khanacademy.org/api/internal/discussions/scratchpad/${programID.toString()}/comments`, {
				"headers": headers,
				"body": JSON.stringify(body),
				"method": "POST",
				"mode": "cors",
				"credentials": "include"
			})
			.then(r => r.json());
		} catch (e) {
			console.error(e);
		}
	},

	del_feedback: async (kaencrypted, programID) => {
		try {
			return await fetch(`https://www.khanacademy.org/api/internal/feedback/${kaencrypted}`, {
				"headers": headers,
				"referrer": `https://www.khanacademy.org/cs/i/${programID}`,
				"body": "",
				"method": "DELETE",
				"mode": "cors",
				"credentials": "include"
			})
				.then(r => r.json());
		} catch (e) {
			console.error(e);
		}
	},

	updateProgram: async (id, newCode, newTitle, newWidth, newHeight) => {
		try {
			let body = {
				height: newWidth || 600,
				width: newHeight || 600,
				title: newTitle || "New program",
				revision: {
					code: newCode,
					image_url: `data:image/png;base64,${fs.readFileSync(thumbnailPath, 'base64')}`,
					folds: []
				}
			}
			return await fetch(`https://www.khanacademy.org/api/internal/scratchpads/${id}`, {
				"headers": headers,
				"body": JSON.stringify(body),
				"method": "PUT",
				"mode": "cors"
			})
				.then(r => r.json());
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
				"headers": Object.assign({}, header, {
					"content-type": "application/x-www-form-urlencoded;charset=UTF-8"
				}),
				"body": `entity_key=${data.key}&vote_type=1`,
				"method": "POST",
			})
				.then(r = r.json());
		} catch (e) {
			console.error(e);
		}
	},

	/**
	 * Creates a new program with specified arguments
	 * @param {string} code Code of the program to be created
	 * @param {string} [thumbnailPath] Absolute path the the thumbnail of the created program. Defaults to blank.png
	 * @param {string} [type] The type of the program to be created. Defaults to pjs.
	 * @param {function} [callback] Callback that will be called when the request is succeessful. Defaults to consle.log
	 */
	scratchpad: async (
		code,
		title = "New Program",
		thumbnailPath = "./blank.png",
		type = "pjs",
		callback = console.log,
	) => {
		try {
			return await fetch("https://www.khanacademy.org/api/internal/scratchpads", {
				"headers": headers,
				"body": JSON.stringify({
					userAuthoredContentType: type,
					title: title,
					revision: {
						code: code,
						folds: [],
						image_url: `data:image/png;base64,${fs.readFileSync(thumbnailPath, 'base64')}`,
					},
				}),
				"method": "POST",
				"mode": "cors"
			})
				.then(r => r.json());
		} catch (e) {
			console.error(e);
		}
	},
}