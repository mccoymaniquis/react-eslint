/* eslint-disable react/no-array-index-key */
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Tooltip as ChartTooltip,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// Sample demo data — replace with API data later
const employees = [
  { id: 1, name: "John Doe", department: "IT", status: "Active", birthday: "2025-11-02", contractType: "Contractual", contractEnd: "2025-11-30" },
  { id: 2, name: "Jane Smith", department: "HR", status: "Active", birthday: "2025-12-01", contractType: "Probationary", contractEnd: "2025-12-15" },
  { id: 3, name: "Mark Lee", department: "Finance", status: "Inactive", birthday: "2025-10-31", contractType: "Regular", contractEnd: "2026-05-01" },
  { id: 4, name: "Anna Cruz", department: "IT", status: "Active", birthday: "2025-11-05", contractType: "Probationary", contractEnd: "2025-11-25" },
  { id: 4, name: "Anna Liza", department: "IT", status: "Active", birthday: "2025-11-05", contractType: "Regular" },
  { id: 5, name: "Paul Ramos", department: "Sales", status: "Active", birthday: "2025-11-07", contractType: "Contractual", contractEnd: "2025-12-10" },
];

export default function Dashboard() {
  const totalActive = useMemo(
    () => employees.filter(e => e.status === "Active").length,
    [],
  );

  const employeesByDept = useMemo(() => {
    const result: Record<string, number> = {};
    employees.forEach((e) => {
      result[e.department] = (result[e.department] || 0) + 1;
    });
    return Object.entries(result).map(([name, value]) => ({ name, value }));
  }, []);

  const employeesByStatus = useMemo(() => {
    const result: Record<string, number> = {};
    employees.forEach((e) => {
      result[e.status] = (result[e.status] || 0) + 1;
    });
    return Object.entries(result).map(([status, count]) => ({
      status,
      count,
    }));
  }, []);

  const upcomingBirthdays = useMemo(() => {
    const today = new Date();
    const upcoming = employees
      .filter((e) => {
        const bday = new Date(e.birthday);
        bday.setFullYear(today.getFullYear());
        const diff = bday.getTime() - today.getTime();
        return diff >= 0 && diff <= 30 * 24 * 60 * 60 * 1000; // next 30 days
      })
      .sort((a, b) => new Date(a.birthday).getTime() - new Date(b.birthday).getTime());
    return upcoming;
  }, []);

  const expiringContracts = useMemo(() => {
    const today = new Date();
    return employees.filter((e) => {
      if (!e.contractEnd)
        return false; // skip if no contract end date
      const end = new Date(e.contractEnd);
      const diff = end.getTime() - today.getTime();
      const isExpiringSoon = diff >= 0 && diff <= 30 * 24 * 60 * 60 * 1000; // within 30 days
      const isValidContractType
      = e.contractType === "Contractual" || e.contractType === "Probationary";
      return isExpiringSoon && isValidContractType;
    });
  }, []);

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];
  return (
    <Layout>
      <span className="text-3xl font-bold mb-2">Welcome Dashboard</span>
      <p className="text-muted-foreground">
        This is your private dashboard.
      </p>

      <div className="flex flex-col gap-6 mt-4">
        {/* Your page-specific content here */}
        <div className="grid grid-cols-2 gap-6">
          {/* total employees */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Total Active Employees</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 items-center justify-center">
              <span className="text-9xl font-bold text-primary">{totalActive}</span>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Upcoming Birthdays</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[250px]">
                {upcomingBirthdays.length === 0
                  ? (
                      <p className="text-muted-foreground text-sm text-center">
                        No upcoming birthdays
                      </p>
                    )
                  : (
                      upcomingBirthdays.map(emp => (
                        <div key={emp.id} className="flex items-center justify-between py-2">
                          <span>{emp.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {new Date(emp.birthday).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      ))
                    )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {/* Employees by Department */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Employees by Department</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={employeesByDept}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label
                  >
                    {employeesByDept.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Employee Status */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Employees by Status</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={employeesByStatus}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <ChartTooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        <div className="grid">

          {/* Expiring Contracts */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Expiring Contracts (Next 30 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[250px]">
                {expiringContracts.length === 0
                  ? (
                      <p className="text-muted-foreground text-sm text-center">
                        No expiring contracts
                      </p>
                    )
                  : (
                      expiringContracts.map(emp => (
                        <div key={emp.id} className="py-2">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{emp.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {emp.department}
                                {" "}
                                —
                                {emp.contractType}
                              </p>
                            </div>
                            <p className="text-sm text-red-500">
                              {new Date(emp.contractEnd!).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                          <Separator className="my-2" />
                        </div>
                      ))
                    )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

      </div>
    </Layout>
  );
}
