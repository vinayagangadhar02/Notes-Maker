const jwt=require("jsonwebtoken")

function authenticateToken(req,res,next){
    const token=req.header.authorization;
    const words=token.split(" ")
    const jwtToken=words[1]

    const decodedValue=jwt.verify(jwtToken,process.env.SECRET_TOKEN)
    if(decodedValue.username){
        next();
    }
    else{
        res.status(403).json({
            msg:"You are not authenticated"
        })
    }
}

module.exports={
    authenticateToken,
}

// const jwt=require("jsonwebtoken")
// function authenticateToken(req,res,next){
//     const token=req.header["authorization"];
//     const jwtToken=token && token.split(" ")[1]

// if(!jwtToken)
//     return res.sendStatus(401)


// jwt.verify(jwtToken,process.env.SECRET_TOKEN,(err,user)=>{
//     if(err)
//         return res.sendStatus(401)
//     req.user=user
//     next()
// })
// }

// module.exports={
//     authenticateToken,
// }
