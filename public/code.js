var socket = new WebSocket("wss://" + location.host);

socket.onopen = function (e) {
    console.log("Connection established");
};

socket.onmessage = function (event) {
    var data = JSON.parse(event.data);
    console.log(`[message] Data received from server: ${data}`);

    var list = document.getElementById('messagesLs');

    var li = document.createElement('li');
    li.innerHTML = "<b>" + data.name +":</b> " + data.message;
    
    document.insertBefore(li, list.childNodes[0]);
};

socket.onerror = error => {
    console.log(`WebSocket error: ${error}`);
    location.reload();
};


function formToJSON(form) {
    var inputs = form.getElementsByTagName('input');
    var object = {};

    for (let index = 0; index < inputs.length; index++) {
        const element = inputs[index];
        object[element.getAttribute('name')] = element.value;
    }

    return object;
}

function sendData() {
    var form = document.getElementById('messageForm');
    var obj = formToJSON(form);
    var json = JSON.stringify(obj);

    console.log(json);
    socket.send(json);
}