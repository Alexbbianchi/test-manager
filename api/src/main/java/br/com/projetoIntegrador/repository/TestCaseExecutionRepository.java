package br.com.projetoIntegrador.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.projetoIntegrador.model.TestCaseExecution;

public interface TestCaseExecutionRepository extends JpaRepository<TestCaseExecution, Long>{

	List<TestCaseExecution> findByTestExecutionId(Long testExecutionId);
}
