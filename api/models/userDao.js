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

	} catch(err) {
		await queryRunner.rollbackTransaction();
		throw err;
	} finally {
		await queryRunner.release();
	}
}

async function logIn(userEmail) {
  return await appDataSource.query(`
    SELECT * FROM users
    WHERE email = ?;
  `, [userEmail]);
}

async function getUserData(userId) {
  return await appDataSource.query(`
  	SELECT * from users
  	WHERE id = ${userId};
  `);
}

async function updateUserData(userPoint, totalCo2, userId) {
	return await appDataSource.query(`
  UPDATE users
    SET point = ${userPoint},
		co2 = ${totalCo2}
  WHERE id = ${userId}
	`)
}


module.exports = {
	userSignUpProcess,
  logIn,
  updateUserData,
	getUserData
}