// imports
const nameInput = document.getElementById('title');
const hourInput = document.getElementById('hour');
const minuteInput = document.getElementById('minute');
const ampmSwitch = document.getElementById('ampm-switch');
const monthSelector = document.getElementById('month');
const dayInput = document.getElementById('day');
const yearInput = document.getElementById('year');

const saveButton = document.getElementById('save-button');
const cancelButton = document.getElementById('cancel-button');

// listeners
saveButton.addEventListener('click', function (e) {
    e.preventDefault();
    
    try {// Run save functions
        var time = makeMyTime();
        var date = makeMyDate(time);
        var newDate = compileTime(date);
        verifyFinalTime(newDate);
        console.log(newDate);
        // django save
    } catch(e) {
        errorText = e;
        createError(e);
        throw `- There was an error while trying to save: ${e}`;
    }
});

document.getElementById('ampm-switch').addEventListener('click', function (e) {
    if (ampm == false) {
        ampm = true;
    }
    else if (ampm == true) {
        ampm = false;
    }
});

// functions

var errorText = '';
function createError(content) {
    document.getElementById('error-list').innerHTML = `<p id=\'error-text\'>${errorText}</p>`;
    document.getElementById('error-messages').style.display = 'block';
}

    // This took me way longer than it should have.
    // Please don't touch this part unless you know EXACTLY what you are doing.
function verifyFinalTime(date) {
    if (date <= new Date()) {
        throw 'Date must be in the future!';
    }
}
function makeMyTime() {
    var hour = verifyHour(hourInput.value);
    var minute = verifyMinute(minuteInput.value);

    var hourAndMinute = joinTime(hour, minute);
    var ampm = true;
    var simpleTime = makeSimpleTime(hourAndMinute, ampm);
    return simpleTime;
}
function makeMyDate(time) {
    var month = verifyMonth(monthSelector.value);
    var day = verifyDay(dayInput.value);
    var year = verifyYear(yearInput.value);

    return `${month} ${day}, ${year} ${time}`;
}
function compileTime(time) {
    try {
        if (time < new Date()) {
            throw 'Time is not in the future!';
        }
        myDate = new Date(time);
        console.log(`Successfully created date of ${myDate}`);
        return myDate;
    } catch (error) {
        throw 'An error occurred when making a new date.';
    }
}
function verifyHour(hour) {
    console.log(hour);
    if (hour <= 12 && hour >= 1) {
        console.log(`Successfully created hour ${hour}`);
        return hour;
    }
    else if (hour == '') {
        throw 'Please enter a time.'
    }
    else {
        throw 'Hour must be between 1 and 12.';
    }
}
function verifyMinute(minute) {
    if (minute <= 59 && minute >= 0) {
        console.log(`Successfully created minute ${minute}`);
        return minute;
    }
    else if (minute == '') {
        throw 'Please enter a time.'
    }
    else {
        throw 'Minute must be between 0 and 59.';
    }
}
function verifyMonth(month) {
    if (month == 'none') {
        const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

        autoMonth = monthNames[new Date().getMonth()];
        console.log(`Automatically setting the month to ${autoMonth}`);
        return autoMonth;
    }
}
function verifyDay(day) {
    if (day <= 31 && day >= 1) {
        console.log(`Successfully created day ${day}`);
        return day;
    }
    else if (day == '') {
        currentDay = new Date().getDay();
        return currentDay;
    }
    else {
        throw 'Day must be between 1 and 31.';
    }
}
function verifyYear(year) {
    var currentTime = new Date();
    var currentYear = currentTime.getFullYear().toString();
    try {
        var currentYearInt = Number(currentYear);
    } catch (error) {
        throw 'Failed to convert the year into an integer.';
    }
    if (year >= currentYearInt) {
        console.log(`Successfully created year ${year}`);
        return year;
    }
    else {
        console.log(`Failed to return year. Current value: ${year}, and ${currentYearInt}`);
        throw 'Year can\'t be in the past!';
    }
}
function joinTime(hour, minute) {
    console.log('Joining time...');
    var join = `${hour}:${minute}:00`
    console.log(`Successfully joined minute and hour as ${join}`);
    return join;
}
function makeSimpleTime(rawTime, switchValue) {
    var checked = switchValue;
    if (checked == true) {
        console.log("Successfully marked as PM")
        return `${rawTime} PM`;
    }
    else if (checked == undefined) {
        console.log ('Successfully marked as AM');
        return `${rawTime} AM`;
    }
    else {
        console.log("Successfully marked as AM")
        return `${rawTime} AM`;
    }
}
