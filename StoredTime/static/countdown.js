// imports
const stopButton = document.getElementById('stop-button');
const timeText = document.getElementById('time-text');

// listeners
window.addEventListener('load', function() {
  timer();
})

// vars

var ct = { // initial values in case values are empty
  hour: 0,
  minute: 5,
  second: 0
}

// functions
function sendNotificiation(text) {
  askNotificationPermission();

  if (text == '')
  {
    var notifyText = 'Hello!';
  }
  else {
    var notifyText = text;
  }
  var notify = new Notification(notifyText);
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

  // js stuff
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
