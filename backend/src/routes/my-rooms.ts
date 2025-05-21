import express, { Request, Response } from "express";
import Room from "../models/room";
import verifyToken from "../middleware/auth";
import { check, validationResult } from "express-validator";
import Hotel from "../models/hotel";

const router = express.Router();

// GET all rooms
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching rooms" });
  }
});



// GET a room by ID
router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching room" });
  }
});

// CREATE a new room
router.post(
  "/",
  verifyToken,
  [
    check("title", "Title is required").notEmpty(),
    check("price", "Price must be a number").isNumeric(),
    check("maxPeople", "Max People must be a number").isNumeric(),
    check("desc", "Description is required").notEmpty(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    try {
      const newRoom = new Room(req.body);
      await newRoom.save();
      res.status(201).json({ message: "Room created successfully", room: newRoom });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating room" });
    }
  }
);

// UPDATE a room
router.put(
  "/:id",
  verifyToken,
  [
    check("title", "Title must be a string").optional().isString(),
    check("price", "Price must be a number").optional().isNumeric(),
    check("maxPeople", "Max People must be a number").optional().isNumeric(),
    check("description", "Description must be a string").optional().isString(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    try {
      const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!updatedRoom) {
        return res.status(404).json({ message: "Room not found" });
      }

      res.status(200).json(updatedRoom);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating room" });
    }
  }
);

// DELETE a room
router.delete("/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json({ message: "Room deleted successfully", room: deletedRoom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting room" });
  }
});

export default router;
