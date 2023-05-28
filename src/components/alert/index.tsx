import { Slot, useStylesScoped$ } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";

type AlertPorps = {
  type?: "error" | "success" | "info"
  position?: "fixed" | "absolute" | "relative"
  side?: "top" | "bottom" | undefined
  closable?: boolean
  class?: string
  id?: string
}

import styles from "./alert.scss?inline";

export default component$((
{ 
  type = "info", 
  position = "relative", 
  side = undefined,
  closable = true, 
  ...props 
}: AlertPorps) => {
  useStylesScoped$(styles);
  const classes = ["alert"]
  classes.push(`alert-${type}`);
  classes.push(`alert-${position}`);
  
  if(position !== "relative") {
    side = side || "top";
    classes.push(`alert-${side}`);
  }

  if(props.class) {
    classes.push(...(props.class.split(" ")));
  }

  return (
    <div class={classes.join(" ")} id={props.id}>
      { closable && <span class="close" onClick$={(e, self) => self.parentElement?.remove()}>X</span> }
      <Slot />
    </div>
  )
})