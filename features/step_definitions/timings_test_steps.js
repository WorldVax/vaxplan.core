var testSteps = function() { 
    this.Given(/^a date calculation starting with (\d+\-\d+\-\d+) as the "([^"]*)"$/,
        function (dateText, name, callback) {
            // Write code here that turns the phrase above into concrete actions
            //callback();
            callback(null, 'pending');
        });

    this.When(/^an interval of "([^"]*)" is added$/,
        function (intervalText, callback) {
            // Write code here that turns the phrase above into concrete actions
            //callback();
            callback(null, 'pending');
       });

    this.Then(/^the resulting date will be (\d+\-\d+\-\d+)$/,
        function (dateText, callback) {
           // Write code here that turns the phrase above into concrete actions
            //callback();
            callback(null, 'pending');
       });
};

module.exports = testSteps;
