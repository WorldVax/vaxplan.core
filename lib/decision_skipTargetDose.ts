import * as Timing from "./timing"
import * as Decider from "./decider";
import Text from "./text";
import Values from "./values";
import SupportData from "./supportData";

let supportData = new SupportData();
let ruleBuilder = new Decider.RuleBuilder(); 

export interface IDecisionContext_CanSkipTargetDose {
    administeredDate: Date;
    assessmentDate: Date;
    administeredDoseCount: number;
    conditionalSkipBeginAgeDate: Date;
    conditionalSkipEndAgeDate: Date;
    conditionalSkipIntervalDate: Date;
    conditionalSkipStartDate: Date;
    conditionalSkipEndDate: Date;
    conditionalSkipDoseType: string;
    conditionalSkipDoseCountLogic : string;
    conditionalSkipDoseCount: number;
}

export interface IDecisionOutcome_CanSkipTargetDose {
    canBeSkipped: boolean;
    evaluationReason?: string;
}

export class Decision_CanSkipTargetDose implements Decider.IDecision<IDecisionContext_CanSkipTargetDose, IDecisionOutcome_CanSkipTargetDose> {
    label = "Can the target dose be skipped?";
    decide(context: IDecisionContext_CanSkipTargetDose) {
        var facts = ruleBuilder.facts({
            
        });

        var rules = ruleBuilder.rules([
            []
        ])

        return rules.evaluate();
    }
}

