const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
  property: { type: Schema.Types.ObjectId, ref: 'Property' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, min: 1, max: 5 },
  comment: String
}, { timestamps: true })

module.exports = mongoose.model('Review', ReviewSchema)
