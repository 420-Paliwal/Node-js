const express = require('express');
const app = express();
const port = 3000
const fs = require('fs')
const mongoose = require('mongoose');
const { timeStamp } = require('console');
// express.json()

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())


const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    job_title : {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
}, {
     timestamps: true
    })

mongoose.connect('mongodb://127.0.0.1:27017/youtube-app-1')
.then(() => console.log("MongoDb is Connected Successfully"))
.catch((err) => console.log("Error in MongoDB Connection : ", err))

const User = mongoose.model("user", userSchema)

app.get('/', (req, res) =>{
    res.send('hello world');
})

/* this is for browser which returns html  */
app.get('/users', async (req, res) => {
    const allDbUsers = await User.find({}) 
    const html = `<ul>
      ${allDbUsers.map(user =>`<li>${user.email} </li>`).join('')
      } 
      </ul>`;
      res.send(html); 
})
/* this is for mobile developer which returns json  */
app.get('/api/users', async (req, res) => {
    const allDbUsers = await User.find({});
    return res.send(allDbUsers)
})

app.get('/users/:id', async (req, res) => {
    const result = await User.findById(req.params.id)
    if (!result) {
        return res.status(404).json({ error: 'User not found' });
    }
    const html = `<h1>${result.first_name} ${result.last_name}</h1>
    <p>Email: ${result.email}</p>
    <p>Gender: ${result.gender}</p>
    <p>Job Title : ${result.job_title}</p>
    `;                             
    return res.send(html);    
})

app.get('/api/users/:id', (req, res) => {
    const result = User.findById(req.params.id)
    if (!result) {
        return res.status(404).json({
            message : "User Not Found"
        })
    }
    console.log(result)
    return res.status(200).json({
        message : "User Found"
    })  
})

app.post('/users', async (req, res) => {
    const body = req.body
    if (!body){
        !body || 
        !first_name ||
        !last_name ||
        !email ||
        !gender || 
        !job_title
        
    }   
    const result =  await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title,
    })
    return res.status(201).json({ message : "User Created Successfully ", user_Id : result})
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

app.patch('/users/:id', async(req, res) => {
    const userId = req.params.id
    const body = req.body
    await User.findByIdAndUpdate(userId, req.body).then(()=>{
        return res.status(201).send("User updated successfully");
    }).catch((err) => {
        console.error('Error updating user:', err);
        return res.status(500).json({ error: 'Failed to update user' });
    })
})

app.delete('/users/:id', async (req, res) => {
    const userId = req.params.id
     User.findByIdAndDelete(userId).then(() => {
         res.status(200).json({message : " User deleted successfully" });
     }).catch((err) => {    
            console.error('Error deleting user:', err);
            return res.status(500).json({ error: 'Failed to delete user' });
        })
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