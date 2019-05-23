'use strict';

module.exports = {
    
    invalidPath: (req, res, next) => {
        let method = "invalidPath";
        //console.log(method + " failed");
        res.json({ "result": "failed", "error": "This is an invalid path" });
    }
};