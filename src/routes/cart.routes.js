import { Router } from "express";
import {
    getCarts,
    getCartById,
    postCart,
    patchCart,
    deleteCart,
    checkoutCart,
} from "../controllers/cart.controller.js";
import { authenticationUser } from "../middlewares/authentication.middleware.js";

const router = Router();

router.get("/", getCarts);                                  // obtener todos los carritos
router.post("/", authenticationUser, postCart);              // crear un carrito (requiere autenticacion)
router.get("/:id", getCartById);                            // obtener un carrito por id
router.patch("/:id", authenticationUser, patchCart);         // actualizar un carrito (requiere autenticacion)
router.delete("/:id", authenticationUser, deleteCart);       // eliminar un carrito (requiere autenticacion)
router.post("/:id/checkout", authenticationUser, checkoutCart); // procesar compra del carrito

export default router;
