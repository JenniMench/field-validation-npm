import * as React from "react";
import "./style.css";

type PropType = {
  label: string;
};

type StateType = {
  invalid: boolean;
  error?: string;
};

class FieldWithValidation extends React.Component<PropType, StateType> {
  element: HTMLInputElement;

  constructor(props: PropType) {
    super(props);
    this.state = {
      invalid: false
    };
  }

  validateFields(e: React.FormEvent<HTMLInputElement>) {
    const el = e.target as HTMLInputElement;
    const invalid = !el.validity.valid;

    if (el.validationMessage !== this.state.error) {
      this.setState({ invalid, error: el.validationMessage });
    }
  }

  onBlur(e: React.FocusEvent<HTMLInputElement>) {
    this.validateFields(e);
  }

  render() {
    const { label, ...props } = this.props;
    const { invalid } = this.state;

    return (
      <div className={`singleField ${invalid ? "invalid" : "valid"}`}>
        <label>{label}</label>
        <input
          {...props}
          ref={el => {
            this.element = el;
          }}
          onBlur={e => this.onBlur(e)}
        />
        {this.state.error}
      </div>
    );
  }
}

export default FieldWithValidation;
