import Papa from "papaparse";
import type { PromptRow } from "./types";

const SHEET_ID = "1rUC3L1xwp1rIpLSDxj9Yulb6r9Fvg07SXtVki7EDDMQ";
const SHEET_GID = "609387363";
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`;

export async function fetchPrompts(): Promise<PromptRow[]> {
  try {
    const res = await fetch(CSV_URL, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const csv = await res.text();
    const parsed = Papa.parse<Record<string, string>>(csv, {
      header: true,
      skipEmptyLines: "greedy",
    });
    const data = parsed.data ?? [];

    const rows: PromptRow[] = [];

    for (const r of data) {
      const 장 = r["장"]?.trim() ?? "";
      const 번호 = r["번호"]?.trim() ?? "";
      const 제목 = r["제목"]?.trim() ?? "";
      const 순서 = r["순서"]?.trim() ?? "";
      const 프롬프트 = r["프롬프트"]?.trim() ?? "";

      if (!프롬프트) continue;
      if (!장 || !번호 || !제목) continue;

      const orderNum = Number.parseInt(순서.replace(/[^\d]/g, ""), 10);
      rows.push({
        id: rows.length,
        chapter: 장,
        number: 번호,
        title: 제목,
        order: Number.isFinite(orderNum) ? orderNum : 0,
        prompt: 프롬프트,
      });
    }

    return rows;
  } catch {
    return [];
  }
}
