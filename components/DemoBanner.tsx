import { ENV_LABEL } from "@/lib/env";

export default function DemoBanner() {
  const pillClass =
    ENV_LABEL === "TEST"
      ? "env-pill env-pill--test"
      : ENV_LABEL === "LIVE"
        ? "env-pill env-pill--live"
        : "env-pill";

  return (
    <div className="demo-banner">
      <span>
        Demo replica for the Vayasoft AI-SDLC walkthrough · Not the live qksgroup.com · Environment:{" "}
        <span className={pillClass}>{ENV_LABEL}</span>
      </span>
    </div>
  );
}
