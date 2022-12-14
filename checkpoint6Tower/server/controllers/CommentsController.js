import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";

export class CommentsController extends BaseController {
  constructor() {
    super("api/comments");
    this.router
      .get("/:id", this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.create)
      .delete("/:id", this.delete);
  }
  async getById(req, res, next) {
    try {
      let data = await commentsService.getById(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id;
      let data = await commentsService.create(req.body);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      let data = await commentsService.delete(req.params.id, req.userInfo.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
}
