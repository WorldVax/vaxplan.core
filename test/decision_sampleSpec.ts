/// <reference path="../typings/index.d.ts" />

import Decider = require("../lib/decider");

function pieFacts(kind: string, calories: number)
{
    return { kind: kind, calories: calories };
}

var pies = {
    chocolatePie : pieFacts("chocolate", 300),
    perfectPie : pieFacts("apple", 299),
    tooRichPie : pieFacts("apple", 800),
    regrettablePie : pieFacts("apple", 450)
};

describe("A decision about what pie to eat", () => {
    var reasons = {
        I_DONT_LIKE_THAT_PIE: "I only like apple pie.",
        THAT_PIE_IS_TOO_RICH: "I don't care what kind of pie it is--that's too rich!",
        I_WILL_REGRET_IT_LATER: "I'll take some of that pie, but I'll regret it later.",
        YES_THAT_PIE_IS_PERFECT: "That's the perfect pie--I'll have some with no regrets!"
    };

    function decideAboutPie(pie: any) {
        var ruleBuilder = new Decider.RuleBuilder();
        var facts = ruleBuilder.facts({
            PIE_IS_APPLE: () => pie.kind.toUpperCase() == "APPLE",
            PIE_IS_LOW_CALORIES: () => pie.calories < 300,
            PIE_IS_MEDIUM_CALORIES: () => pie.calories >= 300 && pie.calories < 500,
            PIE_IS_HIGH_CALORIES: () => pie.calories >= 500
        });
        var rules = ruleBuilder.rules([
            [facts.PIE_IS_APPLE.not(), () => { return { wantSome: false, regrettable: false, reason: reasons.I_DONT_LIKE_THAT_PIE } } ],
            [facts.PIE_IS_HIGH_CALORIES, () => { return { wantSome: false, regrettable: false, reason: reasons.THAT_PIE_IS_TOO_RICH } } ],
            [facts.PIE_IS_APPLE, facts.PIE_IS_MEDIUM_CALORIES, () => { return { wantSome: true, regrettable: true, reason: reasons.I_WILL_REGRET_IT_LATER } } ],
            [facts.PIE_IS_APPLE, facts.PIE_IS_LOW_CALORIES, () => { return { wantSome: true, regrettable: false, reason: reasons.YES_THAT_PIE_IS_PERFECT } } ]
        ]);
        return rules.evaluate();
    }

    it("should decide that a pie that is not APPLE is not wanted", () => {
        var result = decideAboutPie(pies.chocolatePie);
        expect(result).toBeDefined();
        expect(result.wantSome).toEqual(false);
        expect(result.reason).toEqual(reasons.I_DONT_LIKE_THAT_PIE);
    });

    it("should decide that pie that has too many calories is not wanted", () => {
        var result = decideAboutPie(pies.tooRichPie);
        expect(result).toBeDefined();
        expect(result.wantSome).toEqual(false);
        expect(result.reason).toEqual(reasons.THAT_PIE_IS_TOO_RICH);
    });

    it("should decide that pie that has medium calories will be regretted", () => {
        var result = decideAboutPie(pies.regrettablePie);
        expect(result).toBeDefined();
        expect(result.wantSome).toEqual(true);
        expect(result.regrettable).toEqual(true);
        expect(result.reason).toEqual(reasons.I_WILL_REGRET_IT_LATER);
    });

    it("should decide that my favorite pie with low calories is wanted and will not be regretted", () => {
        var result = decideAboutPie(pies.perfectPie);
        expect(result).toBeDefined();
        expect(result.wantSome).toEqual(true);
        expect(result.regrettable).toEqual(false);
        expect(result.reason).toEqual(reasons.YES_THAT_PIE_IS_PERFECT);
    });
});
