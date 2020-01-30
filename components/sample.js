import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, from } from 'apollo-link';

// const httpLink = new HttpLink({ uri: config.graphqlUrl });
if(process.browser){

	const session = localStorage && localStorage.getItem('woo-session') || null;
}



const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
	//   authorization: localStorage.getItem('woo-session') || null,
	  'woocommerce-session': `Session ${session}`,
    }
  }));

  return forward(operation);
})

  /**
   * Afterware operation
   * This catches the incoming session token and stores it in localStorage, for future GraphQL requests.
   */
  export const afterware = new ApolloLink((operation, forward) => {
	return forward(operation).map((response) => {
	  /**
	   * Check for session header and update session in local storage accordingly. 
	   */
	  const context = operation.getContext();
	  const { response: { headers } } = context;
	  const session = headers.get('woocommerce-session');
	  if (session) {
		if ( localStorage && localStorage.getItem('woo-session') !== session ) {
		  localStorage && localStorage.setItem('woo-session', headers.get('woocommerce-session'));
		}
	  }
  
	  return response;
	});
  });

const client = new ApolloClient({
  link: from([
    authMiddleware,
    afterware,
   
  ]),
  link: createHttpLink({
	uri: config.graphqlUrl,
}),
cache: new InMemoryCache(),
});

export default client;