import React, { PropTypes } from 'react';
import MaybeReduxFormHooked from './MaybeReduxFormHooked';

export class ExpiryDateInput extends MaybeReduxFormHooked {
  constructor(props) {
    super(props);

    this.restrict = this.restrict.bind(this);
    this.validate = this.validate.bind(this);
    this.format = this.format.bind(this);
    this.formatAndValidate = this.formatAndValidate.bind(this);
  }

  restrict(charCode) {
    const digit = String.fromCharCode(charCode);
    return /^[\d\s\/]+$/.test(digit) && this.state.value.length <= 9;
  }

  validate(e) {
    if (! this.restrict(e.which)) {
      e.preventDefault();
    }
  }

  format(validatedStr) {
    const parts = validatedStr.match(/^\D*(\d{1,2})(\D+)?(\d{1,4})?/);
    if (!parts) {
      return '';
    }
    let mon = parts[1] || '';
    let sep = parts[2] || '';
    const year = parts[3] || '';

    if (year.length > 0) {
      sep = ' / ';
    } else if (sep === ' /') {
      mon = mon.substring(0, 1);
      sep = '';
    } else if (mon.length === 2 || sep.length > 0) {
      sep = ' / ';
    } else if (mon.length === 1 && ['0', '1'].indexOf(mon) < 0) {
      mon = `0${mon}`;
      sep = ' / ';
    }
    return mon + sep + year;
  }

  formatAndValidate(e) {
    let newVal = e.target.value;
    if (Array.prototype.map.call(newVal, (c) => c.charCodeAt(0)).reduce((a, b) => a && this.restrict(b), true)) {
      newVal = this.format(newVal);
      this.setState( { value: newVal } );
    }
  }

  render() {
    return <input type='text' size='2' {...this.props.attrs} {...this.props.input} value={this.state.value} onKeyPress={this.validate} onChange={this.formatAndValidate}  placeholder='Expiry Date MM / YY'/>;
  }
}
export default ExpiryDateInput;
