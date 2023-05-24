type Nullable<A> = A | undefined;

export const map = <A, B>(ma: Nullable<A>, f: (a: A) => B) =>
  ma !== undefined ? f(ma) : undefined;
