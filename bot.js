const puppeteer = require('puppeteer-extra');
const pluginStealth = require("puppeteer-extra-plugin-stealth");
const fs = require('fs');
const { installMouseHelper } = require('./extras/install_mouse_helper');
puppeteer.use(pluginStealth())

// Debugging stuff
const html_path = 'htmls/bot_';
const screenshot_path = 'screenshots/bot_';
const SimpleNodeLogger = require('simple-node-logger'),
	opts = {
		logFilePath: 'logs/' + 'bot.log',
		timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
	};
let html = '';

// ################################
// #### Parameters to set #########
// ################################


// user/pass: the email/username for your emp-shop.pl account
const user = '';
const pass = '';

// cv_code: 3-digit credit card validation card number and phone are required
const cc_number = '5359580477346156';
const cv_code = '123';
const month = '2';
const year = '2022';
const phone = '123456789';

// url of requested page to serach through && keyword
const keyword = 't-51';
const url = 'https://www.emp-shop.pl/fun-i-styl/dla-domu/funko-pop/funko-edycje-limitowane/?srule=release-date&start=0&sz=10';

// debug: Use debug/logging features?
// Includes writing updates to log file, writing html snapshots, and taking screenshots
const debug = false;

// this WILL casue you to buy item, so use with *patient* mate
const buy = false;

// ################################
// ########## main flow ###########
// ################################

(async () => {

	const browser = await puppeteer.launch({
		ignoreHTTPSErrors: true,
		headless: false
	});

	const page = await browser.newPage();

	if (debug == true) {
		await installMouseHelper(page); // Makes mouse visible

		var dir = './htmls';
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}
		dir = './screenshots';
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}
		dir = './logs';
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}

		log = SimpleNodeLogger.createSimpleFileLogger(opts);
		log.setLevel('info');

	}

	await page.goto(url);
	page.waitForNavigation({ waitUntil: 'networkidle0' }); // Wait for page to finish loading

	// ################################
	// ########### ROUND 1 ############
	// ################################
	// Load the page & Get the link though the set keyword

	if (debug == true) {
		log.info('1. Page loaded');
		html = await page.content();
		fs.writeFileSync(html_path + "_1_loaded_" + Math.floor(new Date() / 1000) + ".html", html);
		page.screenshot({ path: screenshot_path + "_1_loaded_" + Math.floor(new Date() / 1000) + '.png' });
	}

	// search through container of items to get the url's
	const links = await page.$$eval('#search-result-items > div > div > a', links => links.map(a => a.href));
	// filter array of url's by keyword
	const link = links.filter(l => l.includes(keyword))
	console.log(link, 'one particular link');


	if (link) {
		await page.goto(link.toString());
	} else {
		throw new Error('no links found')
	}

	await page.waitFor(10);

	// ################################
	// ########### ROUND 2 ############
	// ################################
	// Add item to cart

	await page.waitForSelector('.add-to-cart');
	await page.evaluate(async () =>
		await document.querySelectorAll(".add-to-cart")[0].click()
	);

	// #### LOG / DEBUG
	if (debug == true) {
		log.info('2. Selectors appeared');
		html = await page.content();
		fs.writeFileSync(html_path + "_2_selectors_" + Math.floor(new Date() / 1000) + ".html", html);
		page.screenshot({ path: screenshot_path + "_2_selectors_" + Math.floor(new Date() / 1000) + '.png' });
	}
	//#### LOG / DEBUG END

	await page.waitFor(10);

	// ################################
	// ########### ROUND 3 ############
	// ################################
	// Add to cart modal

	// await page.evaluate(async () => {
	// 	let button = await document.querySelectorAll(".add-to-cart")[0];
	// 	return button.click();
	// })


	// //#### LOG / DEBUG
	// if (debug == true) {
	// 	log.info('3. Found and clicked add to cart');
	// 	html = await page.content();
	// 	fs.writeFileSync(html_path + "_3_cart_clicked__" + Math.floor(new Date() / 1000) + ".html", html);
	// 	page.screenshot({ path: screenshot_path + "_3_cart_clicked_" + Math.floor(new Date() / 1000) + '.png' });
	// }
	// //#### LOG / DEBUG END

	// await page.waitFor(10);

	// ################################
	// ########### ROUND 4 ############
	// ################################
	// Go to cart

	await page.waitForSelector('.buttons > a');
	await page.evaluate(() =>
		document.querySelectorAll(".buttons > a")[0].click()
	);

	//#### LOG / DEBUG
	// NO DEBUG TO THIS PATH DUE TO URL(page.content()) CHANGE
	// if (debug == true) {
	// 	log.info('4. Clicked cart button');
	// 	html = await page.content();
	// 	fs.writeFileSync(html_path + "_4_click_cart_button_" + Math.floor(new Date() / 1000) + ".html", html);
	// 	page.screenshot({ path: screenshot_path + "_4_click_cart_button_" + Math.floor(new Date() / 1000) + '.png' });
	// }
	//#### LOG / DEBUG END

	await page.waitFor(10);

	// ################################
	// ########### ROUND 5 ############
	// ################################
	// Checkout phase

	await page.waitForSelector(".checkout-button");
	await page.evaluate(() =>
		document.querySelectorAll(".checkout-button")[0].click()
	);

	//#### LOG / DEBUG
	// SAME CASE AS IN 4.
	// if (debug == true) {
	// 	log.info('5. Clicked checkout button');
	// 	html = await page.content();
	// 	fs.writeFileSync(html_path + "_5_clicked_checkout_button__" + Math.floor(new Date() / 1000) + ".html", html);
	// 	page.screenshot({ path: screenshot_path + "_5_clicked_checkout_button_" + Math.floor(new Date() / 1000) + '.png' });
	// }
	//#### LOG / DEBUG END

	await page.waitFor(10);

	// ################################
	// ########### ROUND 5 ############
	// ################################
	// Login pahse

	await page.waitForSelector('.email');
	await page.waitFor(10);

	// Username
	await page.focus('.email');
	await page.keyboard.type(user);
	await page.waitFor(10);

	// Password
	await page.focus('input[type=password]')
	await page.keyboard.type(pass);
	await page.waitFor(10);

	// Submit
	await page.evaluate(() =>
		document.querySelectorAll("#loginButton")[0].click()
	);

	//#### LOG / DEBUG
	// SAME CASE AS IN 4.
	//#### LOG / DEBUG END

	await page.waitFor(10);

	// ################################
	// ########### ROUND 6 ############
	// ################################
	// Address pahse

	await page.waitForSelector(".next-box");
	await page.evaluate(() =>
		document.querySelectorAll(".next-box > button")[0].click()
	);

	//#### LOG / DEBUG
	// SAME CASE AS IN 4.
	//#### LOG / DEBUG END

	await page.waitFor(10);

	// ################################
	// ########### ROUND 7 ############
	// ################################
	// Credit cart info

	await page.waitForSelector('.cc-logo');

	// cc number
	await page.focus('.cc-logo');
	await page.keyboard.type(cc_number);
	await page.waitFor(10);

	// cc date
	await page.select('select#dwfrm_wirecardcredit_month', month);
	await page.select('select#dwfrm_wirecardcredit_year', year);

	// cc ccv2 code
	await page.focus('#dwfrm_wirecardcredit_carduuid');
	await page.keyboard.type(cv_code);
	await page.waitFor(10);

	// next page

	await page.evaluate(() =>
		document.querySelectorAll(".next-box > button")[0].click()
	);

	await page.waitFor(10);

	// ################################
	// ########### ROUND 8 ############
	// ################################
	// Phone number and confirm order(*warning!*)

	await page.waitForSelector('#dwfrm_profile_customer_mobilePhone');

	// phone
	await page.focus('#dwfrm_profile_customer_mobilePhone');
	await page.keyboard.type(phone);
	await page.waitFor(10);

	// confirm order click

	if (buy == true) {
		await page.evaluate(() =>
			document.querySelectorAll(".cart-checkout-banner > button")[0].click()
		);

		await page.waitFor(10);
		// browser.close();

	}

})();
