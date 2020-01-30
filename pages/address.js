import Layout from "../components/layouts/Layout";
import React, { useState } from 'react';
import client from '../components/ApolloClient';
import { ApolloProvider } from 'react-apollo';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import MessageAlert from "../components/message-alert/MessageAlert";
import Loading from "../components/message-alert/Loading";
import Router from 'next/router';
import Billing from '../components/checkout/Billing';
import validateAndSanitizeCheckoutForm from '../validator/checkout';


/**
 * Update Customer Address to deliver product.
 */



const UPDATE_CUSTOMER_ADDRESS = gql`
mutation CustomerAddressUpdate( $id : String! $nicename: String! $displayName : String!){
    updateCustomer(input: { clientMutationId: "7542test", 
    id: $id , 
    nicename: $nicename, 
    displayName: $displayName}) {
        customer {
          displayName
          modified
          username
        }
      }
}`

/**
 * Update Address Functional Component.
 *
 * @return {object} Update Address form.
 */

class Address extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            input: {
                firstName: '',
                lastName: '',
                companyName: '',
                country: '',
                streetAddressOne: '',
                streetAddressTwo: '',
                city: '',
                county: '',
                postCode: '',
                phone: '',
                email: '',
                errors: null
            },
            error: '',
        }
    }

    /*
* Handle onchange input.
*
* @param {Object} event Event Object.
*
* @return {void}
*/
    handleOnChange = (event) => {
        console.log(event.target.name, event.target.value);

        this.setState({ input: { ...this.state.input, [event.target.name]: event.target.value } }, () => {
            console.log({ state: this.state });

        })
    };



	/*
	 * Handle form submit.
	 *
	 * @param {Object} event Event Object.
	 *
	 * @return {void}
	 */
    handleFormSubmit = async (event, updateCustomer) => {
        // const result = validateAndSanitizeCheckoutForm(this.state.input);
        // if (!result.isValid) {
        // setInput({ ...input, errors: result.errors });

        // this.setState({input: this.state.input, error:result.errors})

        if (process.browser) {
            event.preventDefault();

            await updateCustomer({
                variables: {
                    id: "Y3VzdG9tZXI6MTI=",
                    nicename: "aryanCool",
                    displayName: "aryanCOol",
                }
            })
                .then(response => console.log({ response }))
                .catch(err => console.log({ err }));
            }

    }
    // };
    render() {

        console.log('print state --->', this.state)

        return (
            <ApolloProvider client={client}>
                <Layout>
                    <Mutation mutation={UPDATE_CUSTOMER_ADDRESS}>
                        {/*Billing Details*/}
                        {(updateCustomer, { loading, error }) => (
                            <form onSubmit={this.handleFormSubmit} className="wd-checkout-form">
                                <Billing input={this.state.input} handleOnChange={this.handleOnChange} usedIn={'customer_address'} />
                                <div className="wd-place-order-btn-wrap mt-5">
                                    <button className="btn wd-large-black-btn wd-place-order-btn" type="submit">
                                        Save
								</button>
                                </div>
                            </form>

                        )}
                    </Mutation>
                </Layout>
            </ApolloProvider>
        )
    }

}

export default Address;