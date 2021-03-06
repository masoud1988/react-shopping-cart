import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';

const React = require("react");

export default class Products extends React.Component {
    constructor(){
        super();
        this.state ={
            product: null,
        };
    }
    openModal = (product)=>{
        this.setState({product});
    };
    closeModal =()=>{
        this.setState({product:null});
    };
    render() {
        const {product} = this.state;
        return (
            <div>
                <Fade bottom cascade={true}>
                    <ul className="products">
                        {this.props.products.map((product) => (
                            <li key={product._id}>
                                <div className="product">
                                    <a 
                                    href={"#"+product._id}
                                    onClick={()=>this.openModal(product)}>
                                    <img src={product.image} alt={product.title}/>
                                    <p>{product.title}</p>
                                    </a>
                                    <div className="product-price">
                                        <div>{formatCurrency(product.price)}</div>
                                        <button onClick={() =>this.props.addToCart(product)} className="button pimary">Add to Cart</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Fade>
                {
                    product && (
                    <Modal isOpen ={true}>
                        <Zoom>
                            <button className="close-modal" onClick={this.closeModal}>x</button>
                            <div className="product-details">
                                <img src={product.image} alt={product.title}/>
                                <div className="product-details-description">
                                    <p>
                                        <strong>{product.title}</strong>
                                    </p>
                                    <p>
                                        {product.description}
                                    </p>
                                    <p>
                                        Available size:{" "}
                                       {product.availableSizes.map( (x) =>(
                                           <span>
                                               {" "}
                                                <button className="button">{x}</button>
                                           </span>
                                       ))}
                                    </p>
                                    <div className="product-price">
                                        <div>{formatCurrency(product.price)}</div>
                                        <button className="button primary" onClick={()=>{
                                            this.props.addToCart(product);
                                            this.closeModal();
                                        }}>
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Zoom>
                    </Modal>
                    )
                }
            </div>
        )
    }
}
