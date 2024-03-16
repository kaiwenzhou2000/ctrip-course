"use client";

import { useRouter } from "next/navigation";
import { Table, Header, Form } from "../components";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

let token;
if (typeof window !== "undefined") {
  try {
    token = window.document.cookie
      .split("; ")
      .find((row) => row.startsWith("token"))
      .split("=")[1];
  } catch (e) {
    token = null;
  }
}

const auth = async () => {
  try {
    const response = await fetch("http://localhost:3001/auth", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 假设user对象中存储了token
      },
    });

    const data = await response.json();
    return 0;
  } catch (error) {
    return -1;
  }
};

const withAuth = (Component) => {
  const AuthedComponent = async (props) => {
    const router = useRouter();
    const res = await auth();

    console.log(res);

    if (res === -1) {
      router.replace("/login");
    }
    return <Component {...props} />;
  };

  return dynamic(() => Promise.resolve(AuthedComponent), { ssr: false });
};

function Home() {
  const router = useRouter();

  const [tasks, setTasks] = useState([]);
  const [totalPages, setTotalPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [formVisible, setFormVisible] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit" | "view">(
    "create"
  );
  const [rawFormData, setRawFormData] = useState({
    name: "",
    importance: 0,
    status: 0,
    description: "",
  });

  const onPaginate = (page) => {
    setCurrentPage(page);
    fetchData(page);
  };

  const onCreateTask = () => {
    setFormMode("create");

    setRawFormData({
      name: "",
      importance: 0,
      status: 0,
      description: "",
    });
    setFormVisible(true);
  };

  const onCancel = () => {
    setFormVisible(false);
  };

  const onLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
  };

  const onSubmit = (data, mode) => {
    switch (mode) {
      case "create":
        fetch("http://localhost:3001/addTask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((data) => {
            fetchData();
            setFormVisible(false);
          });

        break;
      case "edit":
        fetch("http://localhost:3001/updateTask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id: data._id, task: data }),
        })
          .then((res) => res.json())
          .then((data) => {
            fetchData();
            setFormVisible(false);
          });
        break;
    }
  };

  const onDelete = (id) => {
    fetch("http://localhost:3001/deleteTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        fetchData(currentPage);
      });
  };

  const onEdit = (id) => {
    setFormMode("edit");
    setFormVisible(true);

    const task = tasks.find((task) => task._id === id);
    setRawFormData(task);
  };

  const onView = (id) => {
    setFormMode("view");
    setFormVisible(true);

    const task = tasks.find((task) => task._id === id);
    setRawFormData(task);
  };

  const fetchData = (page: number = 1, limit: number = 10) => {
    fetch("http://localhost:3001/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        page,
        limit,
      }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setTasks(data.tasks);
        setTotalPages(data.totalPages);
      });
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  return (
    <>
      <Header onLogout={onLogout} onCreateTask={onCreateTask} />
      <main className="flex w-5/6 h-4/5 mx-auto flex-col items-center justify-between p-4">
        {formVisible && (
          <Form
            onCancel={onCancel}
            onSubmit={onSubmit}
            rawData={rawFormData}
            mode={formMode}
          />
        )}
        <Table
          data={tasks}
          totalPages={totalPages}
          currentPage={currentPage}
          onPaginate={onPaginate}
          onDelete={onDelete}
          onEidt={onEdit}
          onView={onView}
        />
      </main>
    </>
  );
}

export default withAuth(Home);
