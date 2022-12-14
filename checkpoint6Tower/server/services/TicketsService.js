import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden, UnAuthorized } from "../utils/Errors.js";
import { eventsService } from "./EventsService.js";

class TicketsService {
  async getAll(query = {}) {
    let ticket = await dbContext.Tickets.find(query).populate("profile event");
    return ticket;
  }
  async getById(id) {
    let ticket = await dbContext.Tickets.findById(id).populate("profile event");
    if (!ticket) {
      throw new BadRequest("Invalid Id");
    }
    return ticket;
  }
  async create(body) {
    let ticket = await dbContext.Tickets.create(body);
    await eventsService.attendEvent(ticket.eventId, body.accountId);
    return await ticket.populate("profile event");
  }
  async edit(id, body) {
    let ticket = await dbContext.Tickets.findById(id);
    if (!ticket) {
      throw new BadRequest("Invalid Id");
    }
    if (ticket.accountId != body.userInfo.id) {
      throw new Forbidden("You are not the creator of this ticket");
    }
    await ticket.updateOne(body);
    return await ticket.populate("profile event");
  }
  async delete(id, userId) {
    let ticket = await dbContext.Tickets.findById(id);
    if (!ticket) {
      throw new BadRequest("Invalid Id");
    }
    if (ticket.accountId != userId) {
      throw new Forbidden("You are not the creator of this ticket");
    }
    await eventsService.leaveEvent(ticket.eventId, userId);
    await ticket.delete();

    return "Successfully Deleted";
  }

  async getUserTickets(userId) {
    let tickets = await dbContext.Tickets.find({ accountId: userId }).populate(
      "event"
    );

    return tickets;
  }

  async getTicketsByEventId(eventId) {
    let tickets = await dbContext.Tickets.find({ eventId }).populate("profile");
    return tickets;
  }
}
export const ticketsService = new TicketsService();
