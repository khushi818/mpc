const { verifyToken } = require('../utils/authServices')
const User = require('../model/user')
const mongoose = require("mongoose")

const checkAuthenticate = async (req,res,next) => {
        try {
          let token;
          let userData;
      
          if (
            req.headers?.authorization &&
            req.headers?.authorization?.startsWith("Bearer")
          ) {
            token = req.headers.authorization.split(" ")[1];
          }
      
          if (!token) {
              res.status(401).json({
                message : "token is not accessible"
              })
          }
      
          // userInformation
          const decodedUserAuthData = await verifyToken(token);

          userData = await User.findOne( {
            _id: decodedUserAuthData.id
          })

          if (!userData) {
            res.status(401).json({
              message : "user is not authorised"
            })
          }

      
          req.user = userData;
      
          next();
        }
        catch (error) {
          next(error);
        }
}

const checkRole = (roles) => async (req, res, next) => {
  let { email } = req.user;

  //retrieve employee info from DB
  const user = await User.findOne({ email });
  !roles.includes(user.role)
    ? res.status(401).json({ message :"Sorry you do not have access to this route" })
    : next();
};

module.exports = {
    checkAuthenticate,
    checkRole
}