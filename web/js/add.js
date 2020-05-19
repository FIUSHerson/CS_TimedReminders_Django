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
const consoleButton = document.getElementById('console-button');

// variables
var name = nameInput.value;
var hour = {
    hour: hourInput.value,
    verified: false 
}
var minute = {
    minute: minuteInput.value,
    verified: false
}
const ampm = ampmSwitch.checked;
var month = {
    month: monthSelector.value,
    verified: false
}
var day = {
    day: dayInput.value,
    verified: false
}
var year = {
    year: yearInput.value,
    verified: false
}


// listeners
consoleButton.addEventListener('click', log(name));

// functions
function compileTime(hour, minute, ampm, month, day, year) {
    const date = new Date()
}
function verifyHour(params) {
    
}
function makeAMPM(rawTime, myAMPMSwitch) {
    if (myAMPMSwitch.checked = true) {

    }
    else {

    }
}
function log(text) {
    console.log(text);
}