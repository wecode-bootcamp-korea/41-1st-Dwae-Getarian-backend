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
        VALUES (?, ?, ?, ?, ?);
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
        WHERE email = ?;
        `, [userEmail]);
            
        return result;
    }

    // SQL injection 공격 생각 서드파티 패키지 설치
    static async callUserData(column, userId) {
        const columnData = await appDataSource.query(
        `
        SELECT ${column} from users
        WHERE id = ?;
        `, [ userId ]);

        return columnData;
    }

    static async updateUserData(userPoint, userId) {
        await appDataSource.query(
        `
        UPDATE users
            SET point = ?
        WHERE id = ?;
        `, [ userPoint, userId ]);
    }
}


module.exports = UserDatabase;