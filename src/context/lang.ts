import { createContextId } from "@builder.io/qwik";
import type { Lang } from "~/interfaces/lang";
export const LangContext = createContextId<Lang>("lang");
