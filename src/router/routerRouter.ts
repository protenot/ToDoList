import { iListener, iMatch, iArgs } from "./typesRouter";
const PREFIX = "/ToDoList";
export function Router(hash?: boolean) {
  const listeners: iListener[] = [];
  let currentPath = location.pathname;
  let previousPath: string | null = null;

  const isMatch = (match: iMatch, path: string) =>
    (match instanceof RegExp && match.test(path)) ||
    (typeof match === "function" && match(path)) ||
    (typeof match === "string" && match === path);

  const handleListener = ({
    match,
    onEnter,
    onLeave,
    onBeforeEnter,
  }: iListener) => {
    const args: iArgs = {
      currentPath,
      previousPath,
      state: history.state,
    };

    match = PREFIX + match;
    isMatch(match, currentPath) && onEnter(args);

    onLeave && isMatch(match, previousPath as string) && onLeave();

    onBeforeEnter && isMatch(match, currentPath) && onBeforeEnter();
  };

  const handleAllListeners = () => listeners.forEach(handleListener);

  const generateId = () => {
    const getRandomNumber = () =>
      Math.floor(Math.random() * listeners.length * 1000);

    const doesExist = (id: number) =>
      listeners.find((listener) => listener.id === id);

    let id = getRandomNumber();
    while (doesExist(id)) {
      id = getRandomNumber();
    }
    return id;
  };

  const on = (
    match: iMatch,
    onEnter: ((...args: iArgs[]) => () => void) | (() => void),
    onLeave?: (() => string | void) | void,
    onBeforeEnter?: () => string | void,
  ) => {
    const id = generateId();

    const listener: iListener = { id, match, onEnter, onLeave, onBeforeEnter };
    listeners.push(listener);
    //console.log(listeners);
    handleListener(listener);

    return;
  };

  const go = (url: string, state?: string) => {
    previousPath = currentPath;
    if (hash === true) {
      window.location.hash = url;
    } else {
      history.pushState(state, url, url);
      currentPath = location.pathname;

      handleAllListeners();
    }
  };

  // window.addEventListener("popstate", handleAllListeners);

  return { on, go };
}
