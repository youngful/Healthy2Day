const express = require("express");
const routes = express.Router();

const {
  signup_get,
  login_get,
  get_user_info,
  get_info,
  signup_post,
  login_post,
  logout_get,
  showUserDishes,
  addSavedDishesToUser,
  removeSavedDishesToUser,
  setUserProperties,

} = require("./controller");

routes.get("/signup", signup_get);
routes.get("/login", login_get);
routes.get("/log_out", logout_get);
// routes.get("/get_user", get_user_info);
routes.get("/get_user", get_info);
routes.get("/showDishes", showUserDishes);


routes.post("/sign_up", signup_post);
routes.post("/log_in", login_post);
routes.post("/saveDish", addSavedDishesToUser)
routes.post("/removeDish", removeSavedDishesToUser)
routes.post("/setProperties", setUserProperties)



module.exports = routes;