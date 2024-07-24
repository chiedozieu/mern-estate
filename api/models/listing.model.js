import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
   description: {
        type: String,
        required: true,    
    },
    address: {
        type: String,
        required: true,  
    },
    stateCategory: {
        type: String,
        required: true,
    },
    negotiable: {
        type: Boolean,
          
    },
    discountPrice: {
        type: Number,
        required: true,   
    },
    bathrooms: {
        type: Number,
          
    },
    bedrooms: {
        type: Number,
          
    },
    serviced: {
        type: Boolean,
          
    },
    
    type: {
        type: String,
          
    },
    agreementType: {
        type: String,
          
    },
    imageUrls: {
        type: Array,
        required: true,  
    },
    userRef: {
        type: String,
        required: true,  
    },

   
}, {timestamps: true});

const ListingModel = mongoose.model('Listing', listingSchema)

export default ListingModel;