const policy = require("../model/content")

module.exports = {
    // get list data
    getTblList: async function (req, res) {
        try {
            let where
            if (req.params.id) {
                where = "plan_id='" + req.params.id + "'"
            }
            else {
                where = '1=1'
            }

            const data = await policy.getTbl(where);

            if (data.status === false) {
                // If an error occurs, return a 500 status code
                return res.status(500).send({
                    'status': data.status,
                    'message': data.message,
                    'result': (process.env.APP_DEBUG == 'false') ? {} : data.result
                });
            }
            // If successful, return a 200 status code with the result
            return res.status(200).send({
                'status': data.status,
                'message': data.message,
                'count': data.count,
                'result': data.result
            });
        }
        catch (err) {
            // In case of unexpected exceptions, also return a 500 status code
            return res.status(500).send({
                'status': false,
                'message': 'Unexpected error occurred',
                'result': (process.env.APP_DEBUG == 'false') ? {} : err.message
            });
        }
    },
    getTblDesign: async function (req, res) {
        try {
            let where
            if (req.params.id) {
                where = "plan_id='" + req.params.id + "'"
            }
            else {
                where = '1=1'
            }

            const data = await policy.getTbl(where);

            if (data.status === false) {
                // If an error occurs, return a 500 status code
                return res.status(500).send({
                    'status': data.status,
                    'message': data.message,
                    'result': (process.env.APP_DEBUG == 'false') ? {} : data.result
                });
            }
            // If successful, return a 200 status code with the result

            return res.status(200).send({
                'status': data.status,
                'message': data.message,
                'count': data.count,
                'result': {
                    id: data.result.id,
                    plan_id: data.result.plan_id,
                    control_id: data.result.control_id,
                    data: {
                        remarks: {
                            ambulanceCover: data.result.ambucovercats
                        },
                        remarks2: {
                            annualPreventive: data.result.anuprevheacheupcovcats
                        },
                        remarks3: {
                            ayushbenefit: data.result.ayubencats
                        },
                        remarks4: {
                            baraticSuragery: data.result.barisurgcats
                        },
                        remarks5: {
                            copayOutOfNetwork: data.result.copayoutnetcats
                        },
                        remarks6: {
                            copaySenior: data.result.copayseniagecats
                        },
                        remarks7: {
                            consumables: data.result.consumcats	
                        },
                        remarks8: {
                            comBonus: data.result.comubonuscats	
                        },
                        remarks9: {
                            domatraiyTreat: data.result.domitreatcats	
                        },
                        remarks10: {
                            globalcover: data.result.globalcovercats	
                        },
                        remarks11: {
                            materninty: data.result.maternitycats	
                        },
                        remarks12: {
                            mentalIll: data.result.menillcats	
                        },
                        remarks13: {
                            modernTreat: data.result.modtreatcats	
                        },
                        remarks14: {
                            NewbornBaby: data.result.newbornbabycovercats	
                        },
                        remarks15: {
                            orgonDoner: data.result.orgdoncats	
                        },
                        remarks16: {
                            OPD: data.result.outpattreacats	
                        },

                        remarks17: {
                            postHospital: data.result.posthospicats	
                        },
                        remarks18: {
                            prehosp: data.result.prehospicats	
                        },
                        remarks19: {
                            restoreBene: data.result.restobenecats	
                        },
                        remarks20: {
                            roomrent: data.result.roomrentcats	
                        },
                        remarks21: {
                            SecondOpinion: data.result.secopicats	
                        },
                        remarks22: {
                            tpa: data.result.tpacats	
                        },
                        remarks23: {
                            teleCons: data.result.telecats
                        },
                          remarks24: {
                            airabmu: data.result.airabmucats
                        },
                          remarks25: {
                            copaytrehighzon: data.result.copaytrehighzoncats
                        },
                    },

                }
            });
        }
        catch (err) {
            // In case of unexpected exceptions, also return a 500 status code
            return res.status(500).send({
                'status': false,
                'message': 'Unexpected error occurred',
                'result': (process.env.APP_DEBUG == 'false') ? {} : err.message
            });
        }
    }
};
