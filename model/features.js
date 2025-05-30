const db = require('../database/echron').sql1()

db.connect((err) => {
  (err)? console.warn('error bimascore features') : console.warn('connected bimascore policy')
})

module.exports = {
  //get list
  getTbl: function (where='1=1', select='*', order='id desc'){
    return new Promise((resolve) => {
      db.query('select '+select+' from echron_tb_features where '+where+' order by '+order, (err, result) => {
        if(err) {
          resolve({'status': false, 'message': 'Server Error', 'result': (process.env.APP_DEBUG=='false')? {} : err});
        }
        else {
          if (result.length === 1) {
            resolve({ status: true, message: 'Company found', count: 1, result: result[0] }); // Return single object
          } else {
            resolve({ status: true, message: 'Company found', count: result.length, result: result }); // Return array
          }
        }
      })
    })
  },
}