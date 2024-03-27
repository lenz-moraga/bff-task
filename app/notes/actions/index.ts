"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export type NotePayloadType = Pick<NoteType, "note_title" | "note_content">;

export type NoteType = {
  id: string;
  note_title: string;
  note_content: string;
  author_id: string;
  visible: boolean;
};

export async function createNote(note: NotePayloadType) {
  const supabase = createClient();
  const result = await supabase
    .from("notes")
    .insert({
      note_title: note.note_title,
      note_content: note.note_content,
    })
    .single();

  return JSON.stringify(result);
}

export async function readAllNotes() {
  const supabase = createClient();

  return await supabase.from("notes").select("*").eq("visible", true);
}

export async function getNoteById(id: string) {
  const supabase = createClient();

  return await supabase.from("notes").select("*").eq("id", id);
}

export async function editNote(id: string, note: NotePayloadType) {
  const supabase = createClient();

  return await supabase
    .from("notes")
    .update({
      note_title: note.note_title,
      note_content: note.note_content,
    })
    .eq("id", id);
}

export async function deleteNote(id: string) {
  const supabase = createClient();

  await supabase
    .from("notes")
    .update({
      visible: false,
    })
    .eq("id", id);

  revalidatePath("/");
}
