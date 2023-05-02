type Nullable<A> = A | undefined;

export const map = <A, B>(fa: Nullable<A>, f: (a: A) => B) =>
  fa !== undefined ? f(fa) : undefined;
