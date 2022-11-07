package br.com.projetoIntegrador.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.projetoIntegrador.model.Module;
import br.com.projetoIntegrador.model.Product;
import br.com.projetoIntegrador.repository.ProductModuleRepository;
import br.com.projetoIntegrador.repository.VersionRepository;
import br.com.projetoIntegrador.service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {

	@Autowired
	ProductService productService;
	
	@Autowired
	ProductModuleRepository daoPM;
	
	@Autowired 
	VersionRepository daoVersion;
	
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
	public Product save(@Valid @RequestBody Product product) {
		
		
		return productService.save(product);
		
	}
	
	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<Product> findAll(){
		
		
		return productService.findAll();
	}
	
	@GetMapping("{id}")
	@ResponseStatus(HttpStatus.OK)
	public Product findById(@PathVariable Long id) {
		
		Product product = productService.findById(id);
		
		return product;
	}
	
	
	@PutMapping("{id}")
	@ResponseStatus(HttpStatus.CREATED)
	public Product update(@PathVariable Long id, @Valid @RequestBody Product product, @RequestHeader String token) throws Exception {
		
		return productService.update(id, product, token);
	}
	
	
	@GetMapping("/modules-by-product-id/{id}")
	@ResponseStatus(HttpStatus.OK)
	public List<Module> findModulesByProduct(@PathVariable Long id, @RequestHeader String token){
		
		return productService.findByProduct(id);
	}
	
}
