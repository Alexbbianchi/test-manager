package br.com.projetoIntegrador.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.projetoIntegrador.model.TestCase;
import br.com.projetoIntegrador.model.TestPlan;

public interface TestCaseRepository extends JpaRepository<TestCase, Long>{

	public boolean existsByProductIdAndModuleId(Long productId, Long moduleId);
	
	public List<TestCase> findAllByOrderByName();
	
}
