const { User } = require('../models')
const middleware = require('../middleware')

const GetUserProfiles = async (req, res) =>{ 
    try{
        const users = await User.findAll()
        res.send(users)
    } catch (error){
        throw error
    }
}


const GetIndividualUserProfile = async (req, res) => {
    try {
      const users = await User.findByPk(req.params.user_id
      )
      res.send(users)
    } catch (error) {
      throw error
    }
  }

  const CreateNewUser = async (req, res) => {
    try {
      
    const {username, password } = req.body
    let passwordDigest = await middleware.hashPassword(password)


    const user = await User.create(
      { username:username, password:passwordDigest,}
     
    )
    res.send(user)

    } catch (error) {
      throw error
    }
  }

  const DeleteAccount = async (req, res) => {
    try {
      let userId = (req.params.user_id)
      await User.destroy({where:{id:userId}})
      res.send({message:`Deleted account with an id of ${userId}`})
    } catch (error) {
      throw error
    }
  }


  const UpdateAccount = async (req, res) => {
    try {
      let userId = parseInt(req.params.user_id)
      let updatedAccount = await User.update(req.body, {where:{id: userId}, returning: true})
      res.send(updatedAccount)
    } catch (error) {
      throw error
    }
  }


  const Login = async (req, res) => {
    try {
      const user = await User.findOne({
        where: {username : req.body.username},
        raw: true
      })
      if (
        user &&
        middleware.comparePassword(user.passwordDigest, req.body.password)
      ) {
        let payload = {
          id: user.id,
          
        }
        let token = middleware.createToken(payload)
        return res.send({
          user: payload, token
        })
      }
      res.status(401).send({
        status: 'error',
        msg: 'unauthorized, login'
      })
    } catch (error) {
      throw error
    }
  }


  
module.exports= {
    GetUserProfiles,
    GetIndividualUserProfile,
    CreateNewUser,
    DeleteAccount,
    UpdateAccount,
    Login
  }