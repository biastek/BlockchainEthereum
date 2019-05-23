import express from 'express';
import passport from "passport";
import moment from 'moment';

/** */
import FileUitility from '../utilities/FileUitility';
import ether_ropsten_api from '../../config/ether_ropsten_api.json';
import User from '../models/UserModel';
import Wallet from '../models/WalletModel';
import UserService from '../services/UserService';
import WalletService from '../services/WalletService';
import TokenService from '../services/tokenService';
import EtherService from '../services/etherService';

/** */
let LocalStrategy = require("passport-local").Strategy;
var userService = new UserService();
var walletService = new WalletService();
var tokenService=new TokenService();
var etherService=new EtherService();
var fileUitility = new FileUitility();
let router = express.Router();

/**public */
router.get("/", (req, res) => {
	res.render("public/index", { title: "Home" });
});

router.get("/users/register", (req, res) => {
	res.render("public/register", { title: "Register" });
});

router.post("/users/register", async (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	let cfm_password = req.body.cfm_password;
	let firstname = req.body.firstname;
	let lastname = req.body.lastname;
	let birthday = new Date();
	let address = req.body.address;
	let phone = req.body.phone;
	let enabled = 1;
	let registerdate = new Date();

	req.checkBody("username", "Username is required").notEmpty();
	req.checkBody("password", "Password is required").notEmpty();
	req.checkBody("cfm_password", "Conform Password is required").notEmpty();
	req.checkBody("firstname", "Firstname is required").notEmpty();
	req.checkBody("lastname", "Lastname is required").notEmpty();
	req.checkBody("address", "Address is required").notEmpty();
	req.checkBody("phone", "Phone is required").notEmpty();
	req.checkBody('cfm_password', 'Confirm Password Must Matches With Password').equals(password);

	let errors = req.validationErrors();
	if (errors) {
		res.render("public/register", { title: "Register", errors: errors });
	} else {
		let newUser = new User(username, password, firstname, lastname, birthday, address, phone, enabled, registerdate);
		try {
			let temp = await userService.insert(newUser);

			req.flash('success_message', 'You have registered, Now please login');
			res.redirect("/users/login");
		} catch (error) {
			req.flash('success_message', 'You have not register');
			res.redirect("/users/register");
		}
	}
});

router.get("/users/login", function (req, res) {
	res.render("public/login", { title: "Login User" });
});

/**private/user */
router.post("/users/login", passport.authenticate("local", {
	failureRedirect: "/users/login", failureFlash: true
}),
	function (req, res) {
		req.flash("success_message", "You are now Logged in!!");
		res.redirect("/private/dashboard");
	}
);

router.get("/users/logout", function (req, res) {
	req.logout();
	req.flash("success_message", "You are logged out");
	res.redirect("/users/login");
});

router.get("/private/dashboard", isLoggedIn, function (req, res) {
	res.render("dashboard/partials/dashboard");
});

router.get("/private/users/profile", isLoggedIn, (req, res) => {
	res.render("dashboard/users/profile", { title: "User Profile" });
});

router.get("/private/users/editProfile/:username", isLoggedIn, async (req, res) => {
	let theUser = await userService.getByID(req.params.username);
	res.render("dashboard/users/editProfile", { title: "Edit Profile", user: theUser });
});

router.post("/private/users/updateProfile", isLoggedIn, async (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	let cfm_password = req.body.cfm_password;
	let firstname = req.body.firstname;
	let lastname = req.body.lastname;
	let birthday = new Date();
	let address = req.body.address;
	let phone = req.body.phone;
	let enabled = 1;
	let registerdate = new Date();

	let newUser = new User(username, password, firstname, lastname, birthday, address, phone, enabled, registerdate);
	try {
		let temp = await userService.update(newUser);

		req.flash('success_message', 'You have changed successful');
		res.redirect("/private/users/profile");
	} catch (error) {
		req.flash('error_message', 'You have not changed fail');
		res.redirect("/private/users/profile");
	}
});

/**private/wallet */
router.get("/private/wallet/accountList", isLoggedIn, async (req, res) => {
	let account_list = await walletService.getByUser((req.session.user).username);

	for(let i=0;i<account_list.length;i++){
		let ether_account=await tokenService.getBalance(account_list[i].account_address);
		account_list[i].ether_balance=ether_account.ethBalance;
		account_list[i].token_balance=ether_account.tokenBalance;
	}

	res.render("dashboard/wallet/account_list", { title: "Account List", accounts: account_list,symbol:ether_ropsten_api.symbol });
});

router.post("/private/wallet/insertAccount", isLoggedIn, async (req, res) => {
	
		let address_name = req.body.account_name;		
		let created = new Date();		
		let creator = (req.session.user).username;		

		
		let createAccount=await tokenService.createAccount();
		let new_account = new Wallet(null, address_name, createAccount.AccountAddress, createAccount.PrivateKey, created, creator, 0, 0);
	
		try {
			let result = await walletService.insert(new_account);
			req.flash('success_message', 'You have created account successfull');
			res.redirect("/private/wallet/accountList");
		} catch (error) {
			req.flash('error_message', 'You have not changed fail');
			res.redirect("/private/wallet/accountList");
		}
	
});

router.get("/private/wallet/updateAccount/:accountID", isLoggedIn, async (req, res) => {
	try {
		let account = await walletService.getByID(req.params.accountID);
		res.render("dashboard/wallet/account_update", { title: "Update Account", account: account[0] });
	} catch (error) {
		req.flash('error_message', 'update fail');
		res.redirect("/private/wallet/accountList");
	}
});

router.post("/private/wallet/updateAccount/:accountID", isLoggedIn, async (req, res) => {
	
		let account_name = req.body.account_name;		

		let oldAccount = await walletService.getByID(req.params.accountID);		
		let new_account = new Wallet(oldAccount[0].id, account_name, oldAccount[0].account_address, oldAccount[0].private_key, oldAccount[0].created, oldAccount[0].creator, 0, 0);
		try {
			
			let result = await walletService.update(new_account);
			res.redirect("/private/wallet/accountList");
		} catch (error) {
			req.flash('error_message', 'You have not changed fail');
			res.redirect("/private/wallet/accountList");
		}

});

router.get("/private/wallet/deleteAccount/:accountID", isLoggedIn, async (req, res) => {
	try {
		let result = await walletService.delete(req.params.accountID);
		req.flash('success_message', 'You have deleted account successfull');
		res.redirect("/private/wallet/accountList");
	} catch (error) {
		req.flash('error_message', 'Delete fail');
		res.redirect("/private/wallet/accountList");
	}

});

router.get("/private/wallet/transfer/:accountID", isLoggedIn, async (req, res) => {
	try {
		let account = await walletService.getByID(req.params.accountID);
		res.render("dashboard/wallet/account_transfer", { title: "Transfer", account: account[0] });
	} catch (error) {
		req.flash('error_message', 'update fail');
		res.redirect("/private/wallet/accountList");
	}
});

router.post("/private/wallet/transfer/:accountID", isLoggedIn, async (req, res) => {
	
	let to_account_address = req.body.to_account_address;
	let amount = req.body.amount;		
	let type=req.body.type;

	let oldAccount = await walletService.getByID(req.params.accountID);		
	try {
		if(type=='eth'){
			let result=await etherService.transferEther(oldAccount[0].account_address,oldAccount[0].private_key,to_account_address,amount);
			req.flash('success_message', JSON.stringify(result));
			res.redirect("/private/wallet/accountList");
		}else{
			let result=await tokenService.transferFrom(oldAccount[0].account_address,oldAccount[0].private_key,to_account_address,amount);
			req.flash('success_message', JSON.stringify(result));
			res.redirect("/private/wallet/accountList");
		}	
		
	} catch (error) {
		req.flash('error_message', 'You have not transfer fail');
		res.redirect("/private/wallet/accountList");
	}

});

router.get("/private/wallet/faucet/:accountID", isLoggedIn, async (req, res) => {
	try {
		let account = await walletService.getByID(req.params.accountID);
		let faucet_account = await walletService.getByID(1);
		res.render("dashboard/wallet/account_faucet", { title: "Ropsten Test Faucet", account_to: account[0],faucet_account:faucet_account[0]});
	} catch (error) {
		req.flash('error_message', 'update fail');
		res.redirect("/private/wallet/accountList");
	}
});

router.post("/private/wallet/faucet/:accountID", isLoggedIn, async (req, res) => {
	
	let to_account_address = req.body.to_account_address;
	let amount = req.body.amount;		
	let type=req.body.type;

	let db_faucetAccount = await walletService.getByID(req.params.accountID);
	let ether_account=await tokenService.getBalance(db_faucetAccount[0].account_address);
	
	try {
		if(type=='eth' && Number(amount)<Number(ether_account.ethBalance)){
			let result=await etherService.transferEther(db_faucetAccount[0].account_address,db_faucetAccount[0].private_key,to_account_address,amount);
			req.flash('success_message', JSON.stringify(result));
			res.redirect("/private/wallet/accountList");
		}else if(type=='token' && Number(amount)<Number(ether_account.tokenBalance)){
			let result=await tokenService.transferFrom(db_faucetAccount[0].account_address,db_faucetAccount[0].private_key,to_account_address,amount);
			req.flash('success_message', JSON.stringify(result));
			res.redirect("/private/wallet/accountList");
		}else{
			req.flash('error_message', "the amount is too big!!!");
			res.redirect("/private/wallet/accountList");
		}	
		
	} catch (error) {
		req.flash('error_message', 'You have not transfer fail');
		res.redirect("/private/wallet/accountList");
	}

});



/**passportjs Auth */
passport.use(new LocalStrategy({
	usernameField: "email",
	passwordField: "password",
	passReqToCallback: true
},
	async function (req, email, password, done) {
		let user = await userService.getByID(email);
		if (!user) {
			return done(null, false, req.flash("error_message", "No email is found"));
		}
		userService.comparePassword(password, user.password, function (err, isMatch) {
			if (err) { return done(err); }
			if (isMatch) {
				req.session.user = user;
				return done(null, user, req.flash("success_message", "You have successfully logged in!!"));
			}
			else {
				return done(null, false, req.flash("error_message", "Incorrect Password"));
			}
		});

	}
));

passport.serializeUser(function (user, done) {
	done(null, user.username);
});

passport.deserializeUser(async function (id, done) {
	let user = await userService.getByID(id);
	if (!user) {
		done(new Error(), undefined);
	} else {
		done(undefined, user);
	}
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	}
	else {
		res.redirect("/users/login");
	}
}

/**export */
module.exports = router;