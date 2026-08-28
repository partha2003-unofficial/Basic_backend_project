import mongoose from 'mongoose';

async function connectionToMongoose(url) {
    await mongoose.connect(url)
        .then(() => { return console.log('connection successfull') })
        .catch((error) => {
            console.log('connection failed due to : ' + error)
            process.exit(0)
        })
}
export { connectionToMongoose }