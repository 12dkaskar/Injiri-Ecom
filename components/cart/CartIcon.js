import { useContext } from 'react';
import { AppContext } from "./../context/AppContext";
import Link from 'next/link';

const CartIcon = () => {

	const [ cart ] = useContext( AppContext );
	const productsCount = ( null !== cart ) ? cart.totalProductsCount : '';
	const totalPrice = ( null !== cart ) ? cart.totalProductsPrice : '';

	return (
		<React.Fragment>
			<Link href="/cart">
				<a className="i-menu-link">
					<div className="wd-cart-wrap">
						{ totalPrice ? <span className="wp-cart-price mr-2">${ totalPrice.toFixed(2) }</span> : '' }
						<span className="wd-cart-icon-container">
							Cart
							{ productsCount ? <span className="wp-cart-count">({ productsCount })</span> : '' }
						</span>
					</div>
				</a>
			</Link>
		</React.Fragment>

	)
};

export default CartIcon;
