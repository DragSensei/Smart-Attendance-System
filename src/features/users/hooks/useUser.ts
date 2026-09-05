import type { User } from "../schemas/user.schema";
import { getUserById } from "../server/user.service";

// Minimal React hook placeholder
function useStateHook<T>(initial: T): [T, (val: T) => void] {
  let val = initial;
  return [val, (newVal: T) => { val = newVal; }];
}

export function useUser(_userId?: string) {
  const [user, setUser] = useStateHook<User | null>(null);

  const fetchUser = async (id: string) => {
    const res = await getUserById(id);
    if (res.success && res.data) {
      setUser(res.data);
    }
  };

  return { user, fetchUser };
}
