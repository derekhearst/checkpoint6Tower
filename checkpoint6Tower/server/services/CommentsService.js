import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden, UnAuthorized } from "../utils/Errors.js";

class CommentsService {
  async getById(id) {
    let data = await dbContext.Comments.findById(id);
    if (!data) {
      throw new BadRequest("Invalid Id");
    }
    return data;
  }
  async create(body) {
    const comment = await dbContext.Comments.create(body);
    await comment.populate("creator");
    return comment;
  }
  async delete(id, userId) {
    let comment = await dbContext.Comments.findById(id);
    if (!comment) {
      throw new BadRequest("Invalid Id");
    }
    if (comment.creatorId != userId) {
      throw new Forbidden("You are not the creator");
    }
    await comment.delete();
    return comment;
  }

  async getCommentsByEventId(eventId) {
    let comments = await dbContext.Comments.find({ eventId }).populate(
      "creator"
    );
    return comments;
  }
}
export const commentsService = new CommentsService();
