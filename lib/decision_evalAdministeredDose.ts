import * as Decider from "./decider";

let ruleBuilder = new Decider.RuleBuilder(); 

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

