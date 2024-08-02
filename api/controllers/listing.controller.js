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

// export const getListings= async (req, res, next) => {
//     try {
        
//          const startIndex = parseInt(req.query.startIndex) || 0;

//          let serviced = req.query.serviced
//          if(serviced === undefined || serviced === 'false'){
//             serviced = { $in: [false, true] };
//          }

//          let negotiable = req.query.negotiable
//          if(negotiable === undefined || negotiable === 'false'){
//             negotiable = { $in: [false, true] };
//          }

//          let type = req.query.type
//          if(type === undefined || type === 'all'){
//             type = { $in: ['land', 'building'] };
//          }

//          let agreementType = req.query.agreementType
//          if(agreementType === undefined || agreementType === 'all'){
//             agreementType = { $in: ['rent', 'sale'] };
//          }

//          const searchTerm = req.query.searchTerm || '';
//          const stateCategory = req.query.stateCategory || '';

//          const sort = req.query.sort || 'createdAt';

//          const order = req.query.order || 'desc';

//          const listing = await ListingModel.find({

//             '$or' : [
//             {
//             name: { $regex: searchTerm, $options: 'i'},
//         },
       
//         ],
//         serviced,
//         type,
//         negotiable,
//         agreementType, 
//         stateCategory,
//          }).sort(
//             {[sort]: order}
//         ).skip(startIndex)
         
//         return res.status(200).json(listing)
 

//     } catch (error) {
//      next(error);   
//     }
// };


export const getListings = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;

        let serviced = req.query.serviced;
        if (serviced === undefined || serviced === 'false') {
            serviced = { $in: [false, true] };
        }

        let negotiable = req.query.negotiable;
        if (negotiable === undefined || negotiable === 'false') {
            negotiable = { $in: [false, true] };
        }

        let type = req.query.type;
        if (type === undefined || type === 'all') {
            type = { $in: ['land', 'building'] };
        }

        let agreementType = req.query.agreementType;
        if (agreementType === undefined || agreementType === 'all') {
            agreementType = { $in: ['rent', 'sale'] };
        }

        const searchTerm = req.query.searchTerm || '';
        const stateCategory = req.query.stateCategory || '';

        const sort = req.query.sort || 'createdAt';
        const order = req.query.order || 'desc';

        const query = {
            '$or': [
                {
                    name: { $regex: searchTerm, $options: 'i' },
                },
            ],
            serviced,
            type,
            negotiable,
            agreementType,
        };

        // Only add stateCategory to the query if it's not an empty string
        if (stateCategory) {
            query.stateCategory = stateCategory;
        }

        const listing = await ListingModel.find(query)
            .sort({ [sort]: order })
            .skip(startIndex);

        return res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
};
