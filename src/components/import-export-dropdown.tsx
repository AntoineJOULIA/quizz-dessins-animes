"use client";

import { Download, Upload } from "lucide-react";
import { saveLocalStorageToFile } from "@/lib/utils";
import { ChangeEvent } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";

export function ImportExportDropdown() {
  function handleExport() {
    saveLocalStorageToFile();
  }

  function handleImport(event: ChangeEvent<HTMLInputElement>) {
    console.log("import");
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const result = e.target?.result as string;
        const jsonData = JSON.parse(result);

        // Remplir le localStorage
        Object.keys(jsonData).forEach((key) => {
          window.localStorage.setItem(key, jsonData[key]);
        });
      } catch (error) {
        console.error(error);
      }
    };
    reader.readAsText(file);

    // useRouter refresh does not work (only 'soft refresh'), so use the native function
    location.reload();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"}>Sauvegardes</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleExport}>
          <Upload className="size-4 mr-3" />
          Exporter...
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <label htmlFor="import">
            <input id="import" className="hidden" type="file" accept="application/json" onChange={handleImport} />
            <Download className="size-4 mr-3" />
            Importer...
          </label>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
