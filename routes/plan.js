module.exports = (express) => {
  const router = express.Router()
  const plan = require('../controllers/plan')
  const jwtStatic = require('../middleware/static')

  // data list
  /* router.get('/', jwtStatic.verifyToken, (req, res) => {
   return plan.getTblList(req, res)
  }) */

  // data list
  router.get('/companyID_:id', jwtStatic.verifyToken, (req, res) => {
    return plan.getTblList(req, res)
  })

  return router
};