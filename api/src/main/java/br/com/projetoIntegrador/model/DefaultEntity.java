package br.com.projetoIntegrador.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.validation.constraints.NotNull;

@MappedSuperclass
public abstract class DefaultEntity {

	@Column(name = "created_by")
	private Long createdBy;
	
	@Column(name = "created_date")
    private LocalDateTime createdDate;
	
    @Column(name = "last_modified_by")
    private Long lastModifiedBy;

    @Column(name = "last_modified_date")
    private LocalDateTime lastModifiedDate;
    


	public Long getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Long createdBy) {
		this.createdBy = createdBy;
	}


	public LocalDateTime getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(LocalDateTime createdDate) {
		this.createdDate = createdDate;
	}
	

	public Long getLastModifiedBy() {
		return lastModifiedBy;
	}

	public void setLastModifiedBy(Long lastModifiedBy) {
		this.lastModifiedBy = lastModifiedBy;
	}

	
	public LocalDateTime getLastModifiedDate() {
		return lastModifiedDate;
	}

	public void setLastModifiedDate(LocalDateTime lastModifiedDate) {
		this.lastModifiedDate = lastModifiedDate;
	}
    
	public void setBasicData(User user, boolean update) {
		
		if(!update) {
			setCreatedBy(user.getId());
			setCreatedDate(LocalDateTime.now());
		}
		
		if(update) {
			setLastModifiedBy(user.getId());
			setLastModifiedDate(LocalDateTime.now());
		}
		
		
	}
	
}
