const user = require("../model/user")

module.exports = {
  // get list data
  getTblList: async function (req, res) {
    try {
      const data = await user.getTbl();

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
  },
  insertTblList: async function (req, res) {
    try {
      const body = req.body
      if (!body.name || body.name.trim() === "") {
        return res.status(400).send({
          'status': false,
          'message': 'Name is required'
        });
      }
      if (!/^\d{6}$/.test(body.pin_code)) {
        return res.status(400).send({
          status: false,
          message: 'Invalid pin code. It should be exactly 6 digits.'
        });
      }
      if (!body.phone || body.phone.length < 12) {
        return res.status(400).send({
          'status': false,
          'message': 'Invalid Phone Number'
        });
      }

      const data = await user.insertTbl(body)
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
    catch(err) {
      // In case of unexpected exceptions, also return a 500 status code
      return res.status(500).send({
        'status': false,
        'message': 'Unexpected error occurred',
        'result': (process.env.APP_DEBUG=='false')? {} : err.message
      });
    }
  },
  updateTblList: async function (req, res) {
    const updated_at = new Date();
    
    const status = req.body;
    status.updated_at = updated_at;

    try {
        const data = await user.updateTbl(status, req.params.id);

        const response = (data.status) ? res.status(200) : res.status(400);
        return response.json({
            success: data.status,
            message: data.message,
            result: data.result
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            result: err
        });
    }
  },
};
