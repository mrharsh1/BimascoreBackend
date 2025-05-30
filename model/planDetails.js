const db = require('../database/echron').sql1()

db.connect((err) => {
  (err)? console.warn('error bimascore planDetails') : console.warn('connected bimascore planDetails')
})

module.exports = {
  //get list
  getTbl: function (where='1=1', select='*', tbl='ratings', mat='mt'){
    return new Promise((resolve) => {
      db.query('select '+select+' from echron_tb_pl_'+mat+'_'+tbl+' where '+where+' order by id desc', (err, result) => {
        if(err) {
          resolve({'status': false, 'message': 'Server Error', 'result': (process.env.APP_DEBUG=='false')? {} : err});
        }
        else {
          if (result.length === 1) {
            resolve({ status: true, message: 'Plan Details  found', count: 1, result: result[0] }); // Return single object
          } else {
            resolve({ status: true, message: 'Plan Details not found', count: result.length, result: result }); // Return array
          }
        }
      })
    })
  },
}