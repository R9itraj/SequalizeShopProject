const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save().then((result)=>{}).catch(err=>{
    console.log(err);
  });
  res.redirect('/products');
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  
  Product.findById(prodId).then(([products,packet])=>{
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: products[0]
    });
  }).catch(err=>{
    console.log(err);
  })
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedDesc,
    updatedPrice
  );
  Product.update(updatedProduct,prodId).then(()=>{}).catch(err=>{
    console.log(err);
  });
  res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([result,packet])=>{
    console.log("_________________=>/n");
    console.log(result[0]);
    res.render('admin/products', {
      prods: result,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch(err=>{
    console.log(err);
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
  Product.deleteById(prodId).then((res)=>{
    console.log("Item Deleted");
  }).catch((err)=>{
    console.log(err);
  });
  res.redirect('/admin/products');
};
