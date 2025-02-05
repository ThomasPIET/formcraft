import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteForm } from "@/lib/form-services";
import { redirect } from "next/navigation";

export function FormDeleteDialog({ id, children }) {
  const formulaireid = id;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center justify-center">
          <DialogTitle className="text-2xl font-bold text-gray-800 mb-4">
            Suppression du formulaire
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Êtes-vous sûr de vouloir supprimer ce formulaire ? Cette action est
            irréversible.
          </DialogDescription>
          <div className="flex justify-center mt-6">
            <DialogClose asChild>
              <Button variant="outline" className="mr-4">
                Annuler
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                variant="destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteForm(formulaireid).then(() => {
                    redirect("/myform");
                  });
                }}
              >
                Supprimer
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
