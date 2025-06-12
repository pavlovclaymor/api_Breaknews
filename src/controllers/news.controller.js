import {createServiceNews,findAllService} from '../services/news.service.js'


const create = async (req,res)=>{

try{

    const {title,text,banner} = req.body

    if (!title || !text || !banner) 
        return res.satus(400).send({message: "Submit all fields for registration"})

    await createServiceNews({ title, text, banner, id: 'objectIdfake'})
      res.send(201)
}catch(err){
        res.status(500).send({message: err.message})
    }

  
}

const findAll = (req,res)=>{
    const news = []
    res.send(201)
}

export  {create, findAll}