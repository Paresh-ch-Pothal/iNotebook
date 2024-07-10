const jwt = require('jsonwebtoken'); 
const JWT_secret="Harrybhaigreat!";

const fetchuser=(req,res,next)=>{  //get the information of the user from the jwt token and add it to req object
    const token=req.header("auth-token");
    if(!token){
        res.status(401).send({error: "Please authenticate with correct token"});
    }
    try {
        const data=jwt.verify(token,JWT_secret); //here we used the verify key so that it verifies the token and which we send and the original token if both are same then it stores the data of the user to the req.user
        req.user=data.user;
        next();
        
    } catch (error) {
        res.status(401).send({error: "Please authenticate with correct token"});
    }

}

module.exports=fetchuser;