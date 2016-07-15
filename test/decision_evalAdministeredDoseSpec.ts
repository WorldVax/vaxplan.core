/// <reference path="../typings/index.d.ts" />

import Cdsi = require("../lib/cdsi");

describe("The Can Evaluate Administered Dose decision", () => {
    it("should report false when there is a Dose Condition indicated", () => {
        var decision = new Cdsi.Decision_CanEvaluateAdministeredDose();
        let context: Cdsi.IDecisionContext_AdministeredDoseCanBeEvaluated;
        context = {
            doseCondition: "Spoiled",
            lotExpirationDate: new Date("2015-12-31"),
            administeredDate: new Date("2016-05-01")
        };

        let result: Cdsi.IDecisionOutcome_AdministeredDoseCanBeEvaluated;
        result = decision.decide(context);
        expect(result).toBeDefined();
        expect(result.canBeEvaluated).toEqual(false);
    });

    it("should report false when the Administered Date is after the Lot Expiration Date", () => {
        var decision = new Cdsi.Decision_CanEvaluateAdministeredDose();
        let context: Cdsi.IDecisionContext_AdministeredDoseCanBeEvaluated;
        context = {
            doseCondition: null,
            lotExpirationDate: new Date("2015-12-31"),
            administeredDate: new Date("2016-05-01")
        };

        let result: Cdsi.IDecisionOutcome_AdministeredDoseCanBeEvaluated;
        result = decision.decide(context);
        expect(result).toBeDefined();
        expect(result.canBeEvaluated).toEqual(false);
    });

    it("should report true when no rules are broken", () => {
        var decision = new Cdsi.Decision_CanEvaluateAdministeredDose();
        let context: Cdsi.IDecisionContext_AdministeredDoseCanBeEvaluated;
        context = {
            doseCondition: null,
            lotExpirationDate: new Date("2027-12-31"),
            administeredDate: new Date("2016-05-01")
        };

        let result: Cdsi.IDecisionOutcome_AdministeredDoseCanBeEvaluated;
        result = decision.decide(context);
        expect(result).toBeDefined();
        expect(result.canBeEvaluated).toEqual(true);
    });
})
