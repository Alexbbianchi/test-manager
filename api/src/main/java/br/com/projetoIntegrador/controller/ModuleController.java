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
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.projetoIntegrador.model.Module;
import br.com.projetoIntegrador.service.ModuleService;

@RestController
@RequestMapping("api/modules")
public class ModuleController {
	
	@Autowired
	ModuleService moduleService;
	
	
	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<Module> findAll(){
		
		
		return moduleService.findAll();
	}
	
	@GetMapping("{id}")
	@ResponseStatus(HttpStatus.OK)
	public Module findById(@PathVariable Long id) {
		
		Module module = moduleService.findById(id);
		
		return module;
	}
	
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Module save(@Valid @RequestBody Module module, @RequestHeader String token) {
		
		moduleService.save(module, token);
		
		return module;
	}
	
	@PutMapping("{id}")
	@ResponseStatus(HttpStatus.CREATED)
	public Module update(@PathVariable Long id, @Valid @RequestBody Module module, @RequestHeader String token) {
		
		
		return moduleService.update(id, module, token);
	}

}
