import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import validateBody from "../middlewares/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
} from "../schemas/contactsSchemas.js";
import isValidateId from "../middlewares/validateId.js";
import { protect } from "../middlewares/authMiddlewares.js";

const contactsRouter = express.Router();
contactsRouter.use(protect);

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValidateId, getOneContact);

contactsRouter.delete("/:id", isValidateId, deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put(
  "/:id",

  isValidateId,
  validateBody(updateContactSchema),
  updateContact
);

contactsRouter.patch(
  "/:id/favorite",

  isValidateId,
  validateBody(updateStatusContactSchema),
  updateStatusContact
);

export default contactsRouter;
