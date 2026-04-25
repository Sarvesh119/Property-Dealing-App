const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Property = require("../models/Property");
const { verifyToken } = require("../middleware/auth");

// ✅ Create a new booking
router.post("/", verifyToken, async (req, res) => {
  try {
    const { propertyId, checkIn, checkOut, guests } = req.body;

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
    res.status(201).json({ message: "Booking successful", booking: newBooking });
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Get all bookings for logged-in user
router.get("/my", verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate("propertyId")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Cancel a booking
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await booking.deleteOne();
    res.json({ message: "Booking canceled successfully" });
  } catch (err) {
    console.error("Error canceling booking:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all bookings (Admin only)
router.get("/", verifyToken, async (req, res) => {
  try {
    // Optional: check admin privileges
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Access denied" });

    const bookings = await Booking.find().populate("propertyId userId");
    res.json(bookings);
  } catch (err) {
    console.error("Error fetching all bookings:", err);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
