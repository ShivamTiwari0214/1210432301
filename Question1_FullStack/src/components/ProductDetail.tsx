import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: string;
  productName: string;
  price: number;
  rating: number;
  discount: number;
  availability: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    axios.get(`http://20.244.56.144/test/companies/AMZ/categories/Laptop/products/${id}`, {
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzI0MTYzNzcxLCJpYXQiOjE3MjQxNjM0NzEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImUyNWMxNTY1LTUwNGQtNDc1Yi04NzI0LTcyY2M3ODBiOTk2NyIsInN1YiI6ImFiaGluYXZheTIwMDNAYmJkdS5hYy5pbiJ9LCJjb21wYW55TmFtZSI6ImdvTWFydCIsImNsaWVudElEIjoiZTI1YzE1NjUtNTA0ZC00NzViLTg3MjQtNzJjYzc4MGI5OTY3IiwiY2xpZW50U2VjcmV0IjoidkRmeUVaVkhobGJPdWxLdCIsIm93bmVyTmFtZSI6IkFiaGluYXYgWWFkYXYiLCJvd25lckVtYWlsIjoiYWJoaW5hdmF5MjAwM0BiYmR1LmFjLmluIiwicm9sbE5vIjoiMTIxMDQzMjAwOSJ9.TogRE8YhlaUpyrwAbUm7hfvICEyWtELd4BKINTbuN3A`,
      }
    })
    .then(response => setProduct(response.data))
    .catch(error => console.error(error));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{product.productName}</h1>
      <div>Price: ${product.price}</div>
      <div>Rating: {product.rating}</div>
      <div>Discount: {product.discount}%</div>
      <div>Availability: {product.availability}</div>
    </div>
  );
};

export default ProductDetail;
