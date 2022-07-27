import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  {
    categories {
      name
    }
  }
`;

export const GET_CATEGORY = gql`
  query getCategory($category: String!) {
    category(input: { title: $category }) {
      name
      products {
        id
        name
        inStock
        gallery
        brand
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
      }
    }
  }
`;

export const GET_CURRENCIES = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;

export const GET_PRODUCT = `
query getProduct($id: String!) {
  product(id: $id) {
    id
    name
    inStock
    gallery
    description
    category
    attributes {
      id
      name
      type
      items {
        displayValue
        value
        id
      }
    }
    prices {
      currency {
        label
        symbol
      }
      amount
    }
    brand
  }
}
`;
