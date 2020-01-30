import Layout from "../components/layouts/Layout";
import { useState } from 'react';
import client from '../components/ApolloClient';
import { ApolloProvider, Query } from 'react-apollo';
import { Mutation } from 'react-apollo';
import config from '../client-config';
import gql from 'graphql-tag';
import Loading from "../components/message-alert/Loading";
import Router from 'next/router';
import { isUserValidated } from "../utils/auth-functions";
import isEmpty from "../validator/isEmpty";
import Link from "next/link";


/**
 * Change password of user mutation query.
 * 
 */
    //   mutation ChangePassword( $id: String! $password: String! ) {
let updateUser_test = 1;
const CHANGE_PASSWORD = gql`
    mutation ChangePassword {
        updateCustomer(input: {clientMutationId: "7542", id: "Y3VzdG9tZXI6MTI=", nicename: "aryan", displayName: "Cool Aryan"}) {
            customer {
              displayName
              modified
              username
            }
          }
  }
`;

// const TEST_QUERY = gql`
// query MyQuery {
//     customers {
//       nodes {
//         customerId
//         firstName
//         displayName
//       }
//     }
//   }
//   `

const TEST_QUERY = gql`query MyQuery {
  customers {
    nodes {
      customerId
      firstName
      displayName
    }
  }
}`


  


/**
* Change Password functional component.
*
* @return {object} Change Password form.
*/

const ChangePassword = ( props ) => {

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showAlertBar, setShowAlertBar] = useState(true);
    const {result } = props;
    // Check if the user is validated already.
    if (process.browser) {

        const userValidated = isUserValidated();

        // If user is already validated, redirect user to My Account page.
        // if (!isEmpty(userValidated)) {
        //     Router.push('/my-account')
        // }

    }

    /**
 * Hide the Status bar on cross button click.
 *
 * @return {void}
 */
    const onCloseButtonClick = () => {
        setShowAlertBar(false);
        setErrorMessage('');
    };

    	/**
	 * Sets client side error.
	 *
	 * Sets error data to result received from our client side validation function,
	 * and statusbar to true so that its visible to show the error.
	 *
	 * @param {Object} validationResult Validation Data result.
	 */
	// const setClientSideError = ( validationResult ) => {

	// 	if( validationResult.errors.password ) {
	// 		setErrorMessage( validationResult.errors.password );
	// 	}

	// 	if( validationResult.errors.username ) {
	// 		setErrorMessage( validationResult.errors.username );
	// 	}

	// 	setShowAlertBar( true );

	// };

	/**
	 * Set server side error.
	 *
	 * Sets error data received as a response of our query from the server
	 * and sets statusbar to true so that its visible to show our error.
	 *
	 * @param {String} error Error
	 *
	 * @return {void}
	 */
	const setServerSideError = ( error ) => {
		setErrorMessage( error );
		setShowAlertBar( true );
	};


    	/**
	 * Handle Login success.
	 *
	 * @param {Object} response Response received
	 *
	 * @return {void}
	 */
	const handleChangePasswordSuccess = ( response ) => {

		if ( response.data.updateUser.user.id ) {

			// Set form field vaues to empty.
			setErrorMessage( '' );
			setUsername( '' );
			setPassword( '' );

			// Send the user to My Account page on successful login.
			Router.push('/login');

		}

    };
    
    	/**
	 * Handle Change Password Fail.
	 *
	 * Set the error message text and validated to false.
	 *
	 * @param {String} err Error message received
	 * @return {void}
	 */
	const handleChangePasswordFail = ( err ) => {

		const error = err.split( '_' ).join( ' ' ).toUpperCase();

		setServerSideError( error );

	};

    const handleChangePassword = async (event, changePassword) => {
        if(process.browser) {

            event.preventDefault();

            await changePassword( {
                variables: {
                    id: "dXNlcjoz"
                } } )
                .then( response => handleChangePasswordSuccess( response ) )
                .catch( err => handleChangePasswordFail( err.graphQLErrors && err.graphQLErrors[0] && err.graphQLErrors[0].message ) );
        }
    }

    const handleQuery = async (query) =>{
        const result = await client.query({
          query: TEST_QUERY  
        })

        console.log({result});
        


    }

    // return (
    //     <ApolloProvider client={client}>
    //         <Layout>
    //             <Mutation mutation={CHANGE_PASSWORD}>
    //                 {(changePassword, { loading, error }) => (

    //                     <div className="wd-form container mt-5 pt-5">

    //                         {/* Title */}
    //                         <h2 className="mb-2">ChangePassword</h2>

    //                         {/* Error Message */}
    //                         {/* {(('' !== errorMessage)) ? (
    //                             showAlertBar && (
    //                                 <MessageAlert
    //                                     message={errorMessage}
    //                                     success={false}
    //                                     onCloseButtonClick={onCloseButtonClick}
    //                                 />
    //                             )
    //                         ) : ''} */}

    //                         {/* Change Password Form */}
    //                         <form className="mt-1" onSubmit={(event) => handleChangePassword(event, changePassword)}>

    //                             {/* Username or email
    //                             <div className="form-group">
    //                                 <label className="lead mt-1" htmlFor="username-or-email">Username </label>
    //                                 <input
    //                                     type="text"
    //                                     className="form-control"
    //                                     id="username"
    //                                     placeholder="Enter username "
    //                                     value={username}
    //                                     onChange={(event) => setUsername(event.target.value)}
    //                                 />
    //                             </div> */}

    //                             {/* Password */}
    //                             <div className="form-group">
    //                                 <label className="lead mt-1" htmlFor="password">Password</label>
    //                                 <input
    //                                     type="password"
    //                                     className="form-control"
    //                                     id="password"
    //                                     placeholder="Enter password"
    //                                     value={newPassword}
    //                                     onChange={(event) => setNewPassword(event.target.value)}
    //                                 />
    //                             </div>

    //                             {/* Submit Button */}
    //                             <div className="form-group">
    //                                 <button className="btn btn-primary" disabled={loading ? 'disabled' : ''} type="submit">SAVE</button>
    //                             </div>

    //                             {/*	Loading */}
    //                             {loading ? <Loading message={'Processing...'} /> : ''}
    //                         </form>
    //                     </div>
    //                 )

    //                 }
    //             </Mutation>
    //         </Layout>
    //     </ApolloProvider>
    // )

    return (
		<Layout>
            {JSON.stringify(result)}
		</Layout>
	);
}

ChangePassword.getInitialProps = async () => {
    const result1 = await client.query({
		query: TEST_QUERY
	});

	return {
		result:result1,
	}
}



export default ChangePassword;