package br.com.projetoIntegrador.model;

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
@Table(name = "tb_test_plan")
public class TestPlan {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "test_plan_id")
	private Long id;
	
	@NotEmpty
	@Column(length = 100)
	private String name;
	
	@NotNull
	@Column(name = "product_id", updatable = false)
	private Long productId;
	
	@NotNull
	@Column(name = "version_id", updatable = false)
	private Long versionId;
	
	@NotEmpty
	@Column(name = "document", length = 255)
	private String documentPlan;
	
	/*@Transient
	private List<TestCase> testCases;*/
	
	
	//------------------------------------
	
	@Transient
	private Product product;
	
	@Transient
	private Version version;
	
	//------------------------------------
	
	
	
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

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public Long getVersionId() {
		return versionId;
	}

	public void setVersionId(Long versionId) {
		this.versionId = versionId;
	}

	public String getDocumentPlan() {
		return documentPlan;
	}

	public void setDocumentPlan(String documentPlan) {
		this.documentPlan = documentPlan;
	}
	
	/*public List<TestCase> getTestCases() {
		return testCases;
	}

	public void setTestCases(List<TestCase> testCases) {
		this.testCases = testCases;
	}*/

	//-------------------------------------------
	
	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public Version getVersion() {
		return version;
	}

	public void setVersion(Version version) {
		this.version = version;
	}
	
	//-------------------------------------------
}
