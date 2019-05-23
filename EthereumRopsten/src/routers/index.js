import express from 'express';
import server_config from '../../configs/server_config';
import VSTokenService from '../services/VSTokenService';
import VSEtherService from '../services/VSEtherService';

/** */
let router = express.Router();
let vsTokenService=new VSTokenService();
let vsEtherService=new VSEtherService();

/**get Balance */
router.post(server_config.api_url+"getbalance", async(req, res) => {
	try {
		let result=await vsTokenService.getBalance(req.body.address);

		res.json(result);
	} catch (error) {
		res.json({"Error :":error+""});
	}
	
});

/**
 * @addressFrom=msg.sender
 * @addressto
 * @value
*/
router.post(server_config.api_url+"transferTo",async(req,res)=>{
	try {
		let result= await vsTokenService.transferTo(req.body.addressto,req.body.value);
		res.json(result);
	} catch (error) {
		res.json({"Error :":error+""});
	}
});

/**
 * @addressFrom
 * @addressto
 * @value
*/
router.post(server_config.api_url+"transferFrom",async(req,res)=>{
	try {
		let result= await vsTokenService.transferFrom(req.body.addressfrom,req.body.privatekey,req.body.addressto,req.body.value);
		res.json(result);
	} catch (error) {
		res.json({"Error :":error+""});
	}
});

/**
 * createAccount
*/
router.get(server_config.api_url+"createAccount",async(req,res)=>{
	try {
		let result= await vsTokenService.createAccount();
		res.json(result);
	} catch (error) {
		res.json({"Error :":error+""});
	}
});

router.post(server_config.api_url+"transferEther",async(req,res)=>{
	try {
		let result= await vsEtherService.transferEther(req.body.addressfrom,req.body.privatekey,req.body.addressto,req.body.value);
		res.json(result);
	} catch (error) {
		res.json({"Error :":error+""});
	}
});
/**export */
module.exports = router;