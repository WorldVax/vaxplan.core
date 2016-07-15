/// <reference path="../typings/index.d.ts" />

import Cdsi = require("../lib/cdsi");

describe("The Vaccine Dose Interval decision", () => {
    it("should report false when...", () => {
        var decision = new Cdsi.Decision_VaccineDoseIntervalValid();
        let context: Cdsi.IDecisionContext_VaccineDoseIntervalValid;
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

        let result: Cdsi.IDecisionOutcome_VaccineDoseIntervalValid;
        result = decision.decide(context);
        expect(result).toBeDefined();
        expect(result.doseIntervalIsValid).toEqual(false);
    });

    it("should report true when no rules are broken", () => {
        var decision = new Cdsi.Decision_VaccineDoseIntervalValid();
        let context: Cdsi.IDecisionContext_VaccineDoseIntervalValid;
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

        let result: Cdsi.IDecisionOutcome_VaccineDoseIntervalValid;
        result = decision.decide(context);
        expect(result).toBeDefined();
        expect(result.doseIntervalIsValid).toEqual(true);
    });
})
