Feature: Date calculation business rule test cases

Scenario: 
	Given a date calculation starting with 2012-02-01 as the "birth date"
	When an interval of "1 year" is added
	Then the resulting date will be 2013-02-01

