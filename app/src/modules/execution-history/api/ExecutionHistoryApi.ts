import api from '../../../api/api';
import EnumServices from '../../../services/Utils/Enums/EnumServices';
import { PriorityType, StatusType } from '../../test-case/models/TestCase';
import { DetailExecutionRecordResult, DetailExecutionTestCaseResult, ExecutionResult, ExecutionStatus, ListExecutionsHistoryResult } from '../models/ExecutionHistory';

export const endPoint: string = 'api/test-executions';

class Api {

    async findAllExecutions(status: string): Promise<ListExecutionsHistoryResult[]> {
        let result = (await api.get(`${endPoint}/execution/?status=${status}`)).data;

        result.forEach((historical: ListExecutionsHistoryResult) => {
            historical.result = EnumServices.convertStringFromEnum(ExecutionResult, historical.result);
        });

        return result;
    }

    async findExecutionById(executionId: string): Promise<DetailExecutionRecordResult> {
        let result = (await api.get(`${endPoint}/execution/${executionId}`)).data;
        
        result.result = EnumServices.convertStringFromEnum(ExecutionResult, result.result);
        result.status = EnumServices.convertStringFromEnum(ExecutionStatus, result.status);
        result.executionTestCases.forEach((executionTestCase: DetailExecutionTestCaseResult) => {
            executionTestCase.result = EnumServices.convertStringFromEnum(ExecutionResult, executionTestCase.result);
            executionTestCase.testCasePriority = EnumServices.convertStringFromEnum(PriorityType, executionTestCase.testCasePriority);
            executionTestCase.testCaseStatus = EnumServices.convertStringFromEnum(StatusType, executionTestCase.testCaseStatus);
        });

        return result;
    }

}

export const ExecutionHistoryApi = new Api();