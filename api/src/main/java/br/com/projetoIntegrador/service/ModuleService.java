package br.com.projetoIntegrador.service;

import java.time.LocalDateTime;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.auth0.jwt.interfaces.DecodedJWT;

import br.com.projetoIntegrador.config.JWTConfig;
import br.com.projetoIntegrador.exception.IllegalArgumentException;
import br.com.projetoIntegrador.exception.NotFoundException;
import br.com.projetoIntegrador.exception.UnauthorizedException;
import br.com.projetoIntegrador.model.Module;
import br.com.projetoIntegrador.model.User;
import br.com.projetoIntegrador.model.enumeration.UserPermission;
import br.com.projetoIntegrador.repository.ModuleRepository;

@Service
public class ModuleService {

	@Autowired
	ModuleRepository daoModule;
	
	@Autowired
	UserService userService;
	
	public List<Module> findAll(){
		
		return daoModule.findAllByOrderByName();
	}
	
	public Module findById(Long id){
		
		if(id == null) {
			throw new IllegalArgumentException("O id do modulo esta nulo.");
		}
		
		return daoModule.findById(id).get();
	}
	
	
	public Module save(Module module, String token) {
		
		User user = userService.findById(JWTConfig.decode(token).getHeaderClaim("id").asLong());
		
		
		if(user.getPermission().name() == UserPermission.VISITOR.name()) {
			throw new UnauthorizedException("Permissão insuficiente");
		}
		
		
		return daoModule.save(module);
	}
	
	public Module update(Long id, Module module, String token){
		
		if(id == null) {
			throw new IllegalArgumentException("O id do modulo esta nulo.");
		}

		
		User user = userService.findById(JWTConfig.decode(token).getHeaderClaim("id").asLong());
		
		
		
		if(user.getPermission().name() == UserPermission.VISITOR.name()) {
			throw new UnauthorizedException("Permissão insuficiente");
		}
		
		
		if(!daoModule.existsById(id)) {
			throw new NotFoundException("Modulo com o id " + id + " não foi encontrado");
		}
		
		if(module.getId() == null) {
			module.setId(id);
		}
		
		module.setBasicData(user, true);
		
		return daoModule.save(module);
	}	
}
