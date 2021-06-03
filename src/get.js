const fetch = require('node-fetch');
const fs = require('fs');

let baseUrl = "https://www.khanacademy.org/api/internal"
let options = { headers: {}, method: "GET", mode: "cors" }

const base = u => `https://www.khanacademy.org/api/internal${u}`;

module.exports = {
	user: {
		profile: async (kaid) => {
			try {
				const res = await fetch(base("/user/profile?kaid=" + kaid), options);
				return await res.json();
			} catch (e) {
				console.error(e);
			}
		},

		discussion: async (kaid) => {
			try {
				const res = await fetch(base("/user/discussion/summary?casing=camel&kaid=" + kaid), options);
				return await res.json();
			} catch (e) {
				console.error(e);
			}
		},

		discussion_stats: async (kaid) => {
			try {
				const res = await fetch(base("/user/discussion/statistics?casing=camel&kaid=" + kaid), options);
				return await res.json();
			} catch (e) {
				console.error(e);
			}
		},

		questions: async (kaid) => {
			try {
				const res = await fetch(base("/user/questions?casing=camel&kaid=" + kaid), options);
				return await res.json();
			} catch (e) {
				console.error(e);
			}
		},

		answers: async (kaid) => {
			try {
				const res = await fetch(base("/user/answers?casing=camel&kaid=" + kaid), options);
				return await res.json();
			} catch (e) {
				console.error(e);
			}
		},

		tips_thanks: async (kaid) => {
			try {
				const res = await fetch(base("/user/comments?casing=camel&kaid=" + kaid), options);
				return await res.json();
			} catch (e) {
				console.error(e);
			}
		},

		widgets: async (kaid) => {
			try {
				const res = await fetch(base("/user/" + kaid + "/profile/widgets"), options);
				return await res.json();
			} catch (e) {
				console.error(e);
			}
		},

		comments: async (kaid) => {
			try {
				const res = await fetch(base("/user/replies/summary?casing=camel&kaid=" + kaid), options);
				return await res.json();
			} catch (e) {
				console.error(e);
			}
		},

		projects: async (kaid) => {
			try {
				const res = await fetch(base("/user/projects?casing=camel&kaid=" + kaid), options);
				return await res.json();
			} catch (e) {
				console.error(e);
			}
		},

		project_help: async (kaid) => {
			try {
				const res = await fetch(base("/user/projectquestions?casing=camel&kaid=" + kaid), options);
				return await res.json();
			} catch (e) {
				console.error(e);
			}
		},

		project_answers: async (kaid) => {
			try {
				const res = await fetch(base("/user/projectanswers?casing=camel&kaid=" + kaid), options);
				return await res.json();
			} catch (e) {
				console.error(e);
			}
		},

		badges: async (kaid) => {
			try {
				const res = await fetch(base("/user/badges?casing=camel&kaid=" + kaid), options);
				return await res.json();
			} catch (e) {
				console.error(e);
			}
		},

	},
	browse: {
		hot: async (limit) => {
			try {
				const res = await fetch(base(`/scratchpads/top?sort=3&page=0&limit=${limit}`), options);
				return await res.json();
			} catch (e) {
				console.error(e);
			}
		},

		recent: async (limit) => {
			try {
				const res = await fetch(base(`/scratchpads/top?casing=camel&sort=2&page=0&limit=${limit}&topic_id=xffde7c31`), options);
				return await res.json();
			} catch (e) {
				console.error(e);
			}
		},

		contests: async (limit) => {
			try {
				const res = await fetch(base(`/scratchpads/top?casing=camel&sort=4&page=0&limit=${limit}&topic_id=xffde7c31`), options);
				return await res.json();
			} catch (e) {
				console.error(e);
			}
		},

		top: async (limit) => {
			try {
				const res = await fetch(base(`/scratchpads/top?casing=camel&sort=5&page=0&limit=${limit}&topic_id=xffde7c31`), options);
				return await res.json();
			} catch (e) {
				console.error(e);
			}
		},
	},
	scratchpad: {
		full_data: async (id) => {
			try {
				const res = await fetch(base(`/show_scratchpad?scratchpad_id=${id}`), options);
				return await res.json();
			} catch (e) {
				console.error(e);
			}
		},

		data: async (id) => {
			try {
				const res = await fetch(base(`/scratchpads/${id}`), options);
				return await res.json();
			} catch (e) {
				console.error(e);
			}
		},

		spinoffs: async (id, limit = 1000) => {
			try {
				const res = await fetch(base(`/scratchpads/Scratchpad:${id}/top-forks?limit=${limit}`), options);
				return await res.json();
			} catch (e) {
				console.error(e);
			}
		},

		questions: async (id, callback) => {
			try {
				const res = await fetch(base(`/discussions/scratchpad/${id}/questions?limit=1000&sort=1`), options);
				return await res.json();
			} catch (e) {
				console.error(e);
			}
		},

		feedback: async (id, callback, limit = 1000) => {
			try {
				const res = await fetch(base(`/discussions/scratchpad/${id}/comments?limit=${limit}&page=0&sort=2`), options);
				return await res.json();
			} catch (e) {
				console.error(e);
			}
		},
	},
	discussion: {
		thread: async (kaencrypted) => {
			const res = await fetch(`${baseUrl}/discussions/${kaencrypted}/replies`, options)
			return await res.json();
		},
	}
}