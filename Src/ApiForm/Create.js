
const express = require('express');
const router = express.Router();
var config = require('./Connection/connection')

var sql = require("mssql");
const { response } = require('express');



async function getAllUsers(x) {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("Select * from DONATIONDTL ");
        return products.recordsets;
    } catch (error) {
        console.log(error);
    }
}

// register user

async function regUser(req, res) {
    let pool = await sql.connect(config);
    const request = pool.request();
    let productsEmail = await pool.request().query(`Select * from Entry where EMail='${req.body.EMail}'`);
    let productsUserName = await pool.request().query(`Select * from Entry where username='${req.body.username}'`);
    const dataUsername = productsUserName.rowsAffected;
    const dataEmail = productsEmail.rowsAffected;
    // console.log(data);
    // console.log(datalength);
    let date_ob = new Date();

    if (req.body.EMail && req.body.mpwd && req.body.username && req.body.Memb_Name && req.body.Mobile_No) {
        if (dataUsername == 0) {
            if (dataEmail == 0) {

                // request.input("username", sql.NVarChar, req.body.username)
                request.input("Mobile_No", sql.NVarChar, req.body.Mobile_No)
                    .input("EMail", sql.NVarChar, req.body.EMail)
                    .input("Memb_Name", sql.NVarChar, req.body.Memb_Name)
                    .input("mpwd", sql.NVarChar, req.body.mpwd)
                    .input("username", sql.NVarChar, req.body.username)
                    .input("SPON_CODE", sql.Int, req.body.SPON_CODE)
                    .input("Reg_Date", sql.DateTime, date_ob);

                    const q = "insert into Entry(SPON_CODE , PLAC_CODE , PLACE , REG_DATE , REG_TIME	 , MEMBNAME_F , MEMBNAME_M , MEMBNAME_L ,Gender, MEMB_NAME ,  MOBILE_NO , PHONE_NO , EMAIL , ADDRESS1 , ADDRESS2 , M_COUNTRY , STATE , DISTRICT , CITY , PIN_CODE , REG_AMT , USERNAME , MPWD , RV_CODE , PIN_ID , PIN_NO , AUTHRISED , AUTH_DATE , M_STATUS , MPOSITION , FLAG , TEMPF , REMARK , CLIENT_IP , LAST_LOG_IN , AGE) values(@SPON_CODE, null,' L', @Reg_Date ,  @Reg_Date ,@Memb_Name , '' , '',' ',@Memb_Name , @Mobile_No ,'', @EMail ,'','','','','','',1,0, @username , @mpwd , null,null,null,'','','','','','','','','', null)"
                // const q = "insert into Entry(Mobile_No , EMail , username , mpwd , Memb_Name , Reg_Date ,  Spon_Code , Plac_Code , Place) values(@Mobile_No , @EMail , @username , @mpwd , @Memb_Name , @Reg_Date ,' ', ' ' , 'L' )"
                const result = await request.query(q)
                let products = await pool.request().query("select *from entry where memb_code=(SELECT  Max(Memb_Code) from Entry)");
                return products.recordsets;
               
            }
            else {
                var message = {
                    "Code": "401",
                    "Message": "Email Already Exists",
                    "ActionDescription": "Invalid Details Please Contact Support"
                }
                return message;
            }

        }
        else {
            var message = {
                "Code": "401",
                "Message": "Username Already Exists",
                "ActionDescription": "Invalid Details Please Contact Support"
            }
            return message;
        }
    }
    else {
        var message = {
            "Code": "401",
            "Message": "required all feild",
            "ActionDescription": "Invalid Details Please Contact Support"
        }
        return message;
    }

}

//login user

async function loginUser(req, res) {
    let pool = await sql.connect(config);
    const request = pool.request();
    let products = await pool.request().query(`Select * from Entry where EMail='${req.body.EMail}' and mpwd='${req.body.mpwd}'`);
    // Select * From Entry where Email ='support@tron10club' and username='tron10club'
    const datalength = products.rowsAffected;
    // console.log(data);
    console.log(datalength);
    if (datalength > 0) {

        return products.recordsets;
    }
    else {
        var message = {
            "Code": "401",
            "Message": "invalid details",
            "ActionDescription": "Invalid Details Please Contact Support"
        }
        return message;
    }

}

// sponser id name

async function sponserName(req, res) {
    let pool = await sql.connect(config);
    const request = pool.request();
    let productsUserName = await pool.request().query(`Select * From Entry where Spon_Code='${req.body.Spon_Code}'`);
    // Select * From Entry where Email ='support@tron10club' and username='tron10club'
    const datalength = productsUserName.rowsAffected;
    // console.log(productsUserName);
    // console.log(datalength);
    if (datalength > 0) {

        return productsUserName.recordsets;
    }
    else {
        var message = {
            "Code": "401",
            "Message": "invalid sponser id",
            "ActionDescription": "Invalid Details Please Contact Support"
        }
        return message;
    }

}


//Change Password

async function changePassword(req, res) {
    let pool = await sql.connect(config);
    const request = pool.request();
    let productsEmail = await pool.request().query(`Select * from Entry where EMail='${req.body.EMail}'`);
    const dataEmail = productsEmail.rowsAffected;
    const oldpass = productsEmail.recordsets[0][0].mpwd;
    // console.log(productsEmail.recordsets[0][0].mpwd);
    if (req.body.EMail && req.body.mpwd && req.body.cmpwd) {
        if (oldpass != req.body.mpwd) {
            var message = {
                "Code": "401",
                "Message": "invalid password",
                "ActionDescription": "Invalid Details Please Contact Support"
            }
            return message;
        }
        else {



            // request.input("username", sql.NVarChar, req.body.username)
            request.input("EMail", sql.NVarChar, req.body.EMail)
                .input("mpwd", sql.NVarChar, req.body.mpwd)
                .input("cmpwd", sql.NVarChar, req.body.mpwd)
            const q = `update Entry set mpwd='${req.body.cmpwd}' where EMail='${req.body.EMail}'`
            const result = await request.query(q)
            // let products = await pool.request().query("select *from entry where memb_code=(SELECT  Max(Memb_Code) from Entry)");
            // return result.recordsets;
            var message = {
                "Code": "200",
                "Message": "Change Password Successfully",
                // "ActionDescription": "Invalid Details Please Contact Support"
            }
            return message;

        }
    }

    else {
        var message = {
            "Code": "401",
            "Message": "required all feild",
            "ActionDescription": "Invalid Details Please Contact Support"
        }
        return message;
    }
}


// edit profile


async function editProfile(req, res) {
    let pool = await sql.connect(config);
    const request = pool.request();
    let productsEmail = await pool.request().query(`Select * from Entry where username='${req.body.username}'`);
    const dataEmail = productsEmail.rowsAffected;
    console.log(dataEmail)
    if (dataEmail > 0) {
        request.input("EMail", sql.NVarChar, req.body.EMail)
            .input("Memb_Name", sql.NVarChar, req.body.Memb_Name)
            .input("Mobile_No", sql.NVarChar, req.body.Mobile_No)
        const q = `update Entry set Memb_Name='${req.body.Memb_Name}',EMail='${req.body.EMail}', Mobile_No='${req.body.Mobile_No}' where username='${req.body.username}'`
        const result = await request.query(q)

        var message = {
            "Code": "200",
            "Message": "Update Profile Successfully",
            // "ActionDescription": "Invalid Details Please Contact Support"
        }
        return message;
    }
    else {
        var message = {
            "Code": "401",
            "Message": "invalid sponser id",
            "ActionDescription": "Invalid Details Please Contact Support"
        }
        return message;
    }
}



module.exports =
{
    getAllUsers: getAllUsers,
    regUser: regUser,
    loginUser: loginUser,
    sponserName: sponserName,
    changePassword: changePassword,
    editProfile: editProfile
}