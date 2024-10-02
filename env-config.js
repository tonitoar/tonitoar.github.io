// env-config.js
export const emailjsConfig = {
    userID: import.meta.env.VITE_EMAILJS_USER_ID, // These will need to be defined in your .env file
    serviceID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  };
  