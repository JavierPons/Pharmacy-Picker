import React, { Component } from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPerscription } from '../actions';

import GoogleMap from './GoogleMap';
import './PharmacyNew.css';

class PharmacyNew extends Component {
  componentDidUpdate(nextProps) {
    if (this.props.pharmacies !== nextProps.pharmacies) {
      // when the component updates if pharmacies has been updated
      // change the value of its form input to the new value
      this.props.change('pharmacy', this.props.pharmacies);
    }
  }
  renderField(field) {
    // renders an input component for the field component to track
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    // I would test that this component gets the right className depending on
    // valid and invalid input for each Field
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">{touched ? error : ''}</div>
      </div>
    );
  }

  onSubmit = values => {
    // when the form submits call the action creator that posts
    // a perscriprions info to the api.
    // pop the user back to the homepage
    this.props.createPerscription(values);
    // I would test that values actually contians all expected feilds
    this.props.history.push('/');
  };

  getAddress() {
    // if this.props exists create an address string that will be used
    // by the Google map component to update the maps current origin
    if (this.props.values) {
      const { streetAddress, city, state } = this.props.values;
      return `
        ${streetAddress || ''} ${city || ''} ${state || ''}
        `;
    } else {
      return '';
    }
  }

  render() {
    // the google map component is renderd outside of a field so it
    // doesnt re render when the pharmacy property is updated
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field label="First Name" name="firstName" component={this.renderField} />
        <Field label="Last Name" name="lastName" component={this.renderField} />
        <Field label="Street Address" name="streetAddress" component={this.renderField} />
        <Field label="City" name="city" component={this.renderField} />
        <Field label="State" name="state" component={this.renderField} />
        <Field label="Zipcode" name="zipcode" component={this.renderField} />
        <GoogleMap address={this.getAddress()} />
        <Field label="Click A Pharmacy Above" name="pharmacy" component={this.renderField} />
        <div />

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
  // validations for the forms values
  // I would test that the erros get passed to the errors object correctly
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'First Name must not be left blank.';
  }

  if (!values.lastName) {
    errors.lastName = 'Last Name must not be left blank.';
  }

  if (!values.streetAddress) {
    errors.streetAddress = 'Street Address must not be left blank.';
  }

  if (!values.city) {
    errors.city = 'City must not be left blank.';
  }

  if (!values.pharmacy) {
    errors.pharmacy =
      "Pharmacy must not be left blank. Please select a pharmacy on the map above or enter your perfered store's name and address.";
  }

  errors.zipcode = validZip(values.zipcode);
  errors.state = validState(values.state);

  return errors;
}

const validZip = zipcode => {
  // if regex finds a valid zipcode return null
  // else return an error so the form can notify the user
  // I would test that this method performs as expected with valid and invalid input
  const isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipcode);

  return isValidZip ? null : 'Please provide a valid zipcode.';
};

const validState = state => {
  // if regex finds a valid state abbreviation return null
  // else return an error so the form can notify the user
  // I would test that this method performs as expected with valid and invalid input
  const stateRegex = new RegExp(
    '(^(A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$)',
    'i'
  );

  const isValidState = stateRegex.test(state);

  return isValidState ? null : 'Please provide a valid two letter state abbreviation.';
};

const mapStateToProps = state => {
  return { values: getFormValues('PharmacyNewForm')(state), pharmacies: state.pharmacies };
};

export default reduxForm({
  validate,
  form: 'PharmacyNewForm'
})(connect(mapStateToProps, { createPerscription })(PharmacyNew));
