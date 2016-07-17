import * as Timing from "./timing"
import * as Decider from "./decider";
import Text from "./text";
import Values from "./values";
import SupportData from "./supportData";

let supportData = new SupportData();
let ruleBuilder = new Decider.RuleBuilder(); 

export interface IDecisionContext_ShouldEvaluateLiveVirusConflict {
	administeredDate: Date;
    conflictBeginIntervalDate: Date;
    conflictEndIntervalDate: Date;
    currentVaccineType: string;
    previousVaccineType: string;
}

export interface IDecisionOutcome_ShouldEvaluateLiveVirusConflict {
    shouldEvaluateLiveVirusConflict: boolean;
    evaluationReason?: string;
}

export class Decision_ShouldEvaluateLiveVirusConflict implements Decider.IDecision<IDecisionContext_ShouldEvaluateLiveVirusConflict, IDecisionOutcome_ShouldEvaluateLiveVirusConflict> {
    label = "Should the current vaccine dose administered be evaluated for a live virus conflict?"
    decide(context: IDecisionContext_ShouldEvaluateLiveVirusConflict) {
        var facts = ruleBuilder.facts({
            CURRENT_IS_DEFINED_AS_LIVE: () => supportData.vaccineTypeIsDefinedLiveVirus(context.currentVaccineType),
            PREVIOUS_IS_DEFINED_AS_LIVE: () => supportData.vaccineTypeIsDefinedLiveVirus(context.previousVaccineType)
        });

        var rules = ruleBuilder.rules([
            [facts.CURRENT_IS_DEFINED_AS_LIVE, facts.PREVIOUS_IS_DEFINED_AS_LIVE,
                () => { return { shouldEvaluateLiveVirusConflict: true }; }],
            [() => { return { shouldEvaluateLiveVirusConflict: false }; }]
        ]);

        return rules.evaluate();
    }
}

export interface IDecisionContext_CouldVaccineDosesBeInConflict {

}

export interface IDecisionOutcome_CouldVaccineDosesBeInConflict {
    
}

export class Decision_CouldVaccineDosesBeInConflict implements Decider.IDecision<IDecisionContext_CouldVaccineDosesBeInConflict, IDecisionOutcome_CouldVaccineDosesBeInConflict> {
    label = "Could the two vaccine doses be in conflict";
    decide(context: IDecisionContext_CouldVaccineDosesBeInConflict) {
        var facts = ruleBuilder.facts({
        });

        var rules = ruleBuilder.rules([
            []
        ]);

        return rules.evaluate();
    }
}

export interface IDecisionContext_CurrentVaccineDoseInConflictWithPrevious {

}

export interface IDecisionOutcome_CurrentVaccineDoseInConflictWithPrevious {

}

export class Decision_CurrentVaccineDoseInConflictWithPrevious implements Decider.IDecision<IDecisionContext_CurrentVaccineDoseInConflictWithPrevious, IDecisionOutcome_CurrentVaccineDoseInConflictWithPrevious> {
    label = "Is the current vaccine dose administered in conflict with a previous vaccine dose administered?";
    decide(context: IDecisionContext_CurrentVaccineDoseInConflictWithPrevious) {
        var facts = ruleBuilder.facts({
        });

        var rules = ruleBuilder.rules([
            []
        ]);

        return rules.evaluate();
    }
}

