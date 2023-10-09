import { Status } from "../ToDoTasks/TypesToDo";
import { firebaseConfig } from "./firebase";
import { writeTaskInFB } from "./writeInFB";
import firebase from "firebase/app";
import * as firebaseAdmin from "firebase-admin";
import { mockFirebase } from "firebase-mock";

import "firebase/database";
const mockDatabase = new mockFirebase.MockFirebase();
const mockAuth = new mockFirebase.MockAuthentication();
jest.mock("firebase-admin", () => ({
  initializeApp: jest.fn(),
  getDatabase: jest.fn(() => mockDatabase),
}));

/*   jest.mock('firebase', () => ({
    ...jest.requireActual('firebase'), // Мокируйте все методы Firebase, которые вы используете
    auth: jest.fn(() => mockAuth), // Мок для firebase.auth()
  })); */

const data = {
  id: 3,
  date: "14.02.1969",
  content: "Купить слона",
  status: Status.done,
};

const snapshot = {
  val: () => data,
  exportVal: () => data,
  exists: jest.fn(() => true),
};

describe("firebase", () => {
  it("creates a task", async () => {
    const result = writeTaskInFB(data);
    await expect(result).resolves.toEqual(true);
  });
});
