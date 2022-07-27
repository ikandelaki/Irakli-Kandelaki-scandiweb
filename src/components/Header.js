import React from "react";

// importing gql stuff
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../queries";

// importing action creators
import { connect } from "react-redux";

import { selectCategory } from "../actions";
import { selectCurrency } from "../actions";
import { toggleCurrency } from "../actions";
import { toggleCart } from "../actions";

// Importing svgs
import { ReactComponent as HeaderLogo } from "../images/logo-transparent.svg";
import { ReactComponent as CartLogo } from "../images/shopping-cart.svg";
import { ReactComponent as DropdownLogo } from "../images/dropdown-icon.svg";
import { Link } from "react-router-dom";

import "./Header.css";

// Fetching the categories
const GetCategories = ({ selectedCategory, selectCategory }) => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return null;
  if (error) return <p>Error :(</p>;

  return data.categories.map((category, i) => {
    return (
      <Link to="/" className="category-link" key={i}>
        <li
          className={`${category.name === selectedCategory ? "selected" : ""}`}
          onClick={() => selectCategory(category.name)}
        >
          {category.name}
        </li>
      </Link>
    );
  });
};

class Header extends React.Component {
  // Event listener to body to close the currency menu
  componentDidMount() {
    document.addEventListener("mousedown", (e) => {
      if (
        !e.target.closest(".currency") &&
        !e.target.closest(".currency-switcher")
      ) {
        this.props.toggleCurrency(false);
      }
    });
  }

  cartItemQuantity = () => {
    return this.props.cart.reduce(
      (cur, cartItem) => cur + cartItem.quantity,
      0
    );
  };

  render() {
    return (
      <div className="header">
        <div className="header-logo">
          <HeaderLogo />
        </div>
        <nav className="header-navigation">
          <GetCategories
            selectedCategory={this.props.category}
            selectCategory={this.props.selectCategory}
          />
        </nav>
        <div className="header-actions">
          <div
            className="currency"
            onClick={() => {
              this.props.toggleCurrency(!this.props.currencyOpen);
              this.props.toggleCart(false);
            }}
          >
            <div className="currency-sign">{this.props.currency}</div>
            <div>
              <DropdownLogo />
            </div>
          </div>
          <div
            className="shopping-cart"
            onClick={() => {
              this.props.toggleCart(!this.props.cartOpen);
              this.props.toggleCurrency(false);
            }}
          >
            <CartLogo />
            {this.cartItemQuantity() ? (
              <div className="cart-item-count">{this.cartItemQuantity()}</div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.category,
    currency: state.currency,
    currencyOpen: state.currencyOpen,
    cartOpen: state.cartOpen,
    cart: state.cart.cartItems,
  };
};

export default connect(mapStateToProps, {
  selectCategory,
  selectCurrency,
  toggleCurrency,
  toggleCart,
})(Header);
