# A learning harness in a folder

*Draft for TDM 155AI, Nov 15, 2026. Not yet agreed with Marlon; nothing here has gone to students.*

This folder turns Claude into a tutor that remembers. You pick a topic. Claude finds out what you already understand, maps a route to what you want to understand, and teaches it one step at a time, asking you to think out loud. Everything it learns about your understanding goes into files in this folder, so next time, in a new conversation, it picks up where you left off. A web page can read the same files and draw your map or quiz you.

It is our own small version of the ideas in [LearnHarness](https://github.com/amosblomqvist/learnharness), an open-source learning app, built with nothing but files and Claude Desktop.

## What you need

- Claude Desktop, on a Claude plan that includes Claude Code (the **Code** tab). Free accounts see an upgrade prompt there.
- This folder.

You don't need a terminal, Node.js or Git.

## Set it up

Do these one at a time.

1. **Copy the folder.** Put a copy of `learning-harness` somewhere of your own, such as Documents. Give the copy the name of your topic, for example `paperclips`. One folder per topic.
2. **Open Claude Desktop** and sign in.
3. **Click Code** at the top of the sidebar.
4. **Choose Local** in the environment selector.
5. **Open the folder:** choose **Open folder…** and pick your copy.
6. **If Claude asks whether to trust the folder, say yes.** This lets the folder's settings approve Claude's writes to your record without asking you each time.
7. **If it still asks before every file change,** choose **Accept edits** in the permission mode menu. It only works inside this folder.

## Try it first

Type:

```
/learn Bostrom's paperclip argument
```

(or any topic you want). Answer the questions, and say what you're thinking, not just the answer: "I'd guess X because Y, but I'm not sure about Z." Give the confidence number it asks for. Wrong guesses help it more than silence.

Then:

| Type | What happens |
| --- | --- |
| `/learn <topic>` | It finds where your understanding stops, asks what you want to understand, and maps a route of ideas. |
| `/teach` | The next step on the route: you guess, it explains one idea, you explain it back. |
| `/practice` | On another day: problems that need what you learned, without saying which idea. |
| `/graph` | Rewrites `graph.md`, your map: what you hold, what's shaky, what's next. |

You can also just talk ("go on", "I'm confused about step 3", "quiz me") and it will work out which one you mean.

## Where things are

- `graph/`: your record (the ideas, how they link, your answers). Plain JSON files you can open.
- `graph.md`: your map, readable. Open it any time.
- `sessions/`: a write-up of each session, with your own words quoted.
- `readings/`: put readings here (PDFs, notes, a list of links). Claude will use and cite them.
- `examples/paperclips/`: a finished example, made on Nov 15 by Claude playing the learner. Look at `graph.md` and `transcript.md` there to see what a session looks like.
- `CLAUDE.md`: the tutor's instructions. `.claude/skills/`: the four commands. You can change both: that is how you make your own version.

## Make it yours

The harness is just instructions and files, so you can remix it by asking Claude in this folder. For example:

- "Make `/practice` a game: three lives, and a streak counter saved in the session file."
- "Change the teaching so every step starts with a real-world example before the idea."
- "Add a `/debate` command where you argue against my answer and I have to defend it."

Ask Claude to change `CLAUDE.md` or a skill, then try it. Keep the record's format (`FORMAT.md`) the same, so the web page can still read it.

## Privacy

Your answers are saved in this folder, on your computer, and sent to Claude as you work, like any Claude conversation. Don't put anything in it you wouldn't type to Claude. If you share the folder or put it on GitHub, your answers go with it.
