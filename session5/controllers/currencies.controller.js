const currenciesJSON = require("../currencies.json");

const getCurrencies = (req, res) => {
  const { min_value } = req.query;
  min_value
    ? res.json(
        currenciesJSON.filter((currency) => currency.min_size === min_value)
      )
    : res.json(currenciesJSON);
};

const getCurrencyBySymbol = (req, res) => {
  const { symbol } = req.params;
  const reqCurrencyObj = currenciesJSON.find(
    (currency) => currency.id === symbol.toUpperCase()
  );
  reqCurrencyObj
    ? res.status(200).json(reqCurrencyObj)
    : res.status(404).json({ message: "Invalid Symbol" });
};

module.exports = { getCurrencies, getCurrencyBySymbol };
