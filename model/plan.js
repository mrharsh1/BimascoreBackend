const db = require('../database/echron').sql1()

db.connect((err) => {
  (err)? console.warn('error bimascore plan') : console.warn('connected bimascore plan')
})

module.exports = {
  //get list
  getTbl: function (where='1=1', select='*',order='id desc'){
    return new Promise((resolve) => {
      db.query('select '+select+' from echron_tb_plans where '+where+' order by '+order, (err, result) => {
        if(err) {
          resolve({'status': false, 'message': 'Server Error', 'result': (process.env.APP_DEBUG=='false')? {} : err});
        }
        else {
          if (result.length === 1) {
            resolve({ status: true, message: 'Plan  not found', count: 1, result: result[0] }); // Return single object
          } else {
            resolve({ status: true, message: 'Plan  found', count: result.length, result: result }); // Return array
          }
        }
      })
    })
  },
}