package br.com.projetoIntegrador.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.projetoIntegrador.model.ExecutionRecordTestCase;

public interface ExecutionRecordTestCaseRepository extends JpaRepository<ExecutionRecordTestCase, Long>{

	List<ExecutionRecordTestCase> findByExecutionId(Long executionId);
}
