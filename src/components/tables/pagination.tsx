import { Button } from "@/components/ui/button"

export const TablePagination = ({ table }: { table: any }) => (
  <div className='flex items-center justify-end space-x-2 py-4'>
    <div className='flex-1 text-sm text-muted-foreground'>
      {table.getRowModel().rows.length} registros
    </div>
    <div className='space-x-2'>
      <Button
        variant='outline'
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Anterior
      </Button>
      <Button
        variant='outline'
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Siguiente
      </Button>
    </div>
  </div>
)
