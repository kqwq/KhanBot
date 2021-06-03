const { get, post } = require('./src/core.js');

(async () => {
    /* Test code */
    const ID = 6616827407400960;
    const botKaid = "kaid_3687779856757538252355877";

    var obj = await get.scratchpad.feedback(ID);
    console.log(JSON.stringify(obj).slice(0, 1000)); // first 1000 characters of output


})();