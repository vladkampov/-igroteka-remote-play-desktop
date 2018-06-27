import React, { Component, Fragment } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Form, Button, Alert } from 'react-bootstrap';
import { reactiveMobxForm, Control } from 'reactive-mobx-form';
import { ReactiveFormControl, Loader } from '../../components';

@reactiveMobxForm('formLogin', {
  schema: {
    identifier: ['', 'required|max:255|min:3'],
    password: ['', 'required|max:20|min:6'],
  },
})
@injectIntl
class FormLogin extends Component {
  render() {
    const { submit, intl, valid, submitting, submitError } = this.props;

    return (
      <Fragment>
        <Form onSubmit={submit} className="FormLogin">
          <Control
            name="identifier"
            component={ReactiveFormControl}
            type="text"
            label={intl.formatMessage({ id: 'login.form.identifier' })}
          />
          <Control
            name="password"
            component={ReactiveFormControl}
            type="password"
            label={intl.formatMessage({ id: 'login.form.password' })}
          />
          <Button bsSize="large" type="submit" disabled={!valid || submitting}>
            <FormattedMessage id="login.form.submit" />
          </Button>
        </Form>
        {submitting && <Loader />}
        {submitError && (
          <Alert bsStyle="danger">
            {submitError}
          </Alert>
        )}
      </Fragment>
    );
  }
}

export default FormLogin;
