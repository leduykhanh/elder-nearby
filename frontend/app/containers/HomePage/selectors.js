import { createSelector } from 'reselect';

/**
 * Direct selector to the login state domain
 */
const selectDataDomain = (state) => state.get('home');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Login
 */

const makeSelectData = () => createSelector(
  selectDataDomain,
  (substate) => substate.toJS()
);

export default makeSelectData;
export {
  selectDataDomain,
};
