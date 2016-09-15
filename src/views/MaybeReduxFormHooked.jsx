import React, { PropTypes } from 'react';

export class MaybeReduxFormHooked extends React.Component {
  constructor(props) {
    super(props);

    if (props.input && props.input.value) {
      this.state = {value: props.input.value};
    } else {
      this.state = {value: ''};
    }

    if (props.input) { // only override when we've got a redux form input
      this.componentDidUpdate = () => this.props.input.onChange(this.state.value);
    }
  }
}

export default MaybeReduxFormHooked;
