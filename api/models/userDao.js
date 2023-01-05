const { appDataSource } = require("../database/database");

async function signUp(user, hashedPassword) {
    const requestResult = await appDataSource.query(
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

    return requestResult
}

async function upsertUserAddress(userId, user) {
	const requestResult = await appDataSource.query(
		`
			INSERT INTO users_address ( 
				address,
				postcode,
				phone_number,
				user_id )
			VALUES (?, ?, ?, ?)
		`, [ user.address, user.postcode, user["phone_number"], userId ]);

	return requestResult;
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
		upsertUserAddress,
    logIn,
    callUserData,
    updateUserData
}