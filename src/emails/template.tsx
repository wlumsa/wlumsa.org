import * as React from 'react';
import { Html, Button } from "@react-email/components";

export const Email = () => {
    return (
      <Html lang="en" dir="ltr">
        <Button href="https://example.com" style={{ color: "#61DAFB" }}>
          Click me
        </Button>
      </Html>
    );
  };
  export default Email;