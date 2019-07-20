import React from 'react'
import { Mutation, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import cookie from "cookie";

import redirect from "../lib/redirect";
import checkLoggedIn from "../lib/checkLoggedIn";

import LoginForm from '../components/LoginForm'

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(data:{email: $email, password: $password}){token}
  }
`;

const login = () => (
  <ApolloConsumer>
      {client => (
        <Mutation
          mutation={LOGIN_USER}
          onCompleted={({ login }) => {
             // Store the token in cookie
             document.cookie = cookie.serialize('token', login.token, {
              maxAge: 3*3600 // 3 hours
            })
            // Force a reload of all the current queries now that the user is
            // logged in
            client.cache.reset().then(() => {
              redirect({}, '/')
            })
          }}
          onError={error => {
            // If you want to send error to external service?
            console.log(error)
          }}
        >
          {(login, { loading, error }) => {
            // this loading state will probably never show, but it's helpful to
            // have for testing
            if (loading) return <p>loading...</p>;
            if (error) return <p>An error occurred{console.log(error)}</p>;

            return <LoginForm login={login} />;
          }}
        </Mutation>
      )}
    </ApolloConsumer>
)
login.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);
 
  if (loggedInUser.user) {
    // If not signed in, send them somewhere more useful
    redirect(context, "/");
  }

  return {};
};

export default login
