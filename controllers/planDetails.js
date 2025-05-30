const planDetails = require("../model/planDetails")
const plan = require("../model/plan")
const company = require("../model/company")
const helper  = require("../helper/other")
module.exports = {
  // get list data
  getPlanDetails: async function (req, res) {
    try {
        let where
        if(req.params.id) {
            where = "plan_id='"+req.params.id+"'"
        }
        else {
            where = '1=1'
        }
      const data = await planDetails.getTbl(where);


      if (data.status === false) {
        // If an error occurs, return a 500 status code
        return res.status(500).send({
          'status': data.status,
          'message': data.message,
          'result': (process.env.APP_DEBUG=='false')? {} : data.result
        });
      }
      // If successful, return a 200 status code with the result
      if (req.params.id){
        return res.status(200).send({
          'status': data.status,
          'message': data.message,
          'count': data.count,
          'result': {'0-5 LK':data.result.zero,
                    '5-7.5 LK': data.result.one,
                    '7.5-10 LK': data.result.two,
                    '10-15 LK': data.result.three,
                    '15-20 LK': data.result.four,
                    '20-25 LK': data.result.five,
                    '25-50 LK': data.result.six,
                    '50 LK - 1 CR': data.result.seven,
                    '1-3 CR': data.result.eight,
                    '3 CR Above': data.result.nine,
                    'created_at':data.result.created_at,
                    'updated_at':data.result.updated_at	
                  }
        });
    }
    else {
        const echronRes = await Promise.all(data.result.map(async (val) => {
          const planData = await plan.getTbl("id='"+val.plan_id+"'", 'name, varient, company_id');
          const companyData = await company.getTbl("id='"+planData.result.company_id+"'", 'name');
          const score = helper.echronAmtRange(req.params.amount, val)
          return {
            'score': score,
            'company': companyData.result.name,
            'plan': planData.result.name,
            'varient': planData.result.varient,
            'plan_id': val.plan_id,
            'control_id': val.control_id,             
          };
        }));
        return res.status(200).send({
          status: data.status,
          message: data.message,
          count: data.count || data.result.length,
          result: echronRes, 
        });
      }
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

  postPlanDetails: async function (req, res) {
    try {
        // const datas = req.body

        let where = "plan_id='"+req.body.plan_id+"'"
        // const EchronMtn = helper.echronAgeBetween(req.body.dob)
        let maternity = req.body.isMaternity === true ?  'mt' : 'nt';

        const data = await planDetails.getTbl(where, 'control_id, plan_id, zero, one, two, three, four, five, six, seven, eight, nine', 'ratings', maternity);

        if (data.status === false) {
            // If an error occurs, return a 500 status code
            return res.status(500).send({
              'status': data.status,
              'message': data.message,
              'result': (process.env.APP_DEBUG=='false')? {} : data.result
            });
          }


          const score = helper.echronAmtRange(req.body.amount, data.result)

        
          return res.status(200).send({
            'status': data.status,
            'maternity': req.body.isMaternity === true ?  'Yes' : 'Not', 
            'message': data.message,
            'count': data.count,
            'result':{
                'score': score,
                'plan_id':data.result.plan_id,
                'control_id':data.result.control_id
            }
          });

    } catch (err) {
        // In case of unexpected exceptions, also return a 500 status code
        return res.status(500).send({
            'status': false,
            'message': 'Unexpected error occurred',
            'result': (process.env.APP_DEBUG=='false')? {} : err.message
          });
    }
  },

  postPlanDetailsAll: async function (req, res) {
    try {

      // const EchronMtn = helper.echronAgeBetween(req.body.dob)

      let  maternity = req.body.isMaternity === true ? "mt" : "nt";

      const data_airabmucats = await helper.echronFeature(req, process.env.APP_DEBUG, 'airabmucats', maternity);
      const data_ambucovercats = await helper.echronFeature(req, process.env.APP_DEBUG, 'ambucovercats', maternity);
      const data_anuprevheacheupcovcats = await helper.echronFeature(req, process.env.APP_DEBUG, 'anuprevheacheupcovcats', maternity);
      const data_barisurgcats = await helper.echronFeature(req, process.env.APP_DEBUG, 'barisurgcats', maternity);
      const data_comubonuscats = await helper.echronFeature(req, process.env.APP_DEBUG, 'comubonuscats', maternity);
      const data_consumcats = await helper.echronFeature(req, process.env.APP_DEBUG, 'consumcats', maternity);
      const data_copayoutnetcats = await helper.echronFeature(req, process.env.APP_DEBUG, 'copayoutnetcats', maternity);
      const data_copayseniagecats = await helper.echronFeature(req, process.env.APP_DEBUG, 'copayseniagecats', maternity);
      const data_copaytrehighzoncats = await helper.echronFeature(req, process.env.APP_DEBUG, 'copaytrehighzoncats', maternity);
      const data_domitreatcats = await helper.echronFeature(req, process.env.APP_DEBUG, 'domitreatcats', maternity);
      const data_maternitycats = await helper.echronFeature(req, process.env.APP_DEBUG, 'maternitycats', maternity);
      const data_modtreatcats = await helper.echronFeature(req, process.env.APP_DEBUG, 'modtreatcats', maternity);
      const data_newbornbabycovercats = await helper.echronFeature(req, process.env.APP_DEBUG, 'newbornbabycovercats', maternity);
      const data_posthospicats = await helper.echronFeature(req, process.env.APP_DEBUG, 'posthospicats', maternity);
      const data_prehospicats = await helper.echronFeature(req, process.env.APP_DEBUG, 'prehospicats', maternity);
      const data_restobenecats = await helper.echronFeature(req, process.env.APP_DEBUG, 'restobenecats', maternity);
      const data_roomrentcats = await helper.echronFeature(req, process.env.APP_DEBUG, 'roomrentcats', maternity);
      const data_tpacats = await helper.echronFeature(req, process.env.APP_DEBUG, 'tpacats', maternity);
      const data_globalcovercats = await helper.echronFeature(req, process.env.APP_DEBUG, 'globalcovercats', maternity);

      const data_ratings = await helper.echronFeature(req, process.env.APP_DEBUG, 'ratings', maternity);
      const data_rating_strengths = await helper.echronFeature(req, process.env.APP_DEBUG, 'rating_strengths', maternity);
      const data_rating_neutrals = await helper.echronFeature(req, process.env.APP_DEBUG, 'rating_neutrals', maternity);
      const data_rating_weeknesses = await helper.echronFeature(req, process.env.APP_DEBUG, 'rating_weeknesses', maternity);

      

      let swf = [];

      if(req.body.isMaternity === true) {
        if(req.body.amount<5000000) {
          swf = [
            data_roomrentcats,
            data_consumcats,
            data_maternitycats,
            data_modtreatcats,
            data_comubonuscats,
            data_restobenecats,
            data_tpacats,
            data_copayseniagecats,
            data_copaytrehighzoncats,
            data_posthospicats,
            data_prehospicats,
            data_newbornbabycovercats,
            data_anuprevheacheupcovcats,
            data_ambucovercats,
            data_domitreatcats,
            data_copayoutnetcats,
            data_barisurgcats,
            data_airabmucats,
            data_globalcovercats
          ]
        }
        else if (req.body.amount > 5000000 && req.body.amount <= 10000000) {
          swf = [
            data_roomrentcats,
            data_consumcats,
            data_maternitycats,
            data_modtreatcats,
            data_comubonuscats,
            data_restobenecats,
            data_tpacats,
            data_copayseniagecats,
            data_copaytrehighzoncats,
            data_globalcovercats,
            data_posthospicats,
            data_prehospicats,
            data_newbornbabycovercats,
            data_anuprevheacheupcovcats,
            data_ambucovercats,
            data_domitreatcats,
            data_copayoutnetcats,
            data_barisurgcats,
            data_airabmucats,
          ]
        }
        else if (req.body.amount > 10000000) {
          swf = [
            data_roomrentcats,
            data_consumcats,
            data_maternitycats,
            data_modtreatcats,
            data_globalcovercats,
            data_comubonuscats,
            data_domitreatcats,
            data_copayseniagecats,
            data_tpacats,
            data_copaytrehighzoncats,
            data_posthospicats,
            data_prehospicats,
            data_newbornbabycovercats,
            data_anuprevheacheupcovcats,
            data_ambucovercats,
            data_restobenecats,
            data_copayoutnetcats,
            data_barisurgcats,
            data_airabmucats,
          ]
        }
      }
      else {
        if(req.body.amount<5000000) {
          swf = [
            data_roomrentcats,
            data_consumcats,
            data_modtreatcats,
            data_comubonuscats,
            data_restobenecats,
            data_copayoutnetcats,
            data_tpacats,
            data_copayseniagecats,
            data_copaytrehighzoncats,
            data_posthospicats,
            data_prehospicats,
            data_anuprevheacheupcovcats,
            data_ambucovercats,
            data_domitreatcats,
            data_barisurgcats,
            data_airabmucats,
            data_globalcovercats,
    
            data_maternitycats,
            data_newbornbabycovercats,
          ]
        }
        else if (req.body.amount > 5000000 && req.body.amount <= 10000000) {
          swf = [
            data_roomrentcats,
            data_consumcats,
            data_modtreatcats,
            data_comubonuscats,
            data_restobenecats,
            data_copayoutnetcats,
            data_tpacats,
            data_copayseniagecats,
            data_copaytrehighzoncats,
            data_globalcovercats,
            data_posthospicats,
            data_prehospicats,
            data_anuprevheacheupcovcats,
            data_ambucovercats,
            data_domitreatcats,
            data_barisurgcats,
            data_airabmucats,
            
            data_maternitycats,
            data_newbornbabycovercats,
          ]
        }
        else if (req.body.amount > 10000000) {
          swf = [
            data_roomrentcats,
            data_consumcats,
            data_modtreatcats,
            data_comubonuscats,
            data_globalcovercats,
            data_copayoutnetcats,
            data_tpacats,
            data_copayseniagecats,
            data_copaytrehighzoncats,
            data_posthospicats,
            data_prehospicats,
            data_anuprevheacheupcovcats,
            data_ambucovercats,
            data_restobenecats,
            data_domitreatcats,
            data_barisurgcats,
            data_airabmucats,
            
            data_maternitycats,
            data_newbornbabycovercats,
          ]
        }
      }
      return res.status(200).send({'maternity': req.body.isMaternity === true ?  'Yes' : 'Not', 'status': true, 'plan_id': req.body.plan_id, result: {'swf': swf, 'rating': [data_ratings, data_rating_strengths, data_rating_neutrals, data_rating_weeknesses]}});

    } catch (err) {
        // In case of unexpected exceptions, also return a 500 status code
        return res.status(500).send({
          'status': false,
          'message': 'Unexpected error occurred',
          'result': (process.env.APP_DEBUG=='false')? {} : err.message
        });
    }
  }
}
