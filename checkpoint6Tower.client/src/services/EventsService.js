import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class EventsService {
  async getEvents() {
    logger.log("Getting the Events");
    const res = await api.get("api/events");
    AppState.allEvents = res.data.reverse();
  }
  async getEventById(id) {
    logger.log("Getting the Event at id: ", id);
    const res = await api.get("api/events/" + id);
    AppState.currentEvent = res.data;
  }
  async getPeopleGoing(id) {
    logger.log("Getting the People Going to Event at id: ", id);
    const res = await api.get("api/events/" + id + "/tickets");
    AppState.currentEvent.peopleGoing = res.data;
  }
  async joinEvent(id) {
    logger.log("Joining the Event at id: ", id);
    const res = await api.post("api/tickets/", { eventId: id });
    AppState.myTickets = [...AppState.myTickets, res.data];
    AppState.currentEvent.capacity--;
    this.getPeopleGoing(id);
  }

  async leaveEvent(id) {
    logger.log("Leaving the Event at id: ", id);
    let ticket = AppState.myTickets.find((t) => t.eventId == id);
    const res = await api.delete("api/tickets/" + ticket.id);
    AppState.myTickets = AppState.myTickets.filter((t) => t.eventId != id);
    AppState.currentEvent.capacity++;
    this.getPeopleGoing(id);
  }

  async editEvent(id, editedEvent) {
    logger.log("Editing the Event at id: ", id);
    const res = await api.put("api/events/" + id, editedEvent);
    AppState.currentEvent = { ...AppState.currentEvent, ...res.data };
  }

  async cancelEvent(id) {
    logger.log("Canceling the Event at id: ", id);
    const res = await api.delete("api/events/" + id);
    AppState.allEvents.find((e) => e.id == id).isCanceled = true;
    AppState.currentEvent.isCanceled = true;
  }

  async createEvent(newEvent) {
    logger.log("Creating the Event");
    const res = await api.post("api/events", newEvent);
    AppState.allEvents = [res.data, ...AppState.allEvents];
    return res.data;
  }
}

export const eventsService = new EventsService();
