import * as Timing from "./timing"
import * as Decider from "./decider";
import * as Decisions from "./decisions";
import Text from "./text";
import Values from "./values";

export interface IAdministeredDoseEvaluator {
    // 4.1 Can the vaccine dose administered be evaluated?
    canEvaluateAdministeredDose(context: Decisions.IDecisionContext_AdministeredDoseCanBeEvaluated): boolean;

    // 4.2 Can the target dose be skipped?
    canSkipTargeDose(context: Decisions.IDecisionContext_CanSkipTargetDose) : boolean;

    // 4.3 Was the dose administered at a valid age?
    isVaccineDoseAgeValid(context: Decisions.IDecisionContext_VaccineDoseAgeValid): boolean;

    // 4.4 Was the dose administered at valid interval(s)?
    isVaccineDoseIntervalValid(context: Decisions.IDecisionContext_VaccineDoseIntervalValid) : boolean;

    // 4.5 Was the dose adminstered at allowable interval(s)?
    isVaccineDoseIntervalAllowed(context: Decisions.IDecisionContext_VaccineDoseIntervalAllowed) : boolean;

    // 4.6 Was the dose administered in conflict with any other vaccine doses administered?
    currentVaccineDoseInConflictWithPrevious(context: Decisions.IDecisionContext_CurrentVaccineDoseInConflictWithPrevious): boolean;
    shouldEvaluateLiveVirusConflict(context: Decisions.IDecisionContext_ShouldEvaluateLiveVirusConflict): boolean;
    couldVaccineDoseBeInConflict(context: Decisions.IDecisionContext_CouldVaccineDosesBeInConflict) : boolean;

    // 4.7 Did the patient receive a preferable vaccine?
    preferableVaccineAdministered(context: Decisions.IDecisionContext_PreferableVaccineAdministered): boolean;

    // 4.8 Did the patient receive an allowable vaccine?
    allowableVaccineAdministered(context: Decisions.IDecisionContext_AllowableVaccineAdministered): boolean;

    // 4.9 Is the patient's gender one of the required genders?
    requiredGenderPresent(context: Decisions.IDecisionContext_RequiredGenderPresent): boolean;
}

export class AdministeredDoseEvaluator implements IAdministeredDoseEvaluator {
    // 4.1 Can the vaccine dose administered be evaluated?
    canEvaluateAdministeredDose(context: Decisions.IDecisionContext_AdministeredDoseCanBeEvaluated) {
        return true;
    }

    // 4.2 Can the target dose be skipped?
    canSkipTargeDose(context: Decisions.IDecisionContext_CanSkipTargetDose) {
        return true;
    }

    // 4.3 Was the dose administered at a valid age?
    isVaccineDoseAgeValid(context: Decisions.IDecisionContext_VaccineDoseAgeValid) {
        return true;
    }

    // 4.4 Was the dose administered at valid interval(s)?
    isVaccineDoseIntervalValid(context: Decisions.IDecisionContext_VaccineDoseIntervalValid) {
        return true;
    }

    // 4.5 Was the dose adminstered at allowable interval(s)?
    isVaccineDoseIntervalAllowed(context: Decisions.IDecisionContext_VaccineDoseIntervalAllowed) {
        return true;
    }

    // 4.6 Was the dose administered in conflict with any other vaccine doses administered?
    currentVaccineDoseInConflictWithPrevious(context: Decisions.IDecisionContext_CurrentVaccineDoseInConflictWithPrevious) {
        return true;
    }

    shouldEvaluateLiveVirusConflict(context: Decisions.IDecisionContext_ShouldEvaluateLiveVirusConflict) {
        return true;
    }

    couldVaccineDoseBeInConflict(context: Decisions.IDecisionContext_CouldVaccineDosesBeInConflict) {
        return true;
    }

    // 4.7 Did the patient receive a preferable vaccine?
    preferableVaccineAdministered(context: Decisions.IDecisionContext_PreferableVaccineAdministered) {
        return true;
    }

    // 4.8 Did the patient receive an allowable vaccine?
    allowableVaccineAdministered(context: Decisions.IDecisionContext_AllowableVaccineAdministered) {
        return true;
    }

    // 4.9 Is the patient's gender one of the required genders?
    requiredGenderPresent(context: Decisions.IDecisionContext_RequiredGenderPresent) {
        return true;
    }
}