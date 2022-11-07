package br.com.projetoIntegrador.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.projetoIntegrador.exception.IllegalArgumentException;
import br.com.projetoIntegrador.exception.NotFoundException;
import br.com.projetoIntegrador.model.Product;
import br.com.projetoIntegrador.model.TestPlan;
import br.com.projetoIntegrador.model.Version;
import br.com.projetoIntegrador.repository.ProductRepository;
import br.com.projetoIntegrador.repository.TestCaseRepository;
import br.com.projetoIntegrador.repository.TestPlanRepository;
import br.com.projetoIntegrador.repository.VersionRepository;

@Service
public class TestPlanService{

	@Autowired
	TestPlanRepository daoTP;
	
	@Autowired
	TestCaseRepository daoTC;
	
	@Autowired
	ProductRepository daoP;
	
	@Autowired
	VersionRepository daoV;
	
	@Transactional
	public TestPlan save(TestPlan testPlan) {
		return daoTP.save(testPlan);
	}
	
	public List<TestPlan> findAll(){
		List<TestPlan> testPlanDB = daoTP.findAllByOrderByName();
		
		for(TestPlan testPlan : testPlanDB) {
			Product product = daoP.findById(testPlan.getProductId()).get();
			testPlan.setProduct(product);
			
			Version version = daoV.findById(testPlan.getVersionId()).get();
			testPlan.setVersion(version);
		}
		
		return testPlanDB;
	}
	
	public TestPlan findById(Long id){
		
		if(id == null) {
			throw new IllegalArgumentException("O id do plano de teste está nulo");
		}
		
		TestPlan testPlan = daoTP.findById(id).get();
	
		Product product = daoP.findById(testPlan.getProductId()).get();
		testPlan.setProduct(product);
			
		Version version = daoV.findById(testPlan.getVersionId()).get();
		testPlan.setVersion(version);
		
		
		return testPlan;
	}
	
	@Transactional
	public TestPlan update(Long id, TestPlan testPlan) throws Exception{ // UPDATE
		
		if(id == null) {
			throw new IllegalArgumentException("O id do plano de teste está nulo");
		}
		
		if(!daoTP.existsById(id)) {
			throw new NotFoundException("Plano de teste com o id " + id + " não foi encontrado");
		}
		
		if(testPlan.getId() == null) {
			testPlan.setId(id);
		}
		
		Long tcProductId = daoTP.findById(testPlan.getId()).get().getProductId();
		Long tcVersionId = daoTP.findById(testPlan.getId()).get().getVersionId();
		
		if(tcProductId != null) {
			if(testPlan.getProductId() != tcProductId) {
				throw new Exception("Não é permitido modificar o produto já salvo");
			}
		}
		
		if(tcVersionId != null) {
			if(testPlan.getVersionId() != tcVersionId) {
				throw new Exception("Não é permitido modificar a versão já salva");
			}
		}
		
		return daoTP.save(testPlan);
	}
	
	
	public List<TestPlan> findByProduct(Long id){
		
		if(id == null) {
			throw new IllegalArgumentException("O id do produto está nulo");
		}
		
		List<TestPlan> testPlans = daoTP.findByProductId(id);
		
		return testPlans;
	}
	
}
