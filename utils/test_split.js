
const CustomDecisionTree = require('./custom_decision_tree');

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
    { income: 1000, loan_amount: 50000, existing_debts: 200000, repayment_history: 'good', approved: false },
    { income: 1000, loan_amount: 100000, existing_debts: 2000, repayment_history: 'good', approved: true },
    { income: 1000, loan_amount: 100000, existing_debts: 3000, repayment_history: 'good', approved: false },
    { income: 1000, loan_amount: 200000, existing_debts: 100000, repayment_history: 'good', approved: false },
    { income: 1000, loan_amount: 500, existing_debts: 20000, repayment_history: 'good', approved: true },
    { income: 1000, loan_amount: 1000, existing_debts: 1000, repayment_history: 'good', approved: true },
    { income: 1000, loan_amount: 10000, existing_debts: 30000, repayment_history: 'good', approved: false },
    { income: 1000, loan_amount: 100000, existing_debts: 30000, repayment_history: 'good', approved: false },
    { income: 10000, loan_amount: 50000, existing_debts: 200000, repayment_history: 'good', approved: true },
    { income: 10000, loan_amount: 100000, existing_debts: 2000, repayment_history: 'good', approved: true },
    { income: 10000, loan_amount: 100000, existing_debts: 3000, repayment_history: 'good', approved: true },
    { income: 10000, loan_amount: 200000, existing_debts: 100000, repayment_history: 'good', approved: false },
    { income: 10000, loan_amount: 500, existing_debts: 200000, repayment_history: 'good', approved: true },
    { income: 10000, loan_amount: 1000, existing_debts: 1000, repayment_history: 'good', approved: true },
    { income: 10000, loan_amount: 10000, existing_debts: 30000, repayment_history: 'good', approved: true },
    { income: 10000, loan_amount: 100000, existing_debts: 100000, repayment_history: 'good', approved: true },
];

const className = 'approved';
const features = ['income', 'loan_amount', 'existing_debts', 'repayment_history'];
const maxDepth = 10;

const trainTestSplit = (data, testSize = 0.2) => {
    const shuffled = data.sort(() => 0.5 - Math.random());
    const splitIndex = Math.floor(data.length * (1 - testSize));
    const trainData = shuffled.slice(0, splitIndex);
    const testData = shuffled.slice(splitIndex);
    return { trainData, testData };
};

const { trainData, testData } = trainTestSplit(data, 0.2);
  
const decisionTree = new CustomDecisionTree(trainData, className, features, maxDepth);
  
let correct = 0;
testData.forEach(example => {
    const prediction = decisionTree.predict(decisionTree.root, example);
    if (prediction === example.approved) {
        correct += 1;
    }
});
  
const accuracy = correct / testData.length;
console.log(`Accuracy: ${accuracy * 100}%`);

const depths = [3, 5, 7, 10];
let bestDepth = depths[0];
let bestAccuracy = 0;

depths.forEach(depth => {
  const decisionTree = new CustomDecisionTree(trainData, className, features, depth);

  let correct = 0;
  testData.forEach(example => {
    const prediction = decisionTree.predict(decisionTree.root, example);
    if (prediction === example.approved) {
      correct += 1;
    }
  });

  const accuracy = correct / testData.length;
  console.log(`Depth: ${depth}, Accuracy: ${accuracy * 100}%`);
  
  if (accuracy > bestAccuracy) {
    bestAccuracy = accuracy;
    bestDepth = depth;
  }
});

console.log(`Best Depth: ${bestDepth}, Best Accuracy: ${bestAccuracy * 100}%`);
