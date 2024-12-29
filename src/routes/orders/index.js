import express from 'express';
import products from '../../data/products';
const app = express();

app.use(express.json());

app.disable('x-powered-by');

const port = process.env.PORT?? 3000;

const products = app.get('/products', (req, res) => {    
    res.json(products);
});





app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});

export default products;