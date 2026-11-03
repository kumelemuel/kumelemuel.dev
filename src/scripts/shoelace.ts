// Self-hosted Shoelace: only the components used on the site are bundled.
import "@shoelace-style/shoelace/dist/themes/light.css";
import "@shoelace-style/shoelace/dist/components/button/button.js";
import "@shoelace-style/shoelace/dist/components/card/card.js";
import "@shoelace-style/shoelace/dist/components/icon/icon.js";
import "@shoelace-style/shoelace/dist/components/input/input.js";
import "@shoelace-style/shoelace/dist/components/textarea/textarea.js";
import { registerIconLibrary } from "@shoelace-style/shoelace/dist/utilities/icon-library.js";

// Font Awesome 5 icons served from /public/icons/fa (only the ones in use).
// Usage: <sl-icon library="fa" name="fas-bars">. Add new SVGs to public/icons/fa/<folder>/.
registerIconLibrary("fa", {
  resolver: (name) => {
    const filename = name.replace(/^fa[rbs]-/, "");
    const folder = name.startsWith("fab-") ? "brands" : "solid";
    return `/icons/fa/${folder}/${filename}.svg`;
  },
  mutator: (svg) => svg.setAttribute("fill", "currentColor"),
});
