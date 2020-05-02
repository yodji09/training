module.exports = (err, req, res, next)=>{
    if (err.name){
        res.status(500).json({
            err
        })
    } else {
        res.status(err.code).json({
            err : err.msg,
            code : err.code,
            detail : err
        })
    }
}