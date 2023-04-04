import fs from 'fs';

export default class ProductManager {
    constructor(path){
        this.path = path; 
    }

    //#############{ Leer y convertir en JSON }#############
    getProducts = async () => {
        try {
            if (fs.existsSync(this.path)) {  
                const products = await fs.promises.readFile(this.path, 'utf-8');
                this.jsonProduct = JSON.parse(products);
                return (this.jsonProduct);
                
            } else {
                return [];
            }
        } catch (error) {
            console.error("error en getProducts");
        }
    }
    //#############{ Leer y convertir en JSON }#############


    //#############{ Guardar producto en el array }#############
    addProduct = async (singleProduct) => {
        try {
        
                const arrayProducts = await this.getProducts();  

                if (arrayProducts.length === 0) {
                    singleProduct.id = 1;
                } else {
                    singleProduct.id = arrayProducts[arrayProducts.length - 1].id + 1;
                }

                arrayProducts.push(singleProduct);
                await fs.promises.writeFile(this.path, JSON.stringify(arrayProducts, null, '\t')); 
                return singleProduct;

        } catch (error) {
            console.error("error en addProduct");
        }
    }
    //#############{ Guardar producto en el array }#############


    //#############{ Verificar ID }#############
    getProductById = async (id) => {
        try {
            const products = await this.getProducts();
            const product = products.find(product => product.id === id);
            return product;
        } catch (error) {
            console.error("error en getProductById");
        }
    }
    //#############{ Verificar ID }#############


    //#############{ Borrar en caso que getProductById sea falso }#############
    deleteProductById = async (id) => {
        try {
            const products = await this.getProducts();
            const updatedProducts = products.filter(product => product.id !== id);
            await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts, null, '\t'));
        } catch (error) {
            console.error("error en deleteProductById");
        }
    }
    //#############{ Borrar en caso que getProductById sea falso }#############


    //#############{ Actualizar producto }#############
    updateProduct = async (id, updatedProduct) => {
        try {
            const products = await this.getProducts();
            const productIndex = products.findIndex(product => product.id === id);
            if (productIndex !== -1) {
                products[productIndex] = {...products[productIndex], ...updatedProduct};
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            }
        } catch (error) {
            console.error("error en updateProduct");
        }
    }
    //#############{ Actualizar producto }#############


    //#############{ Borrar producto }#############
    deleteProduct = async (id) => {
        try {
            const products = await this.getProducts();
            const deleteProduct = products.splice((id - 1), 1);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        } catch (error) {
            console.error("error en deleteProduct");
        }
    }
    //#############{ Borrar producto }#############
} 