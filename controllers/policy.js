const policy = require("../model/policy")

module.exports = {
  // get list data
  getTblList: async function (req, res) {
    try {
      let where
      if(req.params.id) {
        where = "plan_id='"+req.params.id+"'"
      }
      else {
        where = '1=1'
      }
      
      const data = await policy.getTbl(where);

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
  getTblDesign: async function (req, res) {
    try {
      let where
      if(req.params.id) {
        where = "plan_id='"+req.params.id+"'"
      }
      else {
        where = '1=1'
      }
      
      const data = await policy.getTbl(where);

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
        'result': {
          id: data.result.id,
          plan_id: data.result.plan_id,
          control_id: data.result.control_id,
          policy_a: {
            green: {
              value: data.result.a1_val,
              type: data.result.a1_val_type,
              desc: data.result.a1_val_desc
            },
            orange: {
              value: data.result.a2_val,
              type: data.result.a2_val_type,
              desc: data.result.a2_val_desc
            },
            red: {
              value: data.result.a3_val,
              type: data.result.a3_val_type,
              desc: data.result.a3_val_desc
            }
          },
          policy_b: {
            green: {
              value: data.result.b1_val,
              type: data.result.b1_val_type,
              desc: data.result.b1_val_desc
            },
            orange: {
              value: data.result.b2_val,
              type: data.result.b2_val_type,
              desc: data.result.b2_val_desc
            },
            red: {
              value: data.result.b3_val,
              type: data.result.b3_val_type,
              desc: data.result.b3_val_desc
            }
          },
             policy_c: {
            green: {
              value: data.result.c1_val,
              type: data.result.c1_val_type,
              desc: data.result.c1_val_desc
            },
            orange: {
              value: data.result.c2_val,
              type: data.result.c2_val_type,
              desc: data.result.c2_val_desc
            }
          }
        }
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
