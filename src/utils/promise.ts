export default function handlePromise<T>(
  promise: Promise<T>,
): Promise<T[] | [null, unknown]> {
  return promise.then((data) => [data]).catch((err) => [null, err]);
}

export function handlePromiseWithId(id, promise: Promise<any>) {
  return promise
    .then((data) => ({ id, data }))
    .catch((error) => ({ id, error }));
}
