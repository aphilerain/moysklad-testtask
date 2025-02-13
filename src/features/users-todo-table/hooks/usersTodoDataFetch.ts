import { Todo } from "@/entities/todo/model/types";
import { User } from "@/entities/user/model/types";
import { useState, useEffect } from "react";

export default function useUsersTodoTableDataFetch() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TableRow[]>([]);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [usersResponse, todosResponse] = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/users", {
            signal: abortController.signal,
          }).then((r) => r.json() as Promise<User[]>),
          fetch("https://jsonplaceholder.typicode.com/todos", {
            signal: abortController.signal,
          }).then((r) => r.json() as Promise<Todo[]>),
        ]);

        const processedData = usersResponse.map((user, index) => ({
          number: index + 1,
          userInfo: { username: user.username, email: user.email },
          todoCount: todosResponse.filter((todo) => todo.userId === user.id)
            .length,
        }));

        setData(processedData);
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();

    // На всякий случай, чтобы уж точно не было утечек памяти.
    // Да, конкретно в тестовом это может быть потенциально излишне,
    // но лучше обезопасить приложение, чем нет.
    return () => abortController.abort();
  }, []);

  return { isLoading, error, data };
}
