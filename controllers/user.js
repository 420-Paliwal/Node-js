const User = require('../models/user')

async function handleGetAllUsers(req, res) {
       const allDbUsers = await User.find({}) 
        res.status(200).json(allDbUsers);
    }
    
    async function getUserById(req, res) {
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
}

async function createUser(req, res) {
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
}

async function updateUser(req, res){
    const userId = req.params.id
    const body = req.body
    console.log(body)
    await User.findByIdAndUpdate(userId, req.body).then(()=>{
        return res.status(201).send("User updated successfully");
    }).catch((err) => {
        console.error('Error updating user:', err);
        return res.status(500).json({ error: 'Failed to update user' });
    })
}

async function deleteUser (req, res){
    const userId = req.params.id
     User.findByIdAndDelete(userId).then(() => {
         res.status(200).json({message : " User deleted successfully" });
     }).catch((err) => {    
            console.error('Error deleting user:', err);
            return res.status(500).json({ error: 'Failed to delete user' });
        })
}

module.exports = {
    handleGetAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}