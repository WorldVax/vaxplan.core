import Decider = require("./decider");

let ruleBuilder = new Decider.RuleBuilder(); 

export interface ITimeDuration {
	years?: number;
	months?: number;
	weeks?: number;
	days?: number;
}

export interface IInterval extends ITimeDuration { };
export interface IAge extends ITimeDuration { };

export interface IDecisionContext_AdministeredDoseCanBeEvaluated extends Decider.IContext {
	administeredDate: Date;
	doseCondition: string;
	lotExpirationDate: Date;
}

export interface IDecisionOutcome_AdministeredDoseCanBeEvaluated {
	canBeEvaluated : boolean;
	doseConditionExists: boolean;
	lotIsExpired: boolean;
}

export class Decision_CanEvaluateAdministeredDose implements Decider.IDecision<IDecisionContext_AdministeredDoseCanBeEvaluated, IDecisionOutcome_AdministeredDoseCanBeEvaluated>  {
	label : string = "Can this administered dose be evaluated?";

	decide(context: IDecisionContext_AdministeredDoseCanBeEvaluated) {
		console.log(this.label);

		var facts = ruleBuilder.facts ({
			DOSE_CONDITION_EXISTS: () => {
				console.log("Dose condition evaluating...[" + context.doseCondition + "]");
				return context.doseCondition != "" && context.doseCondition != null;
			},
			LOT_IS_EXPIRED: () => {
				console.log("Lot expiration evaluating...[" + context.lotExpirationDate + ", " + context.administeredDate + "]");
				return context.lotExpirationDate < context.administeredDate;
			}
		});

		var rules = ruleBuilder.rules([
			[facts.DOSE_CONDITION_EXISTS, () => { return { canBeEvaluated: false }; } ],
			[facts.LOT_IS_EXPIRED, () => { return { canBeEvaluated: false }; } ],
			[facts.DOSE_CONDITION_EXISTS.not(), facts.LOT_IS_EXPIRED.not(), () => { return { canBeEvaluated: true }; } ],
			[facts.DOSE_CONDITION_EXISTS.or(facts.LOT_IS_EXPIRED), () => { return { canBeEvaluated: false }; } ],
			[() => { return { canBeEvaluated : true } } ]
		]);
		
		return rules.evaluate();
	}
}

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

export interface IDecisionContext_VaccineDoseIntervalValid {
	administeredDate: Date;
	intervalFromImmediatePreviousDose: IInterval;
	intervalFromTargetDoseNumberInSeries: IInterval;
	intervalFromMostRecent: IInterval;
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
