import React, { PropTypes } from 'react';
import MaybeReduxFormHooked from './MaybeReduxFormHooked';
var valid = require('card-validator');

export class CardNumberInput extends MaybeReduxFormHooked {
  constructor(props) {
    super(props);

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

    return valid.number(value).isPotentiallyValid;
  }


  validate(e) {
    if (!(this.restrictNumeric(e.which) && this.restrictCardNumber(e.which))) {
      e.preventDefault();
    }
  }


  format(validatedStr) {
    let num = validatedStr.replace(/\D/g, '');
    const card = valid.number(num).card;

    if (!card) {
      return num;
    }

    const upperLength = card.lengths[card.lengths.length - 1];

    num = num.slice(0, upperLength);

    const groups = [];

    card.gaps.concat(num.length).reduce((a,b) => {
      groups.push(num.slice(a,b));
      return b;
    }, 0);

    return groups.filter(g => g.length > 0).join(' ');
  }

  formatAndValidate(e) {
    let newVal = e.target.value;
    if (Array.prototype.map.call(newVal, (c) => c.charCodeAt(0))
                       .reduce((a, b) => a && this.restrictNumeric(b), true)
        && valid.number(e.target.value).isPotentiallyValid) {
      newVal = this.format(newVal);
      this.setState({value: newVal});
    }
  }

  render() {
    return <input type='text' size='20x' {...this.props.attrs} {...this.props.input} onKeyPress={this.validate} onChange={this.formatAndValidate} value={this.state.value} placeholder='Credit Card Number'/>;
  }
}
export default CardNumberInput;
