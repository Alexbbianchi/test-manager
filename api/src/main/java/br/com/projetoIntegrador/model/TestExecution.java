package br.com.projetoIntegrador.model;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "tb_test_execution")
public class TestExecution {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "test_execution_id")
	private Long id;
	
	@NotEmpty
	@Column(length = 100)
	private String name;
	
	@Column
	private String notes;
	
	@NotNull
	@Column(name = "estimated_start_date")
	private LocalDate estimatedStartDate; 
	
	@NotNull
	@Column(name = "estimated_end_date")
	private LocalDate estimatedEndDate; 
	
	@NotNull
	@Column(name = "test_plan_id", updatable = false)
	private Long testPlanId;
	
	@Transient
	private List<Long> testCases;
	
	@NotNull
	@Column(name = "user_id", updatable = false)
	private Long userId;
	
	@NotNull
	@Column(name = "product_id")
	private Long productId; 
	
	@Transient
	private String productName;
	
	@Transient
	private String technicianName;

	@Transient
	private String testPlanName;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
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

	
	public Long getTestPlanId() {
		return testPlanId;
	}

	public void setTestPlanId(Long testPlanId) {
		this.testPlanId = testPlanId;
	}
	

	public List<Long> getTestCases() {
		return testCases;
	}

	public void setTestCases(List<Long> testCases) {
		this.testCases = testCases;
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	
	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getProductName() {
		return productName;
	}

	
	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getTechnicianName() {
		return technicianName;
	}

	public void setTechnicianName(String technicianName) {
		this.technicianName = technicianName;
	}

	public String getTestPlanName() {
		return testPlanName;
	}

	public void setTestPlanName(String testPlanName) {
		this.testPlanName = testPlanName;
	}
	
	
	
}
