import { NewNote, Note } from "@/types/note";
import axios from "axios";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

const API_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface GetNotesResponse {
  notes: Note[];
  totalPages: number;
  perPage?: number;
}

export async function getNotes(
  query: string,
  page?: number
): Promise<GetNotesResponse> {
  const options = {
    params: {
      page: page || 1,
      perPage: 12,
      ...(query.trim() !== "" && { search: query.trim() }),
    },
    method: "GET",
    headers: { Authorization: `Bearer ${API_TOKEN}` },
  };
  try {
    const { data } = await axios<GetNotesResponse>("/notes", options);
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createNote(newNote: NewNote): Promise<Note> {
  const options = {
    data: newNote,
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  try {
    const response = await axios<Note>("/notes", options);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteNote(id: string): Promise<Note> {
  const options = {
    method: "DELETE",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  try {
    const response = await axios<Note>(`/notes/${id}`, options);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// export async function updateNote(id: string, note: NewNote): Promise<Note> {
//   const options = {
//     data: note,
//     method: "PATCH",
//     headers: {
//       Authorization: `Bearer ${API_TOKEN}`,
//     },
//   };

//   try {
//     const response = await axios<Note>(`/notes/${id}`, options);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }
