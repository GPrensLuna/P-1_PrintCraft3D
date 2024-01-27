const express = require("express");

const router = express.Router();

const { PostLogin } = require("../controllers/Post/PostLogin.js");

const { PostRegister } = require("../controllers/Post/PostRegister.js");
const {
  PostRegisterGoogle,
} = require("../controllers/Post/PostRegisterGoogle.js");

const { postReview } = require("../controllers/Post/PostReview.js");
const { PostBuyOrder } = require("../controllers/Post/PostBuyOrder.js");

const { GetInventario } = require("../controllers/Get/GetInventario.js");
const { PostInventory } = require("../controllers/Post/PostInventory.js");
const { GetProductoName } = require("../controllers/Get/GetProductoName.js");
const {
  GetProductsByName,
} = require("../controllers/Get/GetProductsByName.js");
const { GetProducts } = require("../controllers/Get/GetProducts.js");
const { GetOrder } = require("../controllers/Get/GetOrder.js");
const { PutProducts } = require("../controllers/Put/PutProducts.js");
const { GetVentas } = require("../controllers/Get/GetVentas.js");
const { GetMetrics } = require("../controllers/Get/GetMetrics.js");

const { GetProfile } = require("../controllers/Get/GetProfile.js");
const { GetUser } = require("../controllers/Get/GetUser.js");
const { PutUser } = require("../controllers/Put/PutUser.js");
const { GetReviewsById } = require("../controllers/Get/GetReviewsById.js");

const { DeleteProduct } = require("../controllers/Delete/DeleteProduct.js");
const { DeleteUser } = require("../controllers/Delete/DeleteUser.js");

const { GetOrderProducts } = require("../controllers/Get/GetOrderProducts.js");
const { GetProductById } = require("../controllers/Get/GetProductById.js");

const CreateShoppingCart = require("../controllers/CreateShoppingCart.js");
const addToCart = require("../controllers/addToCart.js");
const addOneToCart = require("../controllers/addOneToCart.js");
const deleteOneFromCart = require("../controllers/deleteOneFromCart.js");
const deleteItemsFromCart = require("../controllers/deleteItemsFromCart.js");
const deleteShoppingCart = require("../controllers/deleteShoppingCart.js");

const { GetUserById } = require("../controllers/Get/GetUserById.js");

router.get("/", (req, res) => {
  return res.json("hola desde router PrintCraft3D");
});

router.post("/Login", PostLogin);
router.post("/Registro", PostRegister);
router.post("/Google", PostRegisterGoogle);
router.post("/Reviews", postReview);

router.get("/Inventario", GetInventario);
router.post("/Inventario", PostInventory);

router.delete("/DeleteProdut/:idProduct", DeleteProduct);
router.delete("/Users/:idUser", DeleteUser);

router.get("/Search/:name", GetProductsByName);

router.get("/Product/:id", GetProductById);
router.get("/Producto/:name", GetProductoName);
router.get("/ProductsLista", GetProducts);
router.put("/ProductsLista/:productId", PutProducts);

router.get("/Profile", GetProfile);

router.get("/Reviews/:idProduct", GetReviewsById);
router.get("/Order/:idOrder", GetOrderProducts);

router.get("/User", GetUser);
router.put("/User/:id", PutUser);
router.get("/ProductsLista", GetProducts);

router.get("/User/:idUser", GetUserById);
router.get("/Compras/:idUser", GetOrder);
router.post("/BuyOrder", PostBuyOrder);
router.get("/Ventas", GetVentas);
router.get("/Metrics", GetMetrics);

//Paypal
const { capture, create } = require("../controllers/Paypal/paypal.js");
router.post("/api/orders/:orderID/capture", capture);
router.post("/api/orders", create);

//Carrito
router.post("/shoppingCart", CreateShoppingCart);
router.post("/addToCart", addToCart);
router.post("/addOneToCart", addOneToCart);
router.delete("/deleteItem", deleteOneFromCart);
router.delete("/deleteItems", deleteItemsFromCart);
router.delete("/shoppingCart", deleteShoppingCart);

module.exports = router;
