var Decider = require("./decider");
var ruleBuilder = new Decider.RuleBuilder();
var Decision_CanEvaluateAdministeredDose = (function () {
    function Decision_CanEvaluateAdministeredDose() {
        this.label = "Can this administered dose be evaluated?";
    }
    Decision_CanEvaluateAdministeredDose.prototype.decide = function (context) {
        console.log(this.label);
        var facts = ruleBuilder.facts({
            DOSE_CONDITION_EXISTS: function () {
                console.log("Dose condition evaluating...[" + context.doseCondition + "]");
                return context.doseCondition != "" && context.doseCondition != null;
            },
            LOT_IS_EXPIRED: function () {
                console.log("Lot expiration evaluating...[" + context.lotExpirationDate + ", " + context.administeredDate + "]");
                return context.lotExpirationDate < context.administeredDate;
            }
        });
        var rules = ruleBuilder.rules([
            [facts.DOSE_CONDITION_EXISTS,
                function () { return { canBeEvaluated: false }; }],
            [facts.LOT_IS_EXPIRED,
                function () { return { canBeEvaluated: false }; }],
            [facts.DOSE_CONDITION_EXISTS.not(),
                facts.LOT_IS_EXPIRED.not(), function () { return { canBeEvaluated: true }; }],
            [facts.DOSE_CONDITION_EXISTS.or(facts.LOT_IS_EXPIRED),
                function () { return { canBeEvaluated: false }; }],
            [function () { return { canBeEvaluated: true }; }]
        ]);
        return rules.evaluate();
    };
    return Decision_CanEvaluateAdministeredDose;
})();
exports.Decision_CanEvaluateAdministeredDose = Decision_CanEvaluateAdministeredDose;
//# sourceMappingURL=decision_evalAdministeredDose.js.map