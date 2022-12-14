import mongoose from "mongoose";
import { AccountSchema } from "../models/Account";
import { CommentSchema } from "../models/Comment.js";
import { TicketSchema } from "../models/Ticket.js";
import { TowerEventSchema } from "../models/TowerEvent.js";

class DbContext {
  Account = mongoose.model("Account", AccountSchema);
  Tickets = mongoose.model("Ticket", TicketSchema);
  TowerEvents = mongoose.model("TowerEvent", TowerEventSchema);
  Comments = mongoose.model("Comment", CommentSchema);
}

export const dbContext = new DbContext();
