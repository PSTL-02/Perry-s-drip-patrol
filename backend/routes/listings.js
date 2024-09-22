const express = require('express')

const router = express.Router();

// Multer JS Initialization
const multer = require('multer')
const path = require('path')

// Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext)
    },
});

const upload = multer ({storage});

// Import Controllers
const {
    getListings,
    getListing,
    createListing,
    deleteListing,
    updateListing
} = require('../controllers/listingController');

// Get all Listings
router.get('/', getListings);

// Get a single List
router.get('/:id', getListing); 

// Upload Image
router.post('/', upload.single('listing_img'), createListing);

// Create Project
router.post('/', createListing);

// Delete Project
router.delete('/:id', deleteListing);

// Update Project
router.patch('/:id', updateListing);


module.exports = router;