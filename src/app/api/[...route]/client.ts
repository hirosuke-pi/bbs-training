import { HonoAppType } from "@/app/api/[...route]/route";
import { hc } from "hono/client";

export const client = hc<HonoAppType>(process.env.NEXT_PUBLIC_API_URL!).api;
