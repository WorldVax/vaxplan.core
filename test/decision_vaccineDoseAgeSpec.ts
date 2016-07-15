/// <reference path="../typings/index.d.ts" />

import Vaxplan = require("../lib/planner");

describe("The Can Evaluate Administered Dose decision", () => {
    it("should report false when...", () => {
        var decision = new Vaxplan.Decision_VaccineDoseAgeValid();
        let context: Vaxplan.IDecisionContext_VaccineDoseAgeValid;
        context = {
            administeredDate: new Date("2016-05-01"),
            absoluteMinimumAgeDate: null,
            maximumAgeDate: null,
            minimumAgeDate: null,
            previousDoseStatus: null,
            targetDoseNumber: null
        };

        let result: Vaxplan.IDecisionOutcome_VaccineDoseAgeValid;
        result = decision.decide(context);
        expect(result).toBeDefined();
        expect(result.doseAgeIsValid).toEqual(false);
    });

    it("should report true when no rules are broken", () => {
        var decision = new Vaxplan.Decision_VaccineDoseAgeValid();
        let context: Vaxplan.IDecisionContext_VaccineDoseAgeValid;
        context = {
            administeredDate: new Date("2016-05-01"),
            absoluteMinimumAgeDate: null,
            maximumAgeDate: null,
            minimumAgeDate: null,
            previousDoseStatus: null,
            targetDoseNumber: null
        };

        let result: Vaxplan.IDecisionOutcome_VaccineDoseAgeValid;
        result = decision.decide(context);
        expect(result).toBeDefined();
        expect(result.doseAgeIsValid).toEqual(true);
    });
})
