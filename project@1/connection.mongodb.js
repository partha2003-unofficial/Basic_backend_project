import mongoose from "mongoose";

async function connectionMongodb(url) {
  await mongoose.connect(url)
    .then(() => { console.log('connection is successfull') })
    .catch((error) => {
      console.log('connection is failed..', error);
      process.exit(0) //stoping the process
    })
}

export  {connectionMongodb}