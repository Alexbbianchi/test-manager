import api from '../../../api/api';
import { TestPlan, DetailTestPlanResult, ListTestPlansResult } from '../models/TestPlan';

export const endPoint: string = 'api/test-plans';

class Api {

    async getTestPlan(testPlanId: string): Promise<DetailTestPlanResult> {
        return (await api.get(`${endPoint}/${testPlanId}`)).data;
    }

    async listAll(): Promise<ListTestPlansResult[]> {
        return (await api.get(`${endPoint}`)).data;
    }

    async create(command: TestPlan): Promise<TestPlan> {
        return (await api.post(`${endPoint}`, command)).data;
    }

    async update(command: TestPlan): Promise<TestPlan> {
        return (await api.put(`${endPoint}/${command.id}`, command)).data;
    }
    
    async findAllTestPlansByProductId(productId: string): Promise<ListTestPlansResult[]> {
        return (await api.get(`${endPoint}/test-plans-by-product-id/${productId}`)).data;
    }
}

export const TestPlanApi = new Api();