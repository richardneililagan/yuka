//
// :: Production environment specific configuration
//
export default {

  // :: IP address for the application
  ip : process.env.OPENSHIFT_NODEJS_IP ||
       process.env.IP ||
       undefined,

  // :: port number to expose the app from
  port : process.env.OPENSHIFT_NODEJS_PORT ||
         process.env.PORT ||
         8080

};