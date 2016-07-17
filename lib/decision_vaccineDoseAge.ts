import * as Decider from "./decider";
import Text from "./text";

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
	evaluationReason?: string;
}

export class Decision_VaccineDoseAgeValid implements Decider.IDecision<IDecisionContext_VaccineDoseAgeValid, IDecisionOutcome_VaccineDoseAgeValid> {
	label = "Was the vaccine dose administered at a valid age?";
	decide(context:IDecisionContext_VaccineDoseAgeValid) {
		var facts = ruleBuilder.facts({
			ADMINISTERED_BEFORE_ABSOLUTE_MINIMUM_AGE_DATE:
				() => context.administeredDate < context.absoluteMinimumAgeDate,
			ADMINISTERED_ON_OR_AFTER_ABSOLUTE_MINIMUM_AGE_AND_BEFORE_MINIMUM_AGE:
				() => context.administeredDate >= context.absoluteMinimumAgeDate && context.administeredDate < context.minimumAgeDate,
			ADMINISTERED_ON_OR_AFTER_MINIMUM_AGE_AND_BEFORE_MAXIMUM_AGE:
				() => context.administeredDate >= context.minimumAgeDate && context.absoluteMinimumAgeDate < context.maximumAgeDate,
			ADMINISTERED_ON_OR_AFTER_MAXIMUM_AGE_DATE:
				() => context.administeredDate >= context.maximumAgeDate,
			DOSE_IS_FIRST_DOSE:
				() => context.targetDoseNumber == 1,
			PREVIOUS_VACCINE_DOSE_STATUS_INVALID_DUE_TO_AGE_OR_INTERVAL:
				() => context.previousDoseStatus == Text.INVALID_AGE || context.previousDoseStatus == Text.INVALID_INTERVAL
		});
		
		var rules = ruleBuilder.rules([
			[facts.ADMINISTERED_BEFORE_ABSOLUTE_MINIMUM_AGE_DATE,
				() => { return { ageIsValid: false, evaluationReason: Text.TOO_YOUNG }}],
			[facts.ADMINISTERED_ON_OR_AFTER_ABSOLUTE_MINIMUM_AGE_AND_BEFORE_MINIMUM_AGE,
				facts.DOSE_IS_FIRST_DOSE.not,
				facts.PREVIOUS_VACCINE_DOSE_STATUS_INVALID_DUE_TO_AGE_OR_INTERVAL,
				() => { return { ageIsValid: false, evaluationReason: Text.TOO_YOUNG }}],
			[facts.ADMINISTERED_ON_OR_AFTER_ABSOLUTE_MINIMUM_AGE_AND_BEFORE_MINIMUM_AGE,
				facts.DOSE_IS_FIRST_DOSE.not,
				facts.PREVIOUS_VACCINE_DOSE_STATUS_INVALID_DUE_TO_AGE_OR_INTERVAL.not,
				() => { return { ageIsValid: true, evaluationReason: Text.GRACE_PERIOD }}],
			[facts.ADMINISTERED_ON_OR_AFTER_ABSOLUTE_MINIMUM_AGE_AND_BEFORE_MINIMUM_AGE,
				facts.DOSE_IS_FIRST_DOSE,
				facts.PREVIOUS_VACCINE_DOSE_STATUS_INVALID_DUE_TO_AGE_OR_INTERVAL.not,
				() => { return { ageIsValid: true, evaluationReason: Text.GRACE_PERIOD }}],
			[facts.ADMINISTERED_ON_OR_AFTER_MINIMUM_AGE_AND_BEFORE_MAXIMUM_AGE,
				() => { return { ageIsValid: true, evaluationReason: Text.VALID_AGE }}],
			[facts.ADMINISTERED_ON_OR_AFTER_MAXIMUM_AGE_DATE,
				() => { return { ageIsValid: false, evaluationReason: Text.TOO_OLD }}]
		])

		return rules.evaluate();
	}
}
