---
title: "Civilization as data"
description: "Civilization V, VI and VII load their game definitions from XML into a SQLite database at startup; mods change the game by running XML or SQL against it."
order: 7
kind: worked-example
year: "2010–2025"
creators: ["Firaxis Games"]
sources:
  - https://forums.civfanatics.com/threads/where-does-civ-keep-its-sqlite-database.481500
  - https://forums.civfanatics.com/threads/database-mapping.434145
  - https://forums.civfanatics.com/threads/sql-files-in-pre-load.380277
  - "https://modiki.civfanatics.com/index.php/XML-SQL_Cheat_Sheet_(Civ5)"
  - "https://modiki.civfanatics.com/index.php/Debugging_(Civ5)"
  - https://forums.civfanatics.com/threads/civ6-modinfo-schema.606784/
  - https://forums.civfanatics.com/threads/how-to-edit-an-existing-units-values.629370
  - https://forums.civfanatics.com/threads/tutorial-modding-with-sqllite-studio-pc.608352/post-14668125
  - https://forums.civfanatics.com/threads/using-modifiers-chapter-1-creating-and-attaching-modifiers.605835
  - https://sukritact.github.io/civilization-modding-wiki/civ-6/database/articles/modifier-system
  - https://forums.civfanatics.com/threads/mod-updates-not-applied-to-save-games.681526/
  - https://forums.civfanatics.com/threads/example-gameplay-mod.694844
  - https://raw.githubusercontent.com/freeciv/freeciv/main/data/civ2civ3/units.ruleset
  - https://yairm210.github.io/Unciv/Modders/Mods/
status: researched
author: "HI (Claude Code edf29cc8-f1a0-4b6a-a0a5-7a9ca74f4450, started in ll-week-11 on FAS-DDW32PXW5L), Nov 14, 2026, from a research subagent's notes"
---

# *Civilization* as data

[Game state index](README.md) · *Civilization* in the history: [strand 2](../history/2-ai-inside-games.md)

Marlon, November 14 (voice chat): look at *Civilization*, or "any territorial acquisition type game," for how its data gets modeled.

## The claim, checked

**Voice Claude's claim:** *Civilization* V and VI load their game definitions (units, buildings, techs) into a SQLite database, and modders change the game by editing that data.

**True, with one correction.** The definitions ship as XML files, and the game loads them into a **SQLite database** when it starts. Mods don't edit a database file on disk; they add their own XML or `.sql` files, which the game runs against that database as it loads. The `.db` or `.sqlite` file in the game's cache folder is a snapshot, rebuilt at every load, that modders open to check their work; editing it changes nothing. Better wording: *Civilization V and VI load their game definitions from XML into a SQLite database, and mods change the game by running XML or SQL changes against that database when it loads.*

**Sources:** all community sources: CivFanatics forum threads and the CivFanatics modding wiki. No official Firaxis or 2K page could be opened. One poster, whose forum profile says he is a game developer, puts it plainly: "The game loads all the XML data and processes it into an SQLite database."

## Templates in tables

| Game | Snapshot file a modder opens | Tables for the templates (example columns) | How a mod changes them |
| --- | --- | --- | --- |
| *Civ V* (2010) | `Civ5DebugDatabase.db` (with mods) beside `Civ5CoreDatabase.db` (without), in the game's `cache` folder | `Units` (Type, Cost, Combat, Moves), `Buildings` (Type, Cost, PrereqTech, BuildingClass), `Technologies` | XML or SQL files listed in the mod |
| *Civ VI* (2016) | `Cache/DebugGameplay.sqlite` | `Units` (UnitType, Cost, Combat, PrereqTech, PrereqCivic), `Buildings` (BuildingType, Cost), `Technologies` and `Civics` (EraType, Cost) | An `UpdateDatabase` action in the mod's `.modinfo`, taking XML or SQL files |
| *Civ VII* (2025) | none by default (an option in `AppOptions.txt` writes it to disk) | New names, e.g. unit stats in their own `Unit_Stats` table | Still `UpdateDatabase` |

A one-line *Civ VI* mod, as a forum tutorial gives it: an SQL statement that sets the Scout's combat strength to 12. That is a change to the **template**: every Scout built afterward has it.

**Modifiers (Civ VI).** Fixed numbers sit in plain columns; conditional bonuses (of the kind "+2 science in cities with a campus", an illustrative example) are rows in a `Modifiers` table, each pointing to a type, getting its values from `ModifierArguments`, and attached to a building, trait or leader through link tables (`BuildingModifiers`, `TraitModifiers`). It's a normalized design: one modifier defined once, attached in many places.

## Instances: the save

A CivFanatics moderator explains that what loads at the start of a game is "locked in": a change to combat strength "won't be reflected in existing units, but will be in newly built ones." So the database holds the **templates** (the Scout as a type) and the save holds the **instances** (this Scout, on this tile, with this much health). Whether a save also embeds a full copy of the database was not confirmed.

HI's sketch of the instance side for one unit (a model, not Firaxis's format):

```json
{ "unitId": 4117, "type": "UNIT_SCOUT", "owner": "player-2", "x": 31, "y": 18, "health": 100, "movesLeft": 2, "promotions": [] }
```

`type` points to the `Units` table; everything else is this unit's own.

## Open relatives

- **Freeciv** keeps its rules in plain text "ruleset" files (`units.ruleset` and siblings); the open-source Civ clone's tech tree can be read in any text editor.
- **Unciv**, an open-source *Civ V* remake, keeps units, buildings and techs in JSON (`Units.json`), and mods are folders of JSON.

RS's [`stafford-strategy-games.md`](https://github.com/ll-26-27-secret/the-notebook/blob/main/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/research/stafford-strategy-games.md) already suggested turning the students' database into an Unciv mod or a Freeciv ruleset.

## What to notice with students

- **A strategy game is a database plus rules for changing it.** The map, the units and the cities in play are rows that refer to template rows by type.
- **Modding is editing the template layer.** It's the same move as a remix of *Data Center* through Claude Code: change the template, and the next game is different.
- **Normalization is visible in the tables:** a unit's cost is stored once in `Units`; ten thousand Scouts in ten thousand saves point to it.

## Not confirmed

Whether saves embed the database; the *Civ V* mod action names and the `Technologies` columns; *Civ VII* table names beyond `Unit_Stats`; Freeciv's other ruleset files (only `units.ruleset` was opened).
