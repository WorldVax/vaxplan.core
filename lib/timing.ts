export interface ITimeDuration {
	years?: number;
	months?: number;
	weeks?: number;
	days?: number;
}

export interface IInterval extends ITimeDuration { };
export interface IAge extends ITimeDuration { };

