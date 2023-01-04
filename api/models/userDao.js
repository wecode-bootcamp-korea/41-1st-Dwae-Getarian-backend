const { appDataSource } = require("../database/database");

async function signUp(user, hashedPassword) {
    const result = await appDataSource.query(
    `
    INSERT INTO users (
        name,
        email,
        password,
        gender_id,
        date_of_birth)
    VALUES (?, ?, ?, ?, ?);
    `, [ 
        user.name, 
        user.email, 
        hashedPassword, 
        user["gender_id"], 
        user["date_of_birth"] 
    ]);

    return result
}

async function logIn(userEmail) {
    const result = await appDataSource.query(
    `
    SELECT * FROM users
    WHERE email = ?;
    `, [userEmail]);
        
    return result;
}

// SQL injection 공격 생각 서드파티 패키지 설치
async function callUserData(column, userId) {
    const columnData = await appDataSource.query(
    `
    SELECT ${column} from users
    WHERE id = ?;
    `, [ userId ]);

    return columnData;
}

async function updateUserData(userPoint, userId) {
    await appDataSource.query(
    `
    UPDATE users
        SET point = ?
    WHERE id = ?;
    `, [ userPoint, userId ]);
}


module.exports = {
    signUp,
    logIn,
    callUserData,
    updateUserData
}