// imports
const stopButton = document.getElementById('stop-button');

// listeners
window.addEventListener('load', function() {
  askNotificationPermission();
})

stopButton.addEventListener('click', sendNotificiation('hello'))

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

//
// These notification functions have been copied from Mozilla
//
function checkNotificationPromise() {
    try {
      Notification.requestPermission().then();
    } catch(e) {
      return false;
    }

    return true;
}

function askNotificationPermission() {
  // function to actually ask the permissions
  function handlePermission(permission) {
    // Whatever the user answers, we make sure Chrome stores the information
    if(!('permission' in Notification)) {
      Notification.permission = permission;
    }

  // Let's check if the browser supports notifications
  if (!('Notification' in window)) {
    console.log("This browser does not support notifications.");
  } else {
    if(checkNotificationPromise()) {
      Notification.requestPermission()
      .then((permission) => {
        handlePermission(permission);
      })
    } else {
      Notification.requestPermission(function(permission) {
        handlePermission(permission);
      })
      }
    }
  }
}
