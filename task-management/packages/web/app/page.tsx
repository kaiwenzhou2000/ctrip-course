"use client";

import Image from "next/image";
import { Table, Header } from "../components";
import { useEffect } from "react";

export default function Home() {
  const data = [
    {
      id: "1",
      name: "123",
      createTime: new Date(),
      importance: 1,
      status: "123",
      people: ["123"],
    },
  ];

  useEffect(() => {
    fetch("http://localhost:3001/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
    <>
      <Header />
      <main className="flex w-5/6 h-4/5 mx-auto flex-col items-center justify-between p-4">
        <Table data={data} />
      </main>
    </>
  );
}
