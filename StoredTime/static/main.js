// imports
const deleteButton = document.getElementById('delete-icon');

// listeners
deleteButton.onclick = deleteObject(function(e) {
  deleteButton.getAttribute('data-object');
});

// functions
function getCookie(name) {  // Copied from the Django docs for simplification
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

function deleteObject(object) {
  $.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!deleteObject(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

  $.ajax({
    type: 'POST',
    url: '/delete/',
    data: {
      id: object.name,
      csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
    }
  });
}
