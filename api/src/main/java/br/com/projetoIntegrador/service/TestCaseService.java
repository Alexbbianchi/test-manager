package br.com.projetoIntegrador.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.projetoIntegrador.exception.IllegalArgumentException;
import br.com.projetoIntegrador.exception.NotFoundException;
import br.com.projetoIntegrador.model.Module;
import br.com.projetoIntegrador.model.Product;
import br.com.projetoIntegrador.model.TestCase;
import br.com.projetoIntegrador.repository.ModuleRepository;
import br.com.projetoIntegrador.repository.ProductModuleRepository;
import br.com.projetoIntegrador.repository.ProductRepository;
import br.com.projetoIntegrador.repository.TestCaseRepository;

@Service
public class TestCaseService {

	@Autowired
	TestCaseRepository daoTC;
	
	@Autowired
	ProductRepository daoProduct;
	
	@Autowired
	ModuleRepository daoModule;
	
	@Autowired
	ProductModuleRepository daoProductModule;
	
	@Transactional 
	public TestCase save(TestCase testCase) { // CREATE
		
		return daoTC.save(testCase);
	}
	
	
	public List<TestCase> findAll(){
		List<TestCase> testCaseDB = daoTC.findAllByOrderByName(); // GET ALL TESTCASE FROM DATABASE
		
		//List<Product> productDB = new ArrayList<>();
		//List<Module> moduleDB = new ArrayList<>();
		
		for(TestCase testCase : testCaseDB) {
			if(testCase.getProductId() != null) {
				Product p = daoProduct.findById(testCase.getProductId()).get();
				testCase.setProduct(p);
				//productDB.add(p);
				
				Module m = daoModule.findById(testCase.getModuleId()).get();
				testCase.setModule(m);
				//moduleDB.add(m);
			}	
		}	
		return testCaseDB;
	}
	
	
	public TestCase findById(Long id) {
		
		if(id == null) {
			throw new IllegalArgumentException("O id do caso de teste está nulo");
		}
		
		TestCase testCaseDB = daoTC.findById(id).get();
		
		if(testCaseDB.getProductId() != null) {
			Product p = daoProduct.findById(testCaseDB.getProductId()).get();
			testCaseDB.setProduct(p);
			
			Module c = daoModule.findById(testCaseDB.getModuleId()).get();
			testCaseDB.setModule(c);
		}
		
		return testCaseDB;
	}
	
	
	@Transactional
	public TestCase update(Long id, TestCase testCase) throws Exception{ // UPDATE
		
		if(id == null) {
			throw new IllegalArgumentException("O id está nulo");
		}
		
		if(!daoTC.existsById(id)) {
			throw new NotFoundException("Caso de Teste com o id " + id + " não foi encontrado");
		}
		
		if(testCase.getId() == null) {
			testCase.setId(id);
		}
		
		Long tcProductId = daoTC.findById(id).get().getProductId();
		Long tcModuleId = daoTC.findById(id).get().getModuleId();
		
		if(tcProductId != null) {
			if(testCase.getProductId() != tcProductId) {
				throw new Exception("Não é permitido modificar o produto já salvo");
			}
		}
		
		if(tcModuleId != null) {
			if(testCase.getModuleId() != tcModuleId) {
				throw new Exception("Não é permitido modificar a categoria já salva");
			}
		}
		
		return daoTC.save(testCase);
	}
}
