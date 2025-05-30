const company = require("../model/company")

module.exports = {
  // get list data
  getTblList: async function (req, res) {
    try {
      const data = await company.getTbl('1=1', 'id, name', 'name');

      if (data.status === false) {
        // If an error occurs, return a 500 status code
        return res.status(500).send({
          'status': data.status,
          'message': data.message,
          'result': (process.env.APP_DEBUG=='false')? {} : data.result
        });
      }
      // If successful, return a 200 status code with the result
      return res.status(200).send({
        'status': data.status,
        'message': data.message,
        'count': data.count,
        'result': data.result
      });
    }
    catch (err) {
      // In case of unexpected exceptions, also return a 500 status code
      return res.status(500).send({
        'status': false,
        'message': 'Unexpected error occurred',
        'result': (process.env.APP_DEBUG=='false')? {} : err.message
      });
    }
  }
};
