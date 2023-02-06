// Require express package 
const express = require ('express')

const {  
createApplication,
getApplications,
deleteApplication
} = require ('../controllers/applicationController')

// Create a new instance of the router
const router = express.Router(); 

// attach a route handler 

// GET all applications 
router.get('/', getApplications);

// POST an application 

router.post('/', createApplication)
router.post('/deleteApplication', deleteApplication);

module.exports = router;