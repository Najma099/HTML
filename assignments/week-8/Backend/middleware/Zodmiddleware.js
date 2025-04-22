export const Zodmiddleware = (schema) = (res, req, next) => {
  try {
    const result = schema.safRarse(res.body);
    if (!result.success) {
      return res.status(400).json({
        ok: false,
        message: result.error.errors
      });
    }
    req.body = result.data;
    next();
  }
  catch (err) {
    return res.status(500).json({
      ok: false,
      message: "Server error!!!"
    });
  }
};

