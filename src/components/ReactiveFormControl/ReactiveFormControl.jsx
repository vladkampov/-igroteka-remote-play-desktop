import React from 'react';
import { FormGroup, FormControl, HelpBlock } from 'react-bootstrap';

export default ({ input, meta, label, name, hidden, ...props }) => (
  <FormGroup
    hidden={hidden}
    controlId={name}
    validationState={meta.touched && !meta.valid && !meta.focused ? 'error' : null}
  >
    <FormControl {...input} {...props} placeholder={label} />
    {meta.touched && !meta.valid && !meta.focused && <HelpBlock>{meta.errors[0]}</HelpBlock>}
  </FormGroup>
);
