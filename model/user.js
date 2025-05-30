const db = require('../database/echron').sql1()
const ip = require('ip')
const other = require('../helper/other')

db.connect((err) => {
  (err)? console.warn('error echronjob user') : console.warn('connected bimascore user')
})

module.exports = {
  //get list
  getTbl: function (where='1=1', select='*'){
    return new Promise((resolve) => {
      db.query('select '+select+' from echron_tb_users where '+where+' order by id desc', (err, result) => {
        if(err) {
          resolve({'status': false, 'message': 'Server Error', 'result': err});
        }
        else {
          if (result.length === 1) {
            resolve({ status: true, message: 'User found', count: 1, result: result[0] }); // Return single object
          } else {
              resolve({ status: true, message: 'Users found', count: result.length, result: result }); // Return array
          }
        }
      })
    })
  },
  //insert data
  insertTbl: function (values) {
    values.status = '0';
    values.ip_address = ip.address();
    values.otp = other.echronRand();
    values.created_at = new Date();
    values.updated_at = new Date();
    
    return new Promise((resolve) => {
      db.query('insert into echron_tb_users set ? ', values, (err, result) => {
        if (err) {
          resolve({ 'status': false, 'message': 'Server Error', 'result': err });
        } else {
          
          const insertedId = result.insertId;
          db.query('select * from echron_tb_users where id = ?', [insertedId], (err, user) => {
            if (err) {
              resolve({ 'status': false, 'message': 'Error fetching user data', 'result': err });
            } else {
              resolve({ 'status': true, 'message': 'User Added Successfully', 'result': user[0] });
            }
          });
        }
      });
    });
  },
  // update data
  updateTbl: function (values, where) {
    values.ip_address = ip.address();
    
    return new Promise((resolve) => {
      if (!where || where.trim() === '') {
        return resolve({ 'status': false, 'message': 'Where condition is required', 'result': null });
      }
      const query = 'UPDATE echron_tb_users SET ? WHERE id = ?';
      db.query(query, [values, where], (err, result) => {
        if (err) {
          resolve({ 'status': false, 'message': 'Server Error', 'result': err });
        } else {
          resolve({ 'status': true, 'message': 'User Updated Successfully', 'result': result });
        }
      });
    });
  },
}