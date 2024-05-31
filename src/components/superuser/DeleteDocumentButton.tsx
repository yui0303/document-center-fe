"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useMemo } from "react"

type RowSelectedDocumentInfoType = {
  documentId: string,
  title: string,
  status: string,
  owner: UserInfo
  assignUser: UserInfo | null
}

type SuperUserDeleteDocumentProps = {
  rowSelectedDocumentInfo: RowSelectedDocumentInfoType[],
  onConfirmDelete: () => void
}

export default function SuperUserDeleteDocument({
  rowSelectedDocumentInfo,
  onConfirmDelete,
}: SuperUserDeleteDocumentProps) {
  const canSubmit = useMemo(() => {
    if (rowSelectedDocumentInfo.length === 0) {
      return false
    }
    return rowSelectedDocumentInfo.every((row) => row.assignUser !== null), [rowSelectedDocumentInfo]
  }, [rowSelectedDocumentInfo])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>刪除</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>刪除文件</DialogTitle>
          <DialogDescription>
            請注意，刪除後將無法復原
          </DialogDescription>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>文件編號</TableHead>
              <TableHead>文件名稱</TableHead>
              <TableHead>文件狀態</TableHead>
              <TableHead>文件擁有者</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rowSelectedDocumentInfo.map((row) => (
              <TableRow key={row.documentId}>
                <TableCell>{row.documentId}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>
                  <>
                    {row.status === "pass" ? (
                      <span className="px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">
                        {row.status}
                      </span>
                    ) : row.status === "reject" ? (
                      <span className="px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-full">
                        {row.status}
                      </span>
                    ) : row.status === "review" ? (
                      <span className="px-2 py-1 text-xs font-semibold text-white bg-yellow-500 rounded-full">
                        {row.status}
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">
                        {row.status}
                      </span>
                    )}
                  </>
                </TableCell>
                <TableCell>{row.owner.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <DialogFooter>
          <DialogClose asChild>
            {canSubmit ? (
              <Button type="submit" variant="outline" onClick={onConfirmDelete} >
                確定
              </Button>
            ) : (
              <Button type="submit" variant="outline" disabled>
                有文件尚未指派審核者或是無文件被選取
              </Button>
            )}
          </DialogClose>
          <DialogClose asChild>
            <Button variant="outline">取消</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
