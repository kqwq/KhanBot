const fetch = require('node-fetch');

/* Generate KAAS from username / password pair */
module.exports = {
	getKAAS: async function(username, password) {
		await fetch("https://www.khanacademy.org/api/internal/graphql/loginWithPasswordMutation", {
			"credentials": "include",
			"headers": {
				"content-type": "application/json",
				"x-ka-fkey": "lol",
				"cookie": "fkey=lol"
			},
			"body": JSON.stringify({
				operationName: "loginWithPasswordMutation",
				query: "mutation loginWithPasswordMutation($identifier: String!, $password: String!) {\n  loginWithPassword(identifier: $identifier, password: $password) {\n    user {\n      id\n      kaid\n      canAccessDistrictsHomepage\n      isTeacher\n      hasUnresolvedInvitations\n      transferAuthToken\n      preferredKaLocale {\n        id\n        kaLocale\n        status\n        __typename\n      }\n      __typename\n    }\n    isFirstLogin\n    error {\n      code\n      __typename\n    }\n    __typename\n  }\n}\n",
				variables: {
					identifier: username,
					password: password
				}
			}),
			"method": "POST",
			"mode": "cors"
		})
			.then(res => res.headers.get("set-cookie"))
			.then(data => {
				console.log("KAAS secret: " + (data.match(/KAAS=([\w-]+)/) || [])[1])
			})
			.catch(console.error)
	}
}
// Ask for user and password and output
//! getKAAS(...prompt("User|Pass?").split("|"))