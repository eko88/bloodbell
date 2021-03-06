var bloodBell = angular
.module('bloodBell', [
    'firebase',
    'angularMoment'
  ])
.filter('millSecondsToTimeString', function() {
  return function(time) {

    var millseconds = Date.now() - time;
    var seconds = Math.floor(millseconds / 1000);
    var days = Math.floor(seconds / 86400);
    var hours = Math.floor((seconds % 86400) / 3600);
    var minutes = Math.floor(((seconds % 86400) % 3600) / 60);
    var timeString = '';
    if(days > 0) timeString += (days > 1) ? (days + " days ") : (days + " day ");
    if(hours > 0) timeString += (hours > 1) ? (hours + " hours ") : (hours + " hour ");
    if(minutes > 0) timeString += (minutes > 1) ? (minutes + " minutes ") : (minutes + " minute ");
    if(minutes <= 0) timeString += "a few seconds ";
    return timeString;
}
});