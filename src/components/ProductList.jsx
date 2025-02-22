import React from "react";

function ProductList({ products }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.unique_product_id}>
          <h3>{product.caption}</h3>
          <p>Price: ${product.price}</p>
        </li>
      ))}
    </ul>
  );
}

export default ProductList;