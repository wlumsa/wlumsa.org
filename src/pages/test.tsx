import React from 'react';
import Email from './emails/welcome';
import { render } from '@react-email/render';

const Test = () => {
    const emailComponent = <Email firstName='syed' lastName='ahmed' />;
    const html = render(emailComponent, { pretty: true });
  
    return (
        <div className='h-screen w-screen'>
        <iframe
            srcDoc={html}
            title="Email Preview"
            style={{ width: '100%', height: '100%', border: 'none' }}
        
        />
      </div>
    );
  }
  

export default Test;
