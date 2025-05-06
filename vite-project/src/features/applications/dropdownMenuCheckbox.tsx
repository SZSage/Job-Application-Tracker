import * as React from "react";
import { Arrow } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export function DropDownMenuCheckboxes() {
  const [selectedStatus, setSelectedStatus] = React.useState<string>("saved");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Status</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36" sideOffset={4} align="end">
        <Arrow width={20} height={10} />
        <DropdownMenuCheckboxItem
          checked={selectedStatus === "saved"}
          onCheckedChange={() => setSelectedStatus("saved")}
        >
          Saved
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={selectedStatus === "applied"}
          onCheckedChange={() => setSelectedStatus("applied")}
        >
          Applied
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={selectedStatus === "screen"}
          onCheckedChange={() => setSelectedStatus("screen")}
        >
          Screen
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={selectedStatus === "interviewing"}
          onCheckedChange={() => setSelectedStatus("interviewing")}
        >
          Interviewing
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={selectedStatus === "offer"}
          onCheckedChange={() => setSelectedStatus("offer")}
        >
          Offer
        </DropdownMenuCheckboxItem>

        <DropdownMenuSeparator></DropdownMenuSeparator>
        <DropdownMenuCheckboxItem
          checked={selectedStatus === "withdrawn"}
          onCheckedChange={() => setSelectedStatus("withdrawn")}
        >
          Withdrawn
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={selectedStatus === "Rejected"}
          onCheckedChange={() => setSelectedStatus("Rejected")}
        >
          Rejected
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={selectedStatus === "ghosted"}
          onCheckedChange={() => setSelectedStatus("ghosted")}
        >
          Ghosted
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={selectedStatus === "accepted"}
          onCheckedChange={() => setSelectedStatus("accepted")}
        >
          Accepted
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
