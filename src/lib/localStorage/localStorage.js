/* eslint-disable no-undef, consistent-return */

export const loadState = key => {
  try {
    const serializedState = localStorage.getItem(key);

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

export const saveState = (key, state) => {
  try {
    const serializedState = JSON.stringify(state);

    localStorage.setItem(key, serializedState);
  } catch (e) {
    console.log(e);
  }
};

export const clearState = key => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};
