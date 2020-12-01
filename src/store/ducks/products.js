export const ADD_PRODUCT = 'ecommerce/products/add_product';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const addProduct = product => {
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
};
