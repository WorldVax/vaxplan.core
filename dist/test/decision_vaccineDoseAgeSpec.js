/// <reference path="../typings/index.d.ts" />
var Vaxplan = require("../lib/planner");
describe("The Vaccine Dose Age decision", function () {
    xit("should report false when...", function () {
        var decision = new Vaxplan.Decision_VaccineDoseAgeValid();
        var context;
        context = {
            administeredDate: new Date("2016-05-01"),
            absoluteMinimumAgeDate: null,
            maximumAgeDate: null,
            minimumAgeDate: null,
            previousDoseStatus: null,
            targetDoseNumber: null
        };
        var result;
        result = decision.decide(context);
        expect(result).toBeDefined();
        expect(result.doseAgeIsValid).toEqual(false);
    });
    xit("should report true when no rules are broken", function () {
        var decision = new Vaxplan.Decision_VaccineDoseAgeValid();
        var context;
        context = {
            administeredDate: new Date("2016-05-01"),
            absoluteMinimumAgeDate: null,
            maximumAgeDate: null,
            minimumAgeDate: null,
            previousDoseStatus: null,
            targetDoseNumber: null
        };
        var result;
        result = decision.decide(context);
        expect(result).toBeDefined();
        expect(result.doseAgeIsValid).toEqual(true);
    });
});
//# sourceMappingURL=decision_vaccineDoseAgeSpec.js.map