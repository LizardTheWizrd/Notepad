// api/notes.ts
export const createNote = async (content: string) => {
  const res = await fetch("http://localhost:5000/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: content }),
  });

  if (!res.ok) {
    throw new Error(`Failed to create note: ${res.status}`);
  }

  const data = await res.json();
  return data; // { id: number, ... } from backend
};

export const updateNote = async (id: number, content: string) => {
  await fetch("http://localhost:5000/notes", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: id, text: content }),
        });
        
}

export const getNoteById = async (id: number) => {
  const res = await fetch(`http://localhost:5000/notes/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch note: ${res.status}`);
  }

  const data = await res.json();
  console.log(data)
  return data; // { id: number, text: string, ... }
};