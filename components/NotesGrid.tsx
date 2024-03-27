import { createClient } from "@/utils/supabase/server";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { deleteNote, readAllNotes } from "@/app/notes/actions";
import { SubmitButton } from "@/app/login/submit-button";

export const NotesGrid = async () => {
  const supabase = createClient();

  const { data: notes } = await readAllNotes();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      {Boolean(notes?.length) ? (
        notes?.map((note) => {
          const removeNote = deleteNote.bind(null, note.id);

          return (
            <Card key={note.id}>
              <CardHeader>
                <CardTitle>{note.note_title}</CardTitle>
                <CardDescription>{note.note_content}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between gap-6 items-center">
                <a
                  href={`/notes/edit/${note.id}`}
                  className="bg-blue-400 rounded-md px-4 py-2  text-center text-white font-semibold"
                >
                  Edit note
                </a>
                <form action={removeNote}>
                  <button
                    className="bg-red-700 rounded-md px-4 py-2 text-foreground text-white font-semibold"
                  >
                    Delete Note
                  </button>
                </form>
              </CardContent>
              <CardFooter>
                <p>By: {user?.email}</p>
              </CardFooter>
            </Card>
          );
        })
      ) : (
        <p className="text-gray-950">No Notes Found.</p>
      )}
      <a href="/notes" className="text-center text-green-600">
        Add a new one.
      </a>
    </>
  );
};
