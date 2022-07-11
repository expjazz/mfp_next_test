import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CheckboxWrapper } from './styled';

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: false };
  }
  componentDidMount() {
    this.setState({ checked: this.props.checked });
  }

  componentWillReceiveProps(newProps) {
    if (this.props.checked !== newProps.checked) {
      this.setState({ checked: newProps.checked });
    }
  }
  getProps = () => {
    if (this.props.id) {
      return { htmlFor: this.props.id };
    }
    return {};
  };

  handleChange = () => {
    if (!this.props.notLocal) {
      this.setState({ checked: !this.state.checked });
    }
    if (this.props.onChange) this.props.onChange(!this.state.checked);
  };

  render() {
    return (
      <CheckboxWrapper
        {...this.getProps()}
        className={`${this.props.className} check-box ${this.state.checked ? 'is-checked' : 'not-checked'}`}
      >
        {this.props.placeholder}
        <input
          id={this.props.id && this.props.id}
          type="checkbox"
          checked={this.state.checked}
          onChange={this.handleChange}
          disabled={this.props.disabled ? this.props.disabled : false}
          className={`${this.state.checked ? 'is-checked' : 'not-checked'}`}
        />
        <span className="checkmark" />
        {this.props.label}
      </CheckboxWrapper>
    );
  }
}

Checkbox.propTypes = {
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  className: PropTypes.string,
  notLocal: PropTypes.bool,
};

Checkbox.defaultProps = {
  onChange: () => {},
  checked: false,
  id: '',
  placeholder: '',
  disabled: false,
  label: '',
  className: '',
  notLocal: false,
};

export default Checkbox;
