import DiagramFrame from "@/components/DiagramFrame";

const CYAN = "#22d3ee";
const GREEN = "#34d399";
const ORANGE = "#fb923c";
const SLATE = "#94a3b8";
const LINE = "#475569";

function Block({
  x,
  y,
  w,
  h,
  title,
  sub,
  accent,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
  accent: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        fill="#0f172a"
        stroke={accent}
        strokeWidth={1.5}
      />
      <rect x={x} y={y} width={4} height={h} rx={2} fill={accent} />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 6 : y + h / 2 + 4}
        textAnchor="middle"
        fill="#e2e8f0"
        fontSize={14}
        fontWeight={600}
      >
        {title}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 14}
          textAnchor="middle"
          fill={SLATE}
          fontSize={11}
        >
          {sub}
        </text>
      )}
    </g>
  );
}

function Arrow({
  d,
  color,
  dashed,
  label,
  labelX,
  labelY,
}: {
  d: string;
  color: string;
  dashed?: boolean;
  label?: string;
  labelX?: number;
  labelY?: number;
}) {
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={1.6}
        strokeDasharray={dashed ? "5 4" : undefined}
        markerEnd={`url(#arrow-${color.replace("#", "")})`}
      />
      {label && labelX !== undefined && labelY !== undefined && (
        <text x={labelX} y={labelY} fill={color} fontSize={10} fontWeight={600}>
          {label}
        </text>
      )}
    </g>
  );
}

export default function ArchitectureTab() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <StatChip label="Entradas lógicas" value="D2 · D3 · D4" accent="cyan" />
        <StatChip label="Salidas" value="D8 · D9" accent="green" />
        <StatChip label="Función lógica" value="F = AB + ¬C(A+B)" accent="orange" />
      </div>

      <DiagramFrame
        title="Arquitectura del sistema"
        subtitle="Flujo de señales lógicas (cian) y de alimentación eléctrica (naranja). La tierra GND es común a Arduino y a la fuente externa."
        fileName="arquitectura-sistema"
      >
        <svg viewBox="0 0 1120 640" className="h-auto w-full min-w-3xl">
          <defs>
            <marker
              id="arrow-22d3ee"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" fill={CYAN} />
            </marker>
            <marker
              id="arrow-fb923c"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" fill={ORANGE} />
            </marker>
            <marker
              id="arrow-34d399"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" fill={GREEN} />
            </marker>
          </defs>

          {/* Detectores */}
          <Block x={40} y={70} w={180} h={64} title="Detector A" sub="SPDT → D2" accent={CYAN} />
          <Block x={40} y={170} w={180} h={64} title="Detector B" sub="SPDT → D3" accent={CYAN} />
          <Block x={40} y={270} w={180} h={64} title="Detector C" sub="SPDT → D4" accent={CYAN} />

          {/* Arduino */}
          <Block x={340} y={130} w={220} h={160} title="Arduino UNO" sub="Lectura D2/D3/D4" accent={CYAN} />

          {/* Función lógica */}
          <Block x={680} y={150} w={200} h={120} title="Evaluación de F" sub="F = AB + ¬C(A+B)" accent={ORANGE} />

          {/* Salidas */}
          <Block x={680} y={40} w={200} h={64} title="LED indicador" sub="D9 → 300 Ω" accent={GREEN} />
          <Block x={680} y={330} w={200} h={64} title="Transistor NPN" sub="D8 → 1 kΩ → base" accent={GREEN} />

          {/* Motor */}
          <Block x={920} y={330} w={160} h={64} title="Motor DC" sub="Carga externa" accent={ORANGE} />

          {/* Fuente */}
          <Block x={920} y={470} w={160} h={64} title="Fuente externa" sub="+5 V regulada" accent={ORANGE} />

          {/* Señales lógicas */}
          <Arrow d="M220 102 H 300 V 180 H 340" color={CYAN} label="A" labelX={250} labelY={96} />
          <Arrow d="M220 202 H 340" color={CYAN} label="B" labelX={270} labelY={196} />
          <Arrow d="M220 302 H 300 V 240 H 340" color={CYAN} label="C" labelX={250} labelY={316} />

          <Arrow d="M560 210 H 680" color={CYAN} label="A,B,C" labelX={600} labelY={202} />

          <Arrow d="M780 150 V 104" color={GREEN} label="F" labelX={790} labelY={132} />
          <Arrow d="M780 270 V 330" color={GREEN} label="F" labelX={790} labelY={304} />

          {/* Alimentación */}
          <Arrow d="M1000 470 V 394" color={ORANGE} label="+5 V" labelX={1008} labelY={430} />
          <Arrow d="M920 362 H 880" color={ORANGE} label="colector" labelX={884} labelY={354} />

          {/* GND común */}
          <path d="M450 290 V 560 H 1000 V 534" fill="none" stroke={LINE} strokeWidth={1.4} strokeDasharray="4 4" />
          <circle cx={450} cy={560} r={3.5} fill={LINE} />
          <circle cx={1000} cy={560} r={3.5} fill={LINE} />
          <text x={700} y={580} fill={SLATE} fontSize={11} textAnchor="middle">
            GND común (única referencia compartida)
          </text>
        </svg>
      </DiagramFrame>

      <div className="grid gap-4 md:grid-cols-2">
        <LegendCard
          title="Control lógico"
          color="cyan"
          items={[
            "Detectores A, B y C entregan niveles lógicos a D2, D3 y D4.",
            "El Arduino evalúa F = AB + ¬C(A+B) y la escribe en D8 y D9.",
            "D9 gobierna el LED; D8 gobierna la base del transistor NPN.",
          ]}
        />
        <LegendCard
          title="Alimentación eléctrica"
          color="orange"
          items={[
            "La fuente externa regulada de +5 V alimenta el motor DC.",
            "El transistor conmuta el retorno del motor hacia GND.",
            "El positivo de la fuente externa no se une al +5 V del Arduino.",
          ]}
        />
      </div>
    </div>
  );
}

function StatChip({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: "cyan" | "green" | "orange";
}) {
  const map = {
    cyan: "border-cyan-500/30 bg-cyan-500/5 text-cyan-300",
    green: "border-emerald-500/30 bg-emerald-500/5 text-emerald-300",
    orange: "border-orange-500/30 bg-orange-500/5 text-orange-300",
  } as const;
  return (
    <div className={`rounded-xl border px-4 py-3 ${map[accent]}`}>
      <p className="text-xs uppercase tracking-wider opacity-80">{label}</p>
      <p className="mt-1 font-mono text-sm font-semibold">{value}</p>
    </div>
  );
}

function LegendCard({
  title,
  color,
  items,
}: {
  title: string;
  color: "cyan" | "orange";
  items: string[];
}) {
  const dot = color === "cyan" ? "bg-cyan-400" : "bg-orange-400";
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="mb-3 flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />
        <h3 className="text-sm font-semibold text-slate-200">{title}</h3>
      </div>
      <ul className="space-y-2 text-sm text-slate-400">
        {items.map((it) => (
          <li key={it} className="flex gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-600" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}