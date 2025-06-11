import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUser } from "@/pages/users/hooks/useUser";
import { flexRender } from "@tanstack/react-table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {useAuth} from "@/utils/authen/auth";
const Users = () => {
  const {
    table,
    columns,
    openDialog,
    handleClose,
    payload,
    handleChange,
    handleSave,
    openDialogAdd,
    setopenDialogAdd,
    payloadAdd,
    handleaddChange,
    handleAddUser,
  } = useUser();
  const {logout} = useAuth();
  return (
    <div className="">
      <div className="flex justify-between items-center mb-5">
        <p className="text-2xl font-bold">User List</p>
        <Button onClick={() => setopenDialogAdd(true)}>Add User</Button>
      </div>
      <Table className="rounded-md border">
        <TableHeader className="bg-muted">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
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
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Dialog open={openDialogAdd} onOpenChange={() => setopenDialogAdd(false)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Users</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={payloadAdd.email}
                onChange={(e) => handleaddChange("email", e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={payloadAdd.password}
                onChange={(e) => handleaddChange("password", e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={payloadAdd.name}
                onChange={(e) => handleaddChange("name", e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Select onValueChange={(value) => handleaddChange("role_id", Number(value))}>
                <Label htmlFor="role">Role</Label>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Admin</SelectItem>
                  <SelectItem value="2">Customer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setopenDialogAdd(false)}>
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={handleAddUser}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={openDialog} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input
                id="name-1"
                name="name"
                value={payload.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={handleSave}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button className="fixed bottom-5 right-5" onClick={logout}>Logout</Button>
    </div>
  );
};

export default Users;
