import * as React from 'react';
import { Html, Button } from "@react-email/components";

const props = {
  url: "wlumsa.org"
}
export function Email() {
  
  return (
    <Html lang="en">
      <Button href="">Click me</Button>
    </Html>
  );
}

export default Email;