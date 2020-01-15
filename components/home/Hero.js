import React from 'react';
import './Hero.scss';
const Hero = ({ products }) => (
	<div className="i-featured-wrapper">
			{products &&  products.map(item=>(
				<div className="i-featured-product" key={item.productId}>
					<img src={item.image.sourceUrl}/>
					<div className="i-wrapper h-100">
						<div className="product-details">
							<h2>{item.name}</h2>
							<p>{item.shortDescription}</p>
						</div>
					</div>
				</div>
			))}
	</div>
);

export default Hero;
