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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.projetoIntegrador.model.TestPlan;
import br.com.projetoIntegrador.service.TestPlanService;

@RestController
@RequestMapping("/api/test-plans")
public class TestPlanController {

	@Autowired
	TestPlanService testPlanService;
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public TestPlan save(@Valid @RequestBody TestPlan testPlan) {
		return testPlanService.save(testPlan);
	}
	
	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<TestPlan> findAll(){
		return testPlanService.findAll();
	}
	
	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public TestPlan findById(@PathVariable Long id){
		TestPlan testPlan = testPlanService.findById(id);
		return testPlan;
	}
	
	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.CREATED)
	public TestPlan update(@PathVariable Long id, @Valid @RequestBody TestPlan testPlan) throws Exception {
		return testPlanService.update(id, testPlan);
	}
	
	
	@GetMapping("/test-plans-by-product-id/{id}")
	public List<TestPlan>findByProductId(@PathVariable Long id){
		
		return testPlanService.findByProduct(id);
	}
	
}
