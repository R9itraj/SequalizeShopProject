
const db=require('../util/database');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {

    return db.execute('INSERT products (title,imageUrl,description,price) VALUES (?,?,?,?)',
      [this.title,this.imageUrl,this.description,this.price]);
  }
  static update(nthis,id){
    return db.execute('UPDATE products SET title=?,imageUrl=?,description=?,price=? WHERE idproducts=?',
      [nthis.title,nthis.imageUrl,nthis.description,nthis.price,id]);
  }

  static deleteById(id) {
    return db.execute('DELETE FROM products WHERE idproducts=?',[id]);
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE idproducts=?',[id]);
  }
};
