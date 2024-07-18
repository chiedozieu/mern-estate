import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    }, 
   description: {
        type: String,
        required: true,    
    },
    address: {
        type: String,
        required: true,  
    },
    regularPrice: {
        type: Number,
        required: true,  
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
    buildingType: {
        type: String, 
        required: true,  
    },
    type: {
        type: String,
        required: true,  
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