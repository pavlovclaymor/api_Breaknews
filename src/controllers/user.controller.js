import userService from '../services/user.service.js'

//Criar usuario

const create = async (req,res) => {

  try{
      const {name,username,email,password,avatar,background} = req.body;

    if (!name || !email || !username || !password || !avatar || !background) {
        res.status(400).send({message:"Submit all fields for registration"})
        
    }

    const user = await userService.createService(req.body)


    if (!user) {
        return res.status(400).send({message:'Error creating User'})
    }

    res.status(201).send({
        message: 'User created sucessfuly',
        user: {
            id: user._id,
            name,
            username,
            email,
            avatar,
            background
        }
    })
  } catch (err){
    res.status(500).send({message: err.message})
  }
}

//Encontrar todod os usuarios

const findAll = async (req,res) =>{
    try{
        const users = await userService.findAllService()

if(users.length === 0) 
    return res.status(400).send('there are not registeered users')
    
    res.send(users)
    }catch(err){
        res.status(500).send({message: err.message})
    }
}

//encontrar usuario pelo id
const findById = async (req,res) =>{
    // if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(400).send( {message:'Invalid Id'} )

    const user = req.user
    
    // if(!user) {

    //     return res.status(400).send('User not found')
    // }
    res.send(user)
}

//Actualizar um usuario, todos os campos

const update = async(req,res)=>{
     const {name,username,email,password,avatar,background} = req.body;
     
    if (!name && !email && !username && !password && !avatar && !background) {
        res.status(400).send({message:"Submit at least one field for update"})    
    }

    const id = req.id

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //      return res.status(400).send({message:'Invalid Id'})
    // }

    //  const user = await userService.findByIdService(id)

    //  if (!user) return res.status(400).send({message:'User not found'})

    await userService.userPatchService(
        id,
        name,
        username,
        email,
        password,
        avatar,
        background
    )

    res.send({message: 'user sucessful updated'})
}
export default  {create, findAll, findById, update}
