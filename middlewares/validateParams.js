const validateParams = (req, res, next) => {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required parameter: userId',
      });
    }

    next();
  };
  
module.exports = validateParams;  