import React from 'react'
import { Route } from 'react-router-dom';
import FormProduct from './pages/form-product/FormProduct';
import ListProducts from './pages/list-products/ListProducts';

const Routes: React.FC = () => {

    return (
        <>
            <Route path="/products" exact component={ListProducts} />
            <Route path="/products/new" component={FormProduct} />
            <Route path="/products/edit/:productId" component={FormProduct} />
        </>
    )
}

export default Routes;