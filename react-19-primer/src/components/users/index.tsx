import { useEffect, useState } from "react";
import RenderIf from "../render-if";

const USERS_API = "https://jsonplaceholder.typicode.com/users";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const usersFetch = async () => {
      setLoading(true);
      try {
        const delayBy2Second = new Promise((resolve) =>
          setTimeout(resolve, 2000)
        );
        await delayBy2Second;
        const res = await fetch(USERS_API);
        console.log(res.headers.get("Content-Type"));
        const data = await res.json();
        console.log(data);
        setUsers(data);
        setLoading(false);
      } catch (error: unknown) {
        setLoading(false);
        setError((error as Error).message);
      }
    };
    usersFetch();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <RenderIf condition={loading}>
        <p>Loading...</p>
      </RenderIf>
      <RenderIf condition={!!error}>
        <p>Error: {error}</p>
      </RenderIf>
      <RenderIf condition={users.length > 0}>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </RenderIf>
    </div>
  );
}
