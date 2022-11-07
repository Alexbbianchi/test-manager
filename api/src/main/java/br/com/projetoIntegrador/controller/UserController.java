package br.com.projetoIntegrador.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.projetoIntegrador.model.User;
import br.com.projetoIntegrador.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

	
	@Autowired
	UserService userService;
	
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public User save(@Valid @RequestBody User user) {
		
		return userService.save(user);
	}

	
	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<User> listAll() {
		
		return userService.listAll();
	}
	
	
	@GetMapping("{id}")
	@ResponseStatus(HttpStatus.OK)
	public User findById(@PathVariable Long id) {
		
		return userService.findById(id);
	}
	
	
	@PutMapping("{id}")
	@ResponseStatus(HttpStatus.CREATED)
	public User update(@PathVariable Long id ,@Valid @RequestBody User user) {
		
		
		return userService.update(id, user);
	}
	
	
	@PostMapping("/activate-user/{id}")
	@ResponseStatus(HttpStatus.OK)
	public User activateUser(@PathVariable Long id) {
		
		return userService.activateUser(id);
	}
	
	@PostMapping("/inactivate-user/{id}")
	@ResponseStatus(HttpStatus.OK)
	public User inactivateUser(@PathVariable Long id) {
		
		return userService.inactivateUser(id);
	}
	
	
}
