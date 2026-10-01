import { expect, test, type Page } from "@playwright/test";
import { lessonPath } from "../src/lib/course";

const LATEST_HREF = lessonPath("C1-D1-O1-L1");
const LATEST_TITLE = "Laptop serviceability, batteries, and keyboards";
const FIRST_HREF = "/course/foundation/what-a-plus-is";

test.describe.configure({ timeout: 90_000 });

async function readStore(page: Page, store: "progress" | "quizzes") {
  return page.evaluate(async (storeName) => {
    const found = (await indexedDB.databases()).some((db) => db.name === "aplus-academy");
    if (!found) return null;
    return new Promise<unknown>((resolve, reject) => {
      const open = indexedDB.open("aplus-academy");
      open.onerror = () => reject(open.error ?? new Error("open failed"));
      open.onsuccess = () => {
        const db = open.result;
        try {
          if (!db.objectStoreNames.contains(storeName)) {
            db.close();
            resolve(null);
            return;
          }
          const tx = db.transaction(storeName, "readonly");
          const req = tx.objectStore(storeName).getAll();
          req.onsuccess = () => {
            db.close();
            resolve(req.result);
          };
          req.onerror = () => {
            db.close();
            reject(req.error ?? new Error("read failed"));
          };
        } catch (error) {
          db.close();
          reject(error);
        }
      };
    });
  }, store);
}

/** Wait until Dexie has created the academy database, then write profile + progress. */
async function seedOpening(
  page: Page,
  progress: Record<string, unknown>,
  options?: { quiz?: boolean },
) {
  await page.goto("/onboarding");
  await expect(page.getByRole("heading", { name: "Welcome" })).toBeVisible();
  // Do not open the database here. An early open would create an empty
  // version and block Dexie from installing its stores.
  await expect
    .poll(
      async () =>
        page.evaluate(async () => {
          const found = (await indexedDB.databases()).some((db) => db.name === "aplus-academy");
          return found;
        }),
      { timeout: 60_000 },
    )
    .toBe(true);

  await page.evaluate(
    async ({ progress: patch, quiz }) => {
      await new Promise<void>((resolve, reject) => {
        let settled = false;
        const finish = (error?: unknown) => {
          if (settled) return;
          settled = true;
          if (error) reject(error);
          else resolve();
        };
        const open = indexedDB.open("aplus-academy");
        open.onerror = () => finish(open.error ?? new Error("open failed"));
        open.onblocked = () => finish(new Error("database blocked"));
        open.onsuccess = () => {
          const db = open.result;
          try {
            const tx = db.transaction(["profiles", "progress", "quizzes"], "readwrite");
            tx.objectStore("profiles").put({
              id: "local",
              displayName: "Avery",
              experience: "new",
              createdAt: Date.now(),
              onboardingComplete: true,
              diagnosticOffered: true,
              diagnosticComplete: false,
            });
            const get = tx.objectStore("progress").get("local");
            get.onerror = () => finish(get.error ?? new Error("progress read failed"));
            get.onsuccess = () => {
              try {
                tx.objectStore("progress").put({
                  ...(get.result ?? {}),
                  ...patch,
                  id: "local",
                  updatedAt: Date.now(),
                });
                if (quiz) {
                  tx.objectStore("quizzes").put({
                    id: "quiz-seed",
                    kind: "domain",
                    targetId: "C1-D1",
                    score: 1,
                    total: 1,
                    passed: true,
                    missedConceptIds: [],
                    questionIds: ["q"],
                    at: Date.now(),
                  });
                }
              } catch (error) {
                finish(error);
              }
            };
            tx.oncomplete = () => {
              db.close();
              finish();
            };
            tx.onabort = () => {
              db.close();
              finish(tx.error ?? new Error("write aborted"));
            };
          } catch (error) {
            db.close();
            finish(error);
          }
        };
      });
    },
    { progress, quiz: Boolean(options?.quiz) },
  );

  await page.goto("/start");
  await expect(page.getByRole("heading", { level: 1, name: /Start here, Avery/ })).toBeVisible();
  // Re-apply after the opening page records its own visit, then reload so the hero reads the settled row.
  await page.evaluate(
    async ({ progress: patch, quiz }) => {
      await new Promise<void>((resolve, reject) => {
        let settled = false;
        const finish = (error?: unknown) => {
          if (settled) return;
          settled = true;
          if (error) reject(error);
          else resolve();
        };
        const open = indexedDB.open("aplus-academy");
        open.onerror = () => finish(open.error ?? new Error("open failed"));
        open.onsuccess = () => {
          const db = open.result;
          try {
            const tx = db.transaction(["progress", "quizzes"], "readwrite");
            const get = tx.objectStore("progress").get("local");
            get.onsuccess = () => {
              tx.objectStore("progress").put({
                ...(get.result ?? {}),
                ...patch,
                id: "local",
                updatedAt: Date.now(),
              });
              if (quiz) {
                tx.objectStore("quizzes").put({
                  id: "quiz-seed",
                  kind: "domain",
                  targetId: "C1-D1",
                  score: 1,
                  total: 1,
                  passed: true,
                  missedConceptIds: [],
                  questionIds: ["q"],
                  at: Date.now(),
                });
              }
            };
            tx.oncomplete = () => {
              db.close();
              finish();
            };
            tx.onabort = () => {
              db.close();
              finish(tx.error ?? new Error("write aborted"));
            };
          } catch (error) {
            db.close();
            finish(error);
          }
        };
      });
    },
    { progress, quiz: Boolean(options?.quiz) },
  );
  await page.reload();
  await expect(page.getByRole("heading", { level: 1, name: /Start here, Avery/ })).toBeVisible();
}

test("new learner can begin lesson 1 from the opening hero", async ({ page }) => {
  await seedOpening(page, {
    currentLocation: "/start",
    lastContentHref: null,
    completedBlocks: [],
    completedLessons: [],
    completedObjectives: [],
    completedDomains: [],
    completedLabs: [],
    lastStudyDay: null,
  });
  const hero = page.getByRole("region", { name: "Foundation lesson 1" });
  await expect(hero).toBeVisible();
  await expect(hero).toContainText("What CompTIA A+ actually certifies");
  await expect(hero).toContainText("What CompTIA A+ is, and is not");
  await expect(hero).not.toContainText("—");
  await expect(hero.getByRole("link", { name: /Start over from Foundation lesson 1/ })).toHaveAttribute(
    "href",
    FIRST_HREF,
  );
  const begin = hero.getByRole("link", { name: "Begin first lesson" });
  await begin.focus();
  await expect(begin).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(new RegExp(`${FIRST_HREF}$`));
  await expect(page.getByRole("heading", { name: "What CompTIA A+ actually certifies" })).toBeVisible();
});

test("returning learner continues the saved lesson or confirms start over", async ({ page }) => {
  await seedOpening(
    page,
    {
      currentLocation: "/start",
      lastContentHref: LATEST_HREF,
      completedBlocks: [],
      completedLessons: ["FND-D0-O1-L1"],
      completedObjectives: [],
      completedDomains: [],
      completedLabs: [],
      lastStudyDay: "2026-09-30",
    },
    { quiz: true },
  );
  const hero = page.getByRole("region", { name: LATEST_TITLE });
  await expect(hero.getByText("Latest", { exact: true })).toBeVisible();
  await expect(hero).toContainText("Laptop and mobile hardware replacement");
  const continueLink = hero.getByRole("link", { name: new RegExp(LATEST_TITLE) });
  await continueLink.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(new RegExp(`${LATEST_HREF}$`));
  await expect(page.getByRole("heading", { name: LATEST_TITLE })).toBeVisible();

  await page.goto("/start");
  const again = page.getByRole("region", { name: LATEST_TITLE });
  const startOver = again.getByRole("button", { name: /Start over from Foundation lesson 1/ });
  await startOver.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "Start over?" });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(page).toHaveURL(/\/start$/);

  await startOver.click();
  await dialog.getByRole("button", { name: "Cancel" }).click();
  await expect(dialog).toBeHidden();

  await startOver.click();
  await dialog.getByRole("button", { name: "Clear progress and start over" }).click();
  await expect(page).toHaveURL(new RegExp(`${FIRST_HREF}$`));
  await expect(page.getByRole("heading", { name: "What CompTIA A+ actually certifies" })).toBeVisible();

  await expect
    .poll(async () => {
      const rows = (await readStore(page, "progress")) as { completedLessons?: string[] }[] | null;
      const quizzes = (await readStore(page, "quizzes")) as unknown[] | null;
      return {
        lessons: rows?.[0]?.completedLessons ?? null,
        quizzes: quizzes?.length ?? -1,
      };
    })
    .toEqual({ lessons: [], quizzes: 0 });
});

test("hero actions stay tappable on a phone", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await seedOpening(page, {
    currentLocation: "/start",
    lastContentHref: LATEST_HREF,
    completedLessons: ["FND-D0-O1-L1"],
    lastStudyDay: "2026-09-30",
  });
  const hero = page.getByRole("region", { name: LATEST_TITLE });
  const continueLink = hero.getByRole("link", { name: /Continue latest lesson/ });
  const startOver = hero.getByRole("button", { name: /Start over/ });
  await expect(continueLink).toBeVisible();
  await expect(startOver).toBeVisible();
  const primary = await continueLink.boundingBox();
  const secondary = await startOver.boundingBox();
  expect(primary).not.toBeNull();
  expect(secondary).not.toBeNull();
  expect(primary!.width).toBeGreaterThan(280);
  expect(secondary!.width).toBeGreaterThan(280);
  expect(secondary!.y).toBeGreaterThan(primary!.y + primary!.height - 4);
});
