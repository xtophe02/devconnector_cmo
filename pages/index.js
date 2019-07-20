import React from "react";
import cookie from "cookie";
import { ApolloConsumer } from "react-apollo";
import { Container } from 'semantic-ui-react'

import redirect from "../lib/redirect";
import checkLoggedIn from "../lib/checkLoggedIn";

const Index = ({loggedInUser}) => {
  const signout = apolloClient => () => {
    document.cookie = cookie.serialize("token", "", {
      maxAge: -1 // Expire the cookie immediately
    });

    // Force a reload of all the current queries now that the user is
    // logged in, so we don't accidentally leave any state around.
    apolloClient.cache.reset().then(() => {
      // Redirect to a more useful page when signed out
      redirect({}, "/login");
    });
  };
  
  return (
    <ApolloConsumer>
      {client => (
        <Container>
          <h1>{loggedInUser.user.email}</h1>
          <form method="post" action="/upload" encType="multipart/form-data">
            <label htmlFor="image">Image</label>
            <input type="file" name="image" id="image" />
          </form>
          <button onClick={signout(client)}>Sign out</button>
        </Container>
      )}
    </ApolloConsumer>
  );
};
Index.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);
  
  if (!loggedInUser.user) {
    // If not signed in, send them somewhere more useful
    redirect(context, "/login");
  }

  return { loggedInUser };
};

export default Index;
