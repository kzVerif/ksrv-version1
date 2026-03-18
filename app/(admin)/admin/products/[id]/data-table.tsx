"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  RowSelectionState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Trash2 } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onDeleteSelected?: (ids: string[]) => Promise<void>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onDeleteSelected,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [filterValue, setFilterValue] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [openDialog, setOpenDialog] = useState(false); // state เปิด/ปิด modal

  const filteredData = React.useMemo(() => {
    if (!filterValue) return data;
    const lower = filterValue.toLowerCase();
    return data.filter(
      (item: any) =>
        item.detail.toLowerCase().includes(lower) ||
        item.status.toLowerCase().includes(lower),
    );
  }, [filterValue, data]);

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    state: {
      sorting,
      rowSelection,
    },
  });

  const selectedRows = table.getSelectedRowModel().rows;
  const selectedCount = selectedRows.length;

  const handleConfirmDelete = async () => {
    if (!onDeleteSelected) return;
    setIsDeleting(true);
    try {
      const ids = selectedRows.map((row) => (row.original as any).id as string);
      await onDeleteSelected(ids);
      setRowSelection({});
    } finally {
      setIsDeleting(false);
      setOpenDialog(false);
    }
  };

  return (
    <div>
      {/* AlertDialog Modal ยืนยันการลบ */}
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-destructive">ยืนยันการลบรายการ</AlertDialogTitle>
            <AlertDialogDescription>
              คุณกำลังจะลบสต็อคสินค้าจำนวน{" "}
              <span className="font-semibold text-destructive">
                {selectedCount} รายการ
              </span>{" "}
              การดำเนินการนี้ไม่สามารถย้อนกลับได้
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="bg-destructive text-white hover:bg-destructive/90"
              variant={"destructive"}
            >
              {isDeleting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  กำลังลบ...
                </span>
              ) : (
                <span className="flex items-center gap-2 ">
                  <Trash2 className="h-4 w-4" />
                  ยืนยันลบ
                </span>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex items-center justify-between pb-4 gap-3">
        {/* ปุ่มลบที่เลือก */}
        <div>
          {selectedCount > 0 && onDeleteSelected && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setOpenDialog(true)} // เปิด modal แทน confirm()
              className="flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              ลบที่เลือก ({selectedCount})
            </Button>
          )}
        </div>

        <Input
          placeholder="ค้นหา ชื่อสินค้า / สถานะ"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table className="bg-white shadow">
          <TableHeader className="text-lg">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="cursor-pointer">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className="text-lg">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  ไม่พบข้อมูล
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">จำนวนแถวต่อหน้า:</span>
          <select
            className="border rounded px-2 py-1"
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
          >
            {[5, 10, 20, 30, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm">
            หน้าที่ {table.getState().pagination.pageIndex + 1}/
            {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            ย้อนกลับ
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            ถัดไป
          </Button>
        </div>
      </div>
    </div>
  );
}