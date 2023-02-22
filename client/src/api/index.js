import axios from 'axios'
const baseUrl = 'http://localhost:4000/'
export const validateUser = async(token)=> {
	const res = await axios.post(`${baseUrl}api/users/login`,{}, {
		headers: {
			authorization:"Bearer "+token
		}
	})
	// const res = await axios.get(`${baseUrl}api/users/login`, {
	// 	headers: {
	// 		authorization:"Bearer "+token
	// 	}
	// })
		console.log('🚀 ~ file: index.js:6 ~ validateUser ~ res:', res);

	return res.data
}