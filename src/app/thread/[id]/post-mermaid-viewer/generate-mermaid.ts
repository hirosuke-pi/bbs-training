export type PostMermaidProps = {
  title: string;
  totalPosts: number;
  createdAt: string;
  posts: {
    id: number;
    index: number;
    content: string;
    createdAt: string;
    username: string;
    anonId: string;
  }[];
};

// --------------------------------------------------
// ラベル生成ユーティリティ
// --------------------------------------------------
function escapeHtml(s: string): string {
  return s.replace(/`/g, "'").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// スレッドタイトル用（インデックスバッジ不要）
function buildTitleLabel(title: string): string {
  const cleaned = escapeHtml(title || "");
  const lines = cleaned
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean);
  return `<div style="text-align:left;white-space:normal;display:block">${lines.join(
    "<br/>"
  )}</div>`;
}

// 投稿ノード用: 先頭にインデックスバッジ、その後にコンテンツ複数行
function buildNodeLabel(index: number, content: string): string {
  const cleaned = escapeHtml(content || "");
  const rawLines = cleaned
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean);
  // 将来的な行数/文字数制御はここで実施可能
  // const lines = rawLines.slice(0, 10).map(l => l.length > 120 ? l.slice(0,117)+"…" : l)
  const lines = rawLines; // 現状はそのまま
  const badge = `<span style=\"display:inline-block;background:#455a64;color:#fff;font-size:15px;padding:2px 6px;border-radius:12px;font-weight:600;margin:0 0 4px 0;line-height:1;\">#${index}</span>`;
  const body = lines.length ? lines.join("<br/>") : "";
  return `<div style="text-align:left;white-space:normal;display:block;cursor:pointer" id="post-node-${index}">${badge}${
    body ? "<br/>" + body : ""
  }</div>`;
}

// 引用パターン: >>123 / >>1
const QUOTE_REGEX = />>([0-9]{1,6})/g;

export function generateMermaid(
  props: PostMermaidProps | undefined,
  isDisplayAll: boolean = true
): string {
  if (!props) return "";

  const { posts, title } = props;
  if (!posts || posts.length === 0) return "flowchart TB\nEmpty((No Posts))";

  // index -> post content map
  const postMap = new Map<number, string>();
  posts.forEach((p) => postMap.set(p.index, p.content));

  type Edge = { from: number; to: number };
  const edges: Edge[] = [];

  // 各ポストの引用を抽出
  for (const p of posts) {
    const seenTargets = new Set<number>();
    let match: RegExpExecArray | null;
    QUOTE_REGEX.lastIndex = 0;
    while ((match = QUOTE_REGEX.exec(p.content)) !== null) {
      const target = Number(match[1]);
      if (
        target >= 1 &&
        target !== p.index &&
        postMap.has(target) &&
        !seenTargets.has(target)
      ) {
        edges.push({ from: p.index, to: target });
        seenTargets.add(target);
      }
    }
  }

  // ノードセット
  const nodeSet = new Set<number>();
  edges.forEach((e) => {
    nodeSet.add(e.from);
    nodeSet.add(e.to);
  });

  // 引用が全くない場合: 直近N件を「単独ノード」として独立表示（線で繋がない）
  if (edges.length === 0) {
    const recent = posts.slice(-Math.min(posts.length, 30));
    const lines = [
      "flowchart TB",
      `subgraph Thread[${buildTitleLabel(title)}]`,
    ];
    if (isDisplayAll) {
      for (const p of recent) {
        const full = p.content || "";
        const nodeLabel = buildNodeLabel(p.index, full || `#${p.index}`);
        lines.push(`${p.index}(${nodeLabel}):::solo`);
      }
    } else {
      lines.push("NoIsolated((No reply relations))");
    }
    lines.push("end");
    if (isDisplayAll) {
      lines.push(
        "classDef solo fill:#f1f8e9,stroke:#7cb342,color:#33691e9,stroke-width:1px;".replace(
          "e9,stroke-width",
          "e,stroke-width"
        )
      );
    }
    return lines.join("\n");
  }

  // ノードラベル: index + 先頭行
  const nodeLines: string[] = [];
  nodeSet.forEach((idx) => {
    const raw = postMap.get(idx) || "";
    const nodeLabel = buildNodeLabel(idx, raw || `#${idx}`);
    nodeLines.push(`${idx}(${nodeLabel})`);
  });

  // エッジ集合を文字列化（重複除去）
  const edgeSet = new Set<string>();
  edges.forEach((e) => edgeSet.add(`${e.from}-->${e.to}`));

  // 参照が多すぎる場合（>80辺）は上位頻出ノードだけに絞る簡易フィルタ
  if (edgeSet.size > 80) {
    const freq = new Map<number, number>();
    edges.forEach((e) => {
      freq.set(e.from, (freq.get(e.from) || 0) + 1);
      freq.set(e.to, (freq.get(e.to) || 0) + 1);
    });
    const top = [...freq.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 40)
      .map((x) => x[0]);
    const topSet = new Set(top);
    const filteredEdges = [...edgeSet].filter((edge) => {
      const [from, to] = edge.split("-->").map(Number);
      return topSet.has(from) && topSet.has(to);
    });
    edgeSet.clear();
    filteredEdges.forEach((e) => edgeSet.add(e));
  }

  // 孤立ノード（引用関係に一切現れない投稿）
  const referenced = new Set<number>(nodeSet);
  const isolatedNodes: string[] = [];
  if (isDisplayAll) {
    posts.forEach((p) => {
      if (!referenced.has(p.index)) {
        const nodeLabel = buildNodeLabel(p.index, p.content || `#${p.index}`);
        isolatedNodes.push(`${p.index}(${nodeLabel}):::solo`);
      }
    });
  }

  const lines: string[] = [
    "flowchart TB",
    `subgraph Thread[${buildTitleLabel(title)}]`,
    ...[...edgeSet],
    ...nodeLines,
    ...(isDisplayAll ? isolatedNodes : []),
    "end",
    "classDef default fill:#ffffff,stroke:#90a4ae,color:#37474f,stroke-width:1px;",
    ...(isDisplayAll
      ? [
          "classDef solo fill:#f1f8e9,stroke:#7cb342,color:#33691e,stroke-width:1px;",
        ]
      : []),
  ];

  return lines.join("\n");
}
