function createUser(){
    
}

function deleteUser(){

}

function updateUser(){

}

function getUsers(req, res){
    res.send('This is all the users')
}

function getUserByID(req, res){
    res.send('This is a single user')
}

module.exports = {
    createUser,
    deleteUser,
    updateUser,
    getUsers,
    getUserByID
}