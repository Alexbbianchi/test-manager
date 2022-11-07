package br.com.projetoIntegrador.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.projetoIntegrador.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{

	public Product findByName(String name);
	
	public List<Product> findAllByOrderByName();
	
}
