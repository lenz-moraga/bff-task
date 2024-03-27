import { redirect } from "next/navigation";
import { NoteForm } from "@/components/NoteForm";
import { NoteType, editNote, getNoteById } from "../../actions";

export default async function EditNote({ params }: { params: { id: string } }) {
  const { data }: { data: NoteType[] | null } = await getNoteById(params.id);

  const handleEditNote = async (formData: FormData) => {
    "use server";

    let errorReponse;

    try {
      const noteTitle = formData.get("note_title") as string;
      const noteContent = formData.get("note_content") as string;

      const result = await editNote(params.id, {
        note_title: noteTitle,
        note_content: noteContent,
      });

      errorReponse = result.error;
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
          <h1 className="text-3xl font-semibold">Edit Note</h1>
        </div>
        <NoteForm
          handleNote={handleEditNote}
          submitText="Edit"
          pendingSubmittionText="Editing"
          noteInfo={data}
        />
      </div>
    </>
  );
}
