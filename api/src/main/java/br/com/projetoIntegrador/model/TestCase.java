package br.com.projetoIntegrador.model;

//import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;


import br.com.projetoIntegrador.model.enumeration.TestCasePriority;
import br.com.projetoIntegrador.model.enumeration.TestCaseStatus;

@Entity
@Table(name = "tb_test_case")
public class TestCase {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "test_case_id")
	private Long id;
	
	@Column(name = "product_id")
	private Long productId;
	
	@Column(name = "module_id")
	private Long moduleId;
	
	@NotEmpty
	@Column(length = 100)
	private String name;
	
	@NotEmpty
	@Column(name = "document", length = 255)
	private String testCaseDocument; 
	
	@Column(length = 255)
	private String notes;

	@Enumerated(EnumType.STRING)
	@NotNull
	@Column
	private TestCasePriority priority;
	
	@Enumerated(EnumType.STRING)
	@NotNull
	@Column
	private TestCaseStatus status;

	
	// ----------- Teste ------------
	
	@Transient
	private Product product;
	
	@Transient
	private Module module;
	
	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public Module getModule() {
		return module;
	}

	public void setModule(Module module) {
		this.module = module;
	}
	
	
	/*@Transient
	private List<Product> products;
	
	@Transient
	private List<Category> categories;
	
	public List<Product> getProducts() {
		return products;
	}

	public void setProducts(List<Product> products) {
		this.products = products;
	}

	public List<Category> getCategories() {
		return categories;
	}

	public void setCategories(List<Category> categories) {
		this.categories = categories;
	}*/
	
	// ------------------------
	
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public Long getModuleId() {
		return moduleId;
	}

	public void setModuleId(Long moduleId) {
		this.moduleId = moduleId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTestCaseDocument() {
		return testCaseDocument;
	}

	public void setTestCaseDocument(String testCaseDocument) {
		this.testCaseDocument = testCaseDocument;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public TestCasePriority getPriority() {
		return priority;
	}

	public void setPriority(TestCasePriority priority) {
		this.priority = priority;
	}

	public TestCaseStatus getStatus() {
		return status;
	}

	public void setStatus(TestCaseStatus status) {
		this.status = status;
	}
	
}
