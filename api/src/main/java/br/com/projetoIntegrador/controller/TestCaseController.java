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

import br.com.projetoIntegrador.model.TestCase;
import br.com.projetoIntegrador.service.TestCaseService;

@RestController
@RequestMapping("/api/test-cases")
public class TestCaseController {
	
	@Autowired
	TestCaseService testCaseService;
	
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public TestCase save(@RequestBody TestCase testCase) { //CREATE
		
		return testCaseService.save(testCase);
	}
	
	
	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<TestCase> findAll(){ // LIST ALL
		
		return testCaseService.findAll();
	}
	
	
	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public TestCase findById(@PathVariable Long id) { // FIND BY ID
		
		TestCase testCase = testCaseService.findById(id);
		return testCase;
	}
	
	
	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.CREATED)
	public TestCase update(@PathVariable Long id, @Valid @RequestBody TestCase testCase) throws Exception { // UPDATE
		
		return testCaseService.update(id, testCase);
	}
}
