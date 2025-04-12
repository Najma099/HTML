function handleZodError(result, res) {
  if (!result.success) {
    const errors = result.error.errors.map(err => ({
      field: err.path[0],
      message: err.message
    }));

    return res.status(400).json({
      message: "Validation failed",
      errors
    });
  }

  return null; 
}

module.exports = handleZodError;
