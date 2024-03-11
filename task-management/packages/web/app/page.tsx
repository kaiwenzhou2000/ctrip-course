"use client";

import { useRouter } from "next/navigation";
import { Table, Header, Form } from "../components";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const withAuth = (Component) => {
  const AuthedComponent = (props) => {
    const router = useRouter();
    const user =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : null;

    useEffect(() => {
      if (!user) {
        router.replace("/login");
      }
    }, [user, router]);

    if (!user) {
      return null;
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
  const [firstname, setFirstname] = useState("");

  const onPaginate = (page) => {
    setCurrentPage(page);
    fetchData(page);
  };

  const onCreateTask = () => {
    setFormVisible(true);
  };

  const onCancel = () => {
    setFormVisible(false);
  };

  const onLogout = () => {
    router.push("/login");
  };

  const onSubmit = (data) => {
    fetch("http://localhost:3001/addTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        fetchData();
        setFormVisible(false);
      });
  };

  const onDelete = (id) => {
    fetch("http://localhost:3001/deleteTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        fetchData(currentPage);
      });
  };

  const fetchData = (page: number = 1, limit: number = 10) => {
    fetch("http://localhost:3001/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    const user = JSON.parse(localStorage.getItem("user"));

    if (user === null) {
      router.push("/login");
      return;
    }

    setFirstname(user.firstname);
  }, []);

  return (
    <>
      <Header
        onLogout={onLogout}
        onCreateTask={onCreateTask}
        name={firstname}
      />
      <main className="flex w-5/6 h-4/5 mx-auto flex-col items-center justify-between p-4">
        {formVisible && (
          <Form
            onCancel={onCancel}
            onSubmit={onSubmit}
            rawData={{ name: "", importance: 0, status: 0, description: "" }}
          />
        )}
        <Table
          data={tasks}
          totalPages={totalPages}
          currentPage={currentPage}
          onPaginate={onPaginate}
          onDelete={onDelete}
        />
      </main>
    </>
  );
}

export default withAuth(Home);
