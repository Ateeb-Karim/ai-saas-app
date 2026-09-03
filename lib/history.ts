import { HistoryEntry } from "@/types/types";

export function getHistory(): HistoryEntry[] {
  const raw = localStorage.getItem("history");
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return parsed as HistoryEntry[];
  } catch (error) {
    console.error("Failed to parse history", error);
    return [];
  }
}

export function setHistory(entry: HistoryEntry) {
  const current = getHistory();
  const updated = [entry, ...current];
  localStorage.setItem("history", JSON.stringify(updated));
}

export function deleteHistory(id: string) {
  const current = getHistory();
  const filtered = current.filter((item) => item.id !== id);
  localStorage.setItem("history", JSON.stringify(filtered));
}

export function clearHistory() {
  localStorage.removeItem("history");
}
