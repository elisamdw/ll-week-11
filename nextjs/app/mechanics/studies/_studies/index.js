import MoveUpdatesState from "./the-move-updates-state/Study.jsx";
import { DEMO as moveDemo } from "./the-move-updates-state/demo.mjs";
import AsymmetricInformation from "./asymmetric-information/Study.jsx";
import { PRINT_ROUND as asymmetricRound } from "./asymmetric-information/deal.mjs";
import GrowthAndUpkeep from "./growth-and-upkeep/Study.jsx";
import { PRINT_RUN as growthRun } from "./growth-and-upkeep/loop.mjs";
import PricesThatMove from "./prices-that-move/Study.jsx";
import { PRINT_ROWS as priceRows } from "./prices-that-move/market.mjs";
import CouplingAndCascade from "./coupling-and-cascade/Study.jsx";
import { PRINT_ROWS as cascadeRows } from "./coupling-and-cascade/grid.mjs";
import NestedLoops from "./nested-loops/Study.jsx";
import { PRINT_INPUTS as loopInputs } from "./nested-loops/loops.mjs";

// Each study's illustration, by the id in its README's frontmatter. `print` holds the props the 11x17 sheet starts from.
export const illustrations = {
  "the-move-updates-state": { Component: MoveUpdatesState, print: { initial: moveDemo } },
  "asymmetric-information": { Component: AsymmetricInformation, print: asymmetricRound },
  "growth-and-upkeep": { Component: GrowthAndUpkeep, print: growthRun },
  "prices-that-move": { Component: PricesThatMove, print: { rows: priceRows } },
  "coupling-and-cascade": { Component: CouplingAndCascade, print: { rows: cascadeRows } },
  "nested-loops": { Component: NestedLoops, print: { inputs: loopInputs } },
};
