// imports
const stopButton = document.getElementById('stop-button');
const timeText = document.getElementById('time-text');

// listeners
window.addEventListener('load', function() {
  timeText.innerHTML = `1:01:02`;
  //timer(1,10,5);
})

// vars
var ct = { // initial values in case values are empty
  hour: 0,
  minute: 5,
  second: 0
}

// functions
function convertTimeToSec(time) {
    return (time.second + (time.minute * 60) + (time.hour * 3600));
}

function overrideDefaultTime(hour, minute, second) {
  // overrides default values set above
  if (hour != null && minute != null && second != null) {
    ct.hour = hour;
    ct.minute = minute;
    ct.second = second;
  }
}

function updateTimer(time) {
  // Updates what's on screen with the timer
  console.log(`Updating display timer to ${time.hour}:${time.minute}:${time.second}.`);

  // It's a little nasty, but it works... i think
  // I don't really know any algorithms that could clean this up
  if (time.hour == 0) {
    if (time.minute == 0) {
      timeText.innerHTML = `${time.second}`;
    } else {
      if (time.second < 10) { // just some formatting
        timeText.innerHTML = `${time.minute}:0${time.second}`;
      } else {
        timeText.innerHTML = `${time.minute}:${time.second}`;
      }
    }
  } else {
    if (time.minute < 10) { // more formatting
      if (time.second < 10) { // copy from a little bit above, but with hours
        timeText.innerHTML = `${time.hour}:0${time.minute}:0${time.second}`;
      } else {
        timeText.innerHTML = `${time.hour}:0${time.minute}:${time.second}`;
      }
    } else {
      if (time.second < 10) { // copy from a little bit above
        timeText.innerHTML = `${time.hour}:${time.minute}:0${time.second}`;
      } else {
        timeText.innerHTML = `${time.hour}:${time.minute}:${time.second}`;
      }
    }

  }
}

function decreaseTimer() {
  // Basic time decreaser

  // Make sure the time is above 0
  if (ct.hour < 0 || ct.minute < 0 || ct.second < 0) {
    alert("Can't start a negative time!");
    throw "Can't start a negative time!";
  } else {
    // if second isn't 0, then just decrease the second
    // by 1. otherwise, decrease the minute and hour if needed
    if (ct.second == 0) {
      if (ct.minute != 0) {
        ct.minute = ct.minute - 1;
        ct.second = 59;
      }
      else {
        if (ct.hour != 0) {
          ct.hour = ct.hour - 1;
          ct.minute = 59;
          console.log(ct.hour, ct.minute);
        }
        else {throw '';}
      }
    }
    else {
      ct.second = ct.second - 1;
    }

    console.log(`${ct.hour}:${ct.minute}:${ct.second}`);

    updateTimer(ct);
  }
}

function timer(hour, minute, second) {
  // TODO - For each timer object, run the timer for that object.

  overrideDefaultTime(hour, minute, second);
  updateTimer(ct);
  var interval = setInterval(function() {
    try {
      decreaseTimer();
    } catch (e) {
      clearInterval(interval);
      setTimeout(function() { alert(`Time is up! ${e}`); }, 1);
    }
   }, 1000);
}
