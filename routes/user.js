module.exports = (express) => {
  const router = express.Router()
  const user = require('../controllers/user')
  const jwtStatic = require('../middleware/static')

  // data list
  router.get('/', jwtStatic.verifyToken, (req, res) => {
   return user.getTblList(req, res)
  })

  // data insert
  router.post('/', jwtStatic.verifyToken, (req, res) => {
    return user.insertTblList(req, res)
  })

  // otp verify
  router.post('/otp', jwtStatic.verifyToken, (req, res) => {
    return user.verifyTblOtp(req, res)
  })
  router.put('/userId_:id', function (req, res) {
    return user.updateTblList(req, res)
  })

  return router
};