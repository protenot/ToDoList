export async function authWithEmailAndPassword(
  email: string,
  password: string,
) {
  const apiKey = "AIzaSyBnwkbfufeUO7ld1W2Fn06xBy_F1pleK5A";
  const requestOptions: RequestInit & { returnSecureToken: boolean } = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    returnSecureToken: true,
  };

  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((data) => data.idToken);
}
