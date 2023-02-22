const { admin } = require('../config/firebase.config');
const { Users } = require('../models/users');
const router = require('express').Router();

const newUserData = async (decodeValue, req, res) => {
	const newUser = new Users({
		name: decodeValue.name,
		email: decodeValue.email,
		image_url: decodeValue.picture,
		user_id: decodeValue.user_id,
		email_verified: decodeValue.email_verified,
		auth_time: decodeValue.auth_time,
	});
	try {
		const savedUser = await newUser.save();
		res.send({ msg: 'Successfully created new account', savedUser });
	} catch (error) {
		res.status(400).send({ success: false, msg: error });
	}
};
const updateUserData = async (decodeValue, req, res) => {
	const filter = { user_id: decodeValue.user_id };
	const options = {
		upsert: true,
		new: true,
	};

	try {
		const result = await Users.findOneAndUpdate(
			filter,
			{ auth_time: decodeValue.auth_time },
			options
		);
		res.send({ msg: 'Successfully updated user account', user:result });
	} catch (error) {
		res.status(400).send({ success: false, msg: error });
	}
};
router.post('/login', async (req, res) => {
	if (!req.headers.authorization) {
		return res.status(500).send({ message: 'Token Not found' });
	}
	const token = req.headers.authorization.split(' ')[1];
	try { 
		const decodeValue = await admin.auth().verifyIdToken(token);
		if (!decodeValue) {
			res.status(500).send({
				success: false,
				msg: 'Un-Authorized User',
			});
		}
		// Checking the user already exists or not
		const userExists = await Users.findOne({
			user_id: decodeValue.user_id,
		});
		if (!userExists) {
			newUserData(decodeValue, req, res);
		} else {
			updateUserData(decodeValue, req, res);
		}
	} catch (error) {
		res.status(500).send({ success: false, msg: error });
	}
});
module.exports = router;
