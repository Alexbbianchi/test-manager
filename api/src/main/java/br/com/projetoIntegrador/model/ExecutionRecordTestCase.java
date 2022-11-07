package br.com.projetoIntegrador.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import br.com.projetoIntegrador.model.enumeration.ExecutionResult;
import br.com.projetoIntegrador.model.enumeration.TestCasePriority;
import br.com.projetoIntegrador.model.enumeration.TestCaseStatus;

@Entity
@Table(name = "tb_execution_record_test_case")
public class ExecutionRecordTestCase {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "execution_record_test_case_id")
	private Long id;
	
	@Column(name = "test_case_id")
	private Long testCaseId;
	
	@Column(name = "execution_record_id")
	private Long executionId;

	@Column
	private String document;
	
	@Enumerated(EnumType.STRING)
	@Column
	private ExecutionResult result;
	
	@Transient
	private String testCaseName;
	
	@Transient
	private String testCaseDescription;

	@Transient
	private TestCaseStatus testCaseStatus;

	@Transient
	private TestCasePriority testCasePriority;
	
	
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

	public Long getExecutionId() {
		return executionId;
	}

	public void setExecutionId(Long executionId) {
		this.executionId = executionId;
	}
	

	public String getDocument() {
		return document;
	}

	public void setDocument(String document) {
		this.document = document;
	}
	

	public ExecutionResult getResult() {
		return result;
	}

	public void setResult(ExecutionResult result) {
		this.result = result;
	}
	

	public String getTestCaseName() {
		return testCaseName;
	}

	public void setTestCaseName(String testCaseName) {
		this.testCaseName = testCaseName;
	}

	public String getTestCaseDescription() {
		return testCaseDescription;
	}

	public void setTestCaseDescription(String testCaseDescription) {
		this.testCaseDescription = testCaseDescription;
	}

	public TestCaseStatus getTestCaseStatus() {
		return testCaseStatus;
	}

	public void setTestCaseStatus(TestCaseStatus testCaseStatus) {
		this.testCaseStatus = testCaseStatus;
	}
	

	public TestCasePriority getTestCasePriority() {
		return testCasePriority;
	}

	public void setTestCasePriority(TestCasePriority testCasePriority) {
		this.testCasePriority = testCasePriority;
	}
	

}