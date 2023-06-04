import logo from './logo.svg';
import './App.css';

import {
  Route,
  RouterProvider,
  Routes,
  Link,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import Login from './layouts/Login';
import Register from './layouts/Register';
import Products from './features/Products';
import ProductView from './features/ProductView';
import Category from './features/Category';
import CategoryView from './features/CategoryView';
import ProductDetails from './features/ProductDetails';
import Cart from './features/Cart';
import { useDispatch } from 'react-redux';


import Order from './features/Order';



function App() {
  

  const router= createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/categoryview' element={<CategoryView/>} />
        <Route path='/productview/:category' element={<ProductView/>} />
        <Route path='/' element={<Login/>} /> 
        <Route path='/register' element={<Register/>} /> 
        <Route path='/products' element={<Products/>}/> 
        <Route path='/category' element={<Category/>}/> 
        <Route path='/cart' element={<Cart/>}/> 
        <Route path='/order' element={<Order/>}/> 
        <Route path='/productview/:category/:id' element={<ProductDetails/>} />
      </Route>
    )
  )
  return (
    <div className="App">
     <RouterProvider router={router}/>
    </div>
  );
}
export default App;
