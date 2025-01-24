"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns = [
  {
    accessorKey: "name",
    header: "Nom du Formulaire",
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
            // Vous pouvez appeler une fonction ou effectuer une navigation...
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
            // Vous pouvez appeler une fonction ou effectuer une navigation...
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
            console.log("Supprimer :", formulaire);
            // Vous pouvez appeler une fonction ou effectuer une navigation...
          }}
        >
          Supprimer
        </Button>
      );
    },
  },
];
