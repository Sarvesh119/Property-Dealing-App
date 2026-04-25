const Property = require('../models/Property');

exports.list = async (req, res) => {
  const props = await Property.find().populate('owner', 'name email');
  res.json(props);
};

exports.get = async (req, res) => {
  const p = await Property.findById(req.params.id).populate('owner', 'name');
  if (!p) return res.status(404).json({ message: 'Not found' });
  res.json(p);
};

exports.create = async (req, res) => {
  const data = req.body;
  data.owner = req.user._id;
  const p = await Property.create(data);
  res.json(p);
};

exports.addBooking = async (req, res) => {
  const { propertyId } = req.params;
  const { checkIn, checkOut, guests, total } = req.body;
  const property = await Property.findById(propertyId);
  if (!property) return res.status(404).json({ message: 'Not found' });
  property.bookings.push({ user: req.user._id, checkIn, checkOut, guests, total });
  await property.save();
  res.json({ message: 'Booking confirmed' });
};

exports.addReview = async (req, res) => {
  const { propertyId } = req.params;
  const { rating, comment } = req.body;
  const property = await Property.findById(propertyId);
  if (!property) return res.status(404).json({ message: 'Not found' });
  property.reviews.push({ user: req.user._id, rating, comment });
  await property.save();
  res.json({ message: 'Review added' });
};
