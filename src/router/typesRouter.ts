export type iMatch = RegExp | string | ((a?: string) => void | boolean);
export type iArgs = {
  currentPath: string;
  previousPath: string | null;
  state: string;
};

export interface iListener {
  id?: number;
  match: iMatch;
  onEnter: ((...args: iArgs[]) => () => void) | (() => void);
  onLeave?: (() => string | void) | void;
  onBeforeEnter?: () => string | void;
}
