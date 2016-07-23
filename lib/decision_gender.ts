import * as Decider from "./decider";
import Text from "./text";
import Values from "./values";

let ruleBuilder = new Decider.RuleBuilder(); 

export interface IDecisionContext_RequiredGenderPresent {
    patientGender: string;
    requiredGenders: string[];
}

export interface IDecisionOutcome_RequiredGenderPresent {
    requiredGenderIsSatisfied : boolean;
    evaluationReason? : string;
}

export class Decision_RequiredGenderPresent implements Decider.IDecision<IDecisionContext_RequiredGenderPresent, IDecisionOutcome_RequiredGenderPresent> {
    label = "Is the patient's gender one of the required genders?";
    decide(context: IDecisionContext_RequiredGenderPresent) {
        var facts = ruleBuilder.facts({
            REQUIRED_GENDER_PRESENT : () => !context.requiredGenders || !context.requiredGenders.length || context.requiredGenders.some((gender) => gender == context.patientGender)
        });

        var rules = ruleBuilder.rules([
            [facts.REQUIRED_GENDER_PRESENT, () => { return { requiredGenderIsSatisfied: true, evaluationReason: Text.CORRECT_GENDER }; } ],
            [() => { return { requiredGenderIsSatisfied : false, evaluationReason: Text.INCORRECT_GENDER }; } ]
        ]);

        return rules.evaluate();
    }
}