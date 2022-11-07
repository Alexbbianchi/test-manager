import api from '../../../api/api';
import { Module, DetailModuleResult, ListModulesResult } from '../models/Module';

export const endPoint: string = 'api/modules';

class Api {

    // Async porque necessito aguardar uma finalização para prosseguir juntamente com o await
    //Métodos de requisição do módulo
    async getModule(moduleId: string): Promise<DetailModuleResult> {
        return (await api.get(`${endPoint}/${moduleId}`)).data; 
    }

    async listAll(): Promise<ListModulesResult[]> {
        return (await api.get(`${endPoint}`)).data;
    }

    async create(command: Module): Promise<Module> {
        return (await api.post(`${endPoint}`, command)).data;
    }

    async update(command: Module): Promise<Module> {
        return (await api.put(`${endPoint}/${command.id}`, command)).data;
    }
    
}

export const ModuleApi = new Api();