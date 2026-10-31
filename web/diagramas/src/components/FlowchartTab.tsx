import DiagramFrame from "@/components/DiagramFrame";

const CYAN = "#22d3ee";
const GREEN = "#34d399";
const ORANGE = "#fb923c";

type Node =
  | { kind: "terminal"; label: string }
  | { kind: "process"; label: string; sub?: string }
  | { kind: "decision"; label: string };

const NODES: Node[] = [
  { kind: "terminal", label: "INICIO" },
  { kind: "process", label: "Configurar entradas", sub: "pinMode D2, D3, D4 → INPUT" },
  { kind: "process", label: "Configurar salidas", sub: "pinMode D8, D9 → OUTPUT" },
  { kind: "process", label: "Inicializar Serial", sub: "Serial.begin(115200)" },
  { kind: "process", label: "Leer A, B y C", sub: "digitalRead D2, D3, D4" },
  { kind: "process", label: "Calcular F", sub: "F = (A && B) || ((!C) && (A || B))" },
  { kind: "process", label: "Escribir F en D8 y D9", sub: "digitalWrite D8, D9" },
  { kind: "process", label: "Mostrar A, B, C y F", sub: "Serial.print / println" },
  { kind: "process", label: "Esperar 500 ms", sub: "delay(500)" },
  { kind: "decision", label: "¿Repetir?" },
];

const NODE_W = 320;
const NODE_H = 60;
const GAP = 34;
const TOP = 40;
const CX = 400;

export default function FlowchartTab() {
  const positions = NODES.map((_, i) => {
    const h = NODES[i].kind === "decision" ? 90 : NODE_H;
    return { y: TOP + i * (NODE_H + GAP), h };
  });

  const totalHeight =
    positions[positions.length - 1].y + positions[positions.length - 1].h + 120;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
        <h2 className="font-serif text-lg text-white">Lógica del firmware</h2>
        <p className="mt-1 text-sm text-slate-400">
          El programa se ejecuta en un bucle continuo. La función lógica se
          conserva exactamente como fue validada y no se sustituye{" "}
          <span className="font-mono text-cyan-300">delay(500)</span> por{" "}
          <span className="font-mono text-slate-300">millis()</span>.
        </p>
        <div className="mt-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-4">
          <p className="font-mono text-sm text-cyan-300">
            F = (A &amp;&amp; B) || ((!C) &amp;&amp; (A || B))
          </p>
        </div>
      </div>

      <DiagramFrame
        title="Diagrama de flujo del programa"
        subtitle="Secuencia de ejecución del sketch de Arduino, desde la inicialización hasta el bucle de repetición."
        fileName="diagrama-flujo"
      >
        <svg viewBox={`0 0 800 ${totalHeight}`} className="h-auto w-full min-w-2xl">
          <defs>
            <marker
              id="flow-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" fill={CYAN} />
            </marker>
          </defs>

          {NODES.map((node, i) => {
            const { y, h } = positions[i];
            const x = CX - NODE_W / 2;
            const next = positions[i + 1];
            return (
              <g key={i}>
                {node.kind === "terminal" && (
                  <rect
                    x={x}
                    y={y}
                    width={NODE_W}
                    height={h}
                    rx={h / 2}
                    fill="#0f172a"
                    stroke={GREEN}
                    strokeWidth={1.6}
                  />
                )}
                {node.kind === "process" && (
                  <rect
                    x={x}
                    y={y}
                    width={NODE_W}
                    height={h}
                    rx={10}
                    fill="#0f172a"
                    stroke={CYAN}
                    strokeWidth={1.4}
                  />
                )}
                {node.kind === "decision" && (
                  <polygon
                    points={`${CX},${y} ${x + NODE_W},${y + h / 2} ${CX},${y + h} ${x},${y + h / 2}`}
                    fill="#0f172a"
                    stroke={ORANGE}
                    strokeWidth={1.6}
                  />
                )}

                <text
                  x={CX}
                  y={node.sub ? y + h / 2 - 6 : y + h / 2 + 5}
                  textAnchor="middle"
                  fill="#e2e8f0"
                  fontSize={14}
                  fontWeight={600}
                >
                  {node.label}
                </text>
                {node.sub && (
                  <text
                    x={CX}
                    y={y + h / 2 + 14}
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize={11}
                    fontFamily="monospace"
                  >
                    {node.sub}
                  </text>
                )}

                {next && (
                  <line
                    x1={CX}
                    y1={y + h}
                    x2={CX}
                    y2={next.y}
                    stroke={CYAN}
                    strokeWidth={1.6}
                    markerEnd="url(#flow-arrow)"
                  />
                )}
              </g>
            );
          })}

          {/* Retorno del bucle */}
          {(() => {
            const last = positions[positions.length - 1];
            const first = positions[0];
            const loopX = CX + NODE_W / 2 + 70;
            return (
              <g>
                <path
                  d={`M ${CX + NODE_W / 2} ${last.y + last.h / 2} H ${loopX} V ${first.y + first.h / 2} H ${CX + NODE_W / 2}`}
                  fill="none"
                  stroke={GREEN}
                  strokeWidth={1.6}
                  markerEnd="url(#flow-arrow)"
                />
                <text
                  x={loopX + 8}
                  y={(last.y + first.y) / 2}
                  fill={GREEN}
                  fontSize={11}
                  fontWeight={600}
                >
                  Sí · repetir
                </text>
              </g>
            );
          })()}
        </svg>
      </DiagramFrame>
    </div>
  );
}