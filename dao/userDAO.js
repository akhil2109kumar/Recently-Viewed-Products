const db = require("../utils/firebase");
const admin = require("firebase-admin"); 
const redisClient = require("../utils/redis");

const addUser = async (userData) => {
  try {
    const userRef = db.collection("users");
    const docRef = await userRef.add(userData);
    console.log("User added with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding user: ", error);
    throw new Error("Failed to add user");
  }
};

const addRecentlyViewed = async (product) => {
    try {

        const userRef = db.collection("users").doc(product.userId);
        const recentlyViewedRef = userRef.collection("recentlyViewed");
    
        await recentlyViewedRef.add({
          productId: product.productId,
          title: product.title,
          price: product.price,
          description: product.description,
          image: product.image,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        });
    
        // Limit to 10 products (Delete the oldest if the size exceeds 10)
        const snapshot = await recentlyViewedRef.orderBy("timestamp", "desc").get();
        if (snapshot.size > 10) {
          const oldest = snapshot.docs[snapshot.size - 1];
          await oldest.ref.delete();
        }
    
        console.log(`Product ${product.productId} added to recently viewed list for user ${product.userId}`);
      } catch (error) {
        console.error("Error adding recently viewed product: ", error);
        throw new Error("Failed to add recently viewed product");
      }
};

const getRecentlyViewed = async (userId) => {
  try {
    const cacheKey = `recentlyViewed:${userId}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const userRef = db.collection("users").doc(userId);
    const recentlyViewedRef = userRef.collection("recentlyViewed");

    const snapshot = await recentlyViewedRef
      .orderBy("timestamp", "desc")
      .limit(10)
      .get();

    const recentlyViewedProducts = snapshot.docs.map((doc) => doc.data());

    await redisClient.set(cacheKey, JSON.stringify(recentlyViewedProducts), {
      EX: 60  // Cache for 1 minute
    });

    return recentlyViewedProducts;
  } catch (error) {
    console.error("Error retrieving recently viewed products: ", error);
    throw new Error("Failed to retrieve recently viewed products");
  }
};

module.exports = { addUser, addRecentlyViewed, getRecentlyViewed};
