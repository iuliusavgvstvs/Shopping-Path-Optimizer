class CartItem {
  constructor(productId, productTitle, imageUrl, productPrice, quantity, sum) {
    this.productId = productId;
    this.productTitle = productTitle;
    this.productImageUrl = imageUrl;
    this.productPrice = productPrice;
    this.quantity = quantity;
    this.sum = sum;
  }
}

export default CartItem;
