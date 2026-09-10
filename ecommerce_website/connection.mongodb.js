import mongoose from "mongoose";

async function connectMongodb(url) {
    await mongoose.connect(url)
        .then('the server is running')
        .catch((error) => {
            response.status(404).json({ message: 'the connection is failed' })
            process.exit(0)
        })
}

export { connectMongodb }