import ListingModel from "../models/listing.model.js";
import { errorHandler } from "../utils/errorHandler.js";


export const createListing = async (req, res, next) => {
   
    try {
         const listing = await ListingModel.create(req.body)
         return res.status(201).json(listing)
    } catch (error) {
        next(error);
    }
}; 



export const deleteListing = async (req, res, next) => {
    
    const listing = await ListingModel.findById(req.params.id)
    if (!listing) {
        return next(new errorHandler(404, 'Listing not Found'));
    }
    if(req.user.id !== listing.userRef){
        return next(new errorHandler(401, 'You do not have permission to delete this listing'));
    }

    try {
         await ListingModel.findByIdAndDelete(req.params.id)
         res.status(200).json('Listing has been deleted');
    } catch (error) {
        next(error);
    }
}; 


 
export const updateListing = async (req, res, next) => {
    const listing = await ListingModel.findById(req.params.id)
    if(!listing) {
        return next(errorHandler(404, "listing not found"))
    }
    if(req.user.id !== listing.userRef){
        return next(new errorHandler(401, 'You do not have permission to update this listing'));
    }

   try {

    const updatedListing = await ListingModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true}
    )
    res.status(200).json(updatedListing)
    
   } catch (error) {
    next(error); 
   }
};  
 

export const getListing = async (req, res, next) => {
    try {
        const listing = await ListingModel.findById(req.params.id);
         if(!listing) {
             return next(errorHandler(404, 'Listing not found'));
         }
         res.status(200).json(listing);
    } catch (error) {
     next(error);   
    }
};
