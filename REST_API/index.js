const express = require('express')
const app = express()
const fs = require('fs')
const jsonData = require('./MOCK_DATA.json')

const PORT = 8000;
const PATH_NAME = './MOCK_DATA.json'

//middleware 
app.use(express.urlencoded({ extended: false }))

//urls
//display the whole user details
app.get('/api/user', (req, res) => { res.send(jsonData) })

//display the user details in readable formate  
app.get('/user', (req, res) => {

  res.setHeader('content-type', 'text/html')

  try {
    const html = `
    <ol>
      ${jsonData.map((user) => {
      return ` <li> name: ${user.first_name || 'first name'} ${user.last_name || 'last name'}</li> \n
             <ul>
                 <li>ID : ${user.id || 'ID'}</li>
                 <li> email : ${user.email || 'email'} </li>
                 <li> gender : ${user.gender || 'gender'}</li>
                 <li>job titel : ${user.job_titel || 'job titel'}</li>
            
              </ul>`
    }).join('')}
    </ol>`
    res.send(html)

  } catch (error) {
    console.log('there are some error', error)
    res.end('there are some error')
  }
  // res.send(html)
})

app.route('/api/user/:id')
  .get((req, res) => {
    // display the particular user with id 
    res.setHeader('content-type', 'application/json')
    const userId = Number(req.params.id);
    const user = jsonData.find((user) => { return user.id === userId })
    if (user) return res.status(200).json( user )
    else return res.status(404).json({ message: 'ther user is not found' })
  })
  .patch((req, res) => {
    //edit user
    const body = req.body
    const userId = Number(req.params.id)
    const findUser = jsonData.find((user) => user.id === userId)

    if (!findUser) { return res.status(404).json({ error: 'user is not found' }) }
    else if (jsonData.find((user) => user.email === body.email)) { return res.status(404).json({ error: 'user already existed' }) }
    else {
      Object.assign(findUser, body) //edit user object
      fs.writeFile(PATH_NAME, JSON.stringify(jsonData), (error, data) => {
        if (error) console.log('there is some error', error)
        else { return res.status(200).json({ status: 'success', massege: 'edit completed' }) }
      })
    }
  })
  .delete((req, res) => {
    //delete user with id
    const userId = Number(req.params.id)
    const findId = jsonData.findIndex((user) => { return user.id === userId });

    if (findId !== -1) {
      jsonData.splice(findId, 1)
      fs.writeFile(PATH_NAME, JSON.stringify(jsonData), (error) => {
        if (error) return res.status(404).json({ message: 'the user is not deleted' })
        else return res.status(200).json({ message: "the user is deleted" })
      })
    }
    else { return res.status(404).json({ message: 'user is not found' }) }
  })


app.post('/api/user', (req, res) => {
  //create a new user
  const body = req.body;
  if (body != undefined) {
    if (jsonData.find((userEmail) => userEmail.email === body.email)) {
      return res.status(406).json({ message: 'this user is exist || please try new' })
    } else {
      jsonData.push({ id: jsonData.length + 1, ...body })
      fs.writeFile(PATH_NAME, JSON.stringify(jsonData), (error, data) => {
        if (error) console.log('there are some error')
        res.json({ status: 'success', id: jsonData.length })
      })
      // //JSON.fs.writeFile doesn't know how to serialize an object — it expects a string, Buffer, or TypedArray.
    }

  } else { console.log('body is undefine') };

})


app.listen(PORT, () => { console.log(`the server is running.. in the PORT : ${PORT}`) })