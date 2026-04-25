const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  rating: Number,
  comment: String,
  createdAt: { type: Date, default: Date.now }
});

const BookingRef = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  checkIn: Date,
  checkOut: Date,
  guests: Number,
  total: Number
});

const PropertySchema = new Schema({
  title: String,
  description: String,
  price: Number,
  location: String,
  image: String,
  maxGuests: Number,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  bookings: [BookingRef],
  reviews: [ReviewSchema],
  coords: {
    lat: Number,
    lng: Number
  }
}, { timestamps: true });

module.exports = mongoose.model('Property', PropertySchema);
