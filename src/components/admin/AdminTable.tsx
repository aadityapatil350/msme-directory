import { ReactNode } from 'react'

interface TableHeaderProps {
  children: ReactNode
}

export function TableHeader({ children }: TableHeaderProps) {
  return (
    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase">
      {children}
    </th>
  )
}

interface TableRowProps {
  children: ReactNode
}

export function TableRow({ children }: TableRowProps) {
  return (
    <tr className="hover:bg-blue-50 transition-colors">
      {children}
    </tr>
  )
}

interface TableCellProps {
  children: ReactNode
  className?: string
}

export function TableCell({ children, className }: TableCellProps) {
  return (
    <td className={`px-4 py-3 text-sm text-gray-900 ${className || ''}`}>
      {children}
    </td>
  )
}

export function TableContainer({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      {children}
    </div>
  )
}

export function TableHead({ children }: { children: ReactNode }) {
  return (
    <div className="px-6 py-4 border-b border-gray-200">
      <h2 className="text-lg font-bold text-gray-900">{children}</h2>
    </div>
  )
}
