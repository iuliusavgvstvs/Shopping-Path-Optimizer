class Product {
  constructor(id, title, imageUrl, description, price, categoryId, shelfId) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.categoryId = categoryId;
    this.shelfId = shelfId;
  }
}

export default Product;
