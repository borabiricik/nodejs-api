const express = require("express");
const app = express();

const hataMiddleware = (err,req,res,next)=>{
    res.json({error:err.message})
    next()
}

module.exports = hataMiddleware