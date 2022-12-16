import { Auth0Provider } from "@bcwdev/auth0provider";
import { accountService } from "../services/AccountService";
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController";

export class AccountController extends BaseController {
  constructor() {
    super("account");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get("", this.getUserAccount)
      .get("/tickets", this.getUserTickets)
      .get("/events", this.getUserEvents);
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo);
      res.send(account);
    } catch (error) {
      next(error);
    }
  }
  async getUserTickets(req, res, next) {
    try {
      const tickets = await ticketsService.getUserTickets(req.userInfo.id);
      res.send(tickets);
    } catch (error) {
      next(error);
    }
  }
  async getUserEvents(req, res, next) {
    try {
      const events = await eventsService.getUserEvents(req.userInfo.id);
      res.send(events);
    } catch (error) {
      next(error);
    }
  }
}
