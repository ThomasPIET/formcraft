"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { deleteForm } from "@/lib/form-services";
export const columns = [
  {
    accessorKey: "name",
    header: "Nom du Formulaire",
  },
  {
    accessorKey: "id",
    header: "",
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
    id: "voir",
    header: "Voir",
    cell: ({ row }) => {
      const formulaire = row.original;
      return (
        <Button
          variant="outline"
          onClick={() => {
            console.log("Voir :", formulaire);
          }}
        >
          Voir
        </Button>
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
          onClick={() => {
            console.log("Modifier :", formulaire);
          }}
        >
          Modifier
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
        <Button
          variant="outline"
          onClick={() => {
            deleteForm(formulaire.id).then((r) => console.log(r));
          }}
        >
          Supprimer
        </Button>
      );
    },
  },
];
