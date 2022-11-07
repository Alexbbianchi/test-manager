package br.com.projetoIntegrador.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

// Configurações do Cors.

@Configuration
public class WebConfig{
	
	@Bean
	public FilterRegistrationBean<CorsFilter> corsFilterFilterRegistrationBean(){
		List<String> all = new ArrayList<String>();
		all.add("*");
		List<String> origins = new ArrayList<String>();
		origins.add("http://localhost:3000");
		
		CorsConfiguration corsConfig = new CorsConfiguration();
		corsConfig.setAllowedOrigins(origins);
		corsConfig.setAllowedHeaders(all);
		corsConfig.setAllowedMethods(all);
		corsConfig.setAllowCredentials(true);
		
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", corsConfig);
		
		CorsFilter corsFilter = new CorsFilter(source);
		FilterRegistrationBean<CorsFilter> filter = new FilterRegistrationBean<CorsFilter>(corsFilter);
		filter.setOrder(Ordered.HIGHEST_PRECEDENCE);
		
		return filter;
		
	}

}
