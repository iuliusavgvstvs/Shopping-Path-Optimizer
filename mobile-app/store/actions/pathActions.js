import axios from 'axios';

export const INIT_PATH_STARTED = 'INIT_PATH_STARTED';
export const INIT_PATH_FAILED = 'INIT_PATH_FAILED';
export const INIT_PATH_SUCCEEDED = 'INIT_PATH_SUCCEEDED';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.100:5000/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

export const initPath = (token, items) => {
  return async (dispatch) => {
    var shelves = [];
    dispatch({ type: INIT_PATH_STARTED, paylod: { token, items } });
    let config;
    try {
      const response = await axiosInstance({
        method: 'get',
        url: `/config/`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      config = response.data.config;
    } catch (err) {
      console.log(err);
    }
    shelves.push({ coordX: config.startX, coordY: config.startY });
    for (var i = 0; i < items.length; i++) {
      try {
        const response = await axiosInstance({
          method: 'get',
          url: `/shelf/${items[i].shelfId}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const shelf = response.data.shelves[0];
        const shelfIndex = shelves.find((s) => s.id === shelf.id);
        if (!shelfIndex) {
          shelves.push(shelf);
        }
      } catch (err) {
        dispatch({ type: INIT_PATH_FAILED, payload: { error: err.message } });
        console.log(err);
      }
    }
    try {
      const response = await axiosInstance({
        method: 'post',
        url: `/shelf/getshelvesconfiguration`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          shelves,
        },
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
    dispatch({ type: INIT_PATH_SUCCEEDED, paylod: { shelves, items } });
    console.log('rafturi aici ------>', shelves);
  };
};

// export const addShelf = (token, product) => {
//   return async (dispatch) => {
//     try {
//       const response = await axiosInstance({
//         method: 'get',
//         url: `/shelf/${product.shelfId}`,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const responseData = response.data;
//       dispatch({ type: ADD_SHELF, payload: responseData });
//     } catch (error) {
//       console.log('fetch shelf error', error);
//     }
//   };
// };
