package br.com.projetoIntegrador.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.projetoIntegrador.config.JWTConfig;
import br.com.projetoIntegrador.exception.IllegalArgumentException;
import br.com.projetoIntegrador.exception.NotFoundException;
import br.com.projetoIntegrador.exception.UnauthorizedException;
import br.com.projetoIntegrador.model.Module;
import br.com.projetoIntegrador.model.Product;
import br.com.projetoIntegrador.model.ProductModule;
import br.com.projetoIntegrador.model.User;
import br.com.projetoIntegrador.model.Version;
import br.com.projetoIntegrador.model.enumeration.UserPermission;
import br.com.projetoIntegrador.repository.ModuleRepository;
import br.com.projetoIntegrador.repository.ProductModuleRepository;
import br.com.projetoIntegrador.repository.ProductRepository;
import br.com.projetoIntegrador.repository.TestCaseRepository;
import br.com.projetoIntegrador.repository.VersionRepository;

@Service
public class ProductService {
	
	@Autowired
	ModuleService moduleService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	ProductRepository daoProduct;
	
	@Autowired
	ProductModuleRepository daoPM;
	
	@Autowired
	VersionRepository daoVersion;
	
	@Autowired
	ModuleRepository daoModule;
	
	
	@Autowired
	TestCaseRepository daoTC;
	
	
	
	
	@Transactional
	public Product save(Product product) {
		
//		User user = userService.findById(JWTConfig.decode(token).getHeaderClaim("id").asLong());
		
		Product productEntity = new Product();
		
		productEntity = daoProduct.save(product);
		

		for (Long moduleId : product.getModules()) {
			
			ProductModule productModule = new ProductModule();
			
			productModule.setModuleId(moduleId);
			productModule.setProductId(productEntity.getId());
//			productModule.setBasicData(user, false);
			
			daoPM.save(productModule);
			
		}
		
		for(Version v : product.getVersions()) {
			v.setProductId(productEntity.getId());
			daoVersion.save(v);
		}
		
		
		return productEntity;
	}
	
	
	public List<Product> findAll(){
		
		List<Product> productDB = daoProduct.findAllByOrderByName();
		List<Product> productJson = new ArrayList<>();
		
		for (Product product : productDB) {
			List<ProductModule> productModulesDB = daoPM.findByProductId(product.getId());
			List<Long> moduleList = new ArrayList<>();
			List<Version> versionDB = new ArrayList<>();
			
			versionDB = daoVersion.findByProductId(product.getId());
			
			product.setVersions(versionDB);
			
			for (ProductModule pm : productModulesDB) {
				Long moduleId = moduleService.findById(pm.getModuleId()).getId();
				moduleList.add(moduleId);
			}
			
			product.setModules(moduleList); 
			
			productJson.add(product);
		}
		
		return productJson;
	}
	
	
	public Product findById(Long id) {
		
		if(id == null) {
			throw new IllegalArgumentException("O id do produto está nulo.");
		}
		
		Product productDB = daoProduct.findById(id).get();
		
		List<ProductModule> productModulesDB = daoPM.findByProductId(productDB.getId());
		List<Version> versionDB = daoVersion.findByProductId(productDB.getId());
		List<Long> moduleList = new ArrayList<>();
		
		productDB.setVersions(versionDB);
		
		for (ProductModule pm : productModulesDB) {
			Long moduleId = moduleService.findById(pm.getModuleId()).getId();
			moduleList.add(moduleId);
		}
		
		productDB.setModules(moduleList); 
		
		return productDB;
	}
	
	
	@Transactional
	public Product update(Long id, Product product, String token) {
		
		if(id == null) {
			throw new IllegalArgumentException("O id do produto está nulo");
		}
		
		User user = userService.findById(JWTConfig.decode(token).getHeaderClaim("id").asLong());
		
		if(user.getPermission().name() == UserPermission.VISITOR.name()) {
			throw new UnauthorizedException("Permissão insuficiente");
		}
		
		if(!daoProduct.existsById(id)) {
			throw new NotFoundException("Produto com o id " + id + " não foi encontrado");
		}
		
		if(product.getId() == null) {
			product.setId(id);
		}
		
		
		deleteProductModule(product.getId());
		
		for (Long m : product.getModules()) {
			
			ProductModule productModule = new ProductModule();
			
			productModule.setModuleId(m);
			productModule.setProductId(product.getId());
			productModule.setBasicData(user, true);
			if(!daoTC.existsByProductIdAndModuleId(product.getId(), m)) {
				daoPM.save(productModule);
			}
			
		}
		
		for(Version version : product.getVersions()) {
			version.setProductId(product.getId());
			daoVersion.save(version);
		}
		
		product.setBasicData(user, true);
		
		return daoProduct.save(product);
	}
	
	
	
	public void deleteProductModule(Long productId){
		
		
		
		List<ProductModule> productModules = daoPM.findByProductId(productId);
		
		for(ProductModule pm : productModules) {
			if(!daoTC.existsByProductIdAndModuleId(productId, pm.getModuleId())){
				daoPM.delete(pm);
			}
			
		}
		
	}
	
	
	public List<Module> findByProduct(Long productId) {
		
		if(productId == null) {
			throw new IllegalArgumentException("O id do produto está nulo");
		}
		
		List<ProductModule> productModule = daoPM.findByProductId(productId);
		
		List<Module> modules = new ArrayList<>();
		
		for(ProductModule pModule : productModule) {
			Long id = pModule.getModuleId();
			modules.add(daoModule.findById(id).get());
		}
		
		return modules;
	}

}
