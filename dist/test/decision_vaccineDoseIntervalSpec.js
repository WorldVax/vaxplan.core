/// <reference path="../typings/index.d.ts" />
var Vaxplan = require("../lib/planner");
describe("The Vaccine Dose Interval decision", function () {
    xit("should report false when...", function () {
        var decision = new Vaxplan.Decision_VaccineDoseIntervalValid();
        var context;
        context = {
            administeredDate: new Date("2016-05-01"),
            absoluteMinimumIntervalDate: new Date("2016-05-10"),
            minimumIntervalDate: new Date("2016-05-15"),
            intervalFromImmediatePreviousDose: null,
            intervalFromTargetDoseNumberInSeries: null,
            intervalFromMostRecent: null,
            previousDoseStatus: null,
            targetDoseNumber: 1
        };
        var result;
        result = decision.decide(context);
        expect(result).toBeDefined();
        expect(result.doseIntervalIsValid).toEqual(false);
    });
    xit("should report true when no rules are broken", function () {
        var decision = new Vaxplan.Decision_VaccineDoseIntervalValid();
        var context;
        context = {
            administeredDate: new Date("2016-05-01"),
            absoluteMinimumIntervalDate: new Date("2016-05-10"),
            minimumIntervalDate: new Date("2016-05-15"),
            intervalFromImmediatePreviousDose: null,
            intervalFromTargetDoseNumberInSeries: null,
            intervalFromMostRecent: null,
            previousDoseStatus: null,
            targetDoseNumber: 1
        };
        var result;
        result = decision.decide(context);
        expect(result).toBeDefined();
        expect(result.doseIntervalIsValid).toEqual(true);
    });
});
//# sourceMappingURL=decision_vaccineDoseIntervalSpec.js.map