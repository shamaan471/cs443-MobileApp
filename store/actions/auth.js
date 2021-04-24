export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';



//loginor signup
export const authenticate = (userId) => {
    return dispatch => {
      dispatch({ type: AUTHENTICATE, userId: userId});
    };
};




export const signup = (fullName, email, password) => {
    return async dispatch => {
      //get infomration from database
      //...
    };
};


export const login = (email, password) => {
    return dispatch => {
        dispatch({type: LOGIN, email: email, password: password});
    };
};
  