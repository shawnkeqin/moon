import React from "react";
import { Button } from "antd";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      // <Button  style={{marginLeft: '820px'}}size="large" type="primary" onClick={() => loginWithRedirect()}>Get Started</Button>
      <Button size="large" type="primary" onClick={() => loginWithRedirect()}>
        Get Started
      </Button>
    )
  );
};

export default LoginButton;
