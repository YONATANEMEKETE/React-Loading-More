import React, { useEffect, useState } from 'react';
import './App.css';

function LoadMore() {
  const [isLoading, setIsLoading] = useState(null);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [disabled, setDisabled] = useState(false);

  async function fetchData() {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${
          count === 0 ? 0 : count * 20
        }`
      );

      const data = await response.json();

      if (data && data.products && data.products.length) {
        setProducts((prev) => [...prev, ...data.products]);
        setIsLoading(false);
      }

      // console.log(data);
      // console.log(products);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [count]);

  useEffect(() => {
    if (products && products.length === 100) {
      setDisabled(true);
    }
  }, [products]);

  if (isLoading) {
    return <div>loading data please wait</div>;
  }

  return (
    <div className="container">
      <div className="ppcontainer">
        {products && products.length
          ? products.map((item) => (
              <div className="product" key={item.id}>
                <img src={item.thumbnail} alt={item.title} />
                <p>{item.title}</p>
              </div>
            ))
          : null}
      </div>
      <div className="buttonContainer">
        <button
          disabled={disabled}
          onClick={() => {
            setCount((prev) => prev + 1);
          }}
        >
          Load More Products
        </button>
        {disabled ? <div>you have reached 100 products</div> : null}
      </div>
    </div>
  );
}

export default LoadMore;
