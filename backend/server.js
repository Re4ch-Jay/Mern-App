require('dotenv').config()
const express = require('express')
const app = express();
const morgan = require('morgan')
const wortkoutRoutes = require('./routes/workoutRoutes')
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB)
    .then(res => app.listen(process.env.PORT, () => 
        console.log("Connected to db and port " + process.env.PORT)))
    .catch(err => console.log(err))


app.use(morgan('dev'))
app.use(express.json())

app.use('/api/workouts', wortkoutRoutes)


