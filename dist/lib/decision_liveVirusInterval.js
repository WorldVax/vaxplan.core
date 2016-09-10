var Decider = require("./decider");
var supportData_1 = require("./supportData");
var supportData = new supportData_1.default();
var ruleBuilder = new Decider.RuleBuilder();
var Decision_ShouldEvaluateLiveVirusConflict = (function () {
    function Decision_ShouldEvaluateLiveVirusConflict() {
        this.label = "Should the current vaccine dose administered be evaluated for a live virus conflict?";
    }
    Decision_ShouldEvaluateLiveVirusConflict.prototype.decide = function (context) {
        var facts = ruleBuilder.facts({
            CURRENT_IS_DEFINED_AS_LIVE: function () { return supportData.vaccineTypeIsDefinedLiveVirus(context.currentVaccineType); },
            PREVIOUS_IS_DEFINED_AS_LIVE: function () { return supportData.vaccineTypeIsDefinedLiveVirus(context.previousVaccineType); }
        });
        var rules = ruleBuilder.rules([
            [facts.CURRENT_IS_DEFINED_AS_LIVE, facts.PREVIOUS_IS_DEFINED_AS_LIVE,
                function () { return { shouldEvaluateLiveVirusConflict: true }; }],
            [function () { return { shouldEvaluateLiveVirusConflict: false }; }]
        ]);
        return rules.evaluate();
    };
    return Decision_ShouldEvaluateLiveVirusConflict;
})();
exports.Decision_ShouldEvaluateLiveVirusConflict = Decision_ShouldEvaluateLiveVirusConflict;
var Decision_CouldVaccineDosesBeInConflict = (function () {
    function Decision_CouldVaccineDosesBeInConflict() {
        this.label = "Could the two vaccine doses be in conflict";
    }
    Decision_CouldVaccineDosesBeInConflict.prototype.decide = function (context) {
        var facts = ruleBuilder.facts({});
        var rules = ruleBuilder.rules([
            []
        ]);
        return rules.evaluate();
    };
    return Decision_CouldVaccineDosesBeInConflict;
})();
exports.Decision_CouldVaccineDosesBeInConflict = Decision_CouldVaccineDosesBeInConflict;
var Decision_CurrentVaccineDoseInConflictWithPrevious = (function () {
    function Decision_CurrentVaccineDoseInConflictWithPrevious() {
        this.label = "Is the current vaccine dose administered in conflict with a previous vaccine dose administered?";
    }
    Decision_CurrentVaccineDoseInConflictWithPrevious.prototype.decide = function (context) {
        var facts = ruleBuilder.facts({});
        var rules = ruleBuilder.rules([
            []
        ]);
        return rules.evaluate();
    };
    return Decision_CurrentVaccineDoseInConflictWithPrevious;
})();
exports.Decision_CurrentVaccineDoseInConflictWithPrevious = Decision_CurrentVaccineDoseInConflictWithPrevious;
//# sourceMappingURL=decision_liveVirusInterval.js.map