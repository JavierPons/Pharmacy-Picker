import React, { Component } from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPerscription } from '../actions';

import GoogleMap from '../components/GoogleMap';
import './PharmacyNew.css';

class PharmacyNew extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={className}>
        <label id="test">{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">{touched ? error : ''}</div>
      </div>
    );
  }

  onSubmit = values => {
    this.props.createPerscription(values);
    this.props.history.push('/');
  };

  render() {
    const { handleSubmit } = this.props;
    console.log(this.props.values);
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field label="First Name" name="firstName" component={this.renderField} />
        <Field label="Last Name" name="lastName" component={this.renderField} />
        <Field label="Address" name="address" component={this.renderField} />
        <Field label="City" name="city" component={this.renderField} />
        <Field label="State" name="state" component={this.renderField} />
        <Field label="Zipcode" name="zipcode" component={this.renderField} />
        <GoogleMap />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/" className="btn btn-danger">
          Cancel
        </Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'First Name must not be left blank.';
  }

  if (!values.lastName) {
    errors.lastName = 'Last Name must not be left blank.';
  }

  if (!values.address) {
    errors.address = 'Address must not be left blank.';
  }

  if (!values.city) {
    errors.city = 'City must not be left blank.';
  }

  errors.zipcode = validZip(values.zipcode);
  errors.state = validState(values.state);

  return errors;
}

function validZip(zipcode) {
  const isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipcode);

  return isValidZip ? null : 'Please provide a valid zipcode.';
}

function validState(state) {
  const stateRegex = new RegExp(
    '(^(A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$)',
    'i'
  );

  const isValidState = stateRegex.test(state);

  return isValidState ? null : 'Please provide a valid two letter state abbreviation.';
}

const mapStateToProps = state => {
  return { values: getFormValues('PharmacyNewForm')(state) };
};

export default reduxForm({
  validate,
  form: 'PharmacyNewForm'
})(connect(mapStateToProps, { createPerscription })(PharmacyNew));
