import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Thumb from '../../../Thumb';
import { formatPrice } from '../../../../services/util';
import { addProduct } from '../../../../services/cart/actions';

import Swal from 'sweetalert2';

const Product = ({ product, addProduct, cartProducts }) => {

  const addProducts = (producto) => {
    if(cartProducts.length  >= 5 ) {
      Swal.fire('¡No se Puede agregar más de 5 productos a tu carro de compras!', '', 'error')
      return;
    }
    Swal.fire({
      title: '¿Estas Seguro?',
      text: "De agregaar este producto al caarrito de compras!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, agregarlo!'
    }).then((result) => {
      if (result.value) {
       addProduct(producto)
      }
    })
    
  }
 
  product.quantity = 1;

  let formattedPrice = formatPrice(product.price, product.currencyId);

  let productInstallment;

  if (!!product.installments) {
    const installmentPrice = product.price / product.installments;

    productInstallment = (
      <div className="installment">
        <span>or {product.installments} x</span>
        <b>
          {product.currencyFormat}
          {formatPrice(installmentPrice, product.currencyId)}
        </b>
      </div>
    );
  }

  return (
    <div
      className="shelf-item"
      onClick={() => addProducts(product)}
      // onClick={() => addProduct(product)}
      data-sku={product.sku}
    >
      {product.isFreeShipping && (
        <div className="shelf-stopper">
          envío Gratis
           <i className="fas fa-tags"> </i>
          </div>
      )}
      <Thumb
        classes="shelf-item__thumb"
        src={require(`../../../../static/products/${product.sku}_1.jpg`)}
        alt={product.title}
      />
      <p className="shelf-item__title">{product.title}</p>
      <div className="shelf-item__price">
        <div className="val">
          { product.promoPrice ? 
          <div>
          <p className="price-discount" > $ {product.price}</p>
          <b>$ {product.promoPrice}</b>
         </div> : <strong> $ {product.price}</strong>}
        </div>
        {productInstallment}
      </div>
      <div className="shelf-item__buy-btn">Agregar a Carro de Compras</div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
  addProduct: PropTypes.func.isRequired
};

function mapState (state) {
  return {
    cartProducts: state.cart.products
  }
} 

export default connect(
  mapState,
  { addProduct }
)(Product);
