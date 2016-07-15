/// <reference path="../typings/index.d.ts" />

import Cdsi = require("../lib/cdsi");

describe("The Can Evaluate Administered Dose decision", () => {
    it("should report false when...", () => {
        var decision = new Cdsi.Decision_VaccineDoseAgeValid();
        let context: Cdsi.IDecisionContext_VaccineDoseAgeValid;
        context = {
            administeredDate: new Date("2016-05-01"),
            absoluteMinimumAgeDate: null,
            maximumAgeDate: null,
            minimumAgeDate: null,
            previousDoseStatus: null,
            targetDoseNumber: null
        };

        let result: Cdsi.IDecisionOutcome_VaccineDoseAgeValid;
        result = decision.decide(context);
        expect(result).toBeDefined();
        expect(result.doseAgeIsValid).toEqual(false);
    });

    it("should report true when no rules are broken", () => {
        var decision = new Cdsi.Decision_VaccineDoseAgeValid();
        let context: Cdsi.IDecisionContext_VaccineDoseAgeValid;
        context = {
            administeredDate: new Date("2016-05-01"),
            absoluteMinimumAgeDate: null,
            maximumAgeDate: null,
            minimumAgeDate: null,
            previousDoseStatus: null,
            targetDoseNumber: null
        };

        let result: Cdsi.IDecisionOutcome_VaccineDoseAgeValid;
        result = decision.decide(context);
        expect(result).toBeDefined();
        expect(result.doseAgeIsValid).toEqual(true);
    });
})
