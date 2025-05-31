import mongoose from 'mongoose'

const connectDatabase = ()=>{
    console.log("wait connect to the database")

    mongoose.connect("mongodb+srv://root:root1234@cluster0.pbixqqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=> console.log('Connected'))
    .catch((error)=> console.log('coneccao nao estabelida: '+ error))

}
export default connectDatabase