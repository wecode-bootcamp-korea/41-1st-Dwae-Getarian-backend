const appDataSource = require("../database/database");

class UserDatabase {
    async signUp(user, hashedPassword) {
        const result = await appDataSource.query(
        `
        INSERT INTO users (
            name,
            email,
            password,
            gender,
            date_of_birth)
        VALUES (?, ?, ?, ?, ?)
        `, [ 
            user.name, 
            user.email, 
            hashedPassword, 
            user.gender, 
            user[date_of_birth] 
        ]);
    
        return result
    }

    async logIn(userEmail) {
        const result = await appDataSource.query(
        `
        SELECT * 
        FROM users
        WHERE email = ?
        `, [userEmail]);
            
        return result;
    }
}


module.exports = UserDatabase;