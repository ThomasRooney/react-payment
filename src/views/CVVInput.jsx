import React, { PropTypes } from 'react';

export class CVVInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

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
    const newCharacters = e.target.value.slice(this.state.value.length);
    if (Array.prototype.map.call(newCharacters, (c) => c.charCodeAt(0)).reduce((a, b) => a && this.restrict(b), true)) {
      this.setState({value: this.format(e.target.value)});
    }
  }

  render() {
    return  <input type='text' size='20'  {...this.props.attrs} placeholder='CVV' value={this.state.value} onKeyPress={this.validate} onChange={this.formatAndValidate}/>;
  }
}

export default CVVInput;
