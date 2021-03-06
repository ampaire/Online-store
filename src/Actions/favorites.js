/* eslint-disable camelcase */
import {
  fetchProductsPending, fetchProductsError, AddFavorite,
} from './Index';

import { FETCH_SINGLE_PENDING, FETCH_PRODUCTS_PENDING } from './Types';
import { loadingIcon, Api_url } from '../Constants/index';

export const addFavorite = (token, id, method) => dispatch => {
  loadingIcon();
  dispatch(fetchProductsPending(FETCH_SINGLE_PENDING));
  const raw = JSON.stringify({ item_id: `${id}` });
  const requestOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: raw,
  };
  fetch(`${Api_url}/favorites`, requestOptions)
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        throw res.error;
      }
      loadingIcon();
      dispatch(AddFavorite());
    })
    .catch(error => {
      dispatch(AddFavorite());
      dispatch(fetchProductsError(error));
    });
};
export const removeFavorite = (token, id) => dispatch => {
  dispatch(fetchProductsPending(FETCH_PRODUCTS_PENDING));
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  fetch(`${Api_url}/favorites/${id}`, requestOptions)
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        throw res.error;
      }
      loadingIcon();
      return res;
    })
    .catch(error => {
      dispatch(fetchProductsError(error));
    });
};
