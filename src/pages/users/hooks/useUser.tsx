import { useEffect, useMemo, useState } from "react";
import {
  GetuserApi,
  DeleteuserApi,
  Updateuserapi,
  Adduserapi,
} from "@/services/api/user";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import dayjs from 'dayjs';

export type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
};
const columnHelper = createColumnHelper<User>();
export const useUser = () => {
  const [user, setUser] = useState<User[]>([]);
  const [openDialog, setopenDialog] = useState(false);
  const [payload, setPayload] = useState({
    id: 0,
    name: "",
  });
  const [payloadAdd, setPayloadAdd] = useState({
    email: "",
    password: "",
    name: "",
    role_id: 0,
  });
  const handleAddUser = async () => {
    const payload = payloadAdd;
    Adduserapi(payload)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        console.log("add completed");
        fecthUser();
        setopenDialogAdd(false);
        setPayloadAdd({ email: "", password: "", name: "", role_id: 0 });
      });
  };
  const handleaddChange = (field: string, value: string | number) => {
    setPayloadAdd((prev) => ({ ...prev, [field]: value }));
  };
  const [openDialogAdd, setopenDialogAdd] = useState(false);
  const fecthUser = async () => {
    GetuserApi()
      .then((res) => {
        console.log(res);
        setUser(res.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        console.log("fetch completed");
      });
  };
  useEffect(() => {
    fecthUser();
  }, []);
  const handleDelete = (id: number) => {
    DeleteuserApi(id)
      .then((res) => {
        console.log(res);
        fecthUser();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        console.log("delete completed");
      });
  };
  const handleChange = (field: string, value: string | number) => {
    setPayload((prev) => ({ ...prev, [field]: value }));
  };
  const handleEdit = (id: number) => {
    handleChange("id", id);
    setopenDialog(true);
  };
  const handleClose = () => {
    setopenDialog(false);
  };

  const handleSave = () => {
    const payloadapi = {
      name: payload.name,
    };
    Updateuserapi(payload.id, payloadapi)
      .then((res) => {
        console.log(res);
        fecthUser();
        handleClose();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        console.log("update completed");
      });
  };
  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row.id, {
        id: "id",
        header: "ID",
        cell: (info) => <div>{info.row.original.id}</div>,
      }),
      columnHelper.accessor((row) => row.name, {
        id: "name",
        header: "Name",
        cell: (info) => <div>{info.row.original.name}</div>,
      }),
      columnHelper.accessor((row) => row.email, {
        id: "email",
        header: "Email",
        cell: (info) => <div>{info.row.original.email}</div>,
      }),
      columnHelper.accessor((row) => row.created_at, {
        id: "created_at",
        header: "Created Date",
        cell: (info) => <div>{dayjs(info.row.original.created_at).format('YYYY-MM-DD, hh:mm A')}</div>,
      }),
      columnHelper.accessor((row) => row.id, {
        id: "action_id",
        header: "Actions",
        cell: (info) => (
          <div className="flex space-x-4">
            <Button onClick={() => handleEdit(info.row.original.id)}>
              <FaEdit className="text-muted" />
            </Button>
            <Button
              onClick={() => handleDelete(info.row.original.id)}
              variant={"destructive"}
            >
              <FaTrash className="text-muted" />
            </Button>
          </div>
        ),
      }),
    ],
    []
  );
  const table = useReactTable({
    data: user,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return {
    user,
    table,
    columns,
    openDialog,
    handleClose,
    payload,
    handleChange,
    handleSave,
    openDialogAdd,
    setopenDialogAdd,
    handleaddChange,
    payloadAdd,
    handleAddUser,
  };
};
