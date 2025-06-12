import News from '../models/News.js'

const createServiceNews = (body)=> News.create(body)

const findAllService = ()=> News.find()

export  {
    createServiceNews,
    findAllService
}