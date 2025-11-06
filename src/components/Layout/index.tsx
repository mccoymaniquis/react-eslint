import type { ReactNode } from "react";

import { useState } from "react";

import { Footer } from "@/components/Footer";
import { MainSidebar } from "@/components/MainSidebar";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <MainSidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Main Content */}
      <div
        className={`flex flex-1 flex-col min-h-screen transition-all duration-300 ${
          isCollapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        <main className="flex flex-1 flex-col p-4 pt-16 md:pt-4">
          <section className="flex flex-col justify-start items-start h-full">
            <div className="w-full px-4">{children}</div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
