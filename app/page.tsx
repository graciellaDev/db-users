"use client";

// import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { apiUsers } from "@/lib/api";
import { apiResponse } from "@/types/api";
import Header from "./_components/header/Header";
import Search from "./_components/search/Search";
import ListUsers from "./_components/users/ListUsers";
import './content.scss';

export default function Home() {
  const [users, setUsers] = useState<apiResponse>({result: null, error: null});

  const fetchUsers = async ()  => {
    let response: apiResponse = { result: null, error: null };
    try {
      response = await apiUsers();
    } catch (error: unknown) {
      if (error instanceof Error) {
        response.error = error.message;
      } else {
        response.error = 'Неизвестная ошибка';
      }
    } finally {
      setUsers(response);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Suspense>
      <div className="grid gap-5 px-8 py-5 pb-20">
         <Header users={users.result ? users.result.data : []} isOpenModal={false} />
         <div className="content grid gap-5 items-center justify-items-center">
            <div className="content__sort relative w-full grid gap-5 px-5 py-5 items-center justify-items-center">
              <Search users={users.result ? users.result.data : []} />
            </div>
          {users.result ? <ListUsers users={users.result.data} /> : ''}
         </div>
      </div>
    </Suspense>
  );
}
