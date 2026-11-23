import { useId } from "react";

export type MatrixPoint = { label: string; x: number; y: number };

export const DEFAULT_POINTS: MatrixPoint[] = [
  { label: "Company 1", x: 84, y: 84 },
  { label: "Company 2", x: 74, y: 88 },
  { label: "Company 3", x: 88, y: 68 },
  { label: "Company 4", x: 71, y: 73 },
  { label: "Company 5", x: 80, y: 57 },
  { label: "Company 6", x: 76, y: 46 },
  { label: "Company 7", x: 58, y: 42 },
  { label: "Company 8", x: 60, y: 34 },
  { label: "Company 9", x: 46, y: 18 },
  { label: "Company 10", x: 22, y: 12 },
];

type MatrixChartProps = {
  title: string;
  size?: "large" | "small";
  points?: MatrixPoint[];
};

const VB_W = 800;
const VB_H = 520;
const PL = 96; // plot left
const PR = 770; // plot right
const PT = 64; // plot top
const PB = 440; // plot bottom
const PW = PR - PL;
const PH = PB - PT;

const clamp = (v: number) => Math.min(100, Math.max(0, v));
const plotX = (x: number) => PL + (clamp(x) / 100) * PW;
const plotY = (y: number) => PB - (clamp(y) / 100) * PH;

export default function MatrixChart({ title, size = "large", points = DEFAULT_POINTS }: MatrixChartProps) {
  const uid = useId().replace(/[^A-Za-z0-9_-]/g, "");
  const gradientId = `sm-leaders-${uid}`;
  const arrowId = `sm-arrow-${uid}`;

  const fontSize = size === "small" ? 13 : 11;
  const columnLabelSize = fontSize + 1;

  const divider1 = plotX(100 / 3);
  const divider2 = plotX((200 / 3));
  const midY = (PT + PB) / 2;

  return (
    <svg
      className={`sm-matrix sm-matrix--${size}`}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D8F3E8" />
          <stop offset="1" stopColor="#FFFFFF" />
        </linearGradient>
        <marker id={arrowId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill="#011F41" />
        </marker>
      </defs>

      <text x={VB_W / 2} y={30} textAnchor="middle" className="sm-matrix-title">
        {title}
      </text>

      {/* SPARK Leaders column tint */}
      <rect x={divider2} y={PT} width={PR - divider2} height={PH} fill={`url(#${gradientId})`} />
      <rect x={PL} y={PT} width={PW} height={PH} fill="none" stroke="#D5DDE6" strokeWidth={1} />
      <line x1={divider1} y1={PT} x2={divider1} y2={PB} stroke="#C9D3DE" strokeWidth={1} />
      <line x1={divider2} y1={PT} x2={divider2} y2={PB} stroke="#C9D3DE" strokeWidth={1} />

      <g fontSize={columnLabelSize} fontWeight={600} textAnchor="middle" className="sm-matrix-col">
        <text x={plotX(100 / 6)} y={PT + 24}>Aspirants</text>
        <text x={plotX(50)} y={PT + 24}>Strong Contenders</text>
        <text x={plotX(100 - 100 / 6)} y={PT + 24} className="sm-matrix-col--leaders">
          SPARK Leaders
        </text>
      </g>

      {/* Axes with arrowheads */}
      <line x1={PL} y1={PB} x2={PL} y2={PT - 8} stroke="#011F41" strokeWidth={2} markerEnd={`url(#${arrowId})`} />
      <line x1={PL} y1={PB} x2={PR + 8} y2={PB} stroke="#011F41" strokeWidth={2} markerEnd={`url(#${arrowId})`} />
      <text
        x={28}
        y={midY}
        transform={`rotate(-90 28 ${midY})`}
        textAnchor="middle"
        fontSize={columnLabelSize}
        fontWeight={600}
        className="sm-matrix-axis"
      >
        Customer Impact
      </text>
      <text x={PL + PW / 2} y={PB + 30} textAnchor="middle" fontSize={columnLabelSize} fontWeight={600} className="sm-matrix-axis">
        Technology Excellence
      </text>

      <text x={PL + 14} y={PB - 16} fontSize={18} className="sm-matrix-brand">
        <tspan fontWeight={800}>QKS</tspan>
        <tspan fontWeight={400}> Group</tspan>
      </text>

      {points.map((p) => {
        const cx = plotX(p.x);
        const cy = plotY(p.y);
        const labelLeft = p.x >= 85;
        return (
          <g key={p.label}>
            <circle cx={cx} cy={cy} r={4} fill="#011F41" />
            <text
              x={labelLeft ? cx - 8 : cx + 8}
              y={cy + 4}
              textAnchor={labelLeft ? "end" : "start"}
              fontSize={fontSize}
              className="sm-matrix-point"
            >
              {p.label}
            </text>
          </g>
        );
      })}

      {/* Legend */}
      <g fontSize={fontSize} className="sm-matrix-legend">
        <circle cx={PR - 250} cy={VB_H - 20} r={4} fill="#011F41" />
        <text x={PR - 240} y={VB_H - 16}>Ace Performer</text>
        <circle cx={PR - 120} cy={VB_H - 20} r={4} fill="#3DA5EB" />
        <text x={PR - 110} y={VB_H - 16}>Emerging Innovator</text>
      </g>
    </svg>
  );
}
