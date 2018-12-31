import User from "classes/User";
import ITask from "./interfaces/Tasks";
import readBase32Image from "./io/readBase32Image";
import readUsers from "./io/readUsers";
import getTasks from "./utils/getTasks";

const users = readUsers("../data/users.json");
const image = readBase32Image("../data/test.32");
console.log(image);
let tasks: ITask[] = [];

async function updateTasks() {
  return await getTasks(image, [712, 73]);
}

function getTime() {
  return new Date().valueOf();
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function paint() {
  while (1) {
    if (tasks.length === 0) {
      await sleep(1000);
      tasks = await updateTasks();
      console.log(tasks);
    }
    if (getTime() - users[0].lastPaintTime <= 30 * 1000) {
      await sleep(30 * 1000 - (getTime() - users[0].lastPaintTime));
    }
    users[0].lastPaintTime = getTime();
    users[0].paint(tasks[0]);
    users.push(users.shift() as User);
    tasks.shift();
  }
}

paint().then(
  (res) => {
    console.log("finish");
  },
  (err) => {
    console.error(err);
  },
);
