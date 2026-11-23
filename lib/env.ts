export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const ENV_LABEL = process.env.NEXT_PUBLIC_ENV_LABEL || "LOCAL";
export const asset = (p: string) => `${BASE_PATH}${p}`;
