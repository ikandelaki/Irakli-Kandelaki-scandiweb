import React from "react";
import "./Category.css";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Importing for querying
import { GET_CATEGORY } from "../queries";
import { queryFetch } from "../api/queryFetch";
import { useQuery } from "@apollo/client";

// Importing icon
import { ReactComponent as ShoppingIcon } from "../images/circle-icon.svg";

// Importing actions
import { addToCart } from "../actions";

const GetCategory = ({
  category,
  onProductHover,
  onProductLeave,
  productHoverId,
  currency,
  addToCart,
}) => {
  const { loading, error, data } = useQuery(GET_CATEGORY, {
    variables: { category: category },
  });

  if (loading) return <div></div>;
  if (error) return <div>Something went wrong...</div>;

  return data.category.products.map((product) => {
    return (
      <div
        className="product-card"
        key={product.id}
        onMouseEnter={() => onProductHover(product.id)}
        onMouseLeave={() => onProductLeave()}
      >
        <Link
          to={`${product.inStock ? `product/${product.id}` : "/"}`}
          className="category-link"
        >
          <div className="product-image">
            <img src={product.gallery[0]} alt="" />
            <div className={`${product.inStock ? "in-stock" : "out-of-stock"}`}>
              <p>OUT OF STOCK</p>
            </div>
          </div>
        </Link>
        <div
          className={`product-details ${
            product.inStock ? "" : "out-of-stock-details"
          }`}
        >
          <div className="product-title">{product.name}</div>
          <div className="product-price">
            {currency}{" "}
            {product.prices.map((price) =>
              price.currency.symbol === currency ? price.amount : null
            )}{" "}
          </div>
          {product.inStock ? (
            <div
              className={`shopping-icon ${
                productHoverId === product.id ? "shopping-icon-active" : ""
              }`}
              onClick={() => addToCart(product)}
            >
              <ShoppingIcon />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  });
};

class Category extends React.Component {
  state = { productHoverId: "" };

  onProductHover = (id) => {
    console.log();
    this.setState({ productHoverId: id });
  };

  onProductLeave = () => {
    this.setState({ productHoverId: "" });
  };

  render() {
    return (
      <div className="category">
        <h1>{this.props.category}</h1>
        <div className="grid-container--cards">
          <GetCategory
            category={this.props.category}
            onProductHover={this.onProductHover}
            onProductLeave={this.onProductLeave}
            productHoverId={this.state.productHoverId}
            currency={this.props.currency}
            addToCart={this.props.addToCart}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.category,
    currency: state.currency,
    cart: state.cart,
  };
};

export default connect(mapStateToProps, { addToCart })(Category);
