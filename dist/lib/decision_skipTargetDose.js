var Decider = require("./decider");
var supportData_1 = require("./supportData");
var supportData = new supportData_1.default();
var ruleBuilder = new Decider.RuleBuilder();
var Decision_CanSkipTargetDose = (function () {
    function Decision_CanSkipTargetDose() {
        this.label = "Can the target dose be skipped?";
    }
    Decision_CanSkipTargetDose.prototype.decide = function (context) {
        var facts = ruleBuilder.facts({});
        var rules = ruleBuilder.rules([
            []
        ]);
        return rules.evaluate();
    };
    return Decision_CanSkipTargetDose;
})();
exports.Decision_CanSkipTargetDose = Decision_CanSkipTargetDose;
//# sourceMappingURL=decision_skipTargetDose.js.map