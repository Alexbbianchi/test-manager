package br.com.projetoIntegrador.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "tb_test_case_execution")
public class TestCaseExecution {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "test_case_execution_id")
	private Long id;
	
	@NotNull
	@Column(name = "test_case_id")
	private Long testCaseId;
	
	@NotNull
	@Column(name = "test_execution_id")
	private Long testExecutionId;

	
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	

	public Long getTestCaseId() {
		return testCaseId;
	}

	public void setTestCaseId(Long testCaseId) {
		this.testCaseId = testCaseId;
	}
	

	public Long getTestExecutionId() {
		return testExecutionId;
	}

	public void setTestExecutionId(Long testExecutionId) {
		this.testExecutionId = testExecutionId;
	}
	
}
