"use client";

import { Download, Menu, Upload } from "lucide-react";
import { saveLocalStorageToFile } from "@/lib/utils";
import { ChangeEvent } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

export function ImportExportDropdown() {
  function handleExport() {
    saveLocalStorageToFile();
  }

  function handleImport(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
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
    <div className="fixed top-3 right-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} size={"icon"}>
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Sauvegardes</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleExport}>
            <Upload className="size-4 mr-2" />
            Exporter...
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => document.getElementById("fileInput")?.click()}>
            <Download className="mr-2 h-4 w-4" />
            Importer...
          </DropdownMenuItem>
        </DropdownMenuContent>
        <input id="fileInput" type="file" className="hidden" onChange={handleImport} />
      </DropdownMenu>
    </div>
  );
}
