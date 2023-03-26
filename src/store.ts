import moment from "moment";
import { selector, atom } from "recoil";
import { Task } from "./schema/Task";
import { User } from "./schema/User";

const authCookie = document.cookie.replace(
  /(?:(?:^|.*;\s*)authuid\s*\=\s*([^;]*).*$)|^.*$/,
  "$1"
);

export const authUserState = atom<User | null>({
  key: "authUserState",
  default: authCookie === "" ? null : { authUID: authCookie },
});

export const loggedInState = selector<boolean>({
  key: "loggedInState",
  get: ({ get }) => {
    const userState = get(authUserState);
    return userState !== null;
  },
});

export const tasksState = atom<Task[]>({
  key: "userTasksState",
  default: [],
});

export const loadingState = atom<boolean>({
  key: "loadingState",
  default: false,
});

export const weekState = atom<number>({
  key: "weekState",
  default: moment().week(),
})
