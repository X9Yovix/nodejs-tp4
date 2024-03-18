const validate = (schema) => async (req, res, next) => {
  try {
    const body = req.body
    await schema.validateAsync(body)
    next()
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

module.exports = validate