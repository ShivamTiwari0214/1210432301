const express = require('express');
const app = express();
const port = process.env.PORT || 9000;

const tokenUrl = 'http://20.244.56.144/test/auth';
const authData = {
    "companyName": "AffordMed",
    "clientID": "0f415594-6041-4556-a3c9-cb9d998d7693",
    "clientSecret": "byxKPCfkGEVBQnzL",
    "ownerName": "Shivam Tiwari",
    "ownerEmail": "st472438@bbdu.ac.in",
    "rollNo": "1210432301"
};

const fetchToken = async () => {
    try {
        const response = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authData)
        });

        if (!response.ok) {
            throw new Error('Failed to fetch token');
        }

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        throw error;
    }
};

const fetchProducts = async (token, company, category, top, minPrice, maxPrice) => {
    const url = `http://20.244.56.144/test/companies/${company}/categories/${category}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

app.get('/categories/:categoryname/products', async (req, res) => {
    const { categoryname } = req.params;
    const { n = 10, page = 1, sortBy = 'price', order = 'desc', minPrice = 10, maxPrice = 1000000 } = req.query;
    const perPage = parseInt(n, 10);
    const currentPage = parseInt(page, 10);

    try {
        const token = await fetchToken();
        const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
        const productPromises = companies.map(company => 
            fetchProducts(token, company, categoryname, perPage * currentPage, minPrice, maxPrice)
        );

        const responses = await Promise.all(productPromises);
        const products = responses.flat();

        // Sorting logic
        products.sort((a, b) => {
            const valueA = a[sortBy];
            const valueB = b[sortBy];

            if (typeof valueA === 'number' && typeof valueB === 'number') {
                // For numeric comparison (e.g., price)
                if (order === 'asc') {
                    return valueA - valueB;
                } else {
                    return valueB - valueA;
                }
            } else {
                // For non-numeric comparison (e.g., strings)
                if (order === 'asc') {
                    return valueA.localeCompare(valueB);
                } else {
                    return valueB.localeCompare(valueA);
                }
            }
        });

        const start = (currentPage - 1) * perPage;
        const end = start + perPage;
        const paginatedProducts = products.slice(start, end);

        const responseProducts = paginatedProducts.map((product, index) => ({
            id: `${categoryname}-${index}`,
            ...product
        }));

        res.json(responseProducts);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/categories/:categoryname/products/:productid', async (req, res) => {
    const { categoryname, productid } = req.params;

    try {
        const token = await fetchToken();
        
        const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
        const productPromises = companies.map(company => 
            fetchProducts(token, company, categoryname, 100, 10, 1000000)
        );

        const responses = await Promise.all(productPromises);
        const products = responses.flat();
        const product = products.find(p => `${categoryname}-${p.id}` === productid);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
