package br.com.projetoIntegrador.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.projetoIntegrador.model.ExecutionRecord;
import br.com.projetoIntegrador.model.enumeration.ExecutionStatus;

public interface ExecutionRecordRepository extends JpaRepository<ExecutionRecord, Long>{

	List<ExecutionRecord> findByTestExecutionId(Long testExecutionId);
	
	ExecutionRecord findFirstByTestExecutionIdOrderByExecutionVersionDesc(Long testExecutionId);	
	
	List<ExecutionRecord> findByStatusOrderByTestExecutionId(ExecutionStatus status);

}