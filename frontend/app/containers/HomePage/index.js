/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';

import MessageComponent from 'components/MessageComponent';

import reducer from './reducer';
import saga from './saga';
import { loadData, addMessages } from './actions';

import makeSelectData from './selectors';
import splitMessage from './splitmessage';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.send = this.send.bind(this);
  }

  state = {
    text: 'aaa bbb ccc ddd eee fff',
  }

  componentWillMount() {
    this.props.dispatch(loadData());
  }

  redirect(data) {
    window.location.assign(data.url);
  }

  send() {
    if (this.state.text.length === 0 || this.state.text.length > 500) {
      return alert('please enter text');
    }
    const messages = splitMessage(this.state.text);
    this.props.dispatch(addMessages({ messages }, this.handleData.bind(this)));
    return true;
  }

  handleData() {
    this.setState({ text: '' });
  }

  render() {
    return (
      <div>
        <h1>Tweet hi ya!</h1>
        <div className="row">
          <div className="border padding-10 col-sm-6 offset-sm-3">
            <div className="form-group">
              <label htmlFor="message-box">Start tweeting</label>
              <textarea
                onChange={(e) => this.setState({ text: e.target.value })}
                type="text"
                className="form-control"
                placeholder={this.state.text}
                id="message-box"
              >
              </textarea>
            </div>
            <div className="text-right">
              <button type="button" className="btn btn-info" onClick={this.send}>
                Send
              </button>
            </div>
            <hr />
            <div>
              {
                this.props.data.data && this.props.data.data.map(
                  (item) => <MessageComponent item={item} />
                )
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  data: PropTypes.data,
};
const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect)(withRouter(HomePage));
