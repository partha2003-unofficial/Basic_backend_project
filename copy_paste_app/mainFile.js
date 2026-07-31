const http = require('http');
const fs = require('fs')
const fsawat = require('fs').promises
const EventEmitter = require('events');
const eventMassage = new EventEmitter()

const PORT = 8000;
const newFile = 'newLogsFile.txt'

//event module
eventMassage.on('fileRead', () => { console.log('the file is readed..') })
eventMassage.on('fileWrite_append', () => { console.log('the file is write and appended sucessfully..') })
eventMassage.on('fileDelete', () => { console.log('the file is deleted..') })

const server = http.createServer(async (request, response) => {

    response.writeHead(200, { 'content-type': 'text/plain' })

    // copy and past the code form one file to another file.
    try {
        const readFile = await fsawat.readFile('logs.txt', { encoding: 'utf-8', mode: 0o644, flag: 'r' })
        eventMassage.emit('fileRead')
        await fsawat.writeFile(newFile, readFile, { encoding: 'utf-8', mode: 0o644, flag: 'w' })
        await fsawat.appendFile(newFile, readFile, { encoding: 'utf-8', mode: 0o644, flag: 'a' })
        eventMassage.emit('fileWrite_append');

        //creating streams
        if (newFile) {
            const readableData = fs.createReadStream(newFile, { encoding: 'utf-8', highWaterMark: 16 })
            readableData.pipe(response);
        } else { console.log('there is some eror in the creatation of chunks ',) }

        //wating for 5 second , and then delete the file.
        response.on('close', async ()=>{
            if (fs.existsSync(newFile)) {
                await fsawat.unlink(newFile)
                eventMassage.emit('fileDelete')
            }
        })

    } catch (error) {
        console.log('there are some error: ', error)
        response.end('somethig is wrong');
    }
    // there is a question ,  that is if the response is not end() then how the server is ended?.--> 
    // the pipe has  end() funtion that is automatically end the server when the chunk data is produceing end.
})
server.listen(PORT, () => { console.log('the server is started...') }) 