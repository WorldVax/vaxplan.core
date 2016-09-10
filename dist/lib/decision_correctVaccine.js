var Decider = require("./decider");
var text_1 = require("./text");
var supportData_1 = require("./supportData");
var supportData = new supportData_1.default();
var ruleBuilder = new Decider.RuleBuilder();
var Decision_PreferableVaccineAdministered = (function () {
    function Decision_PreferableVaccineAdministered() {
        this.label = "Was the supporting data defined preferable vaccine administered?";
    }
    Decision_PreferableVaccineAdministered.prototype.decide = function (context) {
        var facts = ruleBuilder.facts({
            ADMINISTERED_VACCINE_TYPE_SAME_AS_PREFERRED: function () { return context.administeredVaccineType == context.preferableVaccineType; },
            ADMINISTERED_IN_PREFERABLE_VACCINE_TYPE_RANGE: function () { return context.vaccineTypeBeginAgeDate <= context.administeredDate && context.administeredDate < context.vaccineTypeEndAgeDate; },
            ADMINISTERED_TRADE_NAME_SAME_AS_PREFERRED: function () { return context.administeredTradeName == context.preferableVaccineTradeName; },
            ADMINISTERED_VOLUME_AT_LEAST_PREFERABLE_VOLUME: function () { return context.administeredVolume >= context.preferableVaccineVolume; }
        });
        var rules = ruleBuilder.rules([
            [facts.ADMINISTERED_VACCINE_TYPE_SAME_AS_PREFERRED,
                facts.ADMINISTERED_IN_PREFERABLE_VACCINE_TYPE_RANGE,
                facts.ADMINISTERED_TRADE_NAME_SAME_AS_PREFERRED,
                facts.ADMINISTERED_VOLUME_AT_LEAST_PREFERABLE_VOLUME,
                function () { return { preferableVaccineAdministered: true, evaluationReason: text_1.default.PREFERABLE_VACCINE_ADMINISTERED }; }],
            [facts.ADMINISTERED_VACCINE_TYPE_SAME_AS_PREFERRED,
                facts.ADMINISTERED_IN_PREFERABLE_VACCINE_TYPE_RANGE,
                facts.ADMINISTERED_TRADE_NAME_SAME_AS_PREFERRED,
                facts.ADMINISTERED_VOLUME_AT_LEAST_PREFERABLE_VOLUME.not,
                function () { return { preferableVaccineAdministered: true, evaluationReason: text_1.default.LESS_THAN_RECOMMENDED_VOLUME }; }],
            [facts.ADMINISTERED_VACCINE_TYPE_SAME_AS_PREFERRED.not,
                function () { return { preferableVaccineAdministered: false, evaluationReason: text_1.default.PREFERABLE_VACCINE_NOT_ADMINISTERED }; }],
            [facts.ADMINISTERED_VACCINE_TYPE_SAME_AS_PREFERRED,
                facts.ADMINISTERED_IN_PREFERABLE_VACCINE_TYPE_RANGE.not,
                function () { return { preferableVaccineAdministered: false, evaluationReason: text_1.default.VACCINE_ADMINISTERED_OUTSIDE_PREFERRED_AGE_RANGE }; }],
            [facts.ADMINISTERED_VACCINE_TYPE_SAME_AS_PREFERRED,
                facts.ADMINISTERED_IN_PREFERABLE_VACCINE_TYPE_RANGE,
                facts.ADMINISTERED_TRADE_NAME_SAME_AS_PREFERRED.not,
                function () { return { preferableVaccineAdministered: false, evaluationReason: text_1.default.PREFERABLE_VACCINE_WRONG_TRADENAME }; }],
        ]);
        return rules.evaluate();
    };
    return Decision_PreferableVaccineAdministered;
})();
exports.Decision_PreferableVaccineAdministered = Decision_PreferableVaccineAdministered;
var Decision_AllowableVaccineAdministered = (function () {
    function Decision_AllowableVaccineAdministered() {
        this.label = "Was the supporting data defined allowable vaccine administered?";
    }
    Decision_AllowableVaccineAdministered.prototype.decide = function (context) {
        var facts = ruleBuilder.facts({
            ADMINISTERED_VACCINE_TYPE_SAME_AS_ALLOWABLE: function () { return context.administeredVaccineType == context.allowableVaccineType; },
            ADMINISTERED_IN_ALLOWABLE_VACCINE_TYPE_RANGE: function () { return context.allowableVaccineTypeBeginAgeDate <= context.administeredDate && context.administeredDate < context.allowableVaccineTypeEndAgeDate; }
        });
        var rules = ruleBuilder.rules([
            [facts.ADMINISTERED_VACCINE_TYPE_SAME_AS_ALLOWABLE,
                facts.ADMINISTERED_IN_ALLOWABLE_VACCINE_TYPE_RANGE,
                function () { return { allowableVaccineAdministered: true }; }],
            [facts.ADMINISTERED_VACCINE_TYPE_SAME_AS_ALLOWABLE.not,
                function () { return { allowableVaccineAdministered: false }; }],
            [facts.ADMINISTERED_VACCINE_TYPE_SAME_AS_ALLOWABLE,
                facts.ADMINISTERED_IN_ALLOWABLE_VACCINE_TYPE_RANGE.not,
                function () { return { allowableVaccineAdministered: false, evaluationReason: text_1.default.VACCINE_ADMINISTERED_OUTSIDE_ALLOWED_AGE_RANGE }; }]
        ]);
        return rules.evaluate();
    };
    return Decision_AllowableVaccineAdministered;
})();
exports.Decision_AllowableVaccineAdministered = Decision_AllowableVaccineAdministered;
//# sourceMappingURL=decision_correctVaccine.js.map