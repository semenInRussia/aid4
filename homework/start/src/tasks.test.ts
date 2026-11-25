import { describe, expect, it } from "vitest";
import {
    createTask,
    openCount,
    renameTask,
    seedTasks,
    visibleTasks,
} from "./tasks";

describe("базовая доска", () => {
    it("создаёт задачу и обрезает название", () => {
        const task = createTask(9, "  Купить хлеб  ");
        expect(task?.title).toBe("Купить хлеб");
    });

    it("фильтрует готовые задачи", () => {
        expect(visibleTasks(seedTasks, "done").map((task) => task.id)).toEqual([
            2,
        ]);
    });

    it("фильтрует готовые задачи", () => {});
});

describe("пустые названия задач", () => {
    it("сохраняет прежнее название при попытке переименовать задачу в пустую строку", () => {
        const task = createTask(9, "Сходить в зал")!;

        expect(renameTask([task], task.id, "")).toEqual([
            { id: 9, title: "Сходить в зал", done: false },
        ]);
    });

    it("скрывает задачи с пустыми и пробельными названиями", () => {
        const tasks = ["", "\t ", " ", "Buy milk"].map((title, index) => ({
            id: index + 1,
            title,
            done: false,
        }));

        expect(visibleTasks(tasks, "all").map((task) => task.title)).toEqual([
            "Buy milk",
        ]);
    });

    it("считает только открытые задачи с непустыми названиями", () => {
        const tasks = [
            "",
            "\t ",
            "Watching cinema You Can See Everything",
            " ",
            "Buy milk",
        ].map((title, index) => ({
            id: index + 1,
            title,
            done: false,
        }));

        expect(openCount(tasks)).toBe(2);
    });
});
