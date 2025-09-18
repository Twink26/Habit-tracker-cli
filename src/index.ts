import { Habit, HabitStatus } from "./models/Habit";
import * as fs from "fs";

const HABITS_FILE = "habits.json";


function loadHabits(): Habit[] {
  if (!fs.existsSync(HABITS_FILE)) {
    return [];
  }
  const data = fs.readFileSync(HABITS_FILE, "utf-8");
  return JSON.parse(data) as Habit[];
}


function saveHabits(habits: Habit[]) {
  fs.writeFileSync(HABITS_FILE, JSON.stringify(habits, null, 2));
}


function addHabit(name: string) {
  const habits = loadHabits();
  const newHabit: Habit = {
    id: Date.now(),
    name,
    status: HabitStatus.Pending,
    createdAt: new Date()
  };
  habits.push(newHabit);
  saveHabits(habits);
  console.log(` Habit added: "${name}"`);
}


function listHabits() {
  const habits = loadHabits();
  if (habits.length === 0) {
    console.log("📭 No habits found. Add one with: npm start add \"Habit Name\"");
    return;
  }

  console.log("\n📋 Your Habits:");
  habits.forEach((habit, index) => {
    const status = habit.status === HabitStatus.Done ? "✅" : "⏳";
    console.log(`${index + 1}. ${habit.name} [${status}]`);
  });
  console.log("");
}


function markHabitDone(id: number) {
  const habits = loadHabits();
  const habit = habits.find(h => h.id === id);

  if (!habit) {
    console.log(` No habit found with ID: ${id}`);
    return;
  }

  habit.status = HabitStatus.Done;
  saveHabits(habits);
  console.log(` Habit marked as done: "${habit.name}"`);
}

const command = process.argv[2];
const argument = process.argv[3];

if (command === "add" && argument) {
  addHabit(argument);
} else if (command === "list") {
  listHabits();
} else if (command === "done" && argument) {
  markHabitDone(Number(argument));
} else {
  console.log("Usage:");
  console.log('  npm start add "Habit Name"   → Add a new habit');
  console.log("  npm start list               → Show all habits");
  console.log("  npm start done <HabitID>     → Mark a habit as done");
}

