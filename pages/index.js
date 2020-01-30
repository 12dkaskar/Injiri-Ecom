import Layout from '../components/layouts/Layout';
import Link from 'next/link';
import client from '../components/ApolloClient';
import gql from 'graphql-tag';
import AddToCartButton from "../components/cart/AddToCartButton";
import Hero from "../components/home/Hero";
import Categories from "../components/home/Hero";

/**
 * GraphQL products query.
 */
const PRODUCTS_QUERY = gql`query {
						products(first: 50) {
							nodes {
								id
								productId
								averageRating
								slug
								description
								image {
									uri
									title
									srcSet
									sourceUrl
								}
								name
							}
						}
				}`;

const FEATURED_QUERY = gql`query {
		products(where: {featured: true}) {
		  nodes {
			id
			productId
			averageRating
			slug
			name
			shortDescription
			image {
				uri
				title
				srcSet
				sourceUrl
			  }
		  }
		}  
}`;

const NewProducts = ({ products }) => {

	return (
		<div className="i-wrapper i-wrapper-padding w-100">
			<h2 className="text-center mb-5">Products</h2>
			<div className="row">
			<div className="categories col-sm-3">
				<ul>
					<li>
						<a className="i-menu-link">
							Collections
						</a>
					</li>
					<li>
						<a className="i-menu-link">
							Categories
						</a>
					</li>
				</ul>
			</div>
			{ products.length ? (
					<div className="products-wrapper  col-sm-9">
						<div className="row">
						{
							products.map( item => (
								<div className="col-sm-4">
								<div className="product-container mb-5" key={item.id}>
									<Link as={`/product/${item.slug}-${item.productId}`} href={`/product?slug=${item.slug}-${item.productId}`}>
										<a>
											<span className="product-link">
												<img className="product-image" src={item.image.sourceUrl} srcSet={item.image.srcSet} alt={ item.name }/>
												<h5 className="product-name">{item.name}</h5>
												<p className="product-price">{item.price}</p>
											</span>
										</a>
									</Link>
									<AddToCartButton product={ item } />
								</div>
								</div>
							) )
						}
				</div>
					</div>
			) : '' }
			</div>
		</div>
	);
};

const Index = ( props ) => {

	const { products, featuredProducts } = props;
	console.log(featuredProducts);
	
	return (
		<Layout>
			<Hero products={featuredProducts}/>
			{/*<Categories/>*/}
			<NewProducts products={ products } />
		</Layout>
	);
};

Index.getInitialProps = async () => {

	const result = await client.query({
		query: PRODUCTS_QUERY
	});
	const featuredResult = await client.query({
		query: FEATURED_QUERY
	});

	return {
		products: result.data.products.nodes,
		featuredProducts: featuredResult.data.products.nodes
	}
};

export default Index;
