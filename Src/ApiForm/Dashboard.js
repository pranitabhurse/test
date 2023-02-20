
const express = require('express');
const router = express.Router();
var config = require('./Connection/connection')
// const TronWeb = require('tronweb');
var sql = require("mssql");


async function ReggisterNew(req , res) {
    try {

        if (req.body["amount"] ) {
            let pool = await sql.connect(config);
            const request = pool.request();
            let transaction = await pool.request().query(`Exec SP_INVESTMENT ${req.body["memb_code"]} , ${req.body["amount"]}, ${req.body["from_Id"]}, ${req.body["trans_id"]}`);
            let products = await pool.request().query("select *from DONATIONDTL where SRNO=(SELECT  Max(SRNO) from DONATIONDTL)");
            return products.recordsets;
            // return transaction.recordsets;
        } else {
            var message = {
                "Code": "400",
                "Message": "Mismatch mandatory field: Amount",
                "ActionDescription": "Technical error / Invalid message. Contact Support"
            }
            return message;
        }
    } catch (error) {
        console.log(error);
    }
}





module.exports =
{
    // investment:investment,
    ReggisterNew: ReggisterNew
}