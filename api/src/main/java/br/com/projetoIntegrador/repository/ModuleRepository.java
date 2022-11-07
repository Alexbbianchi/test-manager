package br.com.projetoIntegrador.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.projetoIntegrador.model.Module;


public interface ModuleRepository extends JpaRepository<Module, Long>{

	public List<Module> findAllByOrderByName();
	
}
