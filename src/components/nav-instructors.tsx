import { Collapsible } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavInstructors({
  instructors,
  selectedPerson,
  onPersonSelect,
}: {
  instructors: {
    name: string;
    emoji: React.ReactNode;
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
    <SidebarGroup className="py-2">
      <SidebarGroupLabel className="text-xs">Instructors</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {instructors.map((instructor) => {
            const firstName = instructor.name.split(" ")[0];
            const isActive = selectedPerson === firstName;
            return (
              <Collapsible key={instructor.name}>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a
                      className={`mb-1 gap-2 cursor-pointer text-xs ${
                        isActive ? "bg-accent" : ""
                      }`}
                      title={instructor.name}
                      onClick={() => handleClick(instructor.name)}
                    >
                      <span className="text-lg">{instructor.emoji}</span>
                      <span className="text-xs">{instructor.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </Collapsible>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
