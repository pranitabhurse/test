const dbopertation = require('./Create');
const dashbboardApi = require('./Dashboard')
const DB = require('./Connection/connection')
var express = require('express');
var app = express();
var router = express.Router();






router.route('/AllUsers').get((request, response) => {

    dbopertation.getAllUsers(request).then(result => {
        //console.log(result);
        response.json(result);
    })

})



router.route('/saveuser').post(async(request, response) => {

    
    dbopertation.regUser(request).then(result => {
        // console.log(result);
        response.json(result);
        // response.json({msg :"save data sucessfully"})
    })
 
})


router.route('/loginuser').post(async(request, response) => {

    
    dbopertation.loginUser(request).then(result => {
        // console.log(result);
        response.json(result);
        // response.json({msg :"save data sucessfully"})
    })
 
})
 


router.route('/sponserName').post(async(request, response) => {

    
    dbopertation.sponserName(request).then(result => {
        // console.log(result);
        response.json(result);
        // response.json({msg :"save data sucessfully"})
    })
 
})

// change passsword

router.route('/changepassword').put(async(request, response) => {

    
    dbopertation.changePassword(request).then(result => {
      
        response.json(result);
        
    })
 
})


router.route('/editprofile').put(async(request, response) => {

    
    dbopertation.editProfile(request).then(result => {
      
        response.json(result);
        
    })
 
})

//investment 
router.route('/investment').get(async(request, response) => {

    
    dashbboardApi.investment(request).then(result => {
      
        response.json(result);
        
    })
 
})




router.route('/NewUser').post((request, response) => {
    if (request.headers["content-type"] === 'application/json') {
        dashbboardApi.ReggisterNew(request).then(result => {
            //console.log(result);
            response.json(result);
        })
    } else {
        var message = {
            "Code": "400",
            "Message": "Mismatch mandatory field: content-type",
            "ActionDescription": "Technical error / Invalid message. Contact Support"
        }
        response.json(message);
    }
})



module.exports = router;