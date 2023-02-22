const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
	name: {
		type: String,
		require: true,
	},
	email: {
		type: String,
	},
	image_url: {
		type: String,
		require: true,
	},
	user_id: {
		type: String,
		require: true,
	},
	email_verified: {
		type: Boolean,
		require: true,
	},
	auth_time: {
		type: String,
		require: true,
	},
}, {
	timestamps:true
});
const Users = mongoose.model('users', userSchema);
module.exports={Users}