"use client";

import { ReactSVG } from "react-svg";
import { TableRow } from "./model/types";
import useUsersTodoTableDataFetch from "./hooks/usersTodoDataFetch";

const UsersTodoTable = () => {
  const { data, isLoading, error } = useUsersTodoTableDataFetch();

  if (isLoading) {
    return <div>Данные грузятся...</div>;
  }

  if (error) {
    return (
      <div>При загрузке произошла ошибка. Увы. Вот текст ошибки: {error}</div>
    );
  }

  return (
    <div className="flex flex-col gap-12">
      <header className="flex flex-col gap-2">
        <h2 className="text-2xl md:text-5xl font-bold">User To-Do Table</h2>
        <p className="text-font-secondary text-xs md:text-base">
          User task table for effective planning.
        </p>
      </header>
      <table className=" w-full overflow-hidden border border-border border-collapse">
        <thead className="bg-foreground">
          <tr className="">
            <th className="text-xxs uppercase text-center text-font-secondary-gray p-2 w-12 font-semibold md:text-xs">
              TEST
            </th>
            <th className="p-2 text-xxs text-font-secondary-gray font-semibold uppercase text-left md:text-xs">
              username
            </th>
            <th className="w-40 p-2 text-xxs text-font-secondary-gray font-semibold uppercase text-center md:text-xs md:text-left">
              to-do count
            </th>
          </tr>
        </thead>
        <tbody className="rounded-b-lg">
          {data.map((row: TableRow) => (
            <tr
              key={row.number}
              className={
                row.number === 0 ? "h-20" : "h-20 border border-border"
              }
            >
              <td className="h-full p-2 w-12 text-center text-xs md:text-base">
                {row.number}
              </td>
              <td className="h-full p-2 flex items-center gap-3">
                <ReactSVG src="./users.svg" />
                <span className="text-xs md:text-base">
                  {row.userInfo.username}
                  <br />
                  <span className="text-xs text-font-secondary">
                    {row.userInfo.email}
                  </span>
                </span>
              </td>
              <td className="w-40 p-2 h-full text-xs text-center md:text-base md:text-left">
                {row.todoCount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTodoTable;
