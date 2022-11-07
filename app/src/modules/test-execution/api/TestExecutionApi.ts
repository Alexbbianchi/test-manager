import api from '../../../api/api';
import EnumServices from '../../../services/Utils/Enums/EnumServices';
import FormatDateServices from '../../../services/Utils/FormatDate/FormatDateServices';
import { PriorityType, StatusType } from '../../test-case/models/TestCase';
import { DetailExecutionRecordResult, DetailExecutionRecordTestCaseResult, ExecutionRecord, ExecutionRecordTestCase, ExecutionResult, ExecutionStatus } from '../models/ExecutionRecord';
import { TestExecution, DetailTestExecutionResult, ListTestExecutionsResult } from '../models/TestExecution';

export const endPoint: string = 'api/test-executions';

class Api {
    //#region Test execution
    async getTestExecution(testExecutionId: string): Promise<DetailTestExecutionResult> {
        let result = (await api.get(`${endPoint}/${testExecutionId}`)).data;

        result.estimatedStartDate = FormatDateServices.formatMoment(result.estimatedStartDate);
        result.estimatedEndDate = FormatDateServices.formatMoment(result.estimatedEndDate);

        return result;
    }

    async listAll(): Promise<ListTestExecutionsResult[]> {
        return (await api.get(`${endPoint}`)).data;
    }

    async create(command: TestExecution): Promise<TestExecution> {
        return (await api.post(`${endPoint}`, command)).data;
    }

    async update(command: TestExecution): Promise<TestExecution> {
        return (await api.put(`${endPoint}/${command.id}`, command)).data;
    }
    //#endregion

    //#region Execution
    async getExecution(executionId: string): Promise<DetailExecutionRecordResult> {
        let result = (await api.post(`${endPoint}/execution/${executionId}`)).data;

        result.status = EnumServices.convertStringFromEnum(ExecutionStatus, result.status);
        result.executionTestCases.forEach((executionTestCase: DetailExecutionRecordTestCaseResult) => {
            executionTestCase.result = EnumServices.convertStringFromEnum(ExecutionResult, executionTestCase.result);
            executionTestCase.testCasePriority = EnumServices.convertStringFromEnum(PriorityType, executionTestCase.testCasePriority);
            executionTestCase.testCaseStatus = EnumServices.convertStringFromEnum(StatusType, executionTestCase.testCaseStatus);
        });

        return result;
    }

    async executionSave(command: ExecutionRecord): Promise<ExecutionRecord> {
        return (await api.put(`${endPoint}/execution/${command.id}`, command)).data;
    }

    async executionRecordTestCaseSave(command: ExecutionRecordTestCase): Promise<ExecutionRecordTestCase> {
        return (await api.put(`${endPoint}/execution/save-execution-test-case/${command.id}`, command)).data;
    }
    //#endregion
}

export const TestExecutionApi = new Api();