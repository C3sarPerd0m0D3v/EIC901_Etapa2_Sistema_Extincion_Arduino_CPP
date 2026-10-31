import { useState } from "react";
import { Cpu, GitBranch, Network, Table2 } from "lucide-react";
import { cn } from "@/lib/utils";
import ArchitectureTab from "@/components/ArchitectureTab";
import FlowchartTab from "@/components/FlowchartTab";
import SchematicTab from "@/components/SchematicTab";
import TruthTableTab from "@/components/TruthTableTab";

const TABS = [
  { id: "arch", label: "Arquitectura del sistema", icon: Network },
  { id: "flow", label: "Diagrama de flujo", icon: GitBranch },
  { id: "schema", label: "Esquema eléctrico", icon: Cpu },
  { id: "truth", label: "Tabla de verdad", icon: Table2 },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function App() {
  const [tab, setTab] = useState<TabId>("arch");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-emerald-500/5" />

      <header className="relative border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 shadow-lg shadow-cyan-500/10">
              <Cpu className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-cyan-400/80">
                EIC901 · Etapa 2 · Documentación técnica
              </p>
              <h1 className="font-serif text-2xl font-bold tracking-tight text-white md:text-3xl">
                Sistema de extinción por votación 2 de 3
              </h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-slate-300">
              Arduino UNO R3
            </span>
            <span className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-slate-300">
              C++
            </span>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-300">
              Validado en Tinkercad
            </span>
          </div>
        </div>

        <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-6">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "group relative flex items-center gap-2 whitespace-nowrap rounded-t-lg px-4 py-3 text-sm font-medium transition-colors",
                  active
                    ? "text-cyan-300"
                    : "text-slate-400 hover:text-slate-200",
                )}
              >
                <Icon className="h-4 w-4" />
                {t.label}
                <span
                  className={cn(
                    "absolute inset-x-2 bottom-0 h-0.5 rounded-full transition-all",
                    active ? "bg-cyan-400" : "bg-transparent group-hover:bg-slate-700",
                  )}
                />
              </button>
            );
          })}
        </nav>
      </header>

      <main className="relative mx-auto max-w-7xl px-6 py-8">
        {tab === "arch" && <ArchitectureTab />}
        {tab === "flow" && <FlowchartTab />}
        {tab === "schema" && <SchematicTab />}
        {tab === "truth" && <TruthTableTab />}
      </main>

      <footer className="relative border-t border-slate-800/80 bg-slate-950/80">
        <div className="mx-auto max-w-7xl px-6 py-6 text-xs text-slate-500">
          <p>
            Universidad Don Bosco · EIC901 · Etapa 2 · Arduino UNO R3 y C++.
            Los valores mostrados provienen de la simulación en Tinkercad y no
            constituyen especificaciones de un sistema físico certificado.
          </p>
        </div>
      </footer>
    </div>
  );
}