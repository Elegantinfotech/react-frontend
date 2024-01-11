import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const EmailEnquiry = () => {
 const form = useRef();

 const sendEmail = (e) => {
   e.preventDefault(); // prevents the page from reloading when you hit “Send”

   emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
     .then((result) => {
         // show the user a success message
     }, (error) => {
         // show the user an error
     });
 };

 return (
   <form ref={form} onSubmit={sendEmail}>
     <label>Name</label>
     <input type="text" name="user_name" />
     <label>Email</label>
     <input type="email" name="user_email" />
     <label>Message</label>
     <textarea name="message" />
     <input type="submit" value="Send" />
   </form>
 );
};

export default EmailEnquiry;