const userSearchSchema = require("../schemas/userSearch.schema")

const validateSearchQuery = (req, res, next) => {
  const result = userSearchSchema.validate(req.query);
  if(result.error)
    return res.status(422).json({ message: result.error.details[0].message });
  next()
}

module.exports = validateSearchQuery