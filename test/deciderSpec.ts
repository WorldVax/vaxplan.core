/// <reference path="../typings/index.d.ts" />

import Decider = require("../lib/decider");

describe("Rule Builder facts", () => {
    it("should return a Factoid having a fact name equal to the input object's property name", () => {
        var ruleBuilder = new Decider.RuleBuilder();
        var facts = ruleBuilder.facts({
            TRUE_FACT : () => true
        });
        expect(facts).toBeDefined();
        expect(facts.TRUE_FACT).toBeDefined();
    });

    it("should return a Factoid for every predicate in the input", () => {
        var ruleBuilder = new Decider.RuleBuilder();
        var inputFacts = {
            FACT1 : () => true,
            FACT2 : () => false
        };
        var facts = ruleBuilder.facts(inputFacts);
        expect(facts).toBeDefined();
        expect(facts.FACT1).toBeDefined();
        expect(facts.FACT2).toBeDefined();
        expect(facts.FACT2.factName).toBeDefined();
        expect(facts.FACT2.factName).toEqual("FACT2");
        expect(facts.FACT2.not).toBeDefined();
        expect(typeof facts.FACT2.not).toEqual("function");
    });
});

describe('RuleSet with a default outcome', () => {
    it('should be the output of the final element in the rule definition array', () => {
        let outcomeFunc = () => "Default value";
        var ruleBuilder = new Decider.RuleBuilder();
        var ruleSet = ruleBuilder.rules([
            [outcomeFunc]
        ]);

        var firstRule =  ruleSet.rules[0];
        expect(firstRule).toBeDefined();
        expect(firstRule.outcomeFunc).toBe(outcomeFunc);

        var result = ruleSet.evaluate();
        expect(result).toEqual(outcomeFunc());
    });

    it('should use the last item in the rule definition array as the outcome function', () => {
        let outcomeFunc = () => "Outcome";
        
        var ruleBuilder = new Decider.RuleBuilder();
        
        var facts = ruleBuilder.facts({
            TRUE_FACT1: () => true,
            TRUE_FACT2: () => true
        });

        var ruleSet = ruleBuilder.rules([
            [facts.TRUE_FACT1, facts.TRUE_FACT2, outcomeFunc],
            [() => "Failed. This rule should not be hit."]
        ]);

        var result = ruleSet.evaluate();

        expect(ruleSet.rules[0]).toBeDefined();
        expect(ruleSet.rules[0].outcomeFunc).toBe(outcomeFunc);
        expect(result).toEqual(outcomeFunc());

    });

    it('should return the default outcome if prior rules are not satisfied', () => {
        var ruleBuilder = new Decider.RuleBuilder();
        var facts = ruleBuilder.facts({
            TRUE_FACT: () => true,
            FALSE_FACT: () => false
        });
        var ruleSet = ruleBuilder.rules([
            [facts.TRUE_FACT, facts.FALSE_FACT, () => "Failed. This should not be the outcome."],
            [() => "Success. It worked!"]
        ]);
        var result = ruleSet.evaluate();
        expect(ruleSet.rules[0].evaluate()).toEqual(false);
        expect(ruleSet.rules[1].evaluate()).toEqual(true);
        expect(result).toEqual("Success. It worked!");
    });
});

describe('Factoids using the not operator', () => {
    it('should present the opposite value from the original Factoid', () => {
    });
});

describe('Rules built from two Factoids using the or() operator', () => {
    it('should be true when the first condition is true', () => {
        var ruleBuilder = new Decider.RuleBuilder();
        var facts = ruleBuilder.facts({
            FACT1 : () => true,
            FACT2 : () => false
        });

        var ruleSet = ruleBuilder.rules([
            [facts.FACT1.or(facts.FACT2), () => "It worked!"],
            [() => "Failure - default was hit!"]
        ]);

        var result = ruleSet.evaluate();

        expect(result).toEqual("It worked!");
    });

    it('should be true when the second condition is true', () => {
        var ruleBuilder = new Decider.RuleBuilder();
        var facts = ruleBuilder.facts({
            FACT1 : () => false,
            FACT2 : () => true
        });

        var ruleSet = ruleBuilder.rules([
            [facts.FACT1.or(facts.FACT2), () => "It worked!"],
            [() => "Failure - default was hit!"]
        ]);

        var result = ruleSet.evaluate();

        expect(result).toEqual("It worked!");
    });

    it('should be true when both conditions are true', () => {
        var ruleBuilder = new Decider.RuleBuilder();
        var facts = ruleBuilder.facts({
            FACT1 : () => true,
            FACT2 : () => true
        });

        var ruleSet = ruleBuilder.rules([
            [facts.FACT1.or(facts.FACT2), () => "It worked!"],
            [() => "Failure - default was hit!"]
        ]);

        var result = ruleSet.evaluate();

        expect(result).toEqual("It worked!");
    });

    it('should skip evaluation of the second Factoid if the first one is true', () => {
        var ruleBuilder = new Decider.RuleBuilder();
        var facts = ruleBuilder.facts({
            FACT1 : () => true,
            FACT2 : () => false
        });

        var ruleSet = ruleBuilder.rules([
            [facts.FACT1.or(facts.FACT2), () => "It worked!"],
            [() => "Failure - default was hit!"]
        ]);

        var result = ruleSet.evaluate();

        expect(facts.FACT1).toBeDefined();
        expect(facts.FACT1['result']).toBeDefined();
        expect(facts.FACT1['result']).toEqual(true);
        expect(facts.FACT2).toBeDefined();
        expect(facts.FACT2['result']).toBeUndefined();
    });
});

describe('Rules built from multiple conditions', () => {
    it('should fail a rule if any of the conditions are not met', () => {

    });

    it('should indicate that a condition is met when at least one of the conditions as true', () => {
        var ruleBuilder = new Decider.RuleBuilder();

        var facts = ruleBuilder.facts({
            FACT1 : () => true,
            FACT2 : () => false
        });

        var defaultValue = "The rule failed. This is the default.";

        var ruleSet = ruleBuilder.rules([
            [facts.FACT1, facts.FACT2, () => "The rule worked!"],
            [() => defaultValue]
        ]);

        var ruleResult = ruleSet.evaluate();

        console.log('*************************************');
        console.log("Is at least one of the rules true?");
        console.dir(ruleSet);
        console.log('*************************************');

        expect(ruleSet.rules).toBeDefined();
        expect(ruleSet.rules.length).toEqual(2);
        expect(ruleSet.rules[0].evaluate()).toEqual(false);
        expect(ruleSet.rules[1].evaluate()).toEqual(true);

        expect(ruleResult).toEqual(defaultValue);
    });
});
