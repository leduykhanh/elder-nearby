/**
*
* MessageComponent
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

function MessageComponent(props) {
  const { item } = props;
  return (
    <div key={item.time_added}>
      <div>{item.text}</div>
      <div className="text-right"><small>{moment(item.time_added).format('HH:mm:ss')}</small></div>
    </div>
  );
}

MessageComponent.propTypes = {
  item: PropTypes.object,
};

export default MessageComponent;
