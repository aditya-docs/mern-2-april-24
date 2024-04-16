const userSearchSchema = require("../schemas/userSearch.schema")

const getQueryErrors = (data) => {
  console.log(data)
  const result = userSearchSchema.validate(data);
  return result.error;
}

module.exports = getQueryErrors