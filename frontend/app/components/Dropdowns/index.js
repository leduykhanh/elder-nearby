/**
*
* Dropdowns
*
*/

import React from 'react';
// import styled from 'styled-components';


function Dropdowns() {
  return (
    <div className="btn-group">
      <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Action
      </button>
      <div className="dropdown-menu">
        <a className="dropdown-item" href="#">View</a>
        <a className="dropdown-item" href="#">Delete</a>
      </div>
    </div>
  );
}

Dropdowns.propTypes = {

};

export default Dropdowns;
