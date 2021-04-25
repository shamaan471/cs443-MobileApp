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
      const response = await fetch(
        'https://teenyurl21.herokuapp.com/api/User/Signup',
        {
          method: 'Post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: fullName,
            email: email,
            password: password
          })
        }
      );
      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        let message = 'Something went wrong!';
        console.log(message);
        console.log(errorId);
      }

      const resData = await response.json();
      console.log(resData);
      // dispatch(
      //   authenticate(
      //     resData.id
      //   )
      // );
    };
};


export const login = (email, password) => {
    return dispatch => {
        dispatch({type: LOGIN, email: email, password: password});
    };
};


export const logout = () => {
  return dispatch => {
    dispatch({type: LOGOUT});
  }
};
  