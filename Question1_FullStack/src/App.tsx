import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllProducts from './components/AllProducts';
import ProductDetail from './components/ProductDetail';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllProducts />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
