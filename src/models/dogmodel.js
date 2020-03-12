import mongoose from 'mongoose'

// Setup of dogmodel 
const Dog = mongoose.model('Dog', {
  // Properties defined here match the keys from the json file
  race: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DogRace',
    required: true
  },
  name: {
    type: String,
  },
  age: {
    type: Number
  },
  birthdate: {
    type: Date
  },
  images: {
    url: {
      type: String,
      default: "no-dog.jpg"
    },
  },
  price: {
    type: Number
  },
  sex: {
    type: String,
    enum: ["Male", "Female"]
  },
  description: {
    type: String
  },
  location: {
    type: String
  },
  addedAt: {
    type: String,
    default: new Date()
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  phone: {
    type: String,
  },
})

module.exports = Dog

