module.exports = (express) => {
  const router = express.Router()
  const company = require('../controllers/company')
  const jwtStatic = require('../middleware/static')

  // data list
  router.get('/', jwtStatic.verifyToken, (req, res) => {
   return company.getTblList(req, res)
  })

  return router
};