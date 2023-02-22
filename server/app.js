const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()
require('dotenv').config()
const cors = require('cors')

app.use(cors({ origin: true }))
app.use(express.json())
// Database
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URI, () => {
	console.log('Db connected successfully')
})
app.get('/', (req, res) => {
	res.send('Hi, firebase authentication')
})
// user authentication route
const userRoute = require('./routes/user')
app.use('/api/users', userRoute)
app.listen(4000, () => console.log('listening to port 4000'))
 