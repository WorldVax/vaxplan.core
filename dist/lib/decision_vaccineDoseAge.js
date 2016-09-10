var Decider = require("./decider");
var text_1 = require("./text");
var ruleBuilder = new Decider.RuleBuilder();
var Decision_VaccineDoseAgeValid = (function () {
    function Decision_VaccineDoseAgeValid() {
        this.label = "Was the vaccine dose administered at a valid age?";
    }
    Decision_VaccineDoseAgeValid.prototype.decide = function (context) {
        var facts = ruleBuilder.facts({
            ADMINISTERED_BEFORE_ABSOLUTE_MINIMUM_AGE_DATE: function () { return context.administeredDate < context.absoluteMinimumAgeDate; },
            ADMINISTERED_ON_OR_AFTER_ABSOLUTE_MINIMUM_AGE_AND_BEFORE_MINIMUM_AGE: function () { return context.administeredDate >= context.absoluteMinimumAgeDate && context.administeredDate < context.minimumAgeDate; },
            ADMINISTERED_ON_OR_AFTER_MINIMUM_AGE_AND_BEFORE_MAXIMUM_AGE: function () { return context.administeredDate >= context.minimumAgeDate && context.absoluteMinimumAgeDate < context.maximumAgeDate; },
            ADMINISTERED_ON_OR_AFTER_MAXIMUM_AGE_DATE: function () { return context.administeredDate >= context.maximumAgeDate; },
            DOSE_IS_FIRST_DOSE: function () { return context.targetDoseNumber == 1; },
            PREVIOUS_VACCINE_DOSE_STATUS_INVALID_DUE_TO_AGE_OR_INTERVAL: function () { return context.previousDoseStatus == text_1.default.INVALID_AGE || context.previousDoseStatus == text_1.default.INVALID_INTERVAL; }
        });
        var rules = ruleBuilder.rules([
            [facts.ADMINISTERED_BEFORE_ABSOLUTE_MINIMUM_AGE_DATE,
                function () { return { ageIsValid: false, evaluationReason: text_1.default.TOO_YOUNG }; }],
            [facts.ADMINISTERED_ON_OR_AFTER_ABSOLUTE_MINIMUM_AGE_AND_BEFORE_MINIMUM_AGE,
                facts.DOSE_IS_FIRST_DOSE.not,
                facts.PREVIOUS_VACCINE_DOSE_STATUS_INVALID_DUE_TO_AGE_OR_INTERVAL,
                function () { return { ageIsValid: false, evaluationReason: text_1.default.TOO_YOUNG }; }],
            [facts.ADMINISTERED_ON_OR_AFTER_ABSOLUTE_MINIMUM_AGE_AND_BEFORE_MINIMUM_AGE,
                facts.DOSE_IS_FIRST_DOSE.not,
                facts.PREVIOUS_VACCINE_DOSE_STATUS_INVALID_DUE_TO_AGE_OR_INTERVAL.not,
                function () { return { ageIsValid: true, evaluationReason: text_1.default.GRACE_PERIOD }; }],
            [facts.ADMINISTERED_ON_OR_AFTER_ABSOLUTE_MINIMUM_AGE_AND_BEFORE_MINIMUM_AGE,
                facts.DOSE_IS_FIRST_DOSE,
                facts.PREVIOUS_VACCINE_DOSE_STATUS_INVALID_DUE_TO_AGE_OR_INTERVAL.not,
                function () { return { ageIsValid: true, evaluationReason: text_1.default.GRACE_PERIOD }; }],
            [facts.ADMINISTERED_ON_OR_AFTER_MINIMUM_AGE_AND_BEFORE_MAXIMUM_AGE,
                function () { return { ageIsValid: true, evaluationReason: text_1.default.VALID_AGE }; }],
            [facts.ADMINISTERED_ON_OR_AFTER_MAXIMUM_AGE_DATE,
                function () { return { ageIsValid: false, evaluationReason: text_1.default.TOO_OLD }; }]
        ]);
        return rules.evaluate();
    };
    return Decision_VaccineDoseAgeValid;
})();
exports.Decision_VaccineDoseAgeValid = Decision_VaccineDoseAgeValid;
//# sourceMappingURL=decision_vaccineDoseAge.js.map