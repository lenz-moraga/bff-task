import { redirect } from "next/navigation";
import { createNote } from "./actions";
import { NoteForm } from "@/components/NoteForm";

export default function CreateNote() {
  const handleCreateNote = async (formData: FormData) => {
    "use server";

    let errorReponse;

    try {
      const noteTitle = formData.get("note_title") as string;
      const noteContent = formData.get("note_content") as string;

      const result = await createNote({
        note_title: noteTitle,
        note_content: noteContent,
      });

      errorReponse = JSON.parse(result).error;
    } catch (error: any) {
      console.log(error.message);
    }

    if (!errorReponse) {
      redirect("/");
    }
  };

  return (
    <>
      <div className="container mx-auto mt-8 max-w-[560px]">
        <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-900 mb-4">
          <h1 className="text-3xl font-semibold">Create Note</h1>
        </div>

        <NoteForm
          handleNote={handleCreateNote}
          submitText="Create"
          pendingSubmittionText="Creating"
        />
      </div>
    </>
  );
}
