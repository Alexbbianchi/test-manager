package br.com.projetoIntegrador.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.projetoIntegrador.exception.IllegalArgumentException;
import br.com.projetoIntegrador.exception.NotFoundException;
import br.com.projetoIntegrador.model.ExecutionRecord;
import br.com.projetoIntegrador.model.ExecutionRecordTestCase;
import br.com.projetoIntegrador.model.Product;
import br.com.projetoIntegrador.model.TestCase;
import br.com.projetoIntegrador.model.TestCaseExecution;
import br.com.projetoIntegrador.model.TestExecution;
import br.com.projetoIntegrador.model.TestPlan;
import br.com.projetoIntegrador.model.Version;
import br.com.projetoIntegrador.model.enumeration.ExecutionResult;
import br.com.projetoIntegrador.model.enumeration.ExecutionStatus;
import br.com.projetoIntegrador.repository.ExecutionRecordRepository;
import br.com.projetoIntegrador.repository.ExecutionRecordTestCaseRepository;
import br.com.projetoIntegrador.repository.TestCaseExecutionRepository;
import br.com.projetoIntegrador.repository.TestCaseRepository;
import br.com.projetoIntegrador.repository.TestExecutionRepository;
import br.com.projetoIntegrador.repository.VersionRepository;

@Service
public class TestExecutionService {
	
	@Autowired
	TestExecutionRepository daoTE;
	
	
	@Autowired
	TestCaseExecutionRepository daoTCE;
	
	@Autowired
	TestCaseRepository daoTC;
	
	@Autowired
	ExecutionRecordRepository daoER;
	
	@Autowired
	ExecutionRecordTestCaseRepository daoExecTestCase;
	
	@Autowired
	VersionRepository daoVersion;
	
	@Autowired
	UserService userService;
	
	@Autowired
	TestPlanService testPlanService;
	
	@Autowired
	ProductService productService;
	
	
	@Transactional
	public TestExecution save(TestExecution testExecution) {
		
		TestExecution testExecutionEntity = daoTE.save(testExecution);
		
		for(Long testCaseId : testExecution.getTestCases()) {
			TestCaseExecution tcExecution = new TestCaseExecution();
			
			tcExecution.setTestCaseId(testCaseId);
			tcExecution.setTestExecutionId(testExecutionEntity.getId());
			
			daoTCE.save(tcExecution);
		}
		
		return testExecutionEntity;
	}
	
	
	
	public List<TestExecution> findAll(){
		
		List<TestExecution> testExecutionDB = daoTE.findAllByOrderByName();
		List<TestExecution> testExecutionJson = new ArrayList<>();
		
		for(TestExecution te : testExecutionDB) {
			List<TestCaseExecution> tceDB = daoTCE.findByTestExecutionId(te.getId());
			List<Long> testCaseList = new ArrayList<>();
			for(TestCaseExecution tce : tceDB) {
				testCaseList.add(tce.getTestCaseId());
			}
			
			String technicianName = userService.findById(te.getUserId()).getName();
			String productName = productService.findById(te.getProductId()).getName();
			String testPlanName = testPlanService.findById(te.getTestPlanId()).getName();
			
			te.setTestCases(testCaseList);
			te.setTechnicianName(technicianName);
			te.setProductName(productName);
			te.setTestPlanName(testPlanName);
			testExecutionJson.add(te);
		}
		
		return testExecutionJson;
	}
	
	
	
	public TestExecution findById(Long id) {
		
		if(id == null) {
			throw new IllegalArgumentException("O id da execução de teste esta nulo.");
		}
		
		TestExecution testExecutionDB = daoTE.findById(id).get();
		
		List<TestCaseExecution> tceDB = daoTCE.findByTestExecutionId(testExecutionDB.getId());
		List<Long> testCaseList = new ArrayList<>();
		
		for(TestCaseExecution tce : tceDB) {
			testCaseList.add(tce.getTestCaseId());
		}
		
		testExecutionDB.setTestCases(testCaseList);
		
		return testExecutionDB;
	}
	
	
	
	@Transactional
	public TestExecution update(Long id, TestExecution testExecution) {
		
		if(id == null) {
			throw new IllegalArgumentException("O id da execução de teste esta nulo.");
		}
		
		if(!daoTE.existsById(id)) {
			throw new NotFoundException("Execução de teste com o id " + id + " não foi encontrado");
		}
		
		if(testExecution.getId() == null) {
			testExecution.setId(id);
		}
		
		deleteTestCaseExecution(testExecution.getId());
		
		for(Long testCaseId : testExecution.getTestCases()) {
			TestCaseExecution tcExecution = new TestCaseExecution();
			
			tcExecution.setTestCaseId(testCaseId);
			tcExecution.setTestExecutionId(testExecution.getId());
			
			daoTCE.save(tcExecution);
		}
		
		return testExecution;
		
	}
	
	public void deleteTestCaseExecution(Long testExecutionId) {
		
		List<TestCaseExecution> executionTestCases = daoTCE.findByTestExecutionId(testExecutionId);
		
		for(TestCaseExecution tce : executionTestCases) {
			daoTCE.delete(tce);
		}
		
	}
	
	
	public List<TestCase> findByTestExecution(Long testExecutionId){
		
		if(testExecutionId == null) {
			throw new IllegalArgumentException("O id da execução de teste está nulo");
		}
		
		List<TestCaseExecution> tceDB = daoTCE.findByTestExecutionId(testExecutionId);
		List<TestCase> testCases = new ArrayList<>();
		
		for(TestCaseExecution tce : tceDB) {
			testCases.add(daoTC.findById(tce.getTestCaseId()).get());
		}
		
		return testCases;
		
	}
	
	
	public ExecutionRecord execute(Long testExecutionId) throws Exception { // verifica se existe uma execução em progresso e carrega ela, caso contrario, cria uma nova execução.
		
		if(testExecutionId == null) {
			throw new IllegalArgumentException("O id da execução de teste está nulo");
		}
		
		List<ExecutionRecord> executionRecordDB = daoER.findByTestExecutionId(testExecutionId);
		
		if(!executionRecordDB.isEmpty() || executionRecordDB != null) {
			for(ExecutionRecord er : executionRecordDB) {
				if(er.getStatus().name() == ExecutionStatus.IN_PROGRESS.name() && er.getEndDate() == null) {
					ExecutionRecord execution = er;
					
					return loadExecution(execution);
					
				}
			}
		}
		
		return createExecution(testExecutionId);
		
	}
	
	
	public ExecutionRecord loadExecution(ExecutionRecord executionRecord) { // carrega a execução que está em progresso
		
		TestExecution testExecutionDB = findById(executionRecord.getTestExecutionId());
		TestPlan testPlan = testPlanService.findById(testExecutionDB.getTestPlanId());
		Product product = productService.findById(testExecutionDB.getProductId());
		Version productVersion = daoVersion.findById(testPlan.getVersionId()).get();
		List<ExecutionRecordTestCase> executionTestCases = daoExecTestCase.findByExecutionId(executionRecord.getId());
		List<ExecutionRecordTestCase> executionTestCaseList = new ArrayList<>();
		
		executionRecord.setTestExecutionName(testExecutionDB.getName());
		executionRecord.setEstimatedStartDate(testExecutionDB.getEstimatedStartDate());
		executionRecord.setEstimatedEndDate(testExecutionDB.getEstimatedEndDate());
		executionRecord.setProductName(product.getName());
		executionRecord.setProductVersion(productVersion.getValue());
		executionRecord.setTestPlanName(testPlan.getName());
		executionRecord.setTestPlanDescrition(testPlan.getDocumentPlan());
		
		for(ExecutionRecordTestCase aux : executionTestCases) {
			TestCase testCase = daoTC.findById(aux.getTestCaseId()).get();
			aux.setTestCaseName(testCase.getName());
			aux.setTestCaseDescription(testCase.getTestCaseDocument());
			aux.setTestCaseStatus(testCase.getStatus());
			aux.setTestCasePriority(testCase.getPriority());
			executionTestCaseList.add(aux);
		}
		executionRecord.setExecutionTestCases(executionTestCaseList);
		
		System.out.println(executionRecord.toString());
		
		return executionRecord;
	}
	
	
	
	
	@Transactional
	public ExecutionRecord createExecution(Long testExecutionId) throws Exception{ // cria uma nova execução com base na execução de teste.
		
		TestExecution testExecutionDB = findById(testExecutionId);
		ExecutionRecord executionRecord = new ExecutionRecord();
		TestPlan testPlan = testPlanService.findById(testExecutionDB.getTestPlanId());
		Product product = productService.findById(testExecutionDB.getProductId());
		Version productVersion = daoVersion.findById(testPlan.getVersionId()).get();
		executionRecord.setStartDate(LocalDateTime.now());
		executionRecord.setStatus(ExecutionStatus.IN_PROGRESS);
		executionRecord.setExecutionVersion(VerifyExecutionVersion(testExecutionId));
		executionRecord.setTestExecutionId(testExecutionId);
		
		executionRecord = daoER.save(executionRecord);
		
		
		for(Long tc : testExecutionDB.getTestCases()) {
			ExecutionRecordTestCase executionRecordTestCase = new ExecutionRecordTestCase();
			TestCase testCase = daoTC.findById(tc).get();
			executionRecordTestCase.setExecutionId(executionRecord.getId());
			executionRecordTestCase.setTestCaseId(testCase.getId());
			executionRecordTestCase.setTestCaseName(testCase.getName());
			executionRecordTestCase.setTestCaseDescription(testCase.getTestCaseDocument());
			executionRecordTestCase.setTestCaseStatus(testCase.getStatus());
			executionRecordTestCase.setTestCasePriority(testCase.getPriority());
			
//			throw new Exception("erro");
			
			daoExecTestCase.save(executionRecordTestCase);
		}
		
		executionRecord.setTestExecutionName(testExecutionDB.getName());
		executionRecord.setEstimatedStartDate(testExecutionDB.getEstimatedStartDate());
		executionRecord.setEstimatedEndDate(testExecutionDB.getEstimatedEndDate());
		executionRecord.setProductName(product.getName());
		executionRecord.setProductVersion(productVersion.getValue());
		executionRecord.setTestPlanName(testPlan.getName());
		executionRecord.setTestPlanDescrition(testPlan.getDocumentPlan());	
		executionRecord.setExecutionTestCases(daoExecTestCase.findByExecutionId(executionRecord.getId()));
		
		System.out.println(executionRecord.toString());
		
		return executionRecord;
	}
	
	public Integer VerifyExecutionVersion(Long testExecutionId) { //verifica se o teste ja foi executado alguma vez para setar qual sera a versão da execução.
		
		ExecutionRecord executionRecord = daoER.findFirstByTestExecutionIdOrderByExecutionVersionDesc(testExecutionId);
		if(Objects.isNull(executionRecord)) {
			return 1;
		}else {
			return executionRecord.getExecutionVersion() + 1;
		}
		
	}
	
	public ExecutionRecord saveExecution(Long executionRecordId, ExecutionRecord executionRecord) { //salva toda a execução. (update)
		
		if(executionRecordId == null) {
			throw new IllegalArgumentException("O id da execução está nulo");
		}
		
		if(executionRecord.getId() == null) {
			executionRecord.setId(executionRecordId);
		}
		
		if(executionRecord.getStatus() == ExecutionStatus.FINISHED) {
			executionRecord.setEndDate(LocalDateTime.now());
			for(ExecutionRecordTestCase execTestCase : executionRecord.getExecutionTestCases()) {
				if(execTestCase.getResult() != ExecutionResult.OK) {
					executionRecord.setResult(ExecutionResult.FAILED);
					break;
				}
			}
			
			if(executionRecord.getResult() == null) {
				executionRecord.setResult(ExecutionResult.OK);
			}
			
		}
		
		
		
		for(ExecutionRecordTestCase execTestCase : executionRecord.getExecutionTestCases()) {
			
			daoExecTestCase.save(execTestCase);
		}
		
		
		
		
		daoER.save(executionRecord);
		
		return executionRecord;
	}
	
	
	
	public ExecutionRecordTestCase saveExecutionTestCase(Long id, ExecutionRecordTestCase executionRecordTestCase) { // salva somente um caso de teste da execução. (update)
		
		return daoExecTestCase.save(executionRecordTestCase);
	}
	
	
	
	public List<ExecutionRecord> findAllExecutions(ExecutionStatus status){ // lista todas as execuções por status.
		
		List<ExecutionRecord> executionRecordDB = daoER.findByStatusOrderByTestExecutionId(status);
		List<ExecutionRecord> executionRecordList = new ArrayList<>();
		List<ExecutionRecordTestCase> executionRecordTestCaseList = new ArrayList<>();
		
		for(ExecutionRecord er : executionRecordDB) {
			TestExecution testExecution = findById(er.getTestExecutionId());
			er.setProductName(productService.findById(testExecution.getProductId()).getName());
			er.setTestExecutionName(testExecution.getName());
			er.setTestPlanName(testPlanService.findById(testExecution.getTestPlanId()).getName());
			er.setTestPlanDescrition(testPlanService.findById(testExecution.getTestPlanId()).getDocumentPlan());
			executionRecordTestCaseList = daoExecTestCase.findByExecutionId(er.getId());

			er.setExecutionTestCases(executionRecordTestCaseList);
			
			executionRecordList.add(er);	
		}
		
		return executionRecordList;
	}
	
	public ExecutionRecord findExecutionById(Long executionRecordId) {
		ExecutionRecord executionRecord = daoER.findById(executionRecordId).get();
		TestExecution testExecution = findById(executionRecord.getTestExecutionId());
		List<ExecutionRecordTestCase> executionRecordTestCaseDB = daoExecTestCase.findByExecutionId(executionRecord.getId());
		List<ExecutionRecordTestCase> executionRecordTestCaseList = new ArrayList<>();
		
		executionRecord.setProductName(productService.findById(testExecution.getProductId()).getName());
		executionRecord.setTestExecutionName(testExecution.getName());
		executionRecord.setTestPlanName(testPlanService.findById(testExecution.getTestPlanId()).getName());
		executionRecord.setTestPlanDescrition(testPlanService.findById(testExecution.getTestPlanId()).getDocumentPlan());
		for(ExecutionRecordTestCase ertc : executionRecordTestCaseDB) {
			TestCase testCase = daoTC.findById(ertc.getTestCaseId()).get();
			ertc.setTestCaseName(testCase.getName());
			ertc.setTestCaseDescription(testCase.getTestCaseDocument());
			ertc.setTestCasePriority(testCase.getPriority());
			ertc.setTestCaseStatus(testCase.getStatus());
			executionRecordTestCaseList.add(ertc);
		}
		executionRecord.setExecutionTestCases(executionRecordTestCaseList);
		
		return executionRecord;
	}
	
	
}
