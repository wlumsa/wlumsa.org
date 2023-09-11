import { useState } from 'react';
import axios from 'axios';
import SendEmail from './api/sendemail';
function EmailSender() {
 

  return (
    <div>
     <SendEmail/>
    </div>
  );
}

export default EmailSender;
