"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { FormDeleteDialog } from "@/components/formDeleteDialog";
import { redirect } from "next/navigation";
import { FormShareDialog } from "@/components/formShareDialog";
export const columns = [
  {
    accessorKey: "name",
    header: "Nom du Formulaire",
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => {
      const id = row.original;
      return null;
    },
  },
  {
    accessorKey: "CreatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date de création
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "questions",
    header: "Nombre de questions",
  },
  {
    accessorKey: "reponses",
    header: "Nombre de réponses",
  },

  {
    accessorKey: "share",
    header: "Partager",
    cell: ({ row }) => {
      const formulaire = row.original;
      return (
        <div onClick={(e) => e.stopPropagation()}>
          <FormShareDialog id={formulaire.id} />
        </div>
      );
    },
  },

  {
    id: "modifier",
    header: "Modifier",
    cell: ({ row }) => {
      const formulaire = row.original;
      return (
        <Button
          variant="outline"
          onClick={(event) => {
            event.stopPropagation();
            redirect(`myform/edit/${formulaire.id}`, "push");
            console.log("Modifier :", formulaire);
          }}
        >
          <Pencil />
        </Button>
      );
    },
  },
  {
    id: "supprimer",
    header: "Supprimer",
    cell: ({ row }) => {
      const formulaire = row.original;
      return (
        <div onClick={(e) => e.stopPropagation()}>
          <FormDeleteDialog id={formulaire.id}>
            <Button variant="outline">
              <Trash2 />
            </Button>
          </FormDeleteDialog>
        </div>
      );
    },
  },
];
