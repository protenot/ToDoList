import { getAuth, signOut } from "firebase/auth";
export function signOutFromFB() {
  const auth = getAuth();
  signOut(auth);
}
