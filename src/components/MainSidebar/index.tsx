"use client";

import { ChevronDown, ChevronRight, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import type { NavItem } from "@/types/nav";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { NAV_ITEMS } from "@/constants/navItems";
import { cn } from "@/lib/utils";

type MainSidebarProps = {
  isCollapsed: boolean;
  onToggle: () => void;
};

export function MainSidebar({ isCollapsed, onToggle }: MainSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // ✅ All submenus open by default
  const [openGroups, setOpenGroups] = useState<string[]>(
    NAV_ITEMS.filter(item => item.sub).map(item => item.label),
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setIsMobileOpen(!isMobileOpen);
    }
    else {
      onToggle();
    }
  };

  // ✅ Allow multiple open groups
  const handleGroupToggle = (label: string) => {
    setOpenGroups(prev =>
      prev.includes(label)
        ? prev.filter(g => g !== label)
        : [...prev, label],
    );
  };

  const renderNavItem = (item: NavItem) => {
    const active = location.pathname === item.path;
    const isGroupOpen = openGroups.includes(item.label);

    return (
      <div key={item.path}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={active ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start font-medium transition-all duration-300",
                active && "bg-muted text-primary",
                isCollapsed && "justify-center px-0",
              )}
              onClick={() => {
                if (item.sub && !isCollapsed) {
                  handleGroupToggle(item.label);
                }
                else {
                  navigate(item.path);
                  setIsMobileOpen(false);
                }
              }}
            >
              <item.icon className="h-5 w-5" />
              {!isCollapsed && (
                <span className="ml-2 flex-1 flex items-center justify-between">
                  {item.label}
                  {item.sub && (
                    isGroupOpen
                      ? (
                          <ChevronDown className="h-4 w-4" />
                        )
                      : (
                          <ChevronRight className="h-4 w-4" />
                        )
                  )}
                </span>
              )}
            </Button>
          </TooltipTrigger>
          {isCollapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
        </Tooltip>

        {/* Render child links */}
        {!isCollapsed && (
          <div
            className={cn(
              "ml-8 mt-1 flex flex-col gap-1 overflow-hidden transition-all duration-300 ease-in-out",
              isGroupOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
            )}
          >
            {item.sub?.map((child) => {
              const childActive = location.pathname === child.path;
              return (
                <Button
                  key={child.path}
                  variant={childActive ? "secondary" : "ghost"}
                  className={cn(
                    "justify-start text-sm font-normal",
                    childActive && "bg-muted text-primary",
                  )}
                  onClick={() => {
                    navigate(child.path);
                    setIsMobileOpen(false);
                  }}
                >
                  <child.icon className="h-4 w-4 mr-2" />
                  {child.label}
                </Button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <TooltipProvider>
      <>
        {/* === Mobile Top Bar === */}
        <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between bg-background px-4 py-3 shadow-sm md:hidden">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <Menu className="h-5 w-5" />
            </Button>
            <span className="text-lg font-bold">My App</span>
          </div>
        </div>

        {/* === Sidebar === */}
        <aside
          className={cn(
            "fixed top-0 left-0 z-50 flex h-full flex-col border-r bg-background transition-all duration-300",
            isCollapsed ? "w-20" : "w-64",
            isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b px-4 py-3">
            {!isCollapsed && <span className="text-xl font-bold">My App</span>}
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto px-2 py-4">
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map(renderNavItem)}
            </nav>
          </div>

          {/* Logout */}
          <div className="border-t p-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="destructive"
                  className={cn(
                    "w-full justify-start",
                    isCollapsed && "justify-center px-0",
                  )}
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  {!isCollapsed && <span className="ml-2">Logout</span>}
                </Button>
              </TooltipTrigger>
              {isCollapsed && <TooltipContent side="right">Logout</TooltipContent>}
            </Tooltip>
          </div>
        </aside>

        {/* Overlay (mobile) */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </>
    </TooltipProvider>
  );
}
