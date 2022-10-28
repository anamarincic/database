const webApi =
  "https://dog-related-application-default-rtdb.europe-west1.firebasedatabase.app/dogs";
export class DogsService {
  constructor() {
    console.log("CREATED: dogs service");
  }
  get = async (urlParams) => {
    const options = {
      method: "GET",
    };
    const request = new Request(webApi + "/" + urlParams + ".json", options);
    const response = await fetch(request);
    return response.json();
  };
  put = async (model, urlParams) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    var options = {
      method: "PUT",
      headers,
      body: JSON.stringify(model),
    };
    const request = new Request(webApi + "/" + urlParams + ".json", options);
    const response = await fetch(request);
    return response;
  };
}
