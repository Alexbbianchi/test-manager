package br.com.projetoIntegrador.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.projetoIntegrador.model.ProductModule;

public interface ProductModuleRepository extends JpaRepository<ProductModule, Long>{
	
	public List<ProductModule> findByProductId(Long productId);
	
//	public ProductCategory findByCategoryIdAndProductId(Long categoryId, Long productId);
	
	public void deleteByProductId(Long id);
	
}
