# jQuery Date Countdown

A simple and easy jQuery plugin to generate regressive counting from a period.

## Requirements

* jQuery 1.7+

## Usage

	$( "#countdownContainer" ).countdown( settings );

## Settings

	"since" : Date Object, // Date start of the period, current date(client-side) by default 
	"until" : Date Object, // Date end of the period, current date + 1 day(client-side) by default 
	"delay" : int (ms), // Delay between each update of the counter, 1000 by default
	"showNegative" : boolean, // Sets if counter continues to update if the result is negative, false by defult
	"onChange" : function, // Function executed each update of the counter

## Example

	<div id="countdownContainer">
		Days: <span class="d"></span>
		Hours: <span class="h"></span>
		Minutes: <span class="m"></span>
		Seconds: <span class="s"></span>
	</div>
	<script>
		var settings = {
			until : new Date(2013,03,26,0,0,0,0),
			onChange : function(d) {
				/* 
				 * Param "d" is a jSON passed by the plugin
				 * Exemple: {'days': 01, 'hours': 23, 'minutes': 32, 'seconds': 12 }
				 *
				 */
  				  	

				$(this).children('.d').html(d.days);
				$(this).children('.h').html(d.hours);
				$(this).children('.m').html(d.minutes);
				$(this).children('.s').html(d.seconds);
			}
		}
		$( "#countdownContainer" ).countdown( settings );
	</script>