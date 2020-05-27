// imports
const stopButton = document.getElementById('stop-button');
const timeText = document.getElementById('time-text');
const progBar = document.getElementById('progress-bar');
const container = document.querySelector('#list-time-hidden');
const targetTimeList = container.querySelectorAll('div.list-time-hidden > p');

// listeners
window.addEventListener('load', function() {
    dateDiff();
    

    
})

// vars
var ct = { // default values
  hour: 0,
  minute: 5,
  second: 0
}

var initTime = 0;
 


// functions
function dateDiff() {
    for (i = 0; i <= targetTimeList.length; i++) {
        var listTime = targetTimeList[i];
        console.log(listTime);
        var date1 = new Date();
        var date2 = new Date(listTime);
        var diff = showDiff(date1, date2);
        timer(diff.hrs, diff.min, diff.leftSec)
        console.log(date1);
        console.log(date2);
    }
   
}

function showDiff(date1, date2) {
    var timeClock = {
        hrs:0,
        min:0,
        leftSec:0
    }
    console.log(date1);
    console.log(date2);
    var diff = (date2 - date1) / 1000;
    diff = Math.abs(Math.floor(diff));
    console.log(diff);
    timeClock.hrs = Math.floor(diff / (60 * 60));
    timeClock.leftSec = diff - timeClock.hrs * 60 * 60;

    timeClock.min = Math.floor(timeClock.leftSec / (60));
    timeClock.leftSec = timeClock.leftSec - timeClock.min * 60;
    console.log(timeClock);
    return timeClock;
    
}


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

  // Updates the progress bar
  const progBarStyle = progBar.style;
  progBarStyle.width = `${(1-(convertTimeToSec(ct) / initTime)) * 100}%`;
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
          ct.second = 59;
          console.log(ct.hour, ct.minute, ct.second);
        }
        else {


            throw '';
        }
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
  initTime = convertTimeToSec(ct);
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

