import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
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

export default reduxForm({
  form: 'PharmacyNewForm'
})(connect(null, { createPerscription })(PharmacyNew));
