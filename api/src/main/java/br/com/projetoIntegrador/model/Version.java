package br.com.projetoIntegrador.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "tb_version", 
	uniqueConstraints = {
			@UniqueConstraint(columnNames = {
					"value", "product_id"
			})
	}
)
public class Version {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "version_id")
	private Long id; 
	
	@Column(name = "product_id")
	private Long productId;
	
	@Column
	private Integer value;

	
	
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

	public Integer getValue() {
		return value;
	}

	public void setValue(Integer value) {
		this.value = value;
	}
	
	
	
}
