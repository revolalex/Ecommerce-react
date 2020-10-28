class sqlRequestUsers {
 static addUser = "INSERT INTO users (firstName,lastName,url,email,password) VALUES (?)"
 static getUserInfo = "SELECT name, id FROM users"
 static getUsersInfo = "SELECT id,firstName,lastName,url,email FROM users";
 static mailUser = "SELECT * FROM users WHERE email = ?";
 static getUserInfoData(id){
    return `SELECT * FROM users where id = ${id};`
 } 
}
module.exports = sqlRequestUsers;
