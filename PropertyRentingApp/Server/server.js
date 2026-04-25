require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const authRoutes = require('./routes/auth')
const propertyRoutes = require('./routes/properties')
const reviewRoutes = require('./routes/review')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/properties', propertyRoutes)
app.use('/api/reviews', reviewRoutes)

const PORT = process.env.PORT || 5000
connectDB(process.env.MONGO_URI).then(()=>{
  app.listen(PORT, ()=> console.log('Server running on', PORT))
})