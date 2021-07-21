package com.pag.websocket;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

public class JavaCinfig {
	@Configuration
	@EnableWebMvc
	public class WebConfig extends WebMvcConfigurerAdapter {

	    @Override
	    public void addCorsMappings(CorsRegistry registry) {
	        registry.addMapping("/**");
	    }
	}
}
