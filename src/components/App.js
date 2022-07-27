import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { connect } from "react-redux/es/exports";
import { toggleCart, toggleCurrency } from "../actions";

import Header from "./Header";
import Category from "./Category";
import CurrencySwitcher from "./CurrencySwitcher";
import MiniCart from "./MiniCart";
import ProductDescription from "./ProductDescription";
import Bag from "./Bag";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Header />
          <CurrencySwitcher />
          <MiniCart />
          <Switch>
            <Route path="/" exact component={Category} />
            <Route path="/product/:id" component={ProductDescription} />
            <Route path="/cart" component={Bag} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return { cartOpen: state.cartOpen, currencyOpen: state.currencyOpen };
};

export default connect(mapStateToProps, { toggleCurrency, toggleCart })(App);
