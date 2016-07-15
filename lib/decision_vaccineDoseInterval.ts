import * as Timing from "./timing"
import Decider = require("./decider");

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
}

export class Decision_VaccineDoseIntervalValid implements Decider.IDecision<IDecisionContext_VaccineDoseIntervalValid, IDecisionOutcome_VaccineDoseIntervalValid> {
	label = "Was the vaccine dose administered at a valid age?";
	decide(context:IDecisionContext_VaccineDoseIntervalValid) {
		var facts = ruleBuilder.facts({
			DATE_ADMINISTERED_BEFORE_ABSOLUTE_MINIMUM_INTERVAL_DATE:
				() => context.administeredDate < context.absoluteMinimumIntervalDate,
			DATE_ADMINISTERED_ON_OR_AFTER_ABSOLUTE_MINIMUM_INTERVAL_AND_BEFORE_MINIMUM_INTERVAL:
				() => context.administeredDate >= context.absoluteMinimumIntervalDate && context.administeredDate < context.minimumIntervalDate,
			DATE_ADMINISTERED_ON_OR_AFTER_MINIMUM_INTERVAL:
				() => context.administeredDate >= context.minimumIntervalDate,
			DOSE_IS_FIRST_DOSE:
				() => context.targetDoseNumber == 1,
			PREVIOUS_VACCINE_DOSE_STATUS_INVALID_DUE_TO_AGE_OR_INTERVAL:
				() => context.previousDoseStatus == "INVALID AGE" || context.previousDoseStatus == "INVALID INTERVAL"
		});
		
		var intervalInvalid = () => { return { doseIntervalIsValid : false } };
		
		var rules = ruleBuilder.rules([
			[facts.DATE_ADMINISTERED_BEFORE_ABSOLUTE_MINIMUM_INTERVAL_DATE, intervalInvalid],
			[facts.DATE_ADMINISTERED_ON_OR_AFTER_ABSOLUTE_MINIMUM_INTERVAL_AND_BEFORE_MINIMUM_INTERVAL, intervalInvalid],
			[facts.DATE_ADMINISTERED_ON_OR_AFTER_MINIMUM_INTERVAL, intervalInvalid],
			[facts.DOSE_IS_FIRST_DOSE, intervalInvalid],
			[facts.PREVIOUS_VACCINE_DOSE_STATUS_INVALID_DUE_TO_AGE_OR_INTERVAL, intervalInvalid]
		]);
		
		return rules.evaluate();
	}	
}
