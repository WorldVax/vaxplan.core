var Decider = require("./decider");
var text_1 = require("./text");
var values_1 = require("./values");
var ruleBuilder = new Decider.RuleBuilder();
var Decision_VaccineDoseIntervalValid = (function () {
    function Decision_VaccineDoseIntervalValid() {
        this.label = "Was the vaccine dose administered at a valid age?";
    }
    Decision_VaccineDoseIntervalValid.prototype.decide = function (context) {
        var facts = ruleBuilder.facts({
            ADMINISTERED_BEFORE_ABSOLUTE_MINIMUM_INTERVAL_DATE: function () { return context.administeredDate < context.absoluteMinimumIntervalDate; },
            ADMINISTERED_ON_OR_AFTER_ABSOLUTE_MINIMUM_INTERVAL_AND_BEFORE_MINIMUM_INTERVAL: function () { return context.administeredDate >= context.absoluteMinimumIntervalDate && context.administeredDate < context.minimumIntervalDate; },
            ADMINISTERED_ON_OR_AFTER_MINIMUM_INTERVAL: function () { return context.administeredDate >= context.minimumIntervalDate; },
            DOSE_IS_FIRST_DOSE: function () { return context.targetDoseNumber == values_1.default.DOSE_NUMBER_1; },
            PREVIOUS_DOSE_STATUS_INVALID_AGE_OR_INTERVAL: function () { return [text_1.default.INVALID_AGE, text_1.default.INVALID_INTERVAL].some(function (status) { return context.previousDoseStatus == status; }); }
        });
        var outcomes = {
            gracePeriod: function () { return { doseIntervalIsValid: true, evaluationReason: text_1.default.GRACE_PERIOD }; },
            tooSoon: function () { return { doseIntervalIsValid: false, evaluationReason: text_1.default.TOO_SOON }; },
            validInterval: function () { return { doseIntervalIsValid: true, evaluationReason: text_1.default.VALID_INTERVAL }; }
        };
        var rules = ruleBuilder.rules([
            [facts.ADMINISTERED_BEFORE_ABSOLUTE_MINIMUM_INTERVAL_DATE,
                outcomes.tooSoon],
            [facts.ADMINISTERED_ON_OR_AFTER_ABSOLUTE_MINIMUM_INTERVAL_AND_BEFORE_MINIMUM_INTERVAL,
                facts.DOSE_IS_FIRST_DOSE.not,
                facts.PREVIOUS_DOSE_STATUS_INVALID_AGE_OR_INTERVAL,
                outcomes.tooSoon],
            [facts.ADMINISTERED_ON_OR_AFTER_ABSOLUTE_MINIMUM_INTERVAL_AND_BEFORE_MINIMUM_INTERVAL,
                facts.DOSE_IS_FIRST_DOSE.not,
                facts.PREVIOUS_DOSE_STATUS_INVALID_AGE_OR_INTERVAL.not,
                outcomes.gracePeriod],
            [facts.ADMINISTERED_ON_OR_AFTER_ABSOLUTE_MINIMUM_INTERVAL_AND_BEFORE_MINIMUM_INTERVAL,
                facts.DOSE_IS_FIRST_DOSE.not,
                outcomes.gracePeriod],
            [facts.ADMINISTERED_ON_OR_AFTER_MINIMUM_INTERVAL,
                outcomes.validInterval],
            // Should there be a default here? Is valid the right answer?
            [outcomes.validInterval]
        ]);
        return rules.evaluate();
    };
    return Decision_VaccineDoseIntervalValid;
})();
exports.Decision_VaccineDoseIntervalValid = Decision_VaccineDoseIntervalValid;
var Decision_VaccineDoseIntervalAllowed = (function () {
    function Decision_VaccineDoseIntervalAllowed() {
        this.label = "Was the vaccine dose administered at allowable interval(s)?";
    }
    Decision_VaccineDoseIntervalAllowed.prototype.decide = function (context) {
        var facts = ruleBuilder.facts({
            ADMINISTERED_BEFORE_ABSOLUTE_MINIMUM_INTERVAL_DATE: function () { return context.administeredDate < context.absoluteMinimumIntervalDate; }
        });
        var rules = ruleBuilder.rules([
            [facts.ADMINISTERED_BEFORE_ABSOLUTE_MINIMUM_INTERVAL_DATE, function () { return { doseIntervalIsAllowed: false, evaluationReason: text_1.default.TOO_SOON }; }],
            [function () { return { doseIntervalIsAllowed: true, evaluationReason: text_1.default.ALLOWED_INTERVAL }; }]
        ]);
        return rules.evaluate();
    };
    return Decision_VaccineDoseIntervalAllowed;
})();
exports.Decision_VaccineDoseIntervalAllowed = Decision_VaccineDoseIntervalAllowed;
//# sourceMappingURL=decision_vaccineDoseInterval.js.map