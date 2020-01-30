import Layout from "../components/layouts/Layout";
import { useState, useEffect } from 'react';
import { isUserValidated, logoutUser } from "../utils/auth-functions";
import isEmpty from "../validator/isEmpty";
import Router from 'next/router';
import MessageAlert from "../components/message-alert/MessageAlert";
import Link from 'next/link';



/**
 * MyAccount functional component.
 *
 * @return {object} MyAccount content.
 */
const MyAccount = () => {

	const [showContent, setShowContent] = useState(false);
	const [userData, setUserData] = useState('');

	useEffect(() => {

		const userValidatedData = isUserValidated();

		if (!isEmpty(userValidatedData)) {

			setUserData(userValidatedData);
			setShowContent(true)

		} else {

			// If user is not logged in send the user back to login page.
			Router.push('/login');
		}

	}, []);

	const handleLogout = () => {

		if (process.browser) {

			logoutUser('/login');
		}

	};

	// const handleChangePassword = () => {
	// 	if ( process.browser ) {

	// 		changePassword( '/changePassword' );
	// 	}
	// }

	const goToAddressPage = () => {

	}

	return (
		<Layout>
			{/* Only Show Content if user is logged in */}
			{showContent ? (
				<div className="container mt-5 wpd-my-account">
					<h4>My Account</h4>
					<div className="wpd-my-account-sidebar">
						<a className="wpd-my-account-sidebar__link" href="#account-details"><i className="fa fa-fw fa-home"></i> Account Settings</a>
						{/* <a className="wpd-my-account-sidebar__link" href="#dashboard"><i className="fa fa-fw fa-home"></i> Dashboard</a> */}
						<a className="wpd-my-account-sidebar__link" href="#orders"><i className="fa fa-fw fa-wrench"></i> Orders</a>
						<Link href="/address">
						{/* <a className="wpd-my-account-sidebar__link" > */}
						{/* <i className="fa fa-fw fa-user"></i> */}
						Addresesses 
						{/* </a> */}
						</Link>
						<a className="wpd-my-account-sidebar__link" onClick={handleLogout}><i className="fa fa-fw fa-envelope"></i> Sign Out</a>
					</div>

					<div className="wpd-my-account__main">
						<div id="dashboard">
							{userData.user.firstName ? <h6>Hello {userData.user.firstName}!</h6> : ''}
							<h5 className="mt-3">Account Settings</h5>
							{userData.user.email ? <p>{userData.user.email}</p> : ''}
							<h4><a className="wpd-my-account-sidebar__link" href="#account-details-edit"> EDIT</a></h4>
							<h4><a className="wpd-my-account-sidebar__link" href="/change-password"> Change Password</a></h4>
						</div>
					</div>
				</div>
			) : ''}
		</Layout>
	)
};

export default MyAccount;
