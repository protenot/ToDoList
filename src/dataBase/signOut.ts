import { getAuth, signOut } from "firebase/auth";
export function signOutFromFB() {
  const auth = getAuth();
  signOut(auth);
  /*   .then(() => {
      console.log( 'Sign-out successful')
    })
    .catch((error) => {
      // An error happened.
    }); */
}
