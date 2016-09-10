/// <reference path="../typings/index.d.ts" />
var Vaxplan = require("../lib/planner");
describe("The Can Evaluate Administered Dose decision", function () {
    it("should report false when there is a Dose Condition indicated", function () {
        var decision = new Vaxplan.Decision_CanEvaluateAdministeredDose();
        var context;
        context = {
            doseCondition: "Spoiled",
            lotExpirationDate: new Date("2015-12-31"),
            administeredDate: new Date("2016-05-01")
        };
        var result;
        result = decision.decide(context);
        expect(result).toBeDefined();
        expect(result.canBeEvaluated).toEqual(false);
    });
    it("should report false when the Administered Date is after the Lot Expiration Date", function () {
        var decision = new Vaxplan.Decision_CanEvaluateAdministeredDose();
        var context;
        context = {
            doseCondition: null,
            lotExpirationDate: new Date("2015-12-31"),
            administeredDate: new Date("2016-05-01")
        };
        var result;
        result = decision.decide(context);
        expect(result).toBeDefined();
        expect(result.canBeEvaluated).toEqual(false);
    });
    it("should report true when no rules are broken", function () {
        var decision = new Vaxplan.Decision_CanEvaluateAdministeredDose();
        var context;
        context = {
            doseCondition: null,
            lotExpirationDate: new Date("2027-12-31"),
            administeredDate: new Date("2016-05-01")
        };
        var result;
        result = decision.decide(context);
        expect(result).toBeDefined();
        expect(result.canBeEvaluated).toEqual(true);
    });
});
//# sourceMappingURL=decision_evalAdministeredDoseSpec.js.map