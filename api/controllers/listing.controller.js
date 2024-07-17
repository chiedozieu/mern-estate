import ListingModel from "../models/listing.model.js";


export const createListing = async (req, res, next) => {
    try {
         const listing = await ListingModel.create(req.body)
         return res.status(201).json(listing)
    } catch (error) {
        next(error);
    }
};  