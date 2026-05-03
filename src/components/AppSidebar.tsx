import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Calendar, Trophy, Moon, Sun } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { modules } from "@/data/curriculum";
import { useTheme } from "@/lib/progress";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();
  const { theme, toggle } = useTheme();

  const isActive = (p: string) => pathname === p || (p !== "/" && pathname.startsWith(p));

  const linkCls = (active: boolean) =>
    `flex items-center gap-3 rounded-md px-2.5 py-2 text-sm transition-colors ${
      active
        ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
        : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
    }`;

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="px-3 py-4">
        <NavLink to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground font-display font-bold">
            YK
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-display font-semibold text-sidebar-foreground">Upskill Hub</span>
              <span className="text-[10px] uppercase tracking-wider text-sidebar-foreground/60">Christian · I&C</span>
            </div>
          )}
        </NavLink>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/"}>
                  <NavLink to="/" className={linkCls(pathname === "/")}>
                    <LayoutDashboard className="h-4 w-4 shrink-0" />
                    {!collapsed && <span>Dashboard</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/timeline"}>
                  <NavLink to="/timeline" className={linkCls(pathname === "/timeline")}>
                    <Calendar className="h-4 w-4 shrink-0" />
                    {!collapsed && <span>Study Timeline</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/badges"}>
                  <NavLink to="/badges" className={linkCls(pathname === "/badges")}>
                    <Trophy className="h-4 w-4 shrink-0" />
                    {!collapsed && <span>Progress & Badges</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Modules</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {modules.map((m) => {
                const path = `/module/${m.slug}`;
                const active = isActive(path);
                const Icon = m.icon;
                return (
                  <SidebarMenuItem key={m.id}>
                    <SidebarMenuButton asChild isActive={active}>
                      <NavLink to={path} className={linkCls(active)}>
                        <Icon className="h-4 w-4 shrink-0" />
                        {!collapsed && (
                          <span className="flex flex-col leading-tight">
                            <span className="text-[10px] uppercase tracking-wider opacity-60">{m.priorityLabel}</span>
                            <span>{m.short}</span>
                          </span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-3 py-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggle}
          className="w-full justify-start gap-2 text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {!collapsed && <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
