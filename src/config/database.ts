import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://mongo:27017/survey-db', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('Mongo connected')
    } catch (err) {
        console.log('err: ', err) 
        process.exit(1)
    }
}