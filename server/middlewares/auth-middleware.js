import jwt from 'jsonwebtoken';
import userModal from '../models/User.js';

let checkUserAuth = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;
    console.log("hello");
    if (authorization && authorization.startsWith("Bearer")) {
        try {
            token = authorization.split(" ")[1];
            // verify token
            const {userID} = jwt.verify(token, process.env.JWT_SECRET_KEY);
            // get user from token..
            req.user = await userModal.findById(userID).select("-password");
            console.log("middleware" , req.user);
            // console.log("middleware" , req.body);
            next();
        } catch (error) {
            res.status(401).send({message: "Unauthorized user"});
        }
    }
    if (!token) {
        res.status(401).send({message: "No token, unauthorized user"});
    }
}


export default checkUserAuth;