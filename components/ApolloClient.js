// @ts-check
'use strict';

import { ApolloClient } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink, concat } from 'apollo-link';
import config from './../client-config';
import fetch from 'isomorphic-unfetch';

/**
 * Middleware operation
 * If we have a session token in localStorage, add it to the GraphQL request as a Session header.
 */
// export const middleware = new ApolloLink((operation, forward) => {
// 	console.log('before Req...')
// 	/**
// 	 * If session data exist in local storage, set value as session header.
// 	 */
// 	const session = localStorage.getItem('woo-session') || 'test';
// 	if (session) {
// 		operation.setContext(({ headers = {} }) => ({
// 			headers: {
// 				'woocommerce-session': `Session ${session}`,
// 			}
// 		}));
// 	}

// 	return forward(operation);
// });
// export const middleware = new ApolloLink((operation, forward) => {
// 	console.log('here')
// 	operation.setContext({
// 		headers: {
// 			authorization: `${JSON.parse(localStorage.getItem("wp-decoupled/user")).authToken}` || 'test',
// 		}
// 	});
// 	return forward(operation);
// });
/**
 * Afterware operation
 * This catches the incoming session token and stores it in localStorage, for future GraphQL requests.
 */
// export const afterware = new ApolloLink((operation, forward) => {
// 	return forward(operation).map((response) => {
// 		/**
// 		 * Check for session header and update session in local storage accordingly. 
// 		 */
// 		const context = operation.getContext();
// 		const { response: { headers } } = context;
// 		const session = headers.get('woocommerce-session');
// 		if (session) {
// 			if (localStorage.getItem('woo-session') !== session) {
// 				localStorage.setItem('woo-session', headers.get('woocommerce-session'));
// 			}
// 		}

// 		return response;
// 	});
// });
// link: middlewareLink.concat(httpLink)
//
// console.log(middleware.concat((client)))
// client = new ApolloClient({
// 	link: middleware.concat(client),
// 	// link: middleware.concat(afterware.concat(client)),
// 	cache,
// 	clientState: {},
// });

// const authLink = setContext((_, { headers }) => {
// 	// get the authentication token from local storage if it exists
// 	// @ts-ignore
// 	// const token = Cookies.get('token')
// 	// return the headers to the context so httpLink can read them
// 	return {
// 		headers: {
// 			...headers,
// 			// authorization: `Bearer ${JSON.parse(localStorage.getItem("wp-decoupled/user")).authToken}`
// 		},
// 	}
// })



// const httpLink = createHttpLink({
// 	uri: config.graphqlUrl,
// 	credentials: 'same-origin'
// });
// const link = middleware.concat(httpLink);

// Apollo GraphQL client.
// let client = new ApolloClient({
// 	link: ApolloLink.from([
// 		authLink.concat(
// 			createHttpLink({
// 				uri: config.graphqlUrl,
// 				credentials: 'same-origin',
// 				fetch: fetch
// 			})
// 		),
// 	]),
// 	cache: new InMemoryCache()
// });


const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	// const token = Cookies.get('token')
	// return the headers to the context so httpLink can read them
	return {
	  headers: {
		...headers,
		// authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbG.....iYE`,
	  },
	}
  })
  
  const client = new ApolloClient({
	link: ApolloLink.from([
	//   onError(({ graphQLErrors, networkError }) => {
	// 	if (graphQLErrors)
	// 	  graphQLErrors.forEach(({ message, locations, path }) => console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`))
	// 	if (networkError) console.log(`[Network error]: ${networkError}`)
	//   }),
	  authLink.concat(
		createHttpLink({
		  uri: config.graphqlUrl,
		  credentials: 'include',
		  fetch: fetch,
		  headers: {
			// authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3QiLCJpYXQiOjE1Nzc3MzU1MzUsIm5iZiI6MTU3NzczNTUzNSwiZXhwIjoxNTc4MzQwMzM1LCJkYXRhIjp7InVzZXIiOnsiaWQiOiIxMTgifX19.mTU-kUpZ-bvpiNMhi_sPQa-xL-PRDHF3eFmwDcO4iYE`,
		  },
		})
	  ),
	]),
	cache: new InMemoryCache(),
  })

export default client;



// const client = new ApolloClient({
// 	link: createHttpLink({
// 		uri: config.graphqlUrl,
// 	}),
// 	cache: new InMemoryCache(),
// });

// export default client;


