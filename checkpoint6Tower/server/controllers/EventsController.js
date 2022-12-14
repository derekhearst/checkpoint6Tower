import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";

export class EventsController extends BaseController {
  constructor() {
    super("api/events");
    this.router
      .get("", this.getAll)
      .get("/:id", this.getById)
      .get("/:id/tickets", this.getTicketsByEventId)
      .get("/:id/comments", this.getCommentsByEventId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.delete);
  }
  async getAll(req, res, next) {
    try {
      //only gets the data you want to see
      let data = await eventsService.getAll(req.query);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getById(req, res, next) {
    try {
      let data = await eventsService.getById(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id;
      let data = await eventsService.create(req.body);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id;
      let data = await eventsService.edit(req.params.id, req.body);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      let data = await eventsService.delete(req.params.id, req.userInfo.id);
      return res.send("Successfully Deleted");
    } catch (error) {
      next(error);
    }
  }
  async getTicketsByEventId(req, res, next) {
    try {
      let data = await ticketsService.getTicketsByEventId(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getCommentsByEventId(req, res, next) {
    try {
      let data = await commentsService.getCommentsByEventId(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
}
