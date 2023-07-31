const AccessControl = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://todo-list-api-8vwz.onrender.com/");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  }

  module.exports = AccessControl;