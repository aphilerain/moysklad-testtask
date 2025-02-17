import { Todo } from "@/entities/todo/model/types";
import { User } from "@/entities/user/model/types";
import { useQuery } from "@tanstack/react-query";

export default function useFetchTodos() {
  return useQuery({

    queryKey: ["todos"],
    queryFn: async ({ signal }) => {
      const [usersResponse, todosResponse] = await Promise.all([
        fetch("https://jsonplaceholder.typicode.com/users", { signal }).then(
          (r) => {
            if (!r.ok) throw new Error("Ошибка при получении пользователей.");
            return r.json() as Promise<User[]>;
          }
        ),
        fetch("https://jsonplaceholder.typicode.com/todos", { signal }).then(
          (r) => {
            if (!r.ok) throw new Error("Failed to fetch todos");
            return r.json() as Promise<Todo[]>;
          }
        ),
      ]);

      const processedData = usersResponse.map((user, index) => ({
        number: index + 1,
        userInfo: { username: user.username, email: user.email },
        todoCount: todosResponse.filter((todo) => todo.userId === user.id)
          .length,
      }));

      return processedData;
    },
  });
}
