const planDetails = require ("../model/planDetails");
const feature = require ("../model/features");
module.exports = {
  echronRand: function(min=111111, max=999999) {
    const minCeiled = Math.ceil(min)
    const maxFloored = Math.floor(max)
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
  },
  echronAmtRange: function(amount, result) {
    let score = 0;

    if(amount < 500000){
      score = result.zero;
    }
    else if (amount >= 500000 && amount < 750000) {
      score = result.one;
    }
    else if (amount >= 750000 && amount < 1000000) {
      score = result.two;
    }
    else if (amount >= 1000000 && amount < 1500000) {
      score = result.three;
    }
    else if (amount >= 1500000 && amount < 2000000) {
      score = result.four;
    }
    else if (amount >= 2000000 && amount < 2500000) {
      score = result.five;
    }
    else if (amount >= 2500000 && amount < 5000000) {
      score = result.six;
    }
    else if(amount >= 5000000 && amount < 10000000) {
      score = result.seven;
    }
    else if(amount >= 10000000 && amount < 30000000) {
      score = result.eight;
    }
    else if(amount >= 30000000) {
      score = result.nine;
    }
    return score;
  },
  echronAgeBetween: function(dob, max=35, min=18) {
    const birthDate = new Date(dob);
    if (isNaN(birthDate)) return false; // Invalid date check

    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    // Adjust age if the birthday hasn't occurred yet this year
    const hasBirthdayOccurred = 
        today.getMonth() > birthDate.getMonth() || 
        (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

    const actualAge = hasBirthdayOccurred ? age : age - 1;

    return actualAge >= min && actualAge <= max;
  },
  echronFeature: async function(req, debug, tbl, mat) {
    const plan_id = "plan_id='"+req.body.plan_id+"'";
    const select = "zero, one, two, three, four, five, six, seven, eight, nine"
  
    const data = await planDetails.getTbl(plan_id, select, tbl, mat);
    
    const dataFeat = await feature.getTbl(`name='${tbl}'`);
    if (data.status === false) {
      // If an error occurs, return a 500 status code
      return {
        'status': data.status,
        'message': data.message,
        'result': (debug=='false')? {} : data.result
      };
    }

    const score = this.echronAmtRange(req.body.amount, data.result)

    let fetCont = ''

    if(score==='Red') {
      fetCont = dataFeat.result.red
    }
    else if(score==='Orange' || score==='Yellow') {
      fetCont = dataFeat.result.orange
    }
    else if(score==='Green') {
      fetCont = dataFeat.result.green
    }
  
    return {
      'name': tbl,
      'fullname': dataFeat.result.fullname,
      'feature': score,
      'content': fetCont,
      'defination' : dataFeat.result.defination
    };
  }
}