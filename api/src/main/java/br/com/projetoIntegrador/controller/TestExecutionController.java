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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.projetoIntegrador.model.ExecutionRecord;
import br.com.projetoIntegrador.model.ExecutionRecordTestCase;
import br.com.projetoIntegrador.model.TestCase;
import br.com.projetoIntegrador.model.TestExecution;
import br.com.projetoIntegrador.model.enumeration.ExecutionStatus;
import br.com.projetoIntegrador.service.TestExecutionService;

@RestController
@RequestMapping("/api/test-executions")
public class TestExecutionController {
	
	
	@Autowired
	TestExecutionService testExecutionService;
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public TestExecution save(@Valid @RequestBody TestExecution testExecution) {
		
		return testExecutionService.save(testExecution);
	}
	
	
	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<TestExecution> findAll(){
		
		
		return testExecutionService.findAll();
	}
	
	
	@GetMapping("{id}")
	@ResponseStatus(HttpStatus.OK)
	public TestExecution findById(@PathVariable Long id) {
		
		return testExecutionService.findById(id);
	}
	
	@PutMapping("{id}")
	@ResponseStatus(HttpStatus.CREATED)
	public TestExecution update(@PathVariable Long id, @Valid @RequestBody TestExecution testExecution) {
		
		return testExecutionService.update(id, testExecution);
	}
	
	
	@GetMapping("/test-cases-by-execution/{id}")
	@ResponseStatus(HttpStatus.OK)
	public List<TestCase> findByTestExecution(@PathVariable Long id){
		
		return testExecutionService.findByTestExecution(id);
	}
	
	@PostMapping("/execution/{id}")
	public ExecutionRecord execute(@PathVariable Long id) throws Exception { // verifica se existe uma execução em progresso e carrega ela, caso contrario, cria uma nova execução.
		
		
		return testExecutionService.execute(id);
	}	
	

	@PutMapping("/execution/{id}")
	public ExecutionRecord saveExecution(@PathVariable Long id, @RequestBody ExecutionRecord executionRecord) { //salva toda a execução. (update)
		
		
		return testExecutionService.saveExecution(id, executionRecord);
	}
	
	
	@PutMapping("/execution/save-execution-test-case/{id}")
	public ExecutionRecordTestCase saveExecutionTestCase(@PathVariable Long id, @RequestBody ExecutionRecordTestCase executionRecordTestCase) {
		
		return testExecutionService.saveExecutionTestCase(id, executionRecordTestCase);
	}
	
	
	
	@GetMapping("/execution")
	public List<ExecutionRecord> findAllExecutions(@RequestParam ExecutionStatus status){
		
		return testExecutionService.findAllExecutions(status);
	}
	
	@GetMapping("/execution/{id}")
	public ExecutionRecord findExecutionById(@PathVariable Long id) {
		
		return testExecutionService.findExecutionById(id);
		
	}
	
	
}
