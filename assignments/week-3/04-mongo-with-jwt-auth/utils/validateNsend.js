function handleZodError(result, res) {
  if (!result.success) {
    //console.error("Validation failed:", result.error);
    const errors = result.error.errors.map(err => ({
      field: err.path.join('.'),
      message: err.message
    }));

    return res.status(400).json({
      ok: false,
      message: "Validation failed",
      errors
    });
  }

  // Returning null means validation passed
  return null; 
}

export default handleZodError;
