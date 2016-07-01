let explain: boolean;
let log: (...args: any[]) => void;

export interface IContext {
	// reserved for future
}

export interface IDecision<TContext, TOutcome> { //extends ILocalizable {
	label : string;
	decide(context: TContext, explain?: boolean): TOutcome;
}

export class Factoid {
	predicate: () => boolean;
	factName: string;

	constructor(predicate: () => boolean, name: string) {
		this.predicate = predicate || function() { return true; };
		this.factName = name || 'anonymous fact';
	}
	
	result: boolean;
	
	not(): Factoid {
		var originalPredicate = this.predicate;
		return new Factoid(function() { return !(originalPredicate()); }, 'NOT(' + this.factName + ')');
	};
	
	or(otherFactoid: Factoid): Factoid {
		var result = false;
		let firstFactoid: Factoid;
		firstFactoid = this;
		var which:string;
		return new Factoid(() => {
			(((result = firstFactoid.evaluate()) && (which = this.factName))
				|| ((result = otherFactoid.evaluate()) && (which = otherFactoid.factName)));
			return result;
		}, '(' + this.factName + ' OR ' + otherFactoid.factName +')');
	};
	
	evaluate(forceEval: boolean = false): boolean {
		var evaluated = false;
		var doEval = (forceEval || this.hasOwnProperty('result') == false);
		(doEval && (evaluated = true) && (this['result'] = this.predicate()));
		(explain && evaluated && log('Evaluated ' + this.factName));
		return this.result;
	};
}

export class Rule {
	outcomeFunc: () => any;
	testConditions: string;
	conditionCount: number;
	evaluate: () => boolean;
	
	constructor(ruleParts: any[]) {
		if(!ruleParts || !ruleParts.length) {
			this.outcomeFunc = () => undefined;
			this.evaluate = () => false;
			this.conditionCount = 0;
			this.testConditions = "Error - no rule parts specified";
			return;
		}
		
		this.outcomeFunc = ruleParts.pop();
		this.conditionCount = ruleParts.length;
		this.testConditions = ruleParts.map((item) => item.factName || "anonymous fact").join(",");
		
		this.evaluate = () => (this.conditionCount == 0 || ruleParts.every((part: Factoid) => part.evaluate()));
	}
}

export class RuleSet {
	rules: Rule[];
	constructor(ruleSpec: any[]) {
		this.rules = ruleSpec.map((ruleDef: any[], index: number) => new Rule(ruleDef));
	}

	// this returns an outcome
	evaluate(): any {
		if(!this.rules || !this.rules.length) {
			return undefined;
		}
		
		var result: any = null; // default - you shouldn't hit this, hopefully
		
		let matchedRule: Rule;
		
		// find matching rule - needs refactored to skip the rest once found
		for(var ruleIndex = 0; ruleIndex < this.rules.length; ruleIndex++) {
			var currentRule = this.rules[ruleIndex];
			if(!matchedRule && currentRule.evaluate() && (matchedRule = currentRule)) {
				break;
			}
		}
		
		var outcomeFunc = (matchedRule && matchedRule.outcomeFunc) || (() => undefined);
		
		result = outcomeFunc();
		
		return result;
	}
}

export class RuleBuilder {
	constructor() {
		// empty
	}
	
	facts(factSpec:any):any {
		factSpec = factSpec || {};
		
		var outFacts = {};
		
		for(var key in factSpec) {
			outFacts[key] = new Factoid(factSpec[key], key);
		}
	
		return outFacts;
	}
	
	rules(ruleSpec:any[]):RuleSet { return new RuleSet(ruleSpec); }
}
