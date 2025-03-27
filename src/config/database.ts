import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://mongo:27017/survey-db')
        console.log('Mongo connected')
    } catch (err) {
        console.log('err: ', err) 
        process.exit(1)
    }
}