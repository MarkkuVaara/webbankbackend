
class TreeNode {
    constructor(attribute, predicateName, pivot, outcome) {
        this.attribute = attribute;
        this.predicateName = predicateName;
        this.pivot = pivot;
        this.outcome = outcome;
        this.matches = null;
        this.notMatches = null;
    }
}

class CustomDecisionTree {
    constructor(data, className, features, maxDepth = 10) {
        this.data = data;
        this.className = className;
        this.features = features;
        this.maxDepth = maxDepth;
        this.root = this.buildTree(data, features, 0);
    }

    buildTree(data, features, depth) {
        if (data.length === 0 || depth >= this.maxDepth) {
            return null;
        }

        const classValues = data.map(row => row[this.className]);
        const uniqueClassValues = [...new Set(classValues)];

        if (uniqueClassValues.length === 1) {
            return new TreeNode(null, null, null, uniqueClassValues[0]);
        }

        const bestFeature = this.getBestFeature(data, features);
        if (!bestFeature) {
            const majorityClass = this.getMajorityClass(classValues);
            return new TreeNode(null, null, null, majorityClass);
        }

        const bestFeatureValues = data.map(row => row[bestFeature]);
        const uniqueFeatureValues = [...new Set(bestFeatureValues)];

        const node = new TreeNode(bestFeature, '===', uniqueFeatureValues[0], null);

        const matches = data.filter(row => row[bestFeature] === uniqueFeatureValues[0]);
        const notMatches = data.filter(row => row[bestFeature] !== uniqueFeatureValues[0]);

        node.matches = this.buildTree(matches, features, depth + 1);
        node.notMatches = this.buildTree(notMatches, features, depth + 1);

        return node;
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

    predict(instance) {
        let node = this.root;
        while (node.outcome === null) {
            const value = instance[node.attribute];
            node = value === node.pivot ? node.matches : node.notMatches;
        }
        return node.outcome;
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
