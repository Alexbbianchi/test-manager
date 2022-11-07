package br.com.projetoIntegrador.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import br.com.projetoIntegrador.model.enumeration.ExecutionResult;
import br.com.projetoIntegrador.model.enumeration.ExecutionStatus;

@Entity
@Table(name = "tb_execution_record")
public class ExecutionRecord {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "execution_record_id")
	private Long id;
	
	
	@NotNull
	@Column(name = "test_execution_id")
	private Long testExecutionId;
	
	
	@NotNull
	@Column(name = "start_date")
	private LocalDateTime startDate;
	
	
	@Column(name = "end_date")
	private LocalDateTime endDate;
	
	
	@Enumerated(EnumType.STRING)
	@Column
	private ExecutionResult result; 
	
	@Enumerated(EnumType.STRING)
	@Column
	private ExecutionStatus status;
	
	
	@Column(name = "execution_version")
	private Integer executionVersion;
	
	
	@Transient
	private String testExecutionName;
	
	@Transient
	private LocalDate estimatedStartDate;
	
	@Transient
	private LocalDate estimatedEndDate;
	
	@Transient
	private String testPlanName;
	
	
	@Transient
	private String testPlanDescrition;
	
	
	@Transient
	private String productName;
	
	@Transient
	private Integer productVersion;
	
	@Transient
	private List<ExecutionRecordTestCase> executionTestCases;

	
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	

	public Long getTestExecutionId() {
		return testExecutionId;
	}

	public void setTestExecutionId(Long testExecutionId) {
		this.testExecutionId = testExecutionId;
	}
	

	public LocalDateTime getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDateTime startDate) {
		this.startDate = startDate;
	}
	

	public LocalDateTime getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDateTime endDate) {
		this.endDate = endDate;
	}
	

	public ExecutionResult getResult() {
		return result;
	}

	public void setResult(ExecutionResult result) {
		this.result = result;
	}
	

	public ExecutionStatus getStatus() {
		return status;
	}

	public void setStatus(ExecutionStatus status) {
		this.status = status;
	}
	

	public Integer getExecutionVersion() {
		return executionVersion;
	}

	public void setExecutionVersion(Integer executionVersion) {
		this.executionVersion = executionVersion;
	}

	
	public String getTestExecutionName() {
		return testExecutionName;
	}
	

	public void setTestExecutionName(String testExecutionName) {
		this.testExecutionName = testExecutionName;
	}
	
	
	public LocalDate getEstimatedStartDate() {
		return estimatedStartDate;
	}

	public void setEstimatedStartDate(LocalDate estimatedStartDate) {
		this.estimatedStartDate = estimatedStartDate;
	}

	public LocalDate getEstimatedEndDate() {
		return estimatedEndDate;
	}

	public void setEstimatedEndDate(LocalDate estimatedEndDate) {
		this.estimatedEndDate = estimatedEndDate;
	}

	public String getTestPlanName() {
		return testPlanName;
	}

	public void setTestPlanName(String testPlanName) {
		this.testPlanName = testPlanName;
	}
	

	public String getTestPlanDescrition() {
		return testPlanDescrition;
	}

	public void setTestPlanDescrition(String testPlanDescrition) {
		this.testPlanDescrition = testPlanDescrition;
	}
	

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}
	

	public Integer getProductVersion() {
		return productVersion;
	}

	public void setProductVersion(Integer productVersion) {
		this.productVersion = productVersion;
	}

	public List<ExecutionRecordTestCase> getExecutionTestCases() {
		return executionTestCases;
	}

	public void setExecutionTestCases(List<ExecutionRecordTestCase> executionTestCases) {
		this.executionTestCases = executionTestCases;
	}

	@Override
	public String toString() {
		return "ExecutionRecord [id=" + id + ", testExecutionId=" + testExecutionId + ", startDate=" + startDate
				+ ", endDate=" + endDate + ", result=" + result + ", status=" + status + ", executionVersion="
				+ executionVersion + ", testExecutionName=" + testExecutionName + ", estimatedStartDate="
				+ estimatedStartDate + ", estimatedEndDate=" + estimatedEndDate + ", testPlanName=" + testPlanName
				+ ", testPlanDescrition=" + testPlanDescrition + ", productName=" + productName + ", productVersion="
				+ productVersion + ", executionTestCases=" + executionTestCases + "]";
	}
	
	
	
	
}
