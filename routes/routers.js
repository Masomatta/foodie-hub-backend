import express from "express"
import  { addRestaurant, deleteRestaurant, getRestaurants, updateRestaurant} from "../controllers/restuaurants.controller.js"
import { addCustomer, deleteCustomer, getCustomers, updateCustomer } from "../controllers/customer.controller.js"
import { deleteOrder, getAllOrders, getOrderByCustomer, placeOrder, updateOrderStatus } from "../controllers/orders.controller.js"
import { addMenuItem, listMenuItem, removeMenuItem, updateMenuItem } from "../controllers/menuitem.controller.js"
const router = express.Router()

router.get("/restaurants", getRestaurants);    
router.post("/restaurants", addRestaurant);     
router.put("/restaurants/:id", updateRestaurant);   
router.delete("/restaurants/:id", deleteRestaurant);
router.get("/restaurants/:id/menu", listMenuItem);        

router.get("/customers", getCustomers);       
router.post("/customers", addCustomer);         
router.put("/customers/:id", updateCustomer);       
router.delete("/customers/:id", deleteCustomer);    
router.get("/customers/:id/orders", getOrderByCustomer);  


router.get("/orders", getAllOrders);          
router.post("/orders", placeOrder);              
router.put("/orders/:id/status", updateOrderStatus);     
router.delete("/orders/:id", deleteOrder);                

router.post("/menu", addMenuItem);                  
router.put("/menu/:id", updateMenuItem);                
router.delete("/menu/:id", removeMenuItem);             

export default router;