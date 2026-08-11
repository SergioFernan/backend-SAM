import { Router } from "express";
import {
    getCarts,
    getCartById,
    postCart,
    patchCart,
    deleteCart,
} from "../controllers/cart.controller.js";
import { authenticationUser } from "../middlewares/authentication.middleware.js";
import { authorizationUser } from "../middlewares/authorization.middleware.js";
import { ROLES } from "../config/global.config.js";
import { removeRole } from "../middlewares/without-role.middleware.js";

const router = Router();

router.get("/", getCarts);                             // obtener todos los carritos
router.post("/",
    authenticationUser,
    removeRole,
    authorizationUser([ROLES.ADMIN, ROLES.USER]), // Admin y usuarios pueden crear carritos
    postCart);        // crear un carrito (requiere autenticacion)
router.get("/:id", getCartById);                       // obtener un carrito por id
router.patch("/:id", authenticationUser, patchCart);   // actualizar un carrito (requiere autenticacion)
router.delete("/:id", authenticationUser, deleteCart); // eliminar un carrito (requiere autenticacion)

export default router;
