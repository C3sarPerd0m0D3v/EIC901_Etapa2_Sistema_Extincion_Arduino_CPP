import DiagramFrame from "@/components/DiagramFrame";

const WIRE = "#94a3b8";
const RED = "#f87171";
const CYAN = "#22d3ee";
const ORANGE = "#fb923c";
const GREEN = "#34d399";

export default function SchematicTab() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-orange-500/25 bg-orange-500/5 p-5">
        <h2 className="font-serif text-lg text-white">Notas de exactitud</h2>
        <ul className="mt-2 space-y-1 text-sm text-slate-300">
          <li>
            · El transistor simulado en Tinkercad es un{" "}
            <span className="text-orange-300">NPN BJT genérico</span>; no se
            afirma que sea exactamente un 2N2222.
          </li>
          <li>
            · El diodo es un{" "}
            <span className="text-orange-300">rectificador genérico</span>. La
            familia 1N400x se menciona solo como referencia.
          </li>
          <li>
            · El positivo de la fuente externa y el +5 V del Arduino{" "}
            <span className="text-orange-300">no se unen</span>; solo se comparte
            la tierra GND.
          </li>
        </ul>
      </div>

      <DiagramFrame
        title="Esquema eléctrico"
        subtitle="Conexiones reales del prototipo. Los puntos de unión indican conexiones eléctricas efectivas."
        fileName="esquema-electrico"
      >
        <svg viewBox="0 0 1120 720" className="h-auto w-full min-w-3xl">
          {/* Arduino board */}
          <rect x={60} y={120} width={220} height={480} rx={14} fill="#0f172a" stroke={CYAN} strokeWidth={1.6} />
          <text x={170} y={150} textAnchor="middle" fill="#e2e8f0" fontSize={14} fontWeight={700}>
            Arduino UNO R3
          </text>
          <line x1={80} y1={162} x2={260} y2={162} stroke="#1e293b" strokeWidth={1} />

          {[
            { y: 210, label: "D2" },
            { y: 260, label: "D3" },
            { y: 310, label: "D4" },
            { y: 400, label: "D8" },
            { y: 460, label: "D9" },
            { y: 540, label: "GND" },
          ].map((p) => (
            <g key={p.label}>
              <circle cx={280} cy={p.y} r={4} fill={CYAN} />
              <text x={268} y={p.y + 4} textAnchor="end" fill="#cbd5e1" fontSize={12} fontFamily="monospace">
                {p.label}
              </text>
            </g>
          ))}

          {/* SPDT switches A, B, C */}
          {[
            { y: 210, name: "A" },
            { y: 260, name: "B" },
            { y: 310, name: "C" },
          ].map((sw) => (
            <g key={sw.name}>
              <line x1={280} y1={sw.y} x2={420} y2={sw.y} stroke={WIRE} strokeWidth={1.6} />
              <circle cx={280} cy={sw.y} r={3.5} fill={WIRE} />
              <text x={350} y={sw.y - 8} textAnchor="middle" fill="#cbd5e1" fontSize={11}>
                COM
              </text>

              {/* SPDT symbol */}
              <circle cx={430} cy={sw.y} r={4} fill={WIRE} />
              <line x1={430} y1={sw.y} x2={470} y2={sw.y - 22} stroke={WIRE} strokeWidth={1.6} />
              <circle cx={480} cy={sw.y - 30} r={4} fill={WIRE} />
              <circle cx={480} cy={sw.y + 30} r={4} fill={WIRE} />
              <text x={500} y={sw.y - 26} fill={RED} fontSize={11} fontFamily="monospace">
                +5 V
              </text>
              <text x={500} y={sw.y + 34} fill={WIRE} fontSize={11} fontFamily="monospace">
                GND
              </text>
              <text x={430} y={sw.y + 46} textAnchor="middle" fill="#94a3b8" fontSize={11}>
                SPDT {sw.name}
              </text>
            </g>
          ))}

          {/* +5V rail for switches */}
          <line x1={480} y1={180} x2={480} y2={280} stroke={RED} strokeWidth={1.6} />
          <circle cx={480} cy={210} r={3.5} fill={RED} />
          <circle cx={480} cy={260} r={3.5} fill={RED} />
          <text x={480} y={168} textAnchor="middle" fill={RED} fontSize={11} fontFamily="monospace">
            +5 V lógico
          </text>

          {/* GND rail for switches */}
          <line x1={480} y1={340} x2={480} y2={420} stroke={WIRE} strokeWidth={1.6} />
          <circle cx={480} cy={340} r={3.5} fill={WIRE} />
          <circle cx={480} cy={370} r={3.5} fill={WIRE} />
          <text x={480} y={440} textAnchor="middle" fill={WIRE} fontSize={11} fontFamily="monospace">
            GND
          </text>

          {/* LED branch from D9 */}
          <line x1={280} y1={460} x2={620} y2={460} stroke={GREEN} strokeWidth={1.6} />
          <circle cx={280} cy={460} r={3.5} fill={GREEN} />
          {/* resistor 300 */}
          <rect x={620} y={450} width={70} height={20} rx={3} fill="#0f172a" stroke={GREEN} strokeWidth={1.4} />
          <text x={655} y={444} textAnchor="middle" fill={GREEN} fontSize={11} fontFamily="monospace">
            300 Ω
          </text>
          <line x1={690} y1={460} x2={780} y2={460} stroke={GREEN} strokeWidth={1.6} />

          {/* LED symbol */}
          <polygon points="780,446 780,474 806,460" fill="none" stroke={RED} strokeWidth={1.6} />
          <line x1={806} y1={446} x2={806} y2={474} stroke={RED} strokeWidth={1.6} />
          <line x1={812} y1={440} x2={828} y2={424} stroke={RED} strokeWidth={1.4} />
          <line x1={820} y1={448} x2={836} y2={432} stroke={RED} strokeWidth={1.4} />
          <text x={793} y={492} textAnchor="middle" fill={RED} fontSize={11}>
            LED rojo
          </text>
          <text x={772} y={440} textAnchor="end" fill="#94a3b8" fontSize={10}>
            ánodo
          </text>
          <text x={814} y={492} fill="#94a3b8" fontSize={10}>
            cátodo
          </text>

          {/* LED cathode to GND */}
          <line x1={806} y1={460} x2={860} y2={460} stroke={WIRE} strokeWidth={1.6} />
          <line x1={860} y1={460} x2={860} y2={660} stroke={WIRE} strokeWidth={1.6} />
          <circle cx={860} cy={660} r={3.5} fill={WIRE} />

          {/* Transistor branch from D8 */}
          <line x1={280} y1={400} x2={620} y2={400} stroke={GREEN} strokeWidth={1.6} />
          <circle cx={280} cy={400} r={3.5} fill={GREEN} />
          <rect x={620} y={390} width={70} height={20} rx={3} fill="#0f172a" stroke={GREEN} strokeWidth={1.4} />
          <text x={655} y={384} textAnchor="middle" fill={GREEN} fontSize={11} fontFamily="monospace">
            1 kΩ
          </text>
          <line x1={690} y1={400} x2={780} y2={400} stroke={GREEN} strokeWidth={1.6} />

          {/* NPN transistor symbol */}
          <g>
            <line x1={780} y1={400} x2={820} y2={400} stroke={GREEN} strokeWidth={1.6} />
            <line x1={820} y1={360} x2={820} y2={440} stroke={WIRE} strokeWidth={2.4} />
            <line x1={820} y1={400} x2={860} y2={370} stroke={WIRE} strokeWidth={1.6} />
            <line x1={820} y1={400} x2={860} y2={430} stroke={WIRE} strokeWidth={1.6} />
            <polygon points="852,428 862,432 858,422" fill={WIRE} />
            <text x={800} y={392} textAnchor="end" fill="#94a3b8" fontSize={10}>
              base B
            </text>
            <text x={868} y={364} fill="#94a3b8" fontSize={10}>
              colector C
            </text>
            <text x={868} y={438} fill="#94a3b8" fontSize={10}>
              emisor E
            </text>
          </g>

          {/* Emitter to GND */}
          <line x1={860} y1={430} x2={900} y2={430} stroke={WIRE} strokeWidth={1.6} />
          <line x1={900} y1={430} x2={900} y2={660} stroke={WIRE} strokeWidth={1.6} />
          <circle cx={900} cy={660} r={3.5} fill={WIRE} />

          {/* Collector to motor negative */}
          <line x1={860} y1={370} x2={960} y2={370} stroke={WIRE} strokeWidth={1.6} />
          <circle cx={960} cy={370} r={3.5} fill={WIRE} />

          {/* Motor */}
          <circle cx={1000} cy={340} r={30} fill="#0f172a" stroke={ORANGE} strokeWidth={1.6} />
          <text x={1000} y={345} textAnchor="middle" fill={ORANGE} fontSize={13} fontWeight={700}>
            M
          </text>
          <text x={1000} y={300} textAnchor="middle" fill="#94a3b8" fontSize={11}>
            Motor DC
          </text>
          <line x1={960} y1={370} x2={1000} y2={370} stroke={WIRE} strokeWidth={1.6} />
          <line x1={1000} y1={370} x2={1000} y2={370} stroke={WIRE} strokeWidth={1.6} />
          <text x={1000} y={394} textAnchor="middle" fill="#94a3b8" fontSize={10}>
            −
          </text>
          <line x1={1000} y1={310} x2={1000} y2={250} stroke={RED} strokeWidth={1.6} />
          <text x={1000} y={244} textAnchor="middle" fill={RED} fontSize={10}>
            +
          </text>

          {/* Flyback diode in parallel with motor */}
          <line x1={960} y1={370} x2={960} y2={230} stroke={WIRE} strokeWidth={1.4} />
          <line x1={960} y1={230} x2={1000} y2={230} stroke={WIRE} strokeWidth={1.4} />
          <line x1={1000} y1={230} x2={1000} y2={250} stroke={WIRE} strokeWidth={1.4} />
          <circle cx={960} cy={370} r={3.5} fill={WIRE} />
          <circle cx={1000} cy={250} r={3.5} fill={WIRE} />
          {/* diode symbol */}
          <polygon points="972,222 972,238 988,230" fill="none" stroke={ORANGE} strokeWidth={1.6} />
          <line x1={988} y1={222} x2={988} y2={238} stroke={ORANGE} strokeWidth={1.6} />
          <text x={980} y={212} textAnchor="middle" fill={ORANGE} fontSize={10}>
            diodo flyback
          </text>
          <text x={964} y={252} fill="#94a3b8" fontSize={9}>
            ánodo
          </text>
          <text x={992} y={252} fill="#94a3b8" fontSize={9}>
            cátodo (banda)
          </text>

          {/* External supply */}
          <rect x={940} y={520} width={140} height={70} rx={10} fill="#0f172a" stroke={ORANGE} strokeWidth={1.6} />
          <text x={1010} y={548} textAnchor="middle" fill={ORANGE} fontSize={12} fontWeight={700}>
            Fuente externa
          </text>
          <text x={1010} y={566} textAnchor="middle" fill="#cbd5e1" fontSize={11} fontFamily="monospace">
            +5 V regulada
          </text>
          <line x1={1000} y1={520} x2={1000} y2={250} stroke={RED} strokeWidth={1.6} />
          <circle cx={1000} cy={520} r={3.5} fill={RED} />
          <line x1={960} y1={590} x2={960} y2={660} stroke={WIRE} strokeWidth={1.6} />
          <circle cx={960} cy={590} r={3.5} fill={WIRE} />
          <text x={940} y={606} textAnchor="end" fill="#94a3b8" fontSize={10}>
            −
          </text>

          {/* Common GND bus */}
          <line x1={860} y1={660} x2={960} y2={660} stroke={WIRE} strokeWidth={2} />
          <circle cx={860} cy={660} r={4} fill={WIRE} />
          <circle cx={900} cy={660} r={4} fill={WIRE} />
          <circle cx={960} cy={660} r={4} fill={WIRE} />
          <line x1={480} y1={420} x2={480} y2={660} stroke={WIRE} strokeWidth={1.6} />
          <line x1={480} y1={660} x2={860} y2={660} stroke={WIRE} strokeWidth={1.6} />
          <circle cx={480} cy={660} r={4} fill={WIRE} />
          <text x={680} y={684} textAnchor="middle" fill="#94a3b8" fontSize={11}>
            GND común (Arduino + fuente externa)
          </text>

          {/* Note: no connection between +5V rails */}
          <text x={700} y={130} textAnchor="middle" fill={ORANGE} fontSize={11}>
            El +5 V del Arduino y el +5 V de la fuente externa NO se unen.
          </text>
        </svg>
      </DiagramFrame>
    </div>
  );
}