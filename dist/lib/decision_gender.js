var Decider = require("./decider");
var text_1 = require("./text");
var ruleBuilder = new Decider.RuleBuilder();
var Decision_RequiredGenderPresent = (function () {
    function Decision_RequiredGenderPresent() {
        this.label = "Is the patient's gender one of the required genders?";
    }
    Decision_RequiredGenderPresent.prototype.decide = function (context) {
        var facts = ruleBuilder.facts({
            REQUIRED_GENDER_PRESENT: function () { return !context.requiredGenders || !context.requiredGenders.length || context.requiredGenders.some(function (gender) { return gender == context.patientGender; }); }
        });
        var rules = ruleBuilder.rules([
            [facts.REQUIRED_GENDER_PRESENT, function () { return { requiredGenderIsSatisfied: true, evaluationReason: text_1.default.CORRECT_GENDER }; }],
            [function () { return { requiredGenderIsSatisfied: false, evaluationReason: text_1.default.INCORRECT_GENDER }; }]
        ]);
        return rules.evaluate();
    };
    return Decision_RequiredGenderPresent;
})();
exports.Decision_RequiredGenderPresent = Decision_RequiredGenderPresent;
//# sourceMappingURL=decision_gender.js.map