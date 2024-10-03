const User = require("../model/user");

async function handleCartToOrder(req, res) {
    try {
        const { username } = req.body;
        const user = await User.findOne({ username: username });
        
        if (!user) {
            return res.end(404);
        }
        
        user.order = user.cart;
        user.cart = [];
        await user.save();

        res.send(200);
    }
    catch (error) {
        res.end(404);
    }
}

module.exports = {
    handleCartToOrder,

};