import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden, UnAuthorized } from "../utils/Errors.js";

class EventsService {
  async getAll(query = {}) {
    let events = await dbContext.TowerEvents.find(query).populate("creator");
    return events;
  }
  async getById(id) {
    let data = await dbContext.TowerEvents.findById(id).populate("creator");
    if (!data) {
      throw new BadRequest("Invalid Id");
    }
    return data;
  }
  async create(body) {
    const event = await dbContext.TowerEvents.create(body);
    return await event.populate("creator");
  }
  async edit(id, body) {
    let event = await dbContext.TowerEvents.findById(id);
    if (!event) {
      throw new BadRequest("Invalid Id");
    }
    if (event.creatorId != body.creatorId) {
      throw new Forbidden("You are not the creator");
    }
    if (event.isCanceled) {
      throw new BadRequest("This event has been canceled");
    }
    // stop them from editing the event
    body.isCanceled = false;
    await event.updateOne(body);

    return await dbContext.TowerEvents.findById(id).populate("creator");
  }
  async delete(id, userId) {
    let event = await dbContext.TowerEvents.findById(id);
    if (!event) {
      throw new BadRequest("Invalid Id");
    }
    if (event.creatorId != userId) {
      throw new Forbidden("You are not the creator");
    }
    await event.updateOne({ isCanceled: true });
    return event;
  }

  async attendEvent(eventId, userId) {
    let event = await dbContext.TowerEvents.findById(eventId);
    if (!event) {
      throw new BadRequest("Invalid Id");
    }

    if (event.isCanceled) {
      throw new BadRequest("This event has been canceled");
    }
    if (event.capacity <= 0) {
      throw new BadRequest("This event is full");
    }
    event.capacity -= 1;
    await event.save();
  }

  async leaveEvent(id, userId) {
    let event = await dbContext.TowerEvents.findById(id);
    if (!event) {
      throw new BadRequest("Invalid Id");
    }

    if (event.isCanceled) {
      throw new BadRequest("This event has been canceled");
    }
    event.capacity += 1;
    await event.save();
  }

  async getUserEvents(id) {
    return await dbContext.TowerEvents.find({ creatorId: id });
  }
}

export const eventsService = new EventsService();
