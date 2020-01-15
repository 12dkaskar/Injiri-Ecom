import React from 'react';
import Router from "next/router";
import NProgress from "nprogress";
import Nav from "./Nav";

Router.onRouteChangeStart = () => {
	NProgress.start();
};
Router.onRouteChangeComplete = () => {
	NProgress.done();
};

Router.onRouteChangeError = () => {
	NProgress.done();
};

let lastScroll = 0;
class Header extends React.Component {
	state={
		scrolled: false,
		scrollDirection:false
	}
	componentDidMount () {
		window.addEventListener('scroll', this.handleScroll);
	}
	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}
	handleScroll = (event) => {
		let scrollTop = event.target.scrollingElement.scrollTop;
		let direction = 'down';
		if(scrollTop > lastScroll && scrollTop > 490){
			direction = 'down';
		}else{
			direction = 'up';
		}
		if(scrollTop> 100){
			this.setState({
				scrolled: true,
				scrollDirection: direction
			});
		}else{
			this.setState({
				scrolled: false,
				scrollDirection: direction
			});
		}
		lastScroll = scrollTop
	}
	render(){
		const {scrollDirection,scrolled}= this.state
		return(
			<Nav scrolled={scrolled} scrollDirection={scrollDirection}/>
		)
	}
};
	

export default Header;
