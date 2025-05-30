module.exports = (express) => {
  const router = express.Router()
  const planDetails = require('../controllers/planDetails')
  const policy = require('../controllers/policy')
  const content = require('../controllers/content')
  const jwtStatic = require('../middleware/static')

  // data list
  router.get('/graph_:amount', jwtStatic.verifyToken, (req, res) => {
    return planDetails.getPlanDetails(req, res)
  })
  // score
  router.post('/score', jwtStatic.verifyToken, (req, res) => {
    return planDetails.postPlanDetails(req, res)
  })
  // feature
  router.post('/feature', jwtStatic.verifyToken, (req, res) => {
    return planDetails.postPlanDetailsAll(req, res)
  })
  // policy
  router.get('/policy/planID_:id', jwtStatic.verifyToken, (req, res) => {
    return policy.getTblDesign(req, res)
  })
  // data list
  router.get('/planID_:id', jwtStatic.verifyToken, (req, res) => {
    return planDetails.getPlanDetails(req, res)
  })

  // content list
  router.get('/content/planID_:id', jwtStatic.verifyToken, (req, res) => {
    return content.getTblDesign(req, res)
  })


  return router
};
