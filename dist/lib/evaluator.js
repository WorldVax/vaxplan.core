var AdministeredDoseEvaluator = (function () {
    function AdministeredDoseEvaluator() {
    }
    // 4.1 Can the vaccine dose administered be evaluated?
    AdministeredDoseEvaluator.prototype.canEvaluateAdministeredDose = function (context) {
        return true;
    };
    // 4.2 Can the target dose be skipped?
    AdministeredDoseEvaluator.prototype.canSkipTargeDose = function (context) {
        return true;
    };
    // 4.3 Was the dose administered at a valid age?
    AdministeredDoseEvaluator.prototype.isVaccineDoseAgeValid = function (context) {
        return true;
    };
    // 4.4 Was the dose administered at valid interval(s)?
    AdministeredDoseEvaluator.prototype.isVaccineDoseIntervalValid = function (context) {
        return true;
    };
    // 4.5 Was the dose adminstered at allowable interval(s)?
    AdministeredDoseEvaluator.prototype.isVaccineDoseIntervalAllowed = function (context) {
        return true;
    };
    // 4.6 Was the dose administered in conflict with any other vaccine doses administered?
    AdministeredDoseEvaluator.prototype.currentVaccineDoseInConflictWithPrevious = function (context) {
        return true;
    };
    AdministeredDoseEvaluator.prototype.shouldEvaluateLiveVirusConflict = function (context) {
        return true;
    };
    AdministeredDoseEvaluator.prototype.couldVaccineDoseBeInConflict = function (context) {
        return true;
    };
    // 4.7 Did the patient receive a preferable vaccine?
    AdministeredDoseEvaluator.prototype.preferableVaccineAdministered = function (context) {
        return true;
    };
    // 4.8 Did the patient receive an allowable vaccine?
    AdministeredDoseEvaluator.prototype.allowableVaccineAdministered = function (context) {
        return true;
    };
    // 4.9 Is the patient's gender one of the required genders?
    AdministeredDoseEvaluator.prototype.requiredGenderPresent = function (context) {
        return true;
    };
    return AdministeredDoseEvaluator;
})();
exports.AdministeredDoseEvaluator = AdministeredDoseEvaluator;
//# sourceMappingURL=evaluator.js.map