import * as React from "react";

import { NavLecturers } from "@/components/nav-lecturers";
import { DatePicker } from "@/components/date-picker";
import {
  Sidebar,
  SidebarContent,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const data = {
  people: [
    {
      name: "Nuwanga Akalanka",
      emoji: "📊",
    },
    {
      name: "Charuka Abeysinghe",
      emoji: "🏅",
    },
    {
      name: "Pramodi Rashmika",
      emoji: "🤣",
    },
    {
      name: "Dileka Sathsarani",
      emoji: "🚀",
    },
    {
      name: "Lasith Dissanayake",
      emoji: "💻",
    },
    {
      name: "Ashen Gunasekara",
      emoji: "🐯",
    },
    {
      name: "Warsha Yashodini",
      emoji: "🌧️",
    },
    {
      name: "Nayomi Dedunu",
      emoji: "🌈",
    },
    {
      name: "Shalitha Pathum",
      emoji: "😌",
    },
  ],

  user: {
    name: "Lasith Dissanayake",
    email: "dissanayakelyb.20@uom.lk",
    emoji: "💻",
  },
};

export function SidebarLeft({
  selectedPerson,
  onPersonSelect,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  selectedPerson: string | null;
  onPersonSelect: (person: string | null) => void;
}) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarContent className="flex flex-col gap-3 overflow-y-auto">
        <div className="space-y-3">
          <NavLecturers
            lecturers={data.people}
            selectedPerson={selectedPerson}
            onPersonSelect={onPersonSelect}
          />
        </div>

        <SidebarSeparator className="mx-0" />

        <div className="px-3">
          <DatePicker />
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
