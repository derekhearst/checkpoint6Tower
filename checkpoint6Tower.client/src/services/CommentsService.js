import { AppState } from "../AppState.js";
import { api } from "./AxiosService.js";

class CommentsService {
  async getCommentsByEventId(eventId) {
    const res = await api.get("api/events/" + eventId + "/comments");
    AppState.currentEvent.comments = res.data.reverse();
  }
  async createComment(commentData) {
    const res = await api.post("api/comments", commentData);
    console.log(res.data);
    AppState.currentEvent.comments = [
      res.data,
      ...AppState.currentEvent.comments,
    ];
  }
  async deleteComment(commentId) {
    await api.delete("api/comments/" + commentId);
    AppState.currentEvent.comments = AppState.currentEvent.comments.filter(
      (c) => c.id != commentId
    );
  }
}
export const commentsService = new CommentsService();
