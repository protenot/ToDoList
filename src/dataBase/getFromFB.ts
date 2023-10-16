import { getDatabase, ref, get, child } from "firebase/database";
export function getFromFB() {
  const db = getDatabase();
  const tasksRef = ref(db);
  get(child(tasksRef, "tasks/")).then((snapshot) => {
    if (snapshot.exists()) {
      console.log("DB " + JSON.stringify(snapshot.val()));
    }
  });
}
