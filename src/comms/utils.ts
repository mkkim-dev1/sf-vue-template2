const serviceUrl = process.env.VUE_APP_SERVICE_URL;

async function postJson(
  path: string,
  body: object,
  headers?: object
) {
  try {
    const mergedHeaders = {
      "Content-Type": "application/json",
    };
    if (headers) {
      Object.assign(mergedHeaders, headers);
    }
    const req = await fetch(`${serviceUrl}${path}`, {
      method: "POST",
      headers: mergedHeaders,
      body: JSON.stringify(body),
    });
    return await req.json();
  } catch (e) {
    console.log(e);
  }
}

async function getJson(
  path: string,
  headers?: object
): Promise<any> {
  try {
    const mergedHeaders = {
      "Content-Type": "application/json",
    };
    if (headers) {
      Object.assign(mergedHeaders, headers);
    }
    const req = await fetch(`${serviceUrl}${path}`, {
      method: "GET",
      headers: mergedHeaders,
    });
    if (req.status == 200) {
      return await req.json();
    }
  } catch (e) {
    console.log(e);
  }
}

async function deleteJson(
  path: string,
  headers?: object
): Promise<any> {
  try {
    const mergedHeaders = {
      "Content-Type": "application/json",
    };
    if (headers) {
      Object.assign(mergedHeaders, headers);
    }
    const req = await fetch(`${serviceUrl}${path}`, {
      method: "DELETE",
      headers: mergedHeaders,
    });
    if (req.status == 200) {
      return await req.json();
    }
  } catch (e) {
    console.log(e);
  }
}

async function patchJson(
  path: string,
  body: object,
  headers?: object
) {
  try {
    const mergedHeaders = {
      "Content-Type": "application/json",
    };
    if (headers) {
      Object.assign(mergedHeaders, headers);
    }
    const req = await fetch(`${serviceUrl}${path}`, {
      method: "PATCH",
      headers: mergedHeaders,
      body: JSON.stringify(body),
    });
    return await req.json();
  } catch (e) {
    console.log(e);
  }
}

async function putJson(
  path: string,
  body: object,
  headers?: object
) {
  try {
    const mergedHeaders = {
      "Content-Type": "application/json",
    };
    if (headers) {
      Object.assign(mergedHeaders, headers);
    }
    const req = await fetch(`${serviceUrl}${path}`, {
      method: "PUT",
      headers: mergedHeaders,
      body: JSON.stringify(body),
    });
    return await req.json();
  } catch (e) {
    console.log(e);
  }
}

export { serviceUrl, postJson, getJson, deleteJson, patchJson, putJson };
