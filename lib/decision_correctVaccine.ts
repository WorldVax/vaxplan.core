import * as Timing from "./timing"
import * as Decider from "./decider";
import Text from "./text";
import Values from "./values";
import SupportData from "./supportData";

let supportData = new SupportData();
let ruleBuilder = new Decider.RuleBuilder(); 

export interface IDecisionContext_PreferableVaccineAdministered {
    administeredDate: Date;
    administeredVaccineType: string;
    administeredVolume: number;
    administeredTradeName: string;
    vaccineTypeBeginAgeDate: Date;
    vaccineTypeEndAgeDate: Date;
    preferableVaccineType: string;
    preferableVaccineTradeName: string;
    preferableVaccineVolume: number;
}

export interface IDecisionOutcome_PreferableVaccineAdministered {
    preferableVaccineAdministered: boolean;
    evaluationReason?: string;
}

export class Decision_PreferableVaccineAdministered implements Decider.IDecision<IDecisionContext_PreferableVaccineAdministered, IDecisionOutcome_PreferableVaccineAdministered> {
    label = "Was the supporting data defined preferable vaccine administered?"
    decide(context: IDecisionContext_PreferableVaccineAdministered) {
        var facts = ruleBuilder.facts({
            ADMINISTERED_VACCINE_TYPE_SAME_AS_PREFERRED: () => context.administeredVaccineType == context.preferableVaccineType,
            ADMINISTERED_IN_PREFERABLE_VACCINE_TYPE_RANGE: () => context.vaccineTypeBeginAgeDate <= context.administeredDate && context.administeredDate < context.vaccineTypeEndAgeDate,
            ADMINISTERED_TRADE_NAME_SAME_AS_PREFERRED: () => context.administeredTradeName == context.preferableVaccineTradeName,
            ADMINISTERED_VOLUME_AT_LEAST_PREFERABLE_VOLUME: () => context.administeredVolume >= context.preferableVaccineVolume
        });

        var rules = ruleBuilder.rules([
            [facts.ADMINISTERED_VACCINE_TYPE_SAME_AS_PREFERRED,
                facts.ADMINISTERED_IN_PREFERABLE_VACCINE_TYPE_RANGE,
                facts.ADMINISTERED_TRADE_NAME_SAME_AS_PREFERRED,
                facts.ADMINISTERED_VOLUME_AT_LEAST_PREFERABLE_VOLUME,
                () => { return { preferableVaccineAdministered : true, evaluationReason: Text.PREFERABLE_VACCINE_ADMINISTERED };}],
            [facts.ADMINISTERED_VACCINE_TYPE_SAME_AS_PREFERRED,
                facts.ADMINISTERED_IN_PREFERABLE_VACCINE_TYPE_RANGE,
                facts.ADMINISTERED_TRADE_NAME_SAME_AS_PREFERRED,
                facts.ADMINISTERED_VOLUME_AT_LEAST_PREFERABLE_VOLUME.not,
                () => { return { preferableVaccineAdministered : true, evaluationReason: Text.LESS_THAN_RECOMMENDED_VOLUME };}],
            [facts.ADMINISTERED_VACCINE_TYPE_SAME_AS_PREFERRED.not,
                () => { return { preferableVaccineAdministered : false, evaluationReason: Text.PREFERABLE_VACCINE_NOT_ADMINISTERED };}],
            [facts.ADMINISTERED_VACCINE_TYPE_SAME_AS_PREFERRED,
                facts.ADMINISTERED_IN_PREFERABLE_VACCINE_TYPE_RANGE.not,
                () => { return { preferableVaccineAdministered : false, evaluationReason: Text.VACCINE_ADMINISTERED_OUTSIDE_PREFERRED_AGE_RANGE };}],
            [facts.ADMINISTERED_VACCINE_TYPE_SAME_AS_PREFERRED,
                facts.ADMINISTERED_IN_PREFERABLE_VACCINE_TYPE_RANGE,
                facts.ADMINISTERED_TRADE_NAME_SAME_AS_PREFERRED.not,
                () => { return { preferableVaccineAdministered : false, evaluationReason: Text.PREFERABLE_VACCINE_WRONG_TRADENAME };}],
        ]);

        return rules.evaluate();
    }
}

export interface IDecisionContext_AllowableVaccineAdministered {
    administeredDate: Date;
    administeredVaccineType: string;
    allowableVaccineType: string;
    allowableVaccineTypeBeginAgeDate: Date;
    allowableVaccineTypeEndAgeDate: Date;
}

export interface IDecisionOutcome_AllowableVaccineAdministered {
    allowableVaccineAdministered: boolean;
    evaluationReason?: string;
}

export class Decision_AllowableVaccineAdministered implements Decider.IDecision<IDecisionContext_AllowableVaccineAdministered, IDecisionOutcome_AllowableVaccineAdministered> {
    label = "Was the supporting data defined allowable vaccine administered?"
    decide(context: IDecisionContext_AllowableVaccineAdministered) {
        var facts = ruleBuilder.facts({
            ADMINISTERED_VACCINE_TYPE_SAME_AS_ALLOWABLE: () => context.administeredVaccineType == context.allowableVaccineType,
            ADMINISTERED_IN_ALLOWABLE_VACCINE_TYPE_RANGE: () => context.allowableVaccineTypeBeginAgeDate <= context.administeredDate && context.administeredDate < context.allowableVaccineTypeEndAgeDate
        });

        var rules = ruleBuilder.rules([
            [facts.ADMINISTERED_VACCINE_TYPE_SAME_AS_ALLOWABLE,
                facts.ADMINISTERED_IN_ALLOWABLE_VACCINE_TYPE_RANGE,
                () => { return { allowableVaccineAdministered: true };}],
            [facts.ADMINISTERED_VACCINE_TYPE_SAME_AS_ALLOWABLE.not,
                () => { return { allowableVaccineAdministered: false };}],
            [facts.ADMINISTERED_VACCINE_TYPE_SAME_AS_ALLOWABLE,
                facts.ADMINISTERED_IN_ALLOWABLE_VACCINE_TYPE_RANGE.not,
                () => { return { allowableVaccineAdministered: false, evaluationReason: Text.VACCINE_ADMINISTERED_OUTSIDE_ALLOWED_AGE_RANGE };}]
        ]);

        return rules.evaluate();
    }
}

