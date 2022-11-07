package br.com.projetoIntegrador.controller;

import java.time.LocalDate;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.projetoIntegrador.config.JWTConfig;
import br.com.projetoIntegrador.model.User;
import br.com.projetoIntegrador.repository.UserRepository;

@RestController
@RequestMapping("/api/login")
public class LoginController {

	@Autowired
	UserRepository daoUser;
	
	@PostMapping("/{username}/{password}")
	public String login(@PathVariable String username, @PathVariable String password) {
		
		User user = daoUser.findByUsername(username).get();
		
//		byte[] decodedBytes = Base64.getDecoder().decode(user.getPassword());
//		String decodedPassword = new String(decodedBytes);
		
		String encodedPassword = Base64.getEncoder().encodeToString(password.getBytes());
		
		if(!encodedPassword.equals(user.getPassword())) {
			return null;
		}	
		

		return getToken(user);
	}
	
	private String getToken(User user) {
		Map<String, Object> headerClaims = new HashMap<>();
		headerClaims.put("username", 	user.getUsername());
		headerClaims.put("id", 			user.getId());
		headerClaims.put("email", 		user.getEmail());
		headerClaims.put("name", 		user.getName());
		headerClaims.put("permission",  user.getPermission());
		headerClaims.put("dataToken",  LocalDate.now().toString());
		
		return JWTConfig.createToken(headerClaims);
	}
	
	
	
}
