import mongoose from "mongoose";

async function connectionMongodb( response, url) {
    await mongoose.connect(url)
        .then(() => console.log('connection successful.'))
        .catch((error) => {
            response.status(404).json({ message: 'the connection is failed' })
            process.exit(0)
        })
}

export { connectionMongodb }
