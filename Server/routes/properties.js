const express = require("express");
const router = express.Router();
const Property = require("../models/Property");
const { verifyToken } = require("../middleware/auth");
const Booking = require("../models/Booking");

// Add a property
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, description, price, location, image } = req.body;
    const newProperty = new Property({
      title,
      description,
      price,
      location,
      image,
      owner: req.user.id,
    });
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', verifyToken, async (req, res) => {
  try {
    const property = await Property.find().sort({ createdAt: -1 });
    if(!property) return res.status(404).json({message: "Property not found"});
    res.json(property);
  }
  catch(err) {
    console.log(err)
    res.status(500).json({message: err.message});
  } 
})


router.get('/:id', verifyToken, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if(!property) return res.status(404).json({message: "Property not found"});
    res.json(property);
  }
  catch(err) {
    res.status(500).json({message: err.message});
  }
});

router.post('/:propertyId/book', verifyToken, async (req, res) => {
  try {
    console.log("Booking request received:", req.body);
    const { propertyId } = req.params;
    const { checkIn, checkOut, guests } = req.body;
    const property = await Property.findById(propertyId);
    if (!property) return res.status(404).json({ message: "Property not found" });
    const newBooking = new Booking({
      userId: req.user.id,
      propertyId,
      checkIn,
      checkOut,
      guests, 
    });
    await newBooking.save();

    await Property.findByIdAndUpdate(
      propertyId,
      { $push: { bookings: newBooking._id } },
      { new: true }
    );

    res.status(201).json({ message: "Booking successful", booking: newBooking });
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  } 
});

module.exports = router;
