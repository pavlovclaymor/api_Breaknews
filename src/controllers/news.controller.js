import {createServiceNews,findAllService} from '../services/news.service.js'


const create = async (req,res)=>{

    try{

        const {title,text,banner} = req.body

        if (!title || !text || !banner) 
            return res.status(400).send({message: "Submit all fields for registration"})

        await createServiceNews({ title, text, banner, user: req.userId})
        res.status(201).send('Created')

    } catch (err){
          res.status(500).send({message: err.message})
    }

  
}

const findAll = async (req,res)=>{
    const news = await findAllService()

    if(!news.length === 0 )
        return res.status(400).send({message: 'there are not news field'})
    
    res.status(200).send(news)
}

export  {create, findAll}