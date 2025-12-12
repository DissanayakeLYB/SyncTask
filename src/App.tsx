import { useState } from "react";
import { SidebarLeft } from "@/components/sidebar-left";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import KanbanBoard from "./components/kanban-board";
import { LogOut } from "lucide-react";

const userData = {
  name: "Lasith Dissanayake",
  email: "dissanayakelyb.20@uom.lk",
  emoji: "😄",
};

export function App() {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);

  return (
    <SidebarProvider>
      <SidebarLeft
        selectedPerson={selectedPerson}
        onPersonSelect={setSelectedPerson}
      />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex h-14 shrink-0 items-center gap-2 border-b border-slate-700">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
          </div>
          <div className="flex items-center gap-2 px-4">
            <button
              onClick={() => setShowUserModal(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold transition-colors cursor-pointer"
              title="User Profile"
            >
              {userData.emoji}
            </button>
          </div>
        </header>
        <KanbanBoard selectedPerson={selectedPerson} />
      </SidebarInset>

      {/* User Profile Modal */}
      {showUserModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl border border-slate-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white text-3xl">
                {userData.emoji}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-100">
                  {userData.name}
                </h3>
                <p className="text-sm text-slate-300">{userData.email}</p>
              </div>
            </div>

            <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-slate-700">
              <button
                onClick={() => setShowUserModal(false)}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded-md transition font-medium"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowUserModal(false);
                  // Add logout logic here
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition font-medium flex items-center gap-2"
              >
                <LogOut size={16} />
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </SidebarProvider>
  );
}
