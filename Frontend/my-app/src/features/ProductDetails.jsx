import { click } from "@testing-library/user-event/dist/click";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, json, useNavigate, useParams } from "react-router-dom";
import { product, userCart } from "./TestSlice";
import axios from "axios";
const ProductDetails = () => {
  const [products, setProducts] = useState();

  const carts = useSelector((state) => state.test.cart);
  const { category, id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const pr = useSelector((state) => state.test.product);

  const [size, setSize] = useState([]);
  const [color, setColor] = useState("red");

  const [uid, setuid] = useState();
  const [count, setCount] = useState(0);

  async function fetchProducts() {
    const response = await fetch(
      `http://localhost:3333/productviews/${category}/${id}`
    );

    const data = await response.json();

    dispatch(product(data));

    if (response.status == 200) {
      setProducts(data);
    }
  }

  async function fetchCart() {
    const response = await axios.get(`http://localhost:3333/cart`, {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
      },
    });
    if (response.status == 200) {
      dispatch(userCart(response.data));
    }
  }

  useEffect(() => {
    fetchCart();
    fetchProducts();
  }, []);

  let value = "",
    value2 = [];
  let col = "",
    col2 = [];
  let extra = "",
    extra2 = [];
  let value1 = new Set();
  let col1 = new Set();
  let extra1 = new Set();

  if (pr) {
    pr.map((item) => {
      item.variant.map((item1) => {
        if (item1.key == "size") value1.add(item1.value);
        else if (item1.key == "color") col1.add(item1.value);
        else if (item1.key == "model") extra1.add(item1.value);
      });
    });
  }

  value1.forEach((ele, index) => {
    value2.push(ele);
  });

  col1.forEach((ele) => {
    col2.push(ele);
  });

  extra1.forEach((ele) => {
    extra2.push(ele);
  });



  //console.log(value2[0],col2[0], extra2[0]);



  const [option1, setOption1] = useState();
  const [option2, setOption2] = useState();
  const [option3, setOption3] = useState();

  const [selecButton1, setSelectButton1] = useState();
  const [selecButton2, setSelectButton2] = useState();
  const [selecButton3, setSelectButton3] = useState();

  const handleButtonSizeClick = (e, index, item) => {
    e.preventDefault();

    setSelectButton1(index);
    setOption1(item);

    setColor("yellow");
    setCount(0);
  };

  const handleButtonColorClick = (e, index, item) => {
    e.preventDefault();

    setSelectButton2(index);
    setOption2(item);
    setColor("yellow");
    setCount(0);
  };

  const handleButtonExtraClick = (e, index, item) => {
    e.preventDefault();

    setSelectButton3(index);
    setOption3(item);
    setColor("yellow");
    setCount(0);
  };

  const incrementCount = (e, x, y, z) => {
    e.preventDefault();

    let a = "",
      b = "",
      c = "";
    const size = new Map(),
      color = new Set(),
      model = new Set();
    const arr = [];

    if (x && y && z) {
      pr[0].variant.map((item) => {
        if (item.value == x) {
          pr[0].variant.map((item1) => {
            if (item1.value == y && item.uniqueid == item1.uniqueid) {
              pr[0].variant.map((item2) => {
                if (item2.value == z && item1.uniqueid == item2.uniqueid) {
                  if (count < item2.quantity) setCount(count + 1);
                  setuid(item2.uniqueid);
                }
              });
            }
          });
        }
      });
    }
  };

  const decrementCount = (e, x, y, z) => {
    e.preventDefault();

    if (x && y && z) {
      pr[0].variant.map((item) => {
        if (item.value == x) {
          pr[0].variant.map((item1) => {
            if (item1.value == y && item.uniqueid == item1.uniqueid) {
              pr[0].variant.map((item2) => {
                if (item2.value == z && item1.uniqueid == item2.uniqueid) {
                  if (count > 0) setCount(count - 1);
                  setuid(item2.uniqueid);
                }
              });
            }
          });
        }
      });
    }
  };

  async function cart(e, x, y, z, c, u, p, name) {
    e.preventDefault();
    const userData = { x, y, z, c, u, p, name };

    if (c == 0) {
      alert("Select any Number of Quantity");
    } else {
      const response = await axios.post(
        `http://localhost:3333/cart/${id}`,
        userData,
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Credentials": true,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 200) {
        alert("Item Added to User Cart");
        navigate(`/cart`);
      }
    }
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ padding: "10px 10px" }}>
          <p>
            <Link to="/cart">MY CART({carts.length})</Link>
          </p>
        </div>

        <div style={{ padding: "10px 10px" }}>
          <p>
            <Link to="/order">MY ORDERS</Link>
          </p>
        </div>
      </div>
      <div className="ok">
        <div className="card1">
          {pr.length > 0 ? (
            <div className="card-body">
              <img
                src={`http://localhost:3333/${pr[0].image_url}`}
                height={200}
                width={200}
                alt=""
              />
              <h3>{pr[0].name}</h3>
              <div
                className=""
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                <div style={{ fontSize: "24px" }}> {pr[0].description}</div>

                <div className="product-price">Price: {pr[0].price}</div>
              </div>

              {value2.length > 0 ? <h3>Size</h3> : ""}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {value2.length > 0 &&
                  value2.map((item, index) => {
                    return (
                      <div key={index}>
                        <button
                          onClick={(e) => handleButtonSizeClick(e, index, item)}
                          key={index}
                          style={{
                            backgroundColor:
                              selecButton1 === index ? "blue" : "green",
                          }}
                        >
                          {item}
                        </button>
                      </div>
                    );
                  })}
              </div>
              {col2.length > 0 ? <h3>Color</h3> : ""}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <>
                  {col2.length > 0 &&
                    col2.map((item, index) => {
                      return (
                        <div key={index}>
                          <button
                            onClick={(e) =>
                              handleButtonColorClick(e, index, item)
                            }
                            key={index}
                            style={{
                              backgroundColor:
                                selecButton2 === index ? "blue" : "green",
                            }}
                          >
                            {item}
                          </button>
                        </div>
                      );
                    })}
                </>
              </div>

              {extra2.length > 0 ? <h3>Options</h3> : ""}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {extra2.length > 0
                  ? extra2.map((item, index) => {
                      return (
                        <div key={index}>
                          <button
                            onClick={(e) =>
                              handleButtonExtraClick(e, index, item)
                            }
                            key={index}
                            style={{
                              backgroundColor:
                                selecButton3 === index ? "blue" : "green",
                            }}
                          >
                            {item}
                          </button>
                        </div>
                      );
                    })
                  : ""}
              </div>

              <h5>Variant</h5>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  border: "1px solid green",
                  borderSpacing: "2px",
                }}
              >
                <p>
                  {option1 ? option1 : ""} {option2 ? option2 : ""}{" "}
                  {option3 ? option3 : ""}
                </p>
                <button
                  onClick={(e) => decrementCount(e, option1, option2, option3)}
                >
                  -
                </button>
                <p> {count}</p>
                <button
                  onClick={(e) => incrementCount(e, option1, option2, option3)}
                >
                  +
                </button>
              </div>
              <form
                action=""
                onClick={(e) =>
                  cart(
                    e,
                    option1,
                    option2,
                    option3,
                    count,
                    uid,
                    pr[0].price,
                    pr[0].name
                  )
                }
              >
                <button>Add to Cart</button>
              </form>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
