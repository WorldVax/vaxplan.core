var DateCalculation = (function () {
    function DateCalculation(startingDate, name) {
        this.millisecondsInADay = 24 * 60 * 60 * 1000;
        this.startingDate = startingDate;
        this.workingDate = startingDate;
        this.startingName = name || '{{date name not specified}}';
        this.workingName = this.startingName;
    }
    DateCalculation.prototype.getTimeDurationText = function (timeDuration) {
        var days = timeDuration.days || 0;
        var weeks = timeDuration.weeks || 0;
        var months = timeDuration.months || 0;
        var years = timeDuration.years || 0;
        var yearText = (years != 0) ?
            "" + years + " year" + (Math.abs(years) > 1 ? "s" : "")
            : null;
        var monthText = (months != 0) ?
            "" + months + " month" + (Math.abs(months) > 1 ? "s" : "")
            : null;
        var weekText = (weeks != 0) ?
            "" + weeks + " week" + (Math.abs(weeks) > 1 ? "s" : "")
            : null;
        var dayText = (days != 0 || !(yearText + monthText + weekText)) ?
            "" + days + " day" + (Math.abs(days) > 1 ? "s" : "")
            : null;
        var durationText = "[{{" + (timeDuration.name || "unnamed time duration") + "}}: " +
            [yearText, monthText, weekText, dayText].join(",") +
            "]";
        return durationText;
    };
    DateCalculation.prototype.makeNewDate = function (year, month, day) {
        var isLeapYear = year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
        var validDays = [31, (isLeapYear ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var adjustableMonths = [2, 4, 6, 9, 11];
        if (month >= 1 && month <= 12) {
            var monthIndex = month - 1;
            if (day > validDays[month - 1] && adjustableMonths.indexOf(month) >= 0) {
                month += 1;
                day = 1;
            }
        }
        return new Date(year, month, day);
    };
    DateCalculation.prototype.addYears = function (yearsToAdd) {
        this.workingDate = this.makeNewDate(this.workingDate.getFullYear() + yearsToAdd, this.workingDate.getMonth() + 1, // use "human" month numbers
        this.workingDate.getDate());
        return this;
    };
    DateCalculation.prototype.addMonths = function (monthsToAdd) {
        var signAdjustment = monthsToAdd > 0 ? 1 : -1;
        monthsToAdd = Math.abs(monthsToAdd);
        var yearsToAdd = Math.floor(monthsToAdd / 12) * signAdjustment;
        var monthRemainder = (monthsToAdd % 12) * signAdjustment;
        this.addYears(yearsToAdd);
        var monthAfterYearAdjustment = this.workingDate.getMonth() + 1; // human
        var adjustedMonth = monthAfterYearAdjustment + monthRemainder;
        var outOfBounds = adjustedMonth;
        throw "Not implemented yet.";
        //-1y, -9m
        //return this;
    };
    DateCalculation.prototype.addWeeks = function (weeksToAdd) {
        this.addDays(weeksToAdd * 7);
        return this;
    };
    DateCalculation.prototype.addDays = function (daysToAdd) {
        this.workingDate =
            new Date(this.workingDate.valueOf() +
                (daysToAdd * this.millisecondsInADay));
        return this;
    };
    DateCalculation.prototype.addInterval = function (interval) {
        this.workingName += " PLUS interval " + this.getTimeDurationText(interval);
        this.addYears(interval.years);
        this.addMonths(interval.months);
        this.addWeeks(interval.weeks);
        this.addDays(interval.days);
        return this;
    };
    DateCalculation.prototype.setAge = function (age) {
        this.workingDate = this.startingDate;
        this.workingName += "AGE " + this.getTimeDurationText(age) + " from " + this.workingDate.toLocaleDateString();
        this.addYears(age.years);
        this.addMonths(age.months);
        this.addDays(age.days);
        return this;
    };
    return DateCalculation;
})();
exports.DateCalculation = DateCalculation;
//# sourceMappingURL=timing.js.map