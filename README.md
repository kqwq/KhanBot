# AutoKhan.js
## About
AutoKhan.js is a nodeJS library that allows your to make your own bot for Khan Academy.  Your bot can automatically comment on programs, create programs, and do almost anything that a normal user can.  There are a few simple steps required for setup and your bot will be ready.

## Documentation
Here's how all the functions work + setup for your bot.

### Environment Setup
AutoKhan is in NodeJS and is prefered to be running on replit.  You _can_ run this on almost any nodeJS environment if you want to.  To download the files, run this code in your terminal: 

`git clone https://github.com/kqwq/KhanBot.git`

`index.js` is where all your work will be done.  The environment should already be a basic async function and an express server.  Run `npm install` in your terminal and you are almost ready to go.

The last step to completing the setup is getting your Khan Academy Account Token (KAAS).  You should never share this with anyone and should keep it in an `.env` file.

To get this secret, make sure you have NodeJS installed at least.  Run these following steps in the terminal:

$`node`

$`const { utils } = require('./src/core.js');`

$`utils.getKAAS("[insert username]","[insert password]");`

(Press CTRL+C twice to exit)

You should now have your KAAS secret.  Store that in the `.env` file.  If you are on replit, click the lock icon on the left sidebar and name the secret "KAAS" and set its value to your account token.
If you are using this locally, create a new file called `.env` and insert `KAAS=KAAS_SECRET`.  No quotes.


### How To use AutoKhan.js
All of your code has to be in the async function given at startup.  For example, to post a comment on a particular program scratchpad, here is the code required:

```javascript
(async () => {
    const { get, post, utils } = require('./src/core.js');

    await post.feedback("This is the feedback content", "[program id]")

    
})();
```

So just to let you know, you _will_ be having to use async/await quite a bit.  Let's dive into the docs!

### Functions
All of the Autokhan functions will be listed here, starting with simple GET requests and then to POST, PUT, and DELETE requests.  GET requests will return JSON and the others later on actually do things like posting comments, making programs, etc.


#### User Profile `get.user.profile(kaid: string)`
Basic information about the user
```javascript
console.log(await get.user.profile("kaid_5019699394927714061666523"))
```

#### User Discussion `get.user.discussion(kaid: string)`
Discussion Summary
```javascript
console.log(await get.user.discussion("kaid_5019699394927714061666523"))
```

#### User Discussion Stats `get.user.discussion_stats(kaid: string)`
Discussion Stats
```javascript
console.log(await get.user.discussion_stats("kaid_5019699394927714061666523"))
```

#### User Questions `get.user.questions(kaid: string)`
Question Summary
```javascript
console.log(await get.user.questions("kaid_5019699394927714061666523"))
```

#### User Answers `get.user.answers(kaid: string)`
Answer Summary
```javascript
console.log(await get.user.answers("kaid_5019699394927714061666523"))
```

#### User Tips & Thanks `get.user.tips_thanks(kaid: string)`
Tips & Thanks Summary
```javascript
console.log(await get.user.tips_thanks("kaid_5019699394927714061666523"))
```

#### User Widgets `get.user.widgets(kaid: string)`
Widgets
```javascript
console.log(await get.user.widgets("kaid_5019699394927714061666523"))
```

#### User Comments `get.user.comments(kaid: string)`
Comment Summary
```javascript
console.log(await get.user.comments("kaid_5019699394927714061666523"))
```

#### User Projects `get.user.projects(kaid: string)`
Tips & Thanks Summary
```javascript
console.log(await get.user.projects("kaid_5019699394927714061666523"))
```

#### User Help Requests `get.user.project_help(kaid: string)`
Help Request Summary
```javascript
console.log(await get.user.project_help("kaid_5019699394927714061666523"))
```

#### User Help Request Answers `get.user.project_answers(kaid: string)`
How many help requests the user has answered to
```javascript
console.log(await get.user.project_answers("kaid_5019699394927714061666523"))
```

#### User Badges `get.user.badges(kaid: string)`
Badges Summary
```javascript
console.log(await get.user.badges("kaid_5019699394927714061666523"))
```

### Hotlist

#### Hotlist (Hot/Trending) `get.browse.hot(limit: number)`
Returns a number programs on the hotlist "Hot" page
```javascript
console.log(await get.browse.hot(30))
```

#### Hotlist (Recent) `get.browse.recent(limit: number)`
Returns a number programs on the hotlist "Recent" page
```javascript
console.log(await get.browse.recent(30))
```

#### Hotlist (Contests) `get.browse.contests(limit: number)`
Returns a number programs on the hotlist "Contests" page
```javascript
console.log(await get.browse.contests(30))
```

#### Hotlist (Top) `get.browse.top(limit: number)`
Returns a number programs on the hotlist "Top" page
```javascript
console.log(await get.browse.top(30))
```

### Programs

#### Program Total Information `get.scratchpad.full_data(id: number)`
Returns full data of a project
```javascript
console.log(await get.scratchpad.full_data(5095429626609664))
```

#### Program General Information `get.scratchpad.data(id: number)`
Returns the general data of a project
```javascript
console.log(await get.scratchpad.data(5095429626609664))
```

#### Program Spinoffs `get.scratchpad.spinoffs(id: number, limit*: number)`
Returns the spin-offs of a project.  `limit` is an optional argument, default set to 1000
```javascript
console.log(await get.scratchpad.spinoffs(5095429626609664, 30))
```

#### Program Questions `get.scratchpad.questions(id: number, limit*: number)`
Returns the questions asked on a project.  `limit` is an optional argument, default set to 1000
```javascript
console.log(await get.scratchpad.questions(5095429626609664, 30))
```

#### Program Feedback (Tips and Thanks) `get.scratchpad.spinoffs(id: number, limit*: number)`
Returns the feedback/Tips & Thanks posted on a project.  `limit` is an optional argument, default set to 1000
```javascript
console.log(await get.scratchpad.feedback(5095429626609664, 30))
```

### Discussions

#### Discussion Thread `get.discussion.thread(kaencrypted: string)`
Returns all the comments in a thread.
```javascript
console.log(await get.discussion.thread("kaencrypted_ecac7f3960e834a2b08fe89dcf64d9dc_d87d42f98e6da3bdb170c25e7d466841cd5377c29a38ffdf8c7faeb7beb59cc00034ba66237f571b44cbfda37cbebf14192e56b13019ae7e8413950ac18addc0745a9d0faade63259c76b28a6c67798711a0df1b79ef21990dd576dcba0d587f537335f177b9b656582be76d35ba0a3e5cdf9ebf77ffb1db47bbe1fc59d3808953a41466ae212b1fdcd78923f520eaef573dcc2923e643c23e24abb62d2be399498ac10d9854b787c4f3c06ad4c8e4c995fa75894303bce6a5b6fcdf6d02c4e2"))
```

## Post Requests
Now comes the fun part - How your bot will actually run.

#### Comment in a Thread `post.comment(content: string, commentKey: string)`
```javascript
console.log(await post.comment("Comment Content", "kaencrypted_ecac7f3960e834a2b08fe..."))
```

#### Post a T&T/feedback on a project `post.feedback(content: string, programID: number)`
```javascript
console.log(await post.feedback("Feedback Content", 5961976947621888))
```

#### Delete previously-posted T&T/feedback `post.del_feedback(kaencrypted: string, programID: number)`
```javascript
console.log(await post.del_feedback("kaencrypted_ecac7f3960e834a2b08fe...", 5961976947621888))
```

#### Vote Program `post.voteProgram(programID: number)`
```javascript
console.log(await post.voteProgram(5961976947621888))
```

#### Create Program `post.scratchpad(code: string, title: string, type: string, base64: string)`
`base64` is the screenshot of the program.  You can customize it or leave the param empty as it sets your program's screenshot to a plain white background by default.  `type` has to be either "pjs" or "webpage".  Default set to "pjs".
```javascript
console.log(await post.scratchpad("//code here", "title!!", "data:image/png;base64,iVBOR...", "pjs"))
```

#### Update Program `post.updateProgram(id: number, newCode: string, newTitle: string, newWidth: number, newHeight: number, base64: string)`
`newWidth` and `newHeight` are set to 400 by default and `base64` sets up a blank white screenshot by default.
```javascript
console.log(await post.updateProgram(5961976947621888, "//new code here", "new title!!", 600, 600, "data:image/png;base64,iVBOR..."))
```

#### Delete Program `post.deleteProgram(programID: number)`
```javascript
console.log(await post.deleteProgram(5961976947621888))
```

#### Update Profile `post.updateProfile(nickname: string, username: string, bio: string, kaid: string)`
```javascript
console.log(await post.updateProfile("AutoKhan [Bot]", "AutoKhanBot", "I am a bot - This is my bio", "kaid_5019699394927714061666523"))
```

#### Update Avatar `post.updateAvatar(avatar: string, kaid: string)`
```javascript
console.log(await post.updateAvatar("piceratops_ultimate_style", "kaid_5019699394927714061666523"))
```

#### Ask Question on a project `post.askQuestion(content: string, programID: number)`
```javascript
console.log(await post.askQuestion("Question Content", 5961976947621888))
```

#### Answer Question `post.answerQuestion(content: string, commentKey: string)`
```javascript
console.log(await post.answerQuestion("Answer Content", "kaencrypted_ecac7f3960e834a2b08fe..."))
```

## Utilities

#### getKAAS `utils.getKAAS(username: string, password: string)`
logs your account token to the console
```javascript
utils.getKAAS("username","password123")
```

## Examples

#### Timer
```javascript
//posts a feedback post on a program every minute
setInterval(async () => {
  await post.feedback("I post feedback every minute on the same program!!", 5961976947621888)
}, 60000);
```

No more examples for now.  Sorry!!

## Collaborators (github usernames):
Conner1115 (LeviathanProgramming), kqwq (Squishy), Phi-001 (Phi)
