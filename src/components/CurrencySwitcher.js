import { useQuery } from "@apollo/client";
import React from "react";
import { connect } from "react-redux";

// Importing actions
import { selectCurrency } from "../actions";
import { toggleCurrency } from "../actions";
import { GET_CURRENCIES } from "../queries";
import "./CurrencySwitcher.css";

const GetCurrencies = ({ selectCurrency, toggleCurrency, currencyOpen }) => {
  const { loading, error, data } = useQuery(GET_CURRENCIES);

  if (loading) return null;
  if (error) return null;

  return data.currencies.map((currency, id) => {
    return (
      <div
        className="currency-block"
        key={id}
        onClick={() => {
          selectCurrency(currency.symbol);
          toggleCurrency(false);
        }}
      >
        <div>{currency.symbol}</div>
        <div>{currency.label}</div>
      </div>
    );
  });
};

class CurrencySwitcher extends React.Component {
  render() {
    return (
      <div className="curr">
        <div
          className={`currency-switcher ${
            this.props.currencyOpen ? "active" : ""
          }`}
        >
          <GetCurrencies
            currencyOpen={this.props.currencyOpen}
            toggleCurrency={this.props.toggleCurrency}
            selectCurrency={this.props.selectCurrency}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
    currencyOpen: state.currencyOpen,
  };
};

export default connect(mapStateToProps, { selectCurrency, toggleCurrency })(
  CurrencySwitcher
);
