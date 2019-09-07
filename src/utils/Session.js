// import LeanCloud from "./LeanCloud";
// import { setAccount } from "../SharedState";

export default class Session {
  static storageKey = "account";

  static login(account) {
    try {
      window.localStorage.setItem(Session.storageKey, JSON.stringify(account));
    } catch (error) {
      console.log(error);
    }
  }

  static logout() {
    try {
      window.localStorage.removeItem(Session.storageKey);
    } catch (error) {
      console.log(error);
    }
  }

  static current() {
    if (typeof window === "undefined" || window.localStorage === undefined) {
      return { sessionToken: process.env.sessionToken };
    }
    const account = window.localStorage.getItem(Session.storageKey);
    if (account != null) {
      return JSON.parse(account);
    } else {
      return null;
    }
  }
}
