//making them generic so they typecheck in the bind functions
import * as E from "fp-ts/Either";

export const of = Promise.resolve.bind(Promise);

export const map =
  <A, B>(f: (a: A) => B) =>
  (promise: Promise<A>) =>
    promise.then(f);

export const chain =
  <A, B>(fa: (value: A) => Promise<B>) =>
  (promise: Promise<A>) =>
    promise.then(fa);

export const reject =
  <E>(error: E) =>
  <A>(promise: Promise<A>) =>
    Promise.reject(error);

export const fail =
  <E>(error: E) =>
  <A>(promise: Promise<A>): Promise<E.Either<E, A>> =>
    promise.then(a => E.left(error));

export const bind: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Promise<B>
) => (p: Promise<A>) => Promise<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  (name, f) => p =>
    p.then(a => f(a).then(b => Object.assign({}, a, { [name]: b }) as any));

export const apS: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  pb: Promise<B>
) => (p: Promise<A>) => Promise<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  (name, pb) => pa =>
    pa.then(a => pb.then(b => Object.assign({}, a, { [name]: b }) as any));

export const Do = Promise.resolve({});

export const URI = "Promise";
declare module "fp-ts/HKT" {
  interface URItoKind<A> {
    readonly Promise: Promise<A>;
  }
}

// TYPECLASS instances
import { Functor1 } from "fp-ts/Functor";
export const Functor: Functor1<typeof URI> = {
  URI,
  map: (pa, f) => pa.then(f)
};

import { Applicative1 } from "fp-ts/Applicative";
export const Applicative: Applicative1<typeof URI> = {
  URI,
  of,
  ap: (pab, pa) => pab.then(f => pa.then(a => f(a))),
  map: Functor.map
};

import { Monad1 } from "fp-ts/Monad";
export const Monad: Monad1<typeof URI> = {
  URI,
  of,
  ap: Applicative.ap,
  map: Functor.map,
  chain: (pa, f) => pa.then(f)
};
