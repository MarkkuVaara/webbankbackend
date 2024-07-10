
class TreeNode {
    constructor(attribute = null, predicateName = null, pivot = null, outcome = null, matches = null, notMatches = null) {
      this.attribute = attribute;
      this.predicateName = predicateName;
      this.pivot = pivot;
      this.outcome = outcome;
      this.matches = matches;
      this.notMatches = notMatches;
    }
  }

class CustomDecisionTree {
    constructor(data, className, features, maxDepth = 10) {
        this.data = data;
        this.className = className;
        this.features = features;
        this.maxDepth = maxDepth;
        this.root = this.buildTree(data, features, maxDepth, 0);
    }

    buildTree(data, features, maxDepth, currentDepth = 0) {

        const uniqueOutcomes = [...new Set(data.map(item => item.approved))];
        if (uniqueOutcomes.length === 1) {
          return new TreeNode(null, null, null, uniqueOutcomes[0]);
        }
      
        if (features.length === 0 || currentDepth >= maxDepth) {
          const majorityOutcome = data.reduce((acc, item) => {
            acc[item.approved] = (acc[item.approved] || 0) + 1;
            return acc;
          }, {});
          return new TreeNode(null, null, null, majorityOutcome[true] >= majorityOutcome[false]);
        }
      
        const bestFeature = this.findBestFeature(data, features);
        if (!bestFeature) {
          return null;
        }
      
        const { trueSet, falseSet } = this.splitData(data, bestFeature);
        const newFeatures = features.filter(f => f !== bestFeature.attribute);
      
        const matchesNode = this.buildTree(trueSet, newFeatures, maxDepth, currentDepth + 1);
        const notMatchesNode = this.buildTree(falseSet, newFeatures, maxDepth, currentDepth + 1);
      
        return new TreeNode(bestFeature.attribute, '>=', bestFeature.pivot, null, matchesNode, notMatchesNode);
      }
      
    
    splitData(data, feature) {
        const { attribute, pivot } = feature;
        const trueSet = data.filter(item => item[attribute] >= pivot);
        const falseSet = data.filter(item => item[attribute] < pivot);
        return { trueSet, falseSet };
      }
      
    calculateEntropy(data) {
        const total = data.length;
        const counts = data.reduce((acc, item) => {
          acc[item.approved] = (acc[item.approved] || 0) + 1;
          return acc;
        }, {});
        return Object.values(counts).reduce((entropy, count) => {
          const probability = count / total;
          return entropy - probability * Math.log2(probability);
        }, 0);
      }
    
    informationGain(data, trueSet, falseSet) {
        const total = data.length;
        const pTrue = trueSet.length / total;
        const pFalse = falseSet.length / total;
        return this.calculateEntropy(data) - (pTrue * this.calculateEntropy(trueSet)) - (pFalse * this.calculateEntropy(falseSet));
      }
      
    findBestFeature(data, features) {
        let bestGain = 0;
        let bestFeature = null;
      
        features.forEach(attribute => {
          const uniqueValues = [...new Set(data.map(item => item[attribute]))];
          uniqueValues.forEach(value => {
            const feature = { attribute, pivot: value };
            const { trueSet, falseSet } = this.splitData(data, feature);
            if (trueSet.length > 0 && falseSet.length > 0) {
              const gain = this.informationGain(data, trueSet, falseSet);
              if (gain > bestGain) {
                bestGain = gain;
                bestFeature = feature;
              }
            }
          });
        });
      
        return bestFeature;
      }
      

    getBestFeature(data, features) {
        let bestFeature = null;
        let maxDiversity = -1;

        for (const feature of features) {
            const values = data.map(row => row[feature]);
            const uniqueValues = new Set(values);
            if (uniqueValues.size > maxDiversity) {
                maxDiversity = uniqueValues.size;
                bestFeature = feature;
            }
        }

        return bestFeature;
    }

    getMajorityClass(classValues) {
        const classCounts = classValues.reduce((counts, value) => {
            counts[value] = (counts[value] || 0) + 1;
            return counts;
        }, {});

        return Object.keys(classCounts).reduce((a, b) => classCounts[a] > classCounts[b] ? a : b);
    }

    predict(tree, example) {

        if (tree.outcome !== null) {
            return tree.outcome;
        }
        
        const value = example[tree.attribute];
        if (value >= tree.pivot) {
            return this.predict(tree.matches, example);
        } else {
            return this.predict(tree.notMatches, example);
        }
    }

    toJSON() {
        const serializeTree = (node) => {
            if (!node) return null;
            return {
                attribute: node.attribute,
                predicateName: node.predicateName,
                pivot: node.pivot,
                outcome: node.outcome,
                matches: serializeTree(node.matches),
                notMatches: serializeTree(node.notMatches)
            };
        };
        return serializeTree(this.root);
    }

    static fromJSON(json, className, features) {
        const deserializeTree = (node) => {
            if (!node) return null;
            const treeNode = new TreeNode(node.attribute, node.predicateName, node.pivot, node.outcome);
            treeNode.matches = deserializeTree(node.matches);
            treeNode.notMatches = deserializeTree(node.notMatches);
            return treeNode;
        };
        const dt = new CustomDecisionTree([], className, features);
        dt.root = deserializeTree(json);
        return dt;
    }
}

module.exports = CustomDecisionTree;
