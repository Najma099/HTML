export const Zodmiddleware = (schema) => (req, res, next) => {
  try {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.errors,
      });
    }
    req.user = result.data;
    next();
  } 
  catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error while validating data!",
    });
  }
};
