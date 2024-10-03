const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


async function handleUserCreate(req, res) {
	try {
		const { username, password } = req.body.data;

		// check if it is already present or not
		const data = await User.findOne({ username });
		if (data) return res.status(409).send("user is already present");

		// hash the password
		const genSalt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, genSalt);

		// generate the jwt token and logged in
		const token = jwt.sign({ username }, process.env.JSONKEY);
		res.cookie("uid", token);

		// save the user and return from here
		(await User.create({ username, password: hashPassword })).save();
		res.status(200).send("The user is created !");
	} catch (error) {
		// in-case something happened
		res.status(400).send("something went wrong");
	}
}


async function handleUserLogin(req, res) {
	try {
		// getting the values
		const { username, password } = req.body.data;

		// check if user is present or not in database
		const data = await User.findOne({ username });
		if (!data) return res.status(400).send("user is not available");

		// if user is available then match the hashpassword with current password
		const isHashTrue = await bcrypt.compare(password, data.password);
		if (!isHashTrue) return res.status(400).send("password is wrong");

		// add token to the browser
		const token = jwt.sign({ username }, process.env.JSONKEY);
		res.cookie("uid", token);

		// everything went good
		res.status(200).send("user is loged in");
	} catch (error) {
		// in-case something happened
		return res.status(400).send("Something went wrong");
	}
}

// Update the cart
async function addToCart(req, res) {
	try {
		const { username, mealId, price, mealName, mealImage } = req.body;

		//  check if the item is already added or not in cart , if it is added then only update the quantity
		const checkCart = await User.findOne({ username, cart: { $elemMatch: { mealId } } });
		if (checkCart) return await handleUpdateQuantity(req, res);

		const user = await User.findOne({ username });
		user.cart.push({
			quantity: 1, mealId, price, mealName, mealImage
		});
		await user.save();

		res.status(200).end("OK");
	} catch (error) {
	}
}

async function DecrementCartItemByMealId(checkCart, mealId) {
	checkCart.cart.map((cart) => {
		if (cart.mealId === mealId && Number(cart.quantity) !== 0) {
			const cartQuantity = Number.parseInt(cart.quantity) + 1;
			cart.quantity = cartQuantity + "";
		}
	})
	await checkCart.save();
}

async function incrementCartItemByMealId(checkCart, mealId) {
	checkCart.cart.map((cart) => {
		if (cart.mealId === mealId) {
			const cartQuantity = Number.parseInt(cart.quantity) + 1;
			cart.quantity = cartQuantity + "";
		}
	})
	await checkCart.save();
}

async function decrementCartItemByMealIds(checkCart, mealId) {
	checkCart.cart.map((cart) => {
		if (cart.mealId === mealId) {
			const cartQuantity = Number.parseInt(cart.quantity) - 1;
			cart.quantity = cartQuantity + "";
		}
	})
	await checkCart.save();
}

async function handleUpdateQuantity(req, res) {
	try {
		const { username, mealId, typeOfReq } = req.body;

		const checkCart = await User.findOne({ username, cart: { $elemMatch: { mealId } } });
		if (!checkCart) return res.status(400).end("bad request");

		switch (typeOfReq.toUpperCase()) {
			case "INCREMENT":
				await incrementCartItemByMealId(checkCart, mealId);
				break;
			case "DECREMENT":
				await decrementCartItemByMealIds(checkCart, mealId);
				break;
		}

		res.status(200).end("OK");
	} catch (error) {
	}
}

async function handleFectchCart(req, res) {
	try {
		const { username } = req.body;
		const user = await User.findOne({ username });
		res.status(200).json(user.cart);
	} catch (error) {
	}
}

async function handleForgetPass(req, res) {
	try {
		const { username, password } = req.body.data;

		// check if it is already present or not
		const data = await User.findOne({ username });
		if (!data) return res.send("user is not present");

		// hash the password
		const genSalt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, genSalt);

		// update password
		await User.updateOne(
			{ username },
			{ $set: { password: hashPassword } }
		);

		return res.status(200).json({ message: 'Password updated successfully.' });
	} catch (error) {
		return res.status(500).json({ message: 'Something went wrong.' });
	}
}

async function handleGetOrders(req, res) {
	try {
		const { username } = req.body;
		const data = await User.findOne({ username });
		// No order
		if (!data) return res.status(400);
		res.send(data.order);
	} catch (error) {

	}
}

module.exports = {
	handleUserCreate,
	handleUserLogin,
	addToCart,
	handleFectchCart,
	handleUpdateQuantity,
	handleForgetPass,
	handleGetOrders,
};
