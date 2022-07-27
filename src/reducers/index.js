import { combineReducers } from "redux";

// Select a category
const selectedCategoryReducer = (selectedCategory = "all", action) => {
  if (action.type === "CATEGORY_SELECTED") {
    return action.payload;
  }

  return selectedCategory;
};

// Select a currency
const selectedCurrencyReducer = (selectedCurrency = "$", action) => {
  if (action.type === "CURRENCY_SELECTED") {
    return action.payload;
  }

  return selectedCurrency;
};

// Toggle currency dropdown
const dropdownReducer = (dropdownOpen = false, action) => {
  if (action.type === "TOGGLE_DROPDOWN") {
    return action.payload;
  }

  return dropdownOpen;
};

// Toggle cart dropdown
const cartDropdownReducer = (dropdownOpen = false, action) => {
  if (action.type === "TOGGLE_CART_DROPDOWN") {
    return action.payload;
  }

  return dropdownOpen;
};

const initialCart = {
  cartItems: [],
};

// Add item to cart or remove item from cart
const cartReducer = (cart = initialCart, action) => {
  // Add item to cart
  if (action.type === "ADD_TO_CART") {
    const payload = action.payload.product;
    const item = cart.cartItems.find((product) => product.id === payload.id);
    if (item) {
      return {
        ...cart,
        cartItems: cart.cartItems.map((item) =>
          item.id === payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }

    // Adding the "selected" properties to attributes
    // to easily change them later when selected
    // By default first ones are set to be "selected: true"
    if (action.payload.fromPDP) {
      const itemSpread = {
        ...payload,
        quantity: 1,
      };

      return {
        ...cart,
        cartItems: [...cart.cartItems, itemSpread],
      };
    } else {
      const itemSpread = {
        ...payload,
        quantity: 1,
        attributes: payload.attributes.map((attribute) => {
          return {
            ...attribute,
            items: attribute.items.map((item, i) => {
              return {
                ...item,
                selected: i === 0 ? true : false,
              };
            }),
          };
        }),
      };
      return {
        ...cart,
        cartItems: [...cart.cartItems, itemSpread],
      };
    }
  }

  // Select the attribute and change the "selected" property to true
  if (action.type === "SELECT_ATTRIBUTE") {
    const { payload } = action;
    const itemSpread = {
      ...payload.product,
      attributes: payload.product.attributes.map((attribute) => {
        if (attribute.id === payload.attributeId) {
          return {
            ...attribute,
            items: attribute.items.map((item) => {
              if (item.id === payload.attributeItemId) {
                return {
                  ...item,
                  selected: true,
                };
              } else {
                return {
                  ...item,
                  selected: false,
                };
              }
            }),
          };
        } else {
          return {
            ...attribute,
          };
        }
      }),
    };

    const cartItems = cart.cartItems.map((item) => {
      if (item.id === payload.itemId) {
        return itemSpread;
      } else {
        return item;
      }
    });

    return {
      ...cart,
      cartItems: [...cartItems],
    };
  }

  // Remove item from cart if the quantity is 1
  // or reduce the quantity if there's more than one
  if (action.type === "REMOVE_FROM_CART") {
    const { payload } = action;
    const item = cart.cartItems.find((product) => product.id === payload.id);

    if (item.quantity > 1) {
      return {
        ...cart,
        cartItems: cart.cartItems.map((item) => {
          if (item.id === payload.id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        }),
      };
    } else {
      return {
        ...cart,
        cartItems: cart.cartItems.filter((item) => item.id !== payload.id),
      };
    }
  }

  return cart;
};

// Reducer of a product that was selected for a pdp page
// By default we set the first attribute to be selected
const productReducer = (pdp = {}, action) => {
  if (action.type === "ADD_TO_PDP") {
    const { payload } = action;
    const item = {
      ...payload,
      attributes: payload.attributes.map((attribute) => {
        return {
          ...attribute,
          items: attribute.items.map((item, i) => {
            if (i === 0) {
              return {
                ...item,
                selected: true,
              };
            } else {
              return {
                ...item,
                selected: false,
              };
            }
          }),
        };
      }),
    };
    return { ...pdp, product: item };
  }

  if (action.type === "SELECT_PRODUCT_ATTRIBUTE") {
    const { payload } = action;
    const itemSpread = {
      ...payload.product,
      attributes: payload.product.attributes.map((attribute) => {
        if (attribute.id === payload.attributeId) {
          return {
            ...attribute,
            items: attribute.items.map((item) => {
              if (item.id === payload.attributeItemId) {
                return {
                  ...item,
                  selected: true,
                };
              } else {
                return {
                  ...item,
                  selected: false,
                };
              }
            }),
          };
        } else {
          return {
            ...attribute,
          };
        }
      }),
    };

    return { ...pdp, product: itemSpread };
  }

  return pdp;
};

export default combineReducers({
  category: selectedCategoryReducer,
  currency: selectedCurrencyReducer,
  currencyOpen: dropdownReducer,
  cart: cartReducer,
  cartOpen: cartDropdownReducer,
  product: productReducer,
});
