var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        //hello
        stompClient.subscribe('/topic/greetings', function (greeting) {
        	if (typeof JSON.parse(greeting.body).stock !== 'undefined')
        		showGreeting(JSON.parse(greeting.body).stock);
        	else{
        		console.log(JSON.parse(greeting.body));
        		showGreeting(JSON.parse(greeting.body).content);
        	}  		
        });
        
        //incoming
        stompClient.subscribe('/topic/incoming', function (greeting) {
        	if (typeof JSON.parse(greeting.body).stock !== 'undefined')
        		showGreeting("Car updated for tab - Incoming : "+JSON.parse(greeting.body).stock);
        	else{
        		console.log(JSON.parse(greeting.body));
        		showGreeting("Car updated for tab - Incoming : "+JSON.parse(greeting.body).content);
        	}  		
        });
        
        //marketing
        stompClient.subscribe('/topic/marketing', function (greeting) {
        	if (typeof JSON.parse(greeting.body).stock !== 'undefined')
        		showGreeting("Car updated for tab - Marketing: "+JSON.parse(greeting.body).stock);
        	else{
        		console.log(JSON.parse(greeting.body));
        		showGreeting("Car updated for tab - Marketing: "+JSON.parse(greeting.body).content);
        	}  		
        });
        //live
        stompClient.subscribe('/topic/live', function (greeting) {
        	if (typeof JSON.parse(greeting.body).stock !== 'undefined')
        		showGreeting("Car updated for tab - Live: "+JSON.parse(greeting.body).stock);
        	else{
        		console.log(JSON.parse(greeting.body));
        		showGreeting("Car updated for tab - Live: "+JSON.parse(greeting.body).content);
        	}  		
        });
        //service
        stompClient.subscribe('/topic/service', function (greeting) {
        	if (typeof JSON.parse(greeting.body).stock !== 'undefined')
        		showGreeting("Car updated for tab - Service :  "+JSON.parse(greeting.body).stock);
        	else{
        		console.log(JSON.parse(greeting.body));
        		showGreeting("Car updated for tab - Service :  "+JSON.parse(greeting.body).content);
        	}  		
        });
        
        //pending info
        stompClient.subscribe('/topic/pendinginfo', function (greeting) {
        	if (typeof JSON.parse(greeting.body).stock !== 'undefined')
        		showGreeting("Car updated for tab - Pending info :  "+JSON.parse(greeting.body).stock);
        	else{
        		console.log(JSON.parse(greeting.body));
        		showGreeting("Car updated for tab - Pending info :  "+JSON.parse(greeting.body).content);
        	}  		
        });
        
      //transfers
        stompClient.subscribe('/topic/transfer', function (greeting) {
        	if (typeof JSON.parse(greeting.body).stock !== 'undefined')
        		showGreeting("Car updated for tab - Pending info :  "+JSON.parse(greeting.body).stock);
        	else{
        		console.log(JSON.parse(greeting.body));
        		showGreeting("Car updated for tab - Pending info :  "+JSON.parse(greeting.body).content);
        	}  		
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    stompClient.send("/app/marketing", {}, JSON.stringify({'name': $("#name").val()}));
}

function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
});

