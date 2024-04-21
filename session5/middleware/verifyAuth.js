const password = process.env.ROUTE_PASSWORD

const verifyAuth = (req, res, next) => { 
    const { authorization } = req.headers
    if (!authorization || authorization !== password) {
      return res.status(403).json({message: "Unauthorized request"});
    }
    next()
  }

module.exports = verifyAuth;