import { type Signal, createContextId } from "@builder.io/qwik";
export type Theme = Signal<"light" | "dark">;
export const ThemeContext = createContextId<Theme>("theme");
