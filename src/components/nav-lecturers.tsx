"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavLecturers({
  lecturers,
  selectedPerson,
  onPersonSelect,
}: {
  lecturers: {
    name: string;
    emoji: string;
  }[];
  selectedPerson: string | null;
  onPersonSelect: (person: string | null) => void;
}) {
  const handleClick = (name: string) => {
    // Extract first name from full name to match tags
    const firstName = name.split(" ")[0];
    // Toggle selection: if already selected, deselect; otherwise select
    if (selectedPerson === firstName) {
      onPersonSelect(null);
    } else {
      onPersonSelect(firstName);
    }
  };

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden py-2">
      <SidebarMenu>
        {lecturers.map((item) => {
          const firstName = item.name.split(" ")[0];
          const isActive = selectedPerson === firstName;
          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <a
                  title={item.name}
                  className={`mb-1 gap-2 cursor-pointer text-xs ${
                    isActive ? "bg-accent" : ""
                  }`}
                  onClick={() => handleClick(item.name)}
                >
                  <span className="text-lg">{item.emoji}</span>
                  <span className="text-xs">{item.name}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
