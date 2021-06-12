import axios from 'axios';

export const INIT_PATH_STARTED = 'INIT_PATH_STARTED';
export const INIT_PATH_FAILED = 'INIT_PATH_FAILED';
export const INIT_PATH_SUCCEEDED = 'INIT_PATH_SUCCEEDED';
export const CHECK_ITEM = 'CHECK_ITEM ';
export const GENERATE_NEXT_STARTED = 'GENERATE_NEXT_STARTED';
export const GENERATE_NEXT_SUCCEEDED = 'GENERATE_NEXT_SUCCEEDED';
export const GENERATE_NEXT_FAILED = 'GENERATE_NEXT_FAILED';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.100:5000/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

export const checkItem = (itemId) => {
  return async (dispatch) => {
    dispatch({ type: CHECK_ITEM, payload: { itemId } });
  };
};

export const generateNext = (
  token,
  allshelves,
  dimX,
  dimY,
  startX,
  startY,
  endX,
  endY
) => {
  return async (dispatch) => {
    dispatch({ type: GENERATE_NEXT_STARTED });
    let path;
    try {
      const response = await axiosInstance({
        method: 'post',
        url: `/shelf/generatepath`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          allshelves,
          dimX,
          dimY,
          startX,
          startY,
          endX,
          endY,
        },
      });
      path = response.data.path;
      allshelves.forEach((shelf) => {
        path[shelf.coordX][shelf.coordY] = shelf.name;
      });
    } catch (err) {
      console.log(err);
      dispatch({ type: GENERATE_NEXT_FAILED, payload: { error: err.message } });
    }
    dispatch({ type: GENERATE_NEXT_SUCCEEDED, payload: { path } });
  };
};

export const initPath = (token, items) => {
  return async (dispatch) => {
    var shelves = [];
    var allshelves = [];
    dispatch({ type: INIT_PATH_STARTED });
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
    try {
      const response = await axiosInstance({
        method: 'get',
        url: `/shelf`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      allshelves = response.data.shelves;
    } catch (err) {
      console.log(err);
    }
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
    let orderedShelves;
    let path;
    try {
      const response = await axiosInstance({
        method: 'post',
        url: `/shelf/getshelvesconfiguration`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          allshelves,
          shelves,
          dimX: config.dimX,
          dimY: config.dimY,
        },
      });
      orderedShelves = response.data.orderedShelves;
      path = response.data.path;
    } catch (err) {
      console.log(err);
    }
    let itemsToPick = [];
    const currentShelfId = shelves[orderedShelves[1]].id;
    items.forEach((item) => {
      if (item.shelfId === currentShelfId) itemsToPick.push(item);
    });
    allshelves.forEach((shelf) => {
      path[shelf.coordX][shelf.coordY] = shelf.name;
    });
    dispatch({
      type: INIT_PATH_SUCCEEDED,
      payload: {
        items: { ...items },
        config,
        allShelves: allshelves,
        currentShelves: shelves,
        orderedShelves,
        path,
        itemsToPick,
      },
    });
  };
};
