package br.com.projetoIntegrador.service;

import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.projetoIntegrador.exception.IllegalArgumentException;
import br.com.projetoIntegrador.exception.NotFoundException;
import br.com.projetoIntegrador.model.User;
import br.com.projetoIntegrador.model.enumeration.UserPermission;
import br.com.projetoIntegrador.model.enumeration.UserStatus;
import br.com.projetoIntegrador.repository.UserRepository;

@Service
public class UserService{

	
	@Autowired
	UserRepository daoUser;
	
	

	public User save(User user) {
		
		user.setStatus(UserStatus.ACTIVE);
		user.setPassword(Base64.getEncoder().encodeToString(user.getPassword().getBytes()));
		
		return daoUser.save(user);
	}
	
	public List<User> listAll() {
		
		return daoUser.findAllByOrderByName();
	}
	
	
	public User findById(Long id) {
		
		if(id == null) {
			throw new IllegalArgumentException("O id do usuário está nulo"); 
		}
		
		return daoUser.findById(id).get();
	}
	
	
	public User update(Long id, User user){
		
		if(id == null) {
			throw new IllegalArgumentException("O id do usuário está nulo"); 
		}
		
		if(!daoUser.existsById(id)) {
			throw new NotFoundException("O usuário com o id " + id + " não foi encontrado");
		}
		
		if(user.getId() == null) {
			user.setId(id);
		}
		
		user.setPassword(Base64.getEncoder().encodeToString(user.getPassword().getBytes()));
		
		return daoUser.save(user);
	}
	
	public User inactivateUser(Long id) {
		
		User user = findById(id);
		
		user.setStatus(UserStatus.INACTIVE);
		
		return daoUser.save(user);
	}
	
	
	public User activateUser(Long id) {
		
		User user = findById(id);
		
		user.setStatus(UserStatus.ACTIVE);
		
		return daoUser.save(user);
	}
	
}
