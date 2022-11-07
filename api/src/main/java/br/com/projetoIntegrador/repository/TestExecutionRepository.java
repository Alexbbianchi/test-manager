package br.com.projetoIntegrador.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.projetoIntegrador.model.TestExecution;

public interface TestExecutionRepository extends JpaRepository<TestExecution, Long>{

	List<TestExecution> findAllByOrderByName();
	
}
