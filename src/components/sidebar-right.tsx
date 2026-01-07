import * as React from "react";

import { DatePicker } from "@/components/date-picker";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Lasith Dissanayake",
    email: "dissanayakelyb.20@uom.lk",
    emoji: "💻",
  },
};

export function SidebarRight({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="none"
      className="sticky top-0 hidden h-svh border-l lg:flex"
      {...props}
    >
      <SidebarContent>
        <DatePicker />
        <SidebarSeparator className="mx-0" />
      </SidebarContent>
      <SidebarHeader className="border-sidebar-border h-16 border-b cursor-pointer">
        <NavUser user={data.user} />
      </SidebarHeader>
    </Sidebar>
  );
}
