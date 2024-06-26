
const CustomDecisionTree = require('../utils/custom_decision_tree');
const fs = require('fs');

const modelJSON = fs.readFileSync('loan_decision_tree_model.json', 'utf-8');
const model = JSON.parse(modelJSON);
const dt = CustomDecisionTree.fromJSON(model.tree, model.className, model.features);
console.log(dt);

const predictRouter = require('express').Router();

predictRouter.post('/', (req, res) => {

    const instance = req.body;

    const requiredFeatures = ['income', 'loan_amount', 'existing_debts', 'repayment_history'];
    for (let feature of requiredFeatures) {
        if (!(feature in instance)) {
            return res.status(400).json({ error: `Missing feature: ${feature}` });
        }
    }

    const prediction = dt.predict(instance);

    res.json({
        approved: prediction,
    });

});

module.exports = predictRouter;
