import httpError from "../helpers/HttpError.js";
import { Contact } from "../models/contactModals.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contacts = await Contact.findById(id);
    if (!contacts) {
      throw httpError(404, "Not found");
    }
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contacts = await Contact.findByIdAndDelete(id);
    if (!contacts) {
      throw httpError(404, "Not found");
    }
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone, favorite } = req.body;
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { name, email, phone, favorite },
      { new: true }
    );
    if (!updatedContact) {
      throw httpError(404, "Not found");
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const favorite = req.body;
  try {
    const updatedStatusContact = await Contact.findByIdAndUpdate(id, favorite, {
      new: true,
    });
    if (!updatedStatusContact) {
      throw httpError(404, "Not found");
    }
    res.status(200).json(updatedStatusContact);
  } catch (error) {
    next(error);
  }
};
