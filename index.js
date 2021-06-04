const { updateProgram, updateAvatar } = require('./src/post.js');

(async () => {
    const { get, post, utils } = require('./src/core.js');
    const dotenv = require('dotenv');
    dotenv.config()
    /* Test code */
    const ID = 6463987598180352;
    const botKaid = "kaid_3687779856757538252355877";

    //var res = await post.answerQuestion("Oh yay an answer", "kaencrypted_05f0c38eae1f148026f4c0950bb2c5d0_ee429ba1ac9d3d7ab030ac7cd56be1cf72a46648f6308ea020bda37da99aefa3356bc747ea89ea27712403a4e77abec21736bf00e987b64210dafa6376554ca8b1df59a2d22b580bfac93dd6f40809544ab0d949692ed7bb3390d6d79d4b26d5f24bcdee72fa3124c262efc133ac02ded8058bffce69fa5236f385f4990f153e");
    //console.log(res);

    
    //let res = await post.feedback("test --001", ID)
    //console.log(res)
    //await updateProgram(ID, `rect(100,100,200,200);`, "Pew Nogram", 400, 400)

})();
/*node_modules
.DS_Store
.env */