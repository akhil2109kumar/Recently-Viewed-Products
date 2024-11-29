const { addRecentlyViewed, getRecentlyViewed } = require("../dao/userDAO");

const logProductView = async (req, res) => {
  const products = req.body;
  await addRecentlyViewed(products);
  res.status(200).json({ message: "Product logged successfully." });
};

const fetchRecentlyViewed = async (req, res) => {
  const { userId } = req.params;
  const products = await getRecentlyViewed(userId);
  res.status(200).json(products);
};

module.exports = { logProductView, fetchRecentlyViewed };