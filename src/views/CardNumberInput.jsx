import React, { PropTypes } from 'react';

var valid = require('card-validator');

export class CardNumberInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.restrictNumeric = this.restrictNumeric.bind(this);
    this.restrictCardNumber = this.restrictCardNumber.bind(this);
    this.validate = this.validate.bind(this);
    this.format = this.format.bind(this);
    this.formatAndValidate = this.formatAndValidate.bind(this);
  }
  restrictNumeric(charCode) {
    // character must be a digit (or a space we've automatically inserted)
    if (!/[\d\s]/.test(String.fromCharCode(charCode))) {
      return false;
    }
    return true;
  }

  restrictCardNumber(charCode) {
    const digit   = String.fromCharCode(charCode);

    const value = (this.state.value + digit).replace(/\D/g, '');

    return valid(value).isPotentiallyValid;
  }


  validate(e) {
    if (!(this.restrictNumeric(e.which) && this.restrictCardNumber(e.which))) {
      e.preventDefault();
    }
  }


  format(validatedStr) {
    let num = validatedStr.replace(/\D/g, '');
    const card = cardFromNumber(num);

    if (!card) {
      return num;
    }

    const upperLength = card.length[card.length.length - 1];
    num = num.slice(0, upperLength);


    if (card.format.global) {
      return num.match(card.format).join(' ');
    }

    const groups = card.format.exec(num);
    if (!groups) {
      return '';
    }
    return groups.shift()
          .filter((n) => n)
          .join(' ');
  }

  formatAndValidate(e) {
    const newCharacters = e.target.value.slice(this.state.value.length);
    if (Array.prototype.map.call(newCharacters, (c) => c.charCodeAt(0)).reduce((a, b) => a && this.restrictNumeric(b) && this.restrictCardNumber(b), true)) {
      this.setState({value: this.format(e.target.value)});
    }
  }

  render() {
    return <input type='text' size='20' {...this.props.attrs} onKeyPress={this.validate} onChange={this.formatAndValidate} value={this.state.value} placeholder='Credit Card Number'/>;
  }
}
export default CardNumberInput;
