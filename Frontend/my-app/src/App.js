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

import axios from "axios";
import { userCart } from './features/TestSlice';
import { useEffect } from 'react';
import Order from './features/Order';
import Folder from './features/Folder';
import Pro from './features/Pro';


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
        <Route path='/folder' element={<Pro/>}/>
        <Route path='/folder/:id' element={<Folder/>}/>
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
