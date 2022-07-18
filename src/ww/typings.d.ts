declare namespace Hw {
  interface PageRoute<Q = any, S = any> {
    location: {
      hash: string;
      pathname: string;
      query: Q;
      search: string;
      state: S;
    };
  }
  type ToUnstabitily<T> = {
    [P in T]?: T[P] | null;
  };
}
