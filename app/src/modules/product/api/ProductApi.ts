import api from '../../../api/api';
import { ListModulesResult } from '../../module/models/Module';
import { Product, DetailProductResult, ListProductsResult } from '../models/Product';

export const endPoint: string = 'api/products';

class Api {

    async getProduct(productId: string): Promise<DetailProductResult> {
        return (await api.get(`${endPoint}/${productId}`)).data;
    }

    async listAll(): Promise<ListProductsResult[]> {
        return (await api.get(`${endPoint}`)).data;
    }

    async create(command: Product): Promise<Product> {
        return (await api.post(`${endPoint}`, command)).data;
    }

    async update(command: Product): Promise<Product> {
        return (await api.put(`${endPoint}/${command.id}`, command)).data;
    }
    
    async findAllModulesByProductId(productId: string): Promise<ListModulesResult[]> {
        return (await api.get(`${endPoint}/modules-by-product-id/${productId}`)).data;
    }

}

export const ProductApi = new Api();