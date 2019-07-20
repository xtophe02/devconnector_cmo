import React, { useState } from "react";
import { Button, Divider, Form, Grid, Segment } from "semantic-ui-react";

const initValues = { email: "", password: "" };

const LoginForm = ({ login }) => {
  const [values, setValues] = useState(initValues);
  const handleSubmit = e => {
    e.preventDefault();
    login({ variables: { email: values.email, password: values.password } });
    setValues(initValues);
  };
  return (
    <Segment placeholder>
      <Grid columns={2} relaxed="very" stackable>
        <Grid.Column>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              icon="mail"
              iconPosition="left"
              label="email"
              placeholder="Email"
              name="email"
              onChange={e => setValues({ ...values, email: e.target.value })}
              value={values.eamil}
            />
            <Form.Input
              icon="lock"
              iconPosition="left"
              label="Password"
              type="password"
              name="password"
              onChange={e => setValues({ ...values, password: e.target.value })}
              value={values.password}
            />

            <Button content="Login" primary />
          </Form>
        </Grid.Column>

        <Grid.Column verticalAlign="middle">
          <Button content="Sign up" icon="signup" size="big" />
        </Grid.Column>
      </Grid>

      <Divider vertical>Or</Divider>
    </Segment>
  );
};

export default LoginForm;
