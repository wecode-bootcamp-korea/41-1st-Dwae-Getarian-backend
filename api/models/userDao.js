const { appDataSource } = require("../database/database");

async function userSignUpProcess(user, hashedPassword) {
	const queryRunner = appDataSource.createQueryRunner();
	await queryRunner.connect();
	await queryRunner.startTransaction();

	try {
		const result = await queryRunner.query(`
			INSERT INTO users (
				name,
				email,
				password,
				gender_id,
				date_of_birth)
			VALUES (?, ?, ?, ?, ?);`
			, [ 
					user.name, 
					user.email, 
					hashedPassword, 
					user["gender_id"], 
					user["date_of_birth"]
			]);
		
		const userId = result.insertId;

		await queryRunner.query(`
		INSERT INTO users_address (
			address,
			postcode,
			phone_number,
			user_id)
		VALUES (?, ?, ?, ${userId})
		`, [ 
			user.address, 
			user.postcode, 
			user["phone_number"], 
		]);
		await queryRunner.commitTransaction();
	} catch(err) {
		await queryRunner.rollbackTransaction();
		throw err;
	} finally {
		await queryRunner.release();
	}
}

async function logIn(userEmail) {
	try {
		return await appDataSource.query(`
    SELECT * FROM users
    WHERE email = ?;
  `, [userEmail]);
	} catch(err) {
		throw err;
	}
}

async function getUserData(userId) {
	try {
		return await appDataSource.query(`
  	SELECT * from users
  	WHERE id = ${userId};
  `);
	} catch(err) {
		throw err;
	}
}

async function updateUserDataQuery(userId, userPoint, totalCo2) {
	return`
	UPDATE users
		SET point = ${userPoint},
		co2 = ${totalCo2}
	WHERE id = ${userId}
	`;
}

async function updateUserData(userPoint, totalCo2, userId) {
	try {
		return await appDataSource.query(`
		UPDATE users
			SET point = ${userPoint},
			co2 = ${totalCo2}
		WHERE id = ${userId}
		`)
	} catch(err) {
		throw err;
	}
}


module.exports = {
	userSignUpProcess,
  logIn,
  updateUserData,
	updateUserDataQuery,
	getUserData,
}