/**
 * 自定义牌阵：类型定义与 localStorage 读写
 */

export interface CustomSpreadPosition {
  index: number;
  meaning?: string;
  deckSlug: string;
  subDeckId?: string;
  x: number;
  y: number;
}

export interface CustomSpread {
  id: string;
  name: string;
  createdAt: number;
  positions: CustomSpreadPosition[];
  /** 卡牌显示比例，如 1、1.2、1.5、2 */
  cardScale?: number;
}

/** 画布 + 抽卡结果快照（用于「保存画布及抽到的卡牌」） */
export interface CustomSpreadSnapshot {
  spreadId: string;
  savedAt: number;
  positions: { index: number; x: number; y: number; imageUrl?: string }[];
}

const STORAGE_KEY_SPREADS = "oh-custom-spreads";
const STORAGE_KEY_SNAPSHOT_PREFIX = "oh-custom-snapshot-";

function genId(): string {
  return `custom-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

export function getCustomSpreads(): CustomSpread[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SPREADS);
    if (!raw) return [];
    const list = JSON.parse(raw) as CustomSpread[];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function saveCustomSpread(spread: CustomSpread): void {
  const list = getCustomSpreads();
  const idx = list.findIndex((s) => s.id === spread.id);
  if (idx >= 0) list[idx] = spread;
  else list.push(spread);
  localStorage.setItem(STORAGE_KEY_SPREADS, JSON.stringify(list));
}

export function getCustomSpread(id: string): CustomSpread | null {
  return getCustomSpreads().find((s) => s.id === id) ?? null;
}

export function deleteCustomSpread(id: string): void {
  const list = getCustomSpreads().filter((s) => s.id !== id);
  localStorage.setItem(STORAGE_KEY_SPREADS, JSON.stringify(list));
  localStorage.removeItem(STORAGE_KEY_SNAPSHOT_PREFIX + id);
}

export function createNewCustomSpread(name: string, positionCount: number): CustomSpread {
  const id = genId();
  const positions: CustomSpreadPosition[] = Array.from({ length: positionCount }, (_, i) => ({
    index: i,
    meaning: `位置 ${i + 1}`,
    deckSlug: "classic",
    subDeckId: "img",
    x: 120 + (i % 4) * 120,
    y: 100 + Math.floor(i / 4) * 160,
  }));
  return { id, name, createdAt: Date.now(), positions, cardScale: 1 };
}

export function getSnapshot(spreadId: string): CustomSpreadSnapshot | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SNAPSHOT_PREFIX + spreadId);
    if (!raw) return null;
    return JSON.parse(raw) as CustomSpreadSnapshot;
  } catch {
    return null;
  }
}

export function saveSnapshot(snapshot: CustomSpreadSnapshot): void {
  localStorage.setItem(
    STORAGE_KEY_SNAPSHOT_PREFIX + snapshot.spreadId,
    JSON.stringify(snapshot)
  );
}

/** 导出为可下载的代码文件内容（JSON，便于导入恢复） */
export function exportSpreadToCode(spread: CustomSpread): string {
  return JSON.stringify(spread, null, 2);
}

/** 从导出的代码/JSON 解析并导入牌阵（会生成新 id 并保存到本地） */
export function importSpreadFromCode(json: string): CustomSpread | null {
  try {
    const data = JSON.parse(json) as unknown;
    if (!data || typeof data !== "object" || !Array.isArray((data as CustomSpread).positions))
      return null;
    const parsed = data as Omit<CustomSpread, "id" | "createdAt"> & { id?: string; createdAt?: number };
    const spread: CustomSpread = {
      id: genId(),
      name: parsed.name ?? "导入的牌阵",
      createdAt: Date.now(),
      cardScale: typeof (parsed as CustomSpread).cardScale === "number" ? (parsed as CustomSpread).cardScale : 1,
      positions: (parsed.positions ?? []).map((p: CustomSpreadPosition, i: number) => ({
        index: i,
        meaning: p.meaning ?? `位置 ${i + 1}`,
        deckSlug: p.deckSlug ?? "classic",
        subDeckId: p.subDeckId,
        x: typeof p.x === "number" ? p.x : 120 + (i % 4) * 120,
        y: typeof p.y === "number" ? p.y : 100 + Math.floor(i / 4) * 160,
      })),
    };
    saveCustomSpread(spread);
    return spread;
  } catch {
    return null;
  }
}
