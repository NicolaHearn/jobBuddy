// Require express package 
const express = require ('express')

const {  
getApplications, 
getOneApplication,
createApplication,
} = require ('../controllers/applicationController')

// Create a new instance of the router
const router = express.Router(); 

// attach a route handler 

// GET all applications 
router.get('/', getApplications);

// GET a single application
router.get('/:id', getOneApplication)

// POST an application 

router.post('/', createApplication)

module.exports = router;