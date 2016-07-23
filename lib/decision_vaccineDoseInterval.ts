import * as Timing from "./timing"
import * as Decider from "./decider";
import Text from "./text";
import Values from "./values";

let ruleBuilder = new Decider.RuleBuilder(); 

export interface IDecisionContext_VaccineDoseIntervalValid {
	administeredDate: Date;
	intervalFromImmediatePreviousDose: Timing.IInterval;
	intervalFromTargetDoseNumberInSeries: Timing.IInterval;
	intervalFromMostRecent: Timing.IInterval;
	absoluteMinimumIntervalDate: Date;
	minimumIntervalDate: Date;
	// not included in spec attribute table
	targetDoseNumber: number;
	previousDoseStatus: string;
}

export interface IDecisionOutcome_VaccineDoseIntervalValid {
	doseIntervalIsValid: boolean;
	evaluationReason?: string;
}

export class Decision_VaccineDoseIntervalValid implements Decider.IDecision<IDecisionContext_VaccineDoseIntervalValid, IDecisionOutcome_VaccineDoseIntervalValid> {
	label = "Was the vaccine dose administered at a valid age?";
	decide(context:IDecisionContext_VaccineDoseIntervalValid) {
		var facts = ruleBuilder.facts({
			ADMINISTERED_BEFORE_ABSOLUTE_MINIMUM_INTERVAL_DATE:
				() => context.administeredDate < context.absoluteMinimumIntervalDate,
			ADMINISTERED_ON_OR_AFTER_ABSOLUTE_MINIMUM_INTERVAL_AND_BEFORE_MINIMUM_INTERVAL:
				() => context.administeredDate >= context.absoluteMinimumIntervalDate && context.administeredDate < context.minimumIntervalDate,
			ADMINISTERED_ON_OR_AFTER_MINIMUM_INTERVAL:
				() => context.administeredDate >= context.minimumIntervalDate,
			DOSE_IS_FIRST_DOSE:
				() => context.targetDoseNumber == Values.DOSE_NUMBER_1,
			PREVIOUS_DOSE_STATUS_INVALID_AGE_OR_INTERVAL:
				() => [Text.INVALID_AGE, Text.INVALID_INTERVAL].some((status) => context.previousDoseStatus == status)
		});
		
		var outcomes = {
			gracePeriod : () => { return { doseIntervalIsValid: true, evaluationReason: Text.GRACE_PERIOD }; },
			tooSoon : () => { return { doseIntervalIsValid : false, evaluationReason : Text.TOO_SOON } },
			validInterval : () => { return { doseIntervalIsValid: true, evaluationReason: Text.VALID_INTERVAL } }
		};
		
		var rules = ruleBuilder.rules([
			[facts.ADMINISTERED_BEFORE_ABSOLUTE_MINIMUM_INTERVAL_DATE,
				outcomes.tooSoon],
			[facts.ADMINISTERED_ON_OR_AFTER_ABSOLUTE_MINIMUM_INTERVAL_AND_BEFORE_MINIMUM_INTERVAL,
				facts.DOSE_IS_FIRST_DOSE.not,
				facts.PREVIOUS_DOSE_STATUS_INVALID_AGE_OR_INTERVAL,
				outcomes.tooSoon],
			[facts.ADMINISTERED_ON_OR_AFTER_ABSOLUTE_MINIMUM_INTERVAL_AND_BEFORE_MINIMUM_INTERVAL,
				facts.DOSE_IS_FIRST_DOSE.not,
				facts.PREVIOUS_DOSE_STATUS_INVALID_AGE_OR_INTERVAL.not,
				outcomes.gracePeriod],
			[facts.ADMINISTERED_ON_OR_AFTER_ABSOLUTE_MINIMUM_INTERVAL_AND_BEFORE_MINIMUM_INTERVAL,
				facts.DOSE_IS_FIRST_DOSE.not,
				outcomes.gracePeriod],
			[facts.ADMINISTERED_ON_OR_AFTER_MINIMUM_INTERVAL,
				outcomes.validInterval],
			// Should there be a default here? Is valid the right answer?
			[outcomes.validInterval]
		]);
		
		return rules.evaluate();
	}	
}


export interface IDecisionContext_VaccineDoseIntervalAllowed {
	administeredDate: Date;
	intervalFromImmediatePreviousDose: Timing.IInterval;
	intervalFromTargetDoseNumberInSeries: Timing.IInterval;
	absoluteMinimumIntervalDate: Date;
}

export interface IDecisionOutcome_VaccineDoseIntervalAllowed {
	doseIntervalIsAllowed: boolean;
	evaluationReason? : string;
}

export class Decision_VaccineDoseIntervalAllowed implements Decider.IDecision<IDecisionContext_VaccineDoseIntervalAllowed, IDecisionOutcome_VaccineDoseIntervalAllowed> {
	label = "Was the vaccine dose administered at allowable interval(s)?";
    decide(context: IDecisionContext_VaccineDoseIntervalAllowed) {
        var facts = ruleBuilder.facts({
            ADMINISTERED_BEFORE_ABSOLUTE_MINIMUM_INTERVAL_DATE : () => context.administeredDate < context.absoluteMinimumIntervalDate
        });

        var rules = ruleBuilder.rules([
            [facts.ADMINISTERED_BEFORE_ABSOLUTE_MINIMUM_INTERVAL_DATE, () => { return { doseIntervalIsAllowed : false, evaluationReason: Text.TOO_SOON }; }],
			[() => { return { doseIntervalIsAllowed : true, evaluationReason: Text.ALLOWED_INTERVAL }; }]
        ])

        return rules.evaluate();
    }
}