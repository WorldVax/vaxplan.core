var Decider = require("../lib/decider.js");
var ruleBuilder = new Decider.RuleBuilder({
    option1: "value for option 1",
    setOfOptions: {specialOptionA:"value for special option A"},
    someFeatureEnabled: false
    });

console.log('basic {{{{fill in action}}}}');
myComp.doSomething("value 1", 3000); // {{{{fill in description of action}}}}
sleep.sleep(1);

console.log('{{{{fill in some other action}}}}');
myComp.doSomeOtherThing("value 1", 3000); // {{{{fill in description of action}}}}
sleep.sleep(1);
