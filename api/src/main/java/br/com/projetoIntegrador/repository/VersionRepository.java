package br.com.projetoIntegrador.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.projetoIntegrador.model.Version;

public interface VersionRepository extends JpaRepository<Version, Long>{

	List<Version> findByProductId(Long productId);
	
}
