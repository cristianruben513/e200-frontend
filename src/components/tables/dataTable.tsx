import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import {
	type ColumnDef,
	type ColumnFiltersState,
	type SortingState,
	type VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { ChevronDownIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { Input } from '../ui/input'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'

interface DataTableProps<TData> {
	data: TData[]
	columns: ColumnDef<TData>[]
	searchPlaceholder?: string
	searchField?: keyof TData
}

export function DataTable<TData>({
	data,
	columns,
	searchPlaceholder,
	searchField,
}: DataTableProps<TData>) {
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = useState({})

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	})

	return (
		<ScrollArea className="w-[90vw] md:w-full whitespace-nowrap rounded-md border md:border-0 mx-auto pl-2 md:px-3 bg-black/10 backdrop-blur-sm">
			<div className="flex flex-col md:flex-row md:items-center pt-4 gap-3">
				{searchField && searchPlaceholder && (
					<div className="flex items-center">
						<Input
							placeholder={`Buscar por ${searchPlaceholder} ...`}
							value={
								(table
									.getColumn(searchField as string)
									?.getFilterValue() as string) ?? ''
							}
							onChange={(event) =>
								table
									.getColumn(searchField as string)
									?.setFilterValue(event.target.value)
							}
							className="max-w-56 md:max-w-80"
						/>
					</div>
				)}

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="md:ml-auto w-56">
							Ver/Ocultar Columnas <ChevronDownIcon className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								)
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className="rounded-md border mt-4 bg-neutral-50">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow className="bg-blue-100" key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
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
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									className=" odd:bg-white even:bg-neutral-100"
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No hay resultados
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4">
				<div className="text-sm text-muted-foreground rounded-full bg-white w-fi p-3 py-1 w-fit">
					{table.getRowModel().rows.length} registros
				</div>
				<div className="space-x-2 flex">
					<Button
						variant="outline"
						className="flex items-center"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<ChevronLeft className="size-4" />
						<span>Anterior</span>
					</Button>
					<Button
						variant="outline"
						className="flex items-center"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<span>Siguiente</span>
						<ChevronRight className="size-4" />
					</Button>
				</div>
			</div>

			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	)
}
