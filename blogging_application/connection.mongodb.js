import mongoose from "mongoose"

async function connectMongodb(url) {
    await mongoose.connect(url)
        .then(() => console.log('connection successful !!'))
        .catch((error) => {
            console.log('connection is failed !!', error)
            process.exit(0)
        })
}

export { connectMongodb }