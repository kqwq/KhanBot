const { updateProgram } = require('./src/post.js');

(async () => {
    const { get, post } = require('./src/core.js');
    const dotenv = require('dotenv');
    dotenv.config()
    /* Test code */
    const ID = 6463987598180352;
    const botKaid = "kaid_3687779856757538252355877";

    let res = await post.flag("inappropriate","Bad words are against the guidelines.",6663596161843200)
    console.log(res)
    //await updateProgram(ID, `rect(100,100,200,200);`, "Pew Nogram", 400, 400)

})();
/*node_modules
.DS_Store
.env */