const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Function to trigger on updates to recentlyViewed
exports.sendEmailNotification = functions.firestore
  .document('users/{userId}/recentlyViewed/{productId}')
  .onCreate(async (snap, context) => {
    const product = snap.data();
    const userId = context.params.userId;

    // Logic to check how many times the product was viewed within a time frame
    const viewCount = await getProductViewCount(product.productId, userId);
    if (viewCount > 2) {
      sendEmailNotification(userId, product);
    }
  });

// Helper function to send an email
const sendEmailNotification = (userId, product) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'akhileshhdev38@gmail.com', 
    subject: `Product Viewed Multiple Times`,
    text: `You have viewed the product ${product.title} multiple times.`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

// Function to get product view count within a time frame
const getProductViewCount = async (productId, userId) => {
  const productRef = admin.firestore()
    .collection('users')
    .doc(userId)
    .collection('recentlyViewed')
    .where('productId', '==', productId)
    .where('timestamp', '>=', admin.firestore.Timestamp.now().toDate() - 24*60*60*1000);

  const snapshot = await productRef.get();
  return snapshot.size;
};
