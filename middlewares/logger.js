const logger=(req,res,next)=>{  // تجربة على Middeleware
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`)
    next()
}

module.exports=logger;
