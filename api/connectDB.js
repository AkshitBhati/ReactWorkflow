import mongoose from "mongoose"

const connectDB = async() => {
    try{
        const connect = await mongoose.connect(process.env.mongo_url)
        console.log(`Server is connect to ${connect.connection.host}`)
    }
    catch (err){
        console.error(err)
    }
}

export default connectDB