const User = require('../model/user')
const { signToken } = require('../utils/authServices')

const login = async(req,res) =>{
      try{
        const { email , password } = req.body

        if(!email || !password){
            return res.status(404).json({
                success : false,
                message : "email and password not found"
            })
        }

        const findUser = await User.findOne({ $and : [ {email} , {password} ]})

        if(!findUser) {
            return res.status(400).json({
                success : false,
                message : "user doesn't exist"
            })
        }
          
        const token = await signToken(findUser._id)

        return res.status(200).json({
            success: true,
            message : "login successfully",
            data : {
                token,
                user : findUser
            }
        })

      }
      catch(err) {
        return res.status(500).json({
          success: false,
          message : "failed to create role"
        })
     }
}
const createUserRole = async(req,res) => {
     try{
        console.log(req.body)
        const createUser = await User.create({...req.body})
            
        return res.status(200).json({
            success : true,
            message : "user is created",
            data : {
                user : `${createUser.firstName} ${createUser.lastName}`
            }
        })
     }
     catch(err) {
          return res.status(500).json({
            success: false,
            message : "failed to create role"
          })
     }
}

const getAllUsers = async (req,res) => {
     try{
        const allUsers = await User.find()

        return res.status(200).json({
            success : true,
            data : {
                allUsers
            }
        })
     } catch(err) {
        return res.status(500).json({
            success: false,
            message : "failed to get user"
          })
     }
}


const deleteUser = async (req,res) => {
try{
    const findUser = await User.findOneAndDelete({_id :req.params.id})
    
    if(!findUser) {
        res.status(400).json({
            sucess : false,
            message : "user doesn't exist"
        })
    }

    return res.status(200).json({
        success : true,
        message : 'data is deleted'
    })
} catch(err) {
    return res.status(500).json({
        success: false,
        message : "failed to delete user"
      })
 }
}

module.exports = {
    login,
    createUserRole,
    getAllUsers,
    deleteUser
}