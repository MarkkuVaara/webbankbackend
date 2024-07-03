
const CustomDecisionTree = require('./custom_decision_tree');
const fs = require('fs');

const data = [
    { income: 50000, loan_amount: 20000, existing_debts: 10000, repayment_history: 'good', approved: true },
    { income: 10, loan_amount: 5000, existing_debts: 2000, repayment_history: 'poor', approved: false },
    { income: 100, loan_amount: 10000, existing_debts: 2000, repayment_history: 'poor', approved: false },
    { income: 100, loan_amount: 10000, existing_debts: 2000, repayment_history: 'good', approved: false },
    { income: 600, loan_amount: 5000, existing_debts: 20000, repayment_history: 'poor', approved: false },
    { income: 600, loan_amount: 500, existing_debts: 1000, repayment_history: 'good', approved: true },
    { income: 600, loan_amount: 500, existing_debts: 1000, repayment_history: 'poor', approved: true },
    { income: 2000, loan_amount: 4000, existing_debts: 2000, repayment_history: 'good', approved: true },
    { income: 2000, loan_amount: 50000, existing_debts: 200000, repayment_history: 'good', approved: false },
    { income: 2000, loan_amount: 50000, existing_debts: 2000, repayment_history: 'poor', approved: false },
    { income: 3000, loan_amount: 5000, existing_debts: 20000, repayment_history: 'good', approved: true },
    { income: 3000, loan_amount: 100000, existing_debts: 1000, repayment_history: 'good', approved: true },
    { income: 3000, loan_amount: 100000, existing_debts: 10000, repayment_history: 'good', approved: true },
    { income: 3000, loan_amount: 100000, existing_debts: 100000, repayment_history: 'good', approved: false },
    { income: 40000, loan_amount: 20000, existing_debts: 15000, repayment_history: 'good', approved: true },
    { income: 10, loan_amount: 5000, existing_debts: 200, repayment_history: 'poor', approved: false },
    { income: 100, loan_amount: 20000, existing_debts: 2000, repayment_history: 'good', approved: false },
    { income: 100, loan_amount: 1000, existing_debts: 20000, repayment_history: 'good', approved: false },
    { income: 600, loan_amount: 500, existing_debts: 200000, repayment_history: 'poor', approved: false },
    { income: 600, loan_amount: 5000, existing_debts: 10000, repayment_history: 'good', approved: true },
    { income: 600, loan_amount: 5000, existing_debts: 100000, repayment_history: 'poor', approved: false },
    { income: 2000, loan_amount: 4900, existing_debts: 2000, repayment_history: 'good', approved: true },
    { income: 2000, loan_amount: 50000, existing_debts: 100000, repayment_history: 'good', approved: true },
    { income: 2000, loan_amount: 50000, existing_debts: 2000, repayment_history: 'good', approved: true },
    { income: 3000, loan_amount: 50000, existing_debts: 200000, repayment_history: 'good', approved: false },
    { income: 3000, loan_amount: 100000, existing_debts: 2000, repayment_history: 'good', approved: true },
    { income: 3000, loan_amount: 100000, existing_debts: 3000, repayment_history: 'good', approved: true },
    { income: 3000, loan_amount: 200000, existing_debts: 100000, repayment_history: 'good', approved: false },
    { income: 50000, loan_amount: 20000, existing_debts: 10000, repayment_history: 'good', approved: true },
    { income: 20, loan_amount: 5000, existing_debts: 2000, repayment_history: 'poor', approved: false },
    { income: 100, loan_amount: 15000, existing_debts: 2000, repayment_history: 'poor', approved: false },
    { income: 100, loan_amount: 15000, existing_debts: 2000, repayment_history: 'good', approved: false },
    { income: 600, loan_amount: 5000, existing_debts: 20000, repayment_history: 'good', approved: false },
    { income: 600, loan_amount: 500, existing_debts: 2000, repayment_history: 'good', approved: true },
    { income: 600, loan_amount: 550, existing_debts: 1000, repayment_history: 'poor', approved: true },
    { income: 2000, loan_amount: 4500, existing_debts: 2000, repayment_history: 'good', approved: true },
    { income: 2000, loan_amount: 50000, existing_debts: 220000, repayment_history: 'good', approved: false },
    { income: 2000, loan_amount: 500, existing_debts: 2000, repayment_history: 'poor', approved: true },
    { income: 3000, loan_amount: 500, existing_debts: 20000, repayment_history: 'good', approved: true },
    { income: 3000, loan_amount: 1000, existing_debts: 1000, repayment_history: 'good', approved: true },
    { income: 3000, loan_amount: 10000, existing_debts: 30000, repayment_history: 'good', approved: true },
    { income: 3000, loan_amount: 100000, existing_debts: 30000, repayment_history: 'good', approved: false },
];

const className = 'approved';
const features = ['income', 'loan_amount', 'existing_debts', 'repayment_history'];
const maxDepth = 5;

const dt = new CustomDecisionTree(data, className, features, maxDepth);

const model = {
    className: className,
    features: features,
    tree: dt.toJSON()
};

fs.writeFileSync('loan_decision_tree_model.json', JSON.stringify(model, null, 2));
console.log('Model trained and saved to loan_decision_tree_model.json');
