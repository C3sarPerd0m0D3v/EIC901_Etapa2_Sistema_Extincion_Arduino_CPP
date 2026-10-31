import { useMemo, useState } from "react";
import { Power, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ROWS = [
  { a: 0, b: 0, c: 0, f: 0 },
  { a: 0, b: 0, c: 1, f: 0 },
  { a: 0, b: 1, c: 0, f: 1 },
  { a: 0, b: 1, c: 1, f: 0 },
  { a: 1, b: 0, c: 0, f: 1 },
  { a: 1, b: 0, c: 1, f: 0 },
  { a: 1, b: 1, c: 0, f: 1 },
  { a: 1, b: 1, c: 1, f: 1 },
];

function evaluate(a: number, b: number, c: number) {
  const A = !!a;
  const B = !!b;
  const C = !!c;
  return (A && B) || (!C && (A || B)) ? 1 : 0;
}

export default function TruthTableTab() {
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const [c, setC] = useState(false);

  const f = useMemo(() => evaluate(a ? 1 : 0, b ? 1 : 0, c ? 1 : 0), [a, b, c]);
  const active = f === 1;
  const currentAbc = `${a ? 1 : 0}${b ? 1 : 0}${c ? 1 : 0}`;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Controls */}
        <div className="lg:col-span-3 space-y-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <h2 className="font-serif text-lg text-white">Interruptores de entrada</h2>
            <p className="mt-1 text-sm text-slate-400">
              Ajusta los detectores A, B y C. La función F se recalcula
              automáticamente.
            </p>

            <div className="mt-6 space-y-4">
              <SwitchRow label="Detector A" value={a} onChange={setA} />
              <SwitchRow label="Detector B" value={b} onChange={setB} />
              <SwitchRow label="Detector C" value={c} onChange={setC} />
            </div>

            <div className="mt-6 rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-4">
              <p className="font-mono text-sm text-cyan-300">
                F = AB + ¬C(A+B)
              </p>
              <p className="mt-2 font-mono text-xs text-slate-400">
                A={a ? 1 : 0} · B={b ? 1 : 0} · C={c ? 1 : 0} → F={f}
              </p>
            </div>
          </div>

          {/* Output visualization */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div
              className={cn(
                "rounded-xl border p-6 transition-colors",
                active
                  ? "border-red-500/40 bg-red-500/10"
                  : "border-slate-800 bg-slate-900/60",
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all",
                    active
                      ? "border-red-400 bg-red-500 shadow-lg shadow-red-500/50"
                      : "border-slate-700 bg-slate-800",
                  )}
                >
                  <Zap
                    className={cn(
                      "h-5 w-5",
                      active ? "text-white" : "text-slate-600",
                    )}
                  />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    LED indicador (D9)
                  </p>
                  <p
                    className={cn(
                      "text-lg font-semibold",
                      active ? "text-red-300" : "text-slate-400",
                    )}
                  >
                    {active ? "LED ENCENDIDO" : "LED APAGADO"}
                  </p>
                </div>
              </div>
            </div>

            <div
              className={cn(
                "rounded-xl border p-6 transition-colors",
                active
                  ? "border-emerald-500/40 bg-emerald-500/10"
                  : "border-slate-800 bg-slate-900/60",
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all",
                    active
                      ? "border-emerald-400 bg-emerald-500 shadow-lg shadow-emerald-500/50"
                      : "border-slate-700 bg-slate-800",
                  )}
                >
                  <Power
                    className={cn(
                      "h-5 w-5",
                      active ? "text-white" : "text-slate-600",
                    )}
                  />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Motor DC (D8)
                  </p>
                  <p
                    className={cn(
                      "text-lg font-semibold",
                      active ? "text-emerald-300" : "text-slate-400",
                    )}
                  >
                    {active ? "MOTOR ACTIVADO" : "MOTOR DETENIDO"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="rounded-lg border border-slate-800 bg-slate-900/40 p-4 text-xs text-slate-500">
            Esta interacción representa únicamente la lógica booleana del
            sistema. No mide corrientes ni simula físicamente los componentes.
          </p>
        </div>

        {/* Truth table */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <h2 className="font-serif text-lg text-white">Tabla de verdad</h2>
            <p className="mt-1 text-sm text-slate-400">
              Las ocho combinaciones posibles de A, B y C.
            </p>

            <div className="mt-4 overflow-hidden rounded-lg border border-slate-800">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-800 hover:bg-transparent">
                    <TableHead className="text-slate-400">A</TableHead>
                    <TableHead className="text-slate-400">B</TableHead>
                    <TableHead className="text-slate-400">C</TableHead>
                    <TableHead className="text-right text-cyan-400">F</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ROWS.map((r) => {
                    const abc = `${r.a}${r.b}${r.c}`;
                    const isCurrent = abc === currentAbc;
                    return (
                      <TableRow
                        key={abc}
                        className={cn(
                          "border-slate-800/70 transition-colors",
                          isCurrent && "bg-cyan-500/10",
                        )}
                      >
                        <TableCell className="font-mono text-slate-300">{r.a}</TableCell>
                        <TableCell className="font-mono text-slate-300">{r.b}</TableCell>
                        <TableCell className="font-mono text-slate-300">{r.c}</TableCell>
                        <TableCell
                          className={cn(
                            "text-right font-mono font-semibold",
                            r.f === 1 ? "text-emerald-400" : "text-slate-500",
                          )}
                        >
                          {r.f}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 rounded-lg border border-slate-800 bg-slate-950/60 p-4">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Datos de simulación (Tinkercad)
              </p>
              <ul className="mt-2 space-y-1 text-xs text-slate-400">
                <li>· Fuente externa: 5,00 V</li>
                <li>· Motor activo: ≈ 79,3 mA</li>
                <li>· Motor detenido: 0 rpm · 0,00 A</li>
                <li>· LED y motor responden simultáneamente a F</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SwitchRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/50 px-4 py-3">
      <Label className="text-sm font-medium text-slate-200">{label}</Label>
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "font-mono text-sm font-semibold",
            value ? "text-emerald-400" : "text-slate-500",
          )}
        >
          {value ? "1" : "0"}
        </span>
        <Switch checked={value} onCheckedChange={onChange} />
      </div>
    </div>
  );
}