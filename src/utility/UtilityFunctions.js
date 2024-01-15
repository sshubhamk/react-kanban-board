import React from 'react';

class UtilityFunctions extends React.Component {

  static generateId() {
    return Math.floor(Math.random() * 1001);
  }
}

export default UtilityFunctions;