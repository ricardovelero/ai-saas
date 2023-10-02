async function fetcher(url: string) {
  try {
    const response = await fetch(`${url}`, {
      method: "GET",
    });

    return response.json();
  } catch (error) {
    console.error("Error fetching items:", error);
  }
}

async function createRequest(url: string, { arg }: { arg: string }) {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(arg),
    });

    return response.json();
  } catch (error) {
    console.error("Error creating new item:", error);
  }
}

async function updateRequest(url: string, { arg }: { arg: Object }) {
  try {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(arg),
    });

    return response.json();
  } catch (error) {
    console.error("Error updating item:", error);
  }
}

async function deleteRequest(url: string, { arg }: { arg: string }) {
  try {
    const response = await fetch(`${url}/${arg}`, {
      method: "DELETE",
    });

    return response.json();
  } catch (error) {
    console.error("Error deleting item:", error);
  }
}

export { fetcher, createRequest, deleteRequest, updateRequest };
