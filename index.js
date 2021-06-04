const { updateProgram, updateAvatar } = require('./src/post.js');

(async () => {
    const { get, post } = require('./src/core.js');
    const dotenv = require('dotenv');
    dotenv.config()
    /* Test code */
    const ID = 6463987598180352;
    const botKaid = "kaid_3687779856757538252355877";

    //var res = await post.updateAvatar("cacteye_yellow_style", botKaid);
    //console.log(res);

    
    //let res = await post.feedback("test --001", ID)
    //console.log(res)
    //await updateProgram(ID, `rect(100,100,200,200);`, "Pew Nogram", 400, 400)

})();
/*node_modules
.DS_Store
.env */