export const SET_PAGE_AS_FOCUS = 'ecommerce/ui/set_page_as_focus';

const initialState = {
  pageIds: { home: '/home', products: '/products' },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGE_AS_FOCUS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const setPageAsFocus = pageId => {
  return {
    type: SET_PAGE_AS_FOCUS,
    payload: pageId,
  };
};
