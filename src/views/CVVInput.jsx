import React, { PropTypes } from 'react';
import MaybeReduxFormHooked from './MaybeReduxFormHooked';

export class CVVInput extends MaybeReduxFormHooked {
  constructor(props) {
    super(props);

    this.restrict = this.restrict.bind(this);
    this.validate = this.validate.bind(this);
    this.format = this.format.bind(this);
    this.formatAndValidate = this.formatAndValidate.bind(this);
  }

  restrict(charCode) {
    const digit = String.fromCharCode(charCode);
    return /^[\d]+$/.test(digit) && this.state.value.length <= 4;
  }

  validate(e) {
    if (! this.restrict(e.which)) {
      e.preventDefault();
    }
  }

  format(validatedStr) {
    return validatedStr.replace(/\D/g, '').slice(0, 4);
  }

  formatAndValidate(e) {
    let newVal = e.target.value;
    if (Array.prototype.map.call(newVal, (c) => c.charCodeAt(0)).reduce((a, b) => a && this.restrict(b), true)) {
      newVal = this.format(newVal);
      this.setState( { value: newVal } );
    }
  }

  render() {
    return  <input type='text' size='20'  {...this.props.attrs} {...this.props.input} placeholder='CVV' value={this.state.value} onKeyPress={this.validate} onChange={this.formatAndValidate}/>;
  }
}

export default CVVInput;
