// import axios from 'axios';
// import { put, delay, call } from 'redux-saga/effects';
// import { updateObject } from '../../utility/utility';

// const initalState = {
//   token: null,
//   userId: null,
//   error: null,
//   isLoading: false,
//   redirectPathOnLogin: '/',
// };

// // Actions //
// const TRY_AUTO_LOGIN = 'ecommerce/auth/TRY_AUTO_LOGIN';
// const AUTH_USER = 'ecommerce/auth/AUTH_USER';
// const AUTH_START = 'ecommerce/auth/AUTH_START';
// const AUTH_FAILED = 'ecommerce/auth/AUTH_FAILED';
// const AUTH_SUCCESS = 'ecommerce/auth/AUTH_SUCCESS';
// const AUTH_CHECK_TIMEOUT = 'ecommerce/auth/AUTH_CHECK_TIMEOUT';
// const AUTH_INIT_LOGOUT = 'ecommerce/auth/AUTH_INIT_LOGOUT';
// const AUTH_LOGOUT = 'ecommerce/auth/AUTH_LOGOUT';
// const SET_REDIRECT_PATH_ON_LOGIN = 'ecommerce/auth/SET_REDIRECT_PATH_ON_LOGIN';

// export const setRedirectPathOnLogin = path => {
//   return {
//     type: actionTypes.SET_REDIRECT_PATH_ON_LOGIN,
//     path: path,
//   };
// };

// export const logout = () => {
//   return {
//     type: actionTypes.AUTH_INIT_LOGOUT,
//   };
// };

// export const logoutSuccess = () => {
//   return {
//     type: actionTypes.AUTH_LOGOUT,
//   };
// };

// export const checkAuthTimeout = expirationTime => {
//   return {
//     type: actionTypes.AUTH_CHECK_TIMEOUT,
//     expirationTime: expirationTime,
//   };
// };

// export const authStart = () => {
//   return {
//     type: actionTypes.AUTH_START,
//   };
// };

// export const authSuccess = (idToken, localId) => {
//   return {
//     type: actionTypes.AUTH_SUCCESS,
//     idToken: idToken,
//     userId: localId,
//   };
// };

// export const authFailed = error => {
//   return {
//     type: actionTypes.AUTH_FAILED,
//     error: error,
//   };
// };

// export const auth = (email, password, isSignUp) => {
//   return {
//     type: actionTypes.AUTH_USER,
//     email: email,
//     password: password,
//     isSignUp: isSignUp,
//   };
// };

// export const tryAutoLogin = () => {
//   return {
//     type: actionTypes.TRY_AUTO_LOGIN,
//   };
// };

// // Action Creators //

// export const setRedirectPathOnLogin = (state, action) => {
//   return updateObject(state, {
//     redirectPathOnLogin: action.path,
//   });
// };
// export const authLogout = state => {
//   return updateObject(state, {
//     token: null,
//     userId: null,
//   });
// };
// const authStart = state => {
//   return updateObject(state, { error: null, isLoading: true });
// };
// const authSuccess = (state, action) => {
//   return updateObject(state, {
//     token: action.idToken,
//     userId: action.userId,
//     error: null,
//     isLoading: false,
//   });
// };
// const authFailed = (state, action) => {
//   return updateObject(state, { error: action.error, isLoading: false });
// };

// // A-SYNC Action Creators //

// export function* logoutSaga(action) {
//   yield call([localStorage, 'removeItem'], 'token');
//   yield call([localStorage, 'removeItem'], 'userId');
//   yield call([localStorage, 'removeItem'], 'expirationDate');
//   yield put(logoutSuccess());
// }

// export function* checkAuthTimeoutSaga(action) {
//   yield delay(action.expirationTime * 1000);
//   yield put(logout());
// }

// export function* authUserSaga(action) {
//   const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
//   yield put(authStart());
//   const authData = {
//     email: action.email,
//     password: action.password,
//     returnSecureToken: true,
//   };
//   let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`;
//   if (!action.isSignUp) {
//     url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;
//   }

//   try {
//     const res = yield axios.post(url, authData);
//     const expirationDate = new Date(
//       new Date().getTime() + res.data.expiresIn * 1000
//     );
//     localStorage.setItem('token', res.data.idToken);
//     localStorage.setItem('userId', res.data.localId);
//     localStorage.setItem('expirationDate', expirationDate);
//     yield put(authSuccess(res.data.idToken, res.data.localId));
//     yield put(checkAuthTimeout(res.data.expiresIn));
//   } catch (error) {
//     yield put(authFailed(error.response.data.error));
//   }
// }

// export function* tryAutoLoginSaga(action) {
//   const token = localStorage.getItem('token');
//   const userId = localStorage.getItem('userId');
//   if (!token) {
//     yield put(logout());
//   } else {
//     const expirationDate = new Date(localStorage.getItem('expirationDate'));
//     if (expirationDate <= new Date().getTime()) {
//       yield put(logout());
//     } else {
//       yield put(authSuccess(token, userId));
//       yield put(
//         checkAuthTimeout(
//           (expirationDate.getTime() - new Date().getTime()) / 1000
//         )
//       );
//     }
//   }
// }

// // Reducer //

// export default reducer = (state = initalState, action) => {
//   switch (action.type) {
//     case AUTH_START:
//       return authStart(state, action);
//     case AUTH_SUCCESS:
//       return authSuccess(state, action);
//     case AUTH_FAILED:
//       return authFailed(state, action);
//     case AUTH_LOGOUT:
//       return authLogout(state, action);
//     case SET_REDIRECT_PATH_ON_LOGIN:
//       return setRedirectPathOnLogin(state, action);
//     default:
//       return state;
//   }
// };
