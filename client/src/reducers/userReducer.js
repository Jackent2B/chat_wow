export const initialstate = null;

export const reducer = (state, action) => {
  switch (action.type) {
    case 'USER':
      return action.payload;
    case 'CLEAR':
      return null;
    case 'UPDATEPIC':
      return {
        ...state,
        pic: action.payload,
      };
    case 'UPDATE':
      return {
        ...state,
        followers: action.payload.followers,
        following: action.payload.following,
      };
    default:
      return state;
  }
};
