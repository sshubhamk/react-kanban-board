import React from 'react';

class UtilityFunctions extends React.Component {

  static generateId() {
    return Math.floor(Math.random() * 1001);
  }

  static generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

export default UtilityFunctions;