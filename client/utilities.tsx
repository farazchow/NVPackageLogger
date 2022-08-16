// references: Weblab,
// https://dmitripavlutin.com/fetch-with-json/

function logErrors(error: Error) {
  console.error(error);
}

// convert a fetch result to a JSON object with error handling for fetch and json errors
async function convertToJSON(res: Response): Promise<JSON> {
  if (!res.ok) {
    throw `API request failed with response status ${res.status} and text: ${res.statusText}`;
  }

  return res
    .clone() // clone so that the original is still readable for debugging
    .json() // start converting to JSON object
    .catch(async (error: Error): Promise<never> => {
      logErrors(error);
      // throw error containing the text that couldn't be converted to JSON
      const text = await res.text();
      throw `API request's result could not be converted to a JSON object: \n${text}`;
    });
}

export async function get<T>(
  endpoint: RequestInfo | URL,
  params: Record<any, any> = {}
): Promise<JSON | T> {
  return fetch(endpoint + "?" + new URLSearchParams(params).toString())
    .then(convertToJSON)
    .catch((error): never => {
      logErrors(error);
      throw `GET request to ${endpoint} failed with error:\n${error}`;
    });
}

export async function post<T>(
  endpoint: RequestInfo | URL,
  params: Record<any, any> = {}
): Promise<JSON | T> {
  console.log("posting");
  return fetch(endpoint, {
    method: "post",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(params),
    credentials: "include", // TODO: return to this
  })
    .then(convertToJSON) // convert result to JSON object
    .catch((error: Error): never => {
      // give a useful error message
      logErrors(error);
      throw `POST request to ${endpoint} failed with error:\n${error}`;
    });
}

export async function getUser() {
  return await get("api/auth/whoami");
}

// Other functions?
export function deconstruct(obj: any) {
  const result = [];
  type ObjectKey = keyof typeof obj;

  for (const key of Object.keys(obj)) {
    const MyVar = key as ObjectKey;
    console.log(key, ":", obj[MyVar]);
    result.push(<div>{`${key} : ${obj[MyVar]}\n`} </div>);
  }
  return result;
}
