import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class AccountService {
  async getAccount() {
    try {
      const res = await api.get("/account");
      AppState.account = res.data;
    } catch (err) {
      logger.error("HAVE YOU STARTED YOUR SERVER YET???", err);
    }
  }

  async getMyTickets() {
    logger.log("Getting my tickets");
    const res = await api.get("/account/tickets");
    AppState.myTickets = res.data;
  }

  async getMyEvents() {
    logger.log("Getting my events");
    const res = await api.get("/account/events");
    AppState.myEvents = res.data;
  }
}

export const accountService = new AccountService();
