# Desafio3_ServidorWeb__Oliver_Zapata

## Pasos para ejecutarlo

- Seleccionar el archivo index.js y abrir en terminal integrada (Es decir abrir la consola)
- Teniéndo NodeJS instalado, instalar la dependencia express con el siguiente comando: npm install express
- Colocar eL comando: node index.js
- Abrir el navegador y poner la ruta http://localhost:8080/products
- Si se desea buscar un producto por su ID, se puede ingresando la ruta de la siguiente manera: http://localhost:8080/products/1 (En ese ejemplo trae el producto con el ID 1, agregando a la ruta /1)
- Si se desea buscar un producto estableciendo un límite, poner la ruta http://localhost:8080/products-search y especificar el límite, ingresandola de la siguiente manera: http://localhost:8080/products-search?limit=5 (En ese ejemplo la ruta trae límite de 5, agregando a la ruta ?limit=5, esto trae los primeros 5 productos del array de la lista de productos)
