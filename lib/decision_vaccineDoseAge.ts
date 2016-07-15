import * as Decider from "./decider";

let ruleBuilder = new Decider.RuleBuilder(); 

export interface IDecisionContext_VaccineDoseAgeValid extends Decider.IContext {
	administeredDate: Date;
	maximumAgeDate?: Date;
	minimumAgeDate?: Date;
	absoluteMinimumAgeDate?: Date;
	// not included in spec attribute table
	targetDoseNumber: number;
	previousDoseStatus: string;
}

export interface IDecisionOutcome_VaccineDoseAgeValid {
	doseAgeIsValid: boolean;
}

export class Decision_VaccineDoseAgeValid implements Decider.IDecision<IDecisionContext_VaccineDoseAgeValid, IDecisionOutcome_VaccineDoseAgeValid> {
	label = "Was the vaccine dose administered at a valid age?";
	decide(context:IDecisionContext_VaccineDoseAgeValid) {
		var facts = ruleBuilder.facts({
			DATE_ADMINISTERED_BEFORE_ABSOLUTE_MINIMUM_AGE_DATE:
				() => context.administeredDate < context.absoluteMinimumAgeDate,
			DATE_ADMINISTERED_ON_OR_AFTER_ABSOLUTE_MINIMUM_AGE_AND_BEFORE_MINIMUM_AGE:
				() => context.administeredDate >= context.absoluteMinimumAgeDate && context.administeredDate < context.minimumAgeDate,
			DATE_ADMINISTERED_ON_OR_AFTER_MINIMUM_AGE_AND_BEFORE_MAXIMUM_AGE:
				() => context.administeredDate >= context.minimumAgeDate && context.absoluteMinimumAgeDate < context.maximumAgeDate,
			DATE_ADMINISTERED_ON_OR_AFTER_MAXIMUM_AGE_DATE:
				() => context.administeredDate >= context.maximumAgeDate,
			DOSE_IS_FIRST_DOSE:
				() => context.targetDoseNumber == 1,
			PREVIOUS_VACCINE_DOSE_STATUS_INVALID_DUE_TO_AGE_OR_INTERVAL:
				() => context.previousDoseStatus == "INVALID AGE" || context.previousDoseStatus == "INVALID INTERVAL"
		});
		
		var rules = ruleBuilder.rules([
			[facts.DATE_ADMINISTERED_BEFORE_ABSOLUTE_MINIMUM_AGE_DATE, () => { return { ageIsValid: false }}]
		])

		return rules.evaluate();
	}
}

