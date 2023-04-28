export const request1 = <A>(arg: A) => {
  console.log("request1 arg:", arg);
  return Promise.resolve(1);
};
export const request2 = <A>(arg: A) => {
  console.log("request2 arg:", arg);
  return Promise.resolve(2);
};
export const request3 = <A>(arg: A) => {
  console.log("request3 arg:", arg);
  return Promise.resolve(3);
};
export const request4 = <A>(arg: A) => {
  console.log("request4 arg:", arg);
  return Promise.resolve(4);
};
export const request5 = <A>(arg: A) => {
  console.log("request5 arg:", arg);
  return Promise.resolve(5);
};

export const request6 = <A>(arg: A) => {
  console.log("request6 arg:", arg);
  return Promise.resolve(6);
};
