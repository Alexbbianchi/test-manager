package br.com.projetoIntegrador.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import br.com.projetoIntegrador.model.enumeration.UserPermission;
import br.com.projetoIntegrador.model.enumeration.UserStatus;

@Entity
@Table(name = "tb_user")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private Long id;
	
	@NotEmpty(message = "Nome do usuario não pode ser nulo")
	@Column(length = 50)
	private String name;
	
	@Email
	@NotEmpty(message = "E-mail do usuario não pode ser nulo")
	@Column(length = 100)
	private String email;
	
	@NotEmpty(message = "Login do usuario não pode ser nulo")
	@Column(length = 50, unique = true, updatable = false)
	private String username;
	
	@NotEmpty(message = "Senha do usuario não pode ser nula")
	@Column(length = 50, unique = true)
	private String password;
	
	@Enumerated(EnumType.STRING)
	@Column
	private UserStatus status;
	
	@Enumerated(EnumType.STRING)
	@Column
	private UserPermission permission;
	
	

	

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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public UserStatus getStatus() {
		return status;
	}

	public void setStatus(UserStatus status) {
		this.status = status;
	}

	public UserPermission getPermission() {
		return permission;
	}

	public void setPermission(UserPermission permission) {
		this.permission = permission;
	}
	
}
