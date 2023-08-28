import { get, ref, child, push, update, remove } from "firebase/database";
import { database } from "../dataBase/firebase";
// при клике на кнопку добавляем задачу в базу данных и извлекаем из базы данных все содержимое в контейнер
