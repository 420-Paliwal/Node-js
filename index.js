const express = require('express');
const app = express();
const port = 3000
const users = require('./MOCK_DATA.json')
const fs = require('fs')
// express.json()
app.use(express.urlencoded({
    extended: true
}))
app.get('/', (req, res) =>{
    res.send('hello world');
})

/* this is for browser which returns html  */
app.get('/users', (req, res) => {
    const html = `<ul>
      ${users.map(user =>`<li>${user.first_name} </li>`).join('')
      } 
    </ul>`;
    res.send(html);
})
/* this is for mobile developer which returns json  */
app.get('/api/users', (req, res) => {
    res.json(users);
})

app.get('/users/:id', (req, res) => {
    const user = users.find(user => user.id === Number(req.params.id))
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    const html = `<h1>${user.first_name} ${user.last_name}</h1>
    <p>Email: ${user.email}</p>
    <p>Gender: ${user.gender}</p>
    <p>Job Title : ${user.job_title}</p>
    `;                             
    return res.send(html);    
})

app.get('/api/users/:id', (req, res) => {
    const user = users.find(user => user.id === Number(req.params.id))
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);                                 
})

app.post('/users', (req, res) => {
    const body = req.body
    users.push({
        id: users.length + 1,
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title, 
    })
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err)=>{
        if (err){
            console.error('Error writing to file', err);
            return res.status(500).json({ error: 'Failed to save user' });
        }
        return res.status(201).json({message : "User Created Successfully"})
    })
})
app.post('/api/users', (req, res) => {
    const body = req.body
    users.push({
        id: users.length + 1,
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title, 
    })
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err)=>{
        if (err){
            console.error('Error writing to file', err);
            return res.status(500).json({ error: 'Failed to save user' });
        }
        return res.status(201).json({message : "User Created Successfully"})
    })
})

app.patch('/users/:id', (req, res) => {
    const userId = Number(req.params.id)
    const body = req.body
    const userIndex = users.findIndex(user => user.id === userId)
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    users[userIndex] = {
        id: userId,
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title,
    }
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        if (err){
            console.error('Error writing to file', err);
            return res.status(500).json({ error: 'Failed to update user' });
        }
        console.log('User updated successfully');
    })
    return res.send("User updated successfully");
})

app.delete('/users/:id', (req, res) => {
    const userId = Number(req.params.id)
    console.log(userId)
    const userIndex = users.findIndex(user => user.id === userId)
    if (userIndex == -1) {
        return res.status(404).json({ error: 'User not found' });
    }
     users.splice(userIndex, 1)
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        if (err) {
            console.error('Error writing to file', err);
            return res.status(500).json({ error: 'Failed to delete user' });
        }
    })
    res.json({message : " User deleted successfully" });
})

app.delete('/api/users/:id', (req, res) => {
    const userId = Number(req.params.id)
    console.log(userId)
    const userIndex = users.findIndex(user => user.id === userId)
    if (userIndex == -1) {
        return res.status(404).json({ error: 'User not found' });
    }
     users.splice(userIndex, 1)
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        if (err) {
            console.error('Error writing to file', err);
            return res.status(500).json({ error: 'Failed to delete user' });
        }
    })
    res.json({message : " User deleted successfully" });
})


app.listen(port, (err, data) => {
    console.log("app is listening on the port :", port)
})