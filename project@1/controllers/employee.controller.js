import employeeModel from '../models/user.model.js'

//all employees detailes
async function allEmployeeDetailes(request, response) {
    response.setHeader('content-type', 'text/html')

    const employee_details = await employeeModel.find({})
    try {
        const html = `
    <ol>
      ${employee_details.map((user) => {
            return ` <li> name: ${user.first_name || 'first name'} ${user.last_name || 'last name'}</li> \n
             <ul>
                 <li>ID : ${user.id || 'ID'}</li>
                 <li> email : ${user.email || 'email'} </li>
                 <li> gender : ${user.gender || 'gender'}</li>
                 <li>job titel : ${user.job_titel || 'job titel'}</li>

              </ul>`
        }).join('')}
    </ol>`
        response.status(202).send(html)
        process.exit()
    } catch (error) {
        console.log('there are some error on the finding the employee', error)
        process.exit(0)
    }

}

// get employee by id 
async function employeeDetailsBy_ID(request, response) {
    // display the particular user with email
    response.setHeader('content-type', 'application/json')

    const employee = await employeeModel.findById(request.params.id)
    if (employee) return response.status(200).json(employee)
    else {
        response.status(404).json({ message: 'the employee is not found' })
    }

}

//delete employee by id 
function employeeDeleteBy_ID(request, response) {
    //delete user with id
    if (request.params.id == employeeModel.findById(request.params.id)) {
        const findId = employeeModel.findByIdAndDelete(request.params.id)
            .then(() => {
                console.log('emplyoee delete successful')
                response.status(202).json({ message: 'emplyoee deleted successful' })

            })
            .catch((error) => {
                response.status(404).json({ message: 'did not deleted', error: error })
                process.exit(0)
            })
    } else {
        response.status(404).json({ message: 'id not present' })
        process.exit(0)
    }

}

//create new user in mongodb
async function createNewUser_mongodb_post(request, response) {
    const body = request.body;
    if (body != undefined) {
        if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
            await employeeModel.create({
                firstName: body.first_name,
                lastName: body.last_name,
                email: body.email,
                gender: body.gender,
                jobTitle: body.job_title
            })
                .then(() => response.status(201).json({ message: 'document is created' }))
                .catch((error) => {
                    response.status(404).json({ message: 'document is not created', error: error })
                    process.exit(0);
                })
        } else { response.status(404).json({ message: 'please enter requeird details' }) }
    } else {
        response.status(404).json({ message: 'data is not founded.' })
        process.exit(0)
    }
}

export { allEmployeeDetailes, employeeDetailsBy_ID, employeeDeleteBy_ID, createNewUser_mongodb_post }