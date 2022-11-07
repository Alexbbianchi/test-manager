package br.com.projetoIntegrador.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.projetoIntegrador.model.TestPlan;

public interface TestPlanRepository extends JpaRepository<TestPlan, Long>{
	
	List<TestPlan> findAllByOrderByName();
	
	List<TestPlan> findByProductId(Long productId);
	
}
