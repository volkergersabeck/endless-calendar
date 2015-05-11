/*
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/.
 */

$(function() {
	var now = moment([2015, 0, 1]);
	var weekStartsMonday = false;

	// initialize calendar to start on a sunday
	less.modifyVars({
		'@first-weekday': 'weekday0'
	});
	now = now.subtract(now.day(), "days");

	// create day boxes for about 2 years
	for(var i=0; i < 7 * 54 * 2; i++) {
		$(".calendar").append(
			$("<div>").
				attr("data-year", now.year()).
				append("<div class='day-content'>" + now.date() + "</div>").
				addClass("day weekday" + now.day() + " day" + now.date() + " month" + now.month() + " year" + now.year()))
		now = now.add(1, "day");
	}

	// first and last day box are required for toggling
	var firstDayBox = $(".calendar").children().first();
	var lastDayBox = $("<div>").
				attr("data-year", now.year()).
				append("<div class='day-content'>" + now.date() + "</div>").
				addClass("day weekday" + now.day() + " day" + now.date() + " month" + now.month() + " year" + now.year());

	// callback for toggling between sunday and monday being the first day of the week
	$("#weekday-toggle").click(function() {
		if(weekStartsMonday) {
			less.modifyVars({
				'@first-weekday': 'weekday0'
			});
			$(".calendar").prepend(firstDayBox);
			lastDayBox.remove();
			weekStartsMonday = false;
		} else {
			less.modifyVars({
				'@first-weekday': 'weekday1'
			});
			firstDayBox.remove();
			$(".calendar").append(lastDayBox);
			weekStartsMonday = true;
		}
	})
});
