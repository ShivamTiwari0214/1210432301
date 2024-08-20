import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  productName: string;
  price: number;
  rating: number;
  discount: number;
  availability: string;
}

const AllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get('http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000', {
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzI0MTYzNzcxLCJpYXQiOjE3MjQxNjM0NzEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImUyNWMxNTY1LTUwNGQtNDc1Yi04NzI0LTcyY2M3ODBiOTk2NyIsInN1YiI6ImFiaGluYXZheTIwMDNAYmJkdS5hYy5pbiJ9LCJjb21wYW55TmFtZSI6ImdvTWFydCIsImNsaWVudElEIjoiZTI1YzE1NjUtNTA0ZC00NzViLTg3MjQtNzJjYzc4MGI5OTY3IiwiY2xpZW50U2VjcmV0IjoidkRmeUVaVkhobGJPdWxLdCIsIm93bmVyTmFtZSI6IkFiaGluYXYgWWFkYXYiLCJvd25lckVtYWlsIjoiYWJoaW5hdmF5MjAwM0BiYmR1LmFjLmluIiwicm9sbE5vIjoiMTIxMDQzMjAwOSJ9.TogRE8YhlaUpyrwAbUm7hfvICEyWtELd4BKINTbuN3A`,
      }
    })
    .then(response => setProducts(response.data))
    .catch(error => console.error(error));
  }, []);

  console.log(products);
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <ul>
        {products.map((product, index) => (
          <li key={product.id + index} className="mb-2">
            <Link to={`/product/${product.id}`} className="text-blue-500">{product.productName}</Link>
            <div>Price: ${product.price}</div>
            <div>Rating: {product.rating}</div>
            <div>Discount: {product.discount}%</div>
            <div>Availability: {product.availability}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllProducts;
