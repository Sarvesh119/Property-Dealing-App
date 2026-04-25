const Review = require("../models/Review");

const createReviews = async (req, res) => {
    try {
        console.log("Hello")
        const {rating} = req.body;
        if(!rating) return res.status(400).json({message: "Review number is required"});
        // Further processing logic here
        const newReview = new Review({
            property: req.params.propertyId,
            user: req.user.id, 
            rating: rating, // Example static rating
            comment: `This is review number ${rating}`
        });
        await newReview.save();
        res.status(200).json({message: "Reviews created successfully"})
    } 
    catch (error) {
        
    }
}

module.exports = { createReviews };