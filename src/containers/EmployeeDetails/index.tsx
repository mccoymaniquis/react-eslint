"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { DataTable } from "@/components/DataTable";
import { Layout } from "@/components/Layout";
import SearchField from "@/components/SearchField";
import { Button } from "@/components/ui/button";

type Employee = {
  id: number;
  employee_number: string;
  first_name: string;
  last_name: string;
  email_address?: string;
  gender?: string;
  is_active: boolean;
};

type EmployeeResponse = {
  page: number;
  totalPages: number;
  totalCount: number;
  data: Employee[];
};

// ✅ Simulated API function
async function fetchEmployees(page: number, search: string): Promise<EmployeeResponse> {
  await new Promise(res => setTimeout(res, 600));

  const allEmployees = Array.from({ length: 45 }, (_, i) => ({
    id: i + 1,
    employee_number: `EMP${String(i + 1).padStart(3, "0")}`,
    first_name: `First${i + 1}`,
    last_name: `Last${i + 1}`,
    email_address: `user${i + 1}@example.com`,
    gender: i % 2 === 0 ? "Male" : "Female",
    is_active: i % 2 === 0,
  }));

  // ✅ Filter by search term
  const filtered = allEmployees.filter(
    e =>
      e.first_name.toLowerCase().includes(search.toLowerCase())
      || e.last_name.toLowerCase().includes(search.toLowerCase())
      || e.employee_number.toLowerCase().includes(search.toLowerCase()),
  );

  const pageSize = 5;
  const totalPages = Math.ceil(filtered.length / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    page,
    totalPages,
    totalCount: filtered.length,
    data: filtered.slice(start, end),
  };
}

const columns: ColumnDef<Employee>[] = [
  { accessorKey: "employee_number", header: "Employee #" },
  { accessorKey: "first_name", header: "First Name" },
  { accessorKey: "last_name", header: "Last Name" },
  { accessorKey: "email_address", header: "Email" },
  { accessorKey: "gender", header: "Gender" },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`rounded px-2 py-1 text-xs font-semibold ${
          row.original.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}
      >
        {row.original.is_active ? "Active" : "Inactive"}
      </span>
    ),
  },
];

export default function EmployeeDetails() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const methods = useForm({ defaultValues: { query: "" } });

  // ✅ React Query fetch (auto updates on page/search change)
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["employees", page, search],
    queryFn: () => fetchEmployees(page, search),
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1); // reset to page 1 on new search
  };

  if (isError) {
    return (
      <Layout>
        <div className="p-6 text-red-600">
          Failed to load employees.
          <Button
            onClick={() => refetch()}
            className="ml-2 rounded bg-red-200 px-3 py-1 text-sm"
          >
            Retry
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col gap-4 p-6">
        <span className="text-3xl font-bold mb-2">Employee Details</span>

        {/* ✅ Search Field */}
        <FormProvider {...methods}>
          <div className="max-w-xs">
            <SearchField
              name="search"
              placeholder="Search by name"
              onSearch={handleSearch}
            />
          </div>
        </FormProvider>

        {/* ✅ Table */}
        <DataTable
          columns={columns}
          data={data?.data || []}
          page={data?.page || 1}
          totalPages={data?.totalPages || 1}
          totalCount={data?.totalCount || 0}
          onPageChange={handlePageChange}
          isLoading={isLoading}
        />
      </div>
    </Layout>
  );
}
