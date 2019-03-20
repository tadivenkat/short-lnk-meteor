import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-0">
      <div className="container">
        <h1 style={headingStyle}>{props.title}</h1>
      </div>
    </nav>
  );
}

Header.defaultProps = {
  title: 'Short Links'
}

Header.propTypes = {
  title: PropTypes.string.isRequired
}

const headingStyle = {
  color: 'white'
}

export default Header;
