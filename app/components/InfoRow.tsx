import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"

type Props = {
  a: string,
  b: string,
  align?: string,
}

export default function InfoRow({ a, b, align }: Props) {
  return (
    <TableRow>
      <TableCell>{a}</TableCell>
      <TableCell className={align}>{b}</TableCell>
    </TableRow>
  )
}