export const fetchRequest = async (full_url, token, params, method) => {
  let options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  };
  if (method === ("POST") || (method === "PATCH") || (method === "PUT")) {
    options.body = JSON.stringify(params);
  }
  const response = await fetch(full_url, options);
  if (!response.ok) {
    throw new Error(response.error || "Something went wrong.");
  }
  const data = await response.json();

  return data;
};

export const deleteRequest = async (full_url, token) => {
  let options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    }
  };

  const response = await fetch(full_url, options);
  if (!response.ok) {
    throw new Error(response.message || "Deleting data unsuccessful.");
  }
  
  return response
};
