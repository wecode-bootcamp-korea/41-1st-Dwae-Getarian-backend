const { appDataSource } = require("../database/database");

async function signUp(user, hashedPassword) {
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

async function logIn(userEmail) {
    const result = await appDataSource.query(
    `
    SELECT * FROM users
    WHERE email = ?;
    `, [userEmail]);
        
    return result;
}

async function callUserData(column, userId) {
    const columnData = await appDataSource.query(
    `
    SELECT ${column} from users
    WHERE id = ?;
    `, [ userId ]);

    return columnData;
}

async function updateUserData(userPoint, totalCo2, userId) {
	return await appDataSource.query(
    `
    UPDATE users
        SET point = ?,
				co2 = ?
    WHERE id = ?;
    `, [ userPoint, totalCo2, userId ]);
}


module.exports = {
    signUp,
    logIn,
    callUserData,
    updateUserData
}