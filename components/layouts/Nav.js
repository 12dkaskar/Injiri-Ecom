import Link from "next/link";
import CartIcon from "../cart/CartIcon";
import Menu from "./Menu";

const Nav = (props) => {
	return (
		
		<header className={ props.scrolled ? 'i-header scrolled ' + props.scrollDirection :'i-header'}>
			<div className="i-wrapper flex jsb w-100">
				<Link href="/">
					<div className="logoContainer">
						<a  className="custom-logo-link ">
							<img src="../../static/images/logo-black.png" alt=""/>
						</a>
					</div>
				</Link>
				<nav className="i-header-options">
				<Menu/>
				{/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
						aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
				</button> */}

				{/* <div className="collapse navbar-collapse" id="navbarColor01">

				</div> */}
				<div className="cart">
					<CartIcon />
				</div>
				</nav>
			</div>
		</header>
	)
};

export default Nav;
