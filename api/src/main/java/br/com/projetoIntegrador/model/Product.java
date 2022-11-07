package br.com.projetoIntegrador.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotEmpty;

@Entity
@Table(name = "tb_product")
public class Product extends DefaultEntity{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "product_id")
	private Long id;
	
	@NotEmpty(message = "Nome do Produto não pode ser vazio!")
	@Column(length = 50)
	private String name;
	
	@Transient
	private List<Version> versions;
	
	@Transient
	private List<Long> modules;
	
	@Column(name = "description", length = 255)
	private String description;

	
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
	

	public List<Version> getVersions() {
		return versions;
	}

	public void setVersions(List<Version> versions) {
		this.versions = versions;
	}


	public List<Long> getModules() {
		return modules;
	}

	public void setModules(List<Long> modules) {
		this.modules = modules;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
