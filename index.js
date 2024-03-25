const express =  require('express')
const uuid = require('uuid')

const port = 3000
const app = express()

const users = []

const checkUserId = (request, response, next) =>{
    const {id} = request.params

    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        response.status(404).json({error: "User not found"})
    }

    request.userIndex = index
    request.userId = id

    next()
}



app.get('/user', (request, response) => {
    return response.json({users})
})

app.post('/user', (request, response) => {
    const { name,  age} = request.query
    const user = { id: uuid.v4() , name , age }

    users.push(user)
    return response.status(201).json(user)
})


app.put('/user/:id', checkUserId, (request, response) => {
    const { name, age } = request.query
    const index = request.userIndex
    const id = request.userId

    const updateUser = {id, name, age}

     users[index] = updateUser

    return response.json(updateUser)
})

app.delete('/user/:id', checkUserId, (request, response) => {
    const index = request.userIndex

    users.splice(index,1)

    return response.status(204).json()
})





app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`)
})