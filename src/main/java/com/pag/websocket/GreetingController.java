package com.pag.websocket;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.util.HtmlUtils;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;

@Controller
public class GreetingController {
	@MessageMapping("/hello")
	@SendTo("/topic/greetings")
	public Greeting greeting(HelloMessage message) throws Exception {
		Thread.sleep(1000); // simulated delay
		if(message.getName().equalsIgnoreCase("Hey Spring, Update from React")) {
			return new Greeting("Hello, Message received from React client :  " + HtmlUtils.htmlEscape(message.getName()) + "!");
		}
		return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
	}

}
