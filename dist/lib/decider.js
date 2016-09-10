var explain;
var log;
var Factoid = (function () {
    function Factoid(predicate, name) {
        this.predicate = predicate || function () { return true; };
        this.factName = name || 'anonymous fact';
    }
    Factoid.prototype.not = function () {
        var originalPredicate = this.predicate;
        return new Factoid(function () { return !(originalPredicate()); }, 'NOT(' + this.factName + ')');
    };
    ;
    Factoid.prototype.or = function (otherFactoid) {
        var _this = this;
        var result = false;
        var firstFactoid;
        firstFactoid = this;
        var which;
        return new Factoid(function () {
            (((result = firstFactoid.evaluate()) && (which = _this.factName))
                || ((result = otherFactoid.evaluate()) && (which = otherFactoid.factName)));
            return result;
        }, '(' + this.factName + ' OR ' + otherFactoid.factName + ')');
    };
    ;
    Factoid.prototype.evaluate = function (forceEval) {
        if (forceEval === void 0) { forceEval = false; }
        var evaluated = false;
        var doEval = (forceEval || this.hasOwnProperty('result') == false);
        (doEval && (evaluated = true) && (this['result'] = this.predicate()));
        (explain && evaluated && log('Evaluated ' + this.factName));
        return this.result;
    };
    ;
    return Factoid;
})();
exports.Factoid = Factoid;
var Rule = (function () {
    function Rule(ruleParts) {
        var _this = this;
        if (!ruleParts || !ruleParts.length) {
            this.outcomeFunc = function () { return undefined; };
            this.evaluate = function () { return false; };
            this.conditionCount = 0;
            this.testConditions = "Error - no rule parts specified";
            return;
        }
        this.outcomeFunc = ruleParts.pop();
        this.conditionCount = ruleParts.length;
        this.testConditions = ruleParts.map(function (item) { return item.factName || "anonymous fact"; }).join(",");
        this.evaluate = function () { return (_this.conditionCount == 0 || ruleParts.every(function (part) { return part.evaluate(); })); };
    }
    return Rule;
})();
exports.Rule = Rule;
var RuleSet = (function () {
    function RuleSet(ruleSpec) {
        this.rules = ruleSpec.map(function (ruleDef, index) { return new Rule(ruleDef); });
    }
    // this returns an outcome
    RuleSet.prototype.evaluate = function () {
        if (!this.rules || !this.rules.length) {
            return undefined;
        }
        var result = null; // default - you shouldn't hit this, hopefully
        var matchedRule;
        // find matching rule - needs refactored to skip the rest once found
        for (var ruleIndex = 0; ruleIndex < this.rules.length; ruleIndex++) {
            var currentRule = this.rules[ruleIndex];
            if (!matchedRule && currentRule.evaluate() && (matchedRule = currentRule)) {
                break;
            }
        }
        var outcomeFunc = (matchedRule && matchedRule.outcomeFunc) || (function () { return undefined; });
        result = outcomeFunc();
        return result;
    };
    return RuleSet;
})();
exports.RuleSet = RuleSet;
var RuleBuilder = (function () {
    function RuleBuilder() {
        // empty
    }
    RuleBuilder.prototype.facts = function (factSpec) {
        factSpec = factSpec || {};
        var outFacts = {};
        for (var key in factSpec) {
            outFacts[key] = new Factoid(factSpec[key], key);
        }
        return outFacts;
    };
    RuleBuilder.prototype.rules = function (ruleSpec) { return new RuleSet(ruleSpec); };
    return RuleBuilder;
})();
exports.RuleBuilder = RuleBuilder;
//# sourceMappingURL=decider.js.map