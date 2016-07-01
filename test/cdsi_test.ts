import cdsi = require("../lib/cdsi");

var decision = new cdsi.Decision_CanEvaluateAdministeredDose();

let context: cdsi.IDecisionContext_AdministeredDoseCanBeEvaluated;
context = {
	doseCondition: null,
	lotExpirationDate: new Date("2015-12-31"),
	administeredDate: new Date("2016-05-01")
};

console.log("\n\n*******************************\n\n*******************************\n\n");

console.dir(context);
console.dir(decision.decide(context));

console.log("\n\n*******************************\n\n*******************************\n\n");

context = {
	doseCondition: "Spoiled",
	lotExpirationDate: new Date("2015-12-31"),
	administeredDate: new Date("2016-05-01")
};
console.dir(decision.decide(context));

console.log("\n\n*******************************\n\n*******************************\n\n");

context = {
	doseCondition: null,
	lotExpirationDate: new Date("2027-12-31"),
	administeredDate: new Date("2016-05-01")
};

console.dir(context);
console.dir(decision.decide(context));

console.log("\n\n*******************************\n\n*******************************\n\n");

