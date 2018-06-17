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
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';
import { loadData, addMessages } from './actions';

import { createStructuredSelector } from 'reselect';
import makeSelectLogin from 'containers/Login/selectors';
import makeSelectData from './selectors';
import splitMessage from './splitmessage';
import Dropdowns from 'components/Dropdowns';


 export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    text: "",
    shortened: null,
  }
  componentWillMount(){
    this.props.dispatch(loadData());
  }

  redirect(data){
    window.location.assign(data.url);
  }

  send(){
    if (this.state.text.length == 0 || this.state.text.length > 500)
      return alert("please enter text");
    let messages = splitMessage(this.state.text);
    this.props.dispatch(addMessages({ messages }, this.handleData.bind(this)));
  }

  handleData(data){
    this.setState({shortened: data.shortened});
  }

  render() {
    return (
      <div>
          <h1>Tweet hi ya!</h1>
          <div className="row">
            <div className="border padding-10 col-sm-6 offset-sm-3">
            <div className="form-group">
              <label>start tweeting</label>
              <input onChange={(e) => this.setState({text:e.target.value})}
                type="text" className="form-control" placeholder="hahahah" />
            </div>
            <div>
            </div>
              <div className="text-right">
                <button type="button" className="btn btn-info" onClick={this.send.bind(this)}>
                  Send
                </button>
              </div>
            </div>
          </div>
          <div>
            {
              this.props.data.data && this.props.data.data.map(
                (item, index) => <div key={index} className="row">{item.text}</div>
              )
            }
          </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
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
  withConnect, ) (withRouter(HomePage));

// export default HomePage;
