import api from '../../../api/api';
import EnumServices from '../../../services/Utils/Enums/EnumServices';
import { TestCase, DetailTestCaseResult, ListTestCasesResult, StatusType, PriorityType } from '../models/TestCase';

export const endPoint: string = 'api/test-cases';

class Api {

    async getTestCase(testCaseId: string): Promise<DetailTestCaseResult> {
        let result = (await api.get(`${endPoint}/${testCaseId}`)).data;

        return {
            ...result,
            status: EnumServices.convertStringFromEnum(StatusType, result.status),
            priority: EnumServices.convertStringFromEnum(PriorityType, result.priority)
        }
    }

    async listAll(): Promise<ListTestCasesResult[]> {
        let result = (await api.get(`${endPoint}`)).data;

        result.forEach((testCase: ListTestCasesResult) => {
            testCase.status = EnumServices.convertStringFromEnum(StatusType, testCase.status);
            testCase.priority = EnumServices.convertStringFromEnum(PriorityType, testCase.priority);
        });

        return result;
    }

    async create(command: TestCase): Promise<TestCase> {
        return (await api.post(`${endPoint}`, command)).data;
    }

    async update(command: TestCase): Promise<TestCase> {
        return (await api.put(`${endPoint}/${command.id}`, command)).data;
    }
    
}

export const TestCaseApi = new Api();