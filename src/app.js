import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose, { Query } from 'mongoose'
import createError from 'http-errors'
import fileUpload from 'express-fileUpload'
import ResetDB from './resetdb'
// // Models
// import User from './models/usermodel'
// import Dog from './models/dogmodel'
// import Breed from './models/breedmodel'

// // JSON data
// import dogData from './data/dogs.json'
// import breedData from './data/breeds.json'
// import userData from './data/users.json'

// Routes
import userRoutes from './routes/userRoutes'
import dogRoutes from './routes/dogRoutes'
import breedRoutes from './routes/breedRoutes'

const app = express()

console.log(`\nRESET_DB: ${process.env.RESET_DB} \n`)

if (process.env.RESET_DB) {
  ResetDB()
}



// MIDDLEWARES to enable cors and json body parsing
app.use(cors())
app.use(fileUpload())
app.use(bodyParser.json())
app.use(express.static('public'))

// Routes
app.use('/user', userRoutes)
app.use('/dog', dogRoutes)
app.use('/breed', breedRoutes)


app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next()
  } else {
    res.status(503).json({ error: 'Service unavailabale' })
  }
})



// ------------------ FILE UPLOAD ------------------------- //
app.post('/upload', async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' })
  }

  const file = req.files.file

  file.mv(`${__dirname}/../public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err)
      return res.status(500).send(err)
    }
  })
  res.json({ fileName: file.name, filePath: `/uploads/${file.name}` })
})






// ------------------ ERROR HANDLING ROUTES ------------------------- //
app.use((req, res) => {
  res.status(404).json({ error: `route ${req.originalUrl} doesn't exist` })
})
app.use((err, res) => {
  const status = err.status || 500
  res.status(status).json({ error: err.message })
})

module.exports = app