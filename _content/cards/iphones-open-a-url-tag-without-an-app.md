---
title: "iPhones open a URL tag without an app"
description: "No Web NFC needed: a URL on each sticker opens in the phone's browser on recent iPhones and Androids, so every tap can be a page load the laptop logs, at two touches a tap."
kind: reading
convolute: room-as-board
tags: [research, nfc, phones, hardware]
audience: [tdm155ai, llufs, stafford]
links: [can-every-phone-tap-a-tag-into-the-game, every-tap-is-a-row, nfc-for-simple-tabletop-games, the-ai-rewrites-the-tag, a-phone-reveals-a-cards-secret, activities/tdm155ai/a-tap-station]
sources: ["W11/research/nfc-tags-and-phones.md", "https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading", "https://developer.android.com/develop/connectivity/nfc/nfc", "https://developer.mozilla.org/en-US/docs/Web/API/Web_NFC_API", "https://www.nxp.com/docs/en/data-sheet/NTAG213_215_216.pdf", "https://www.nxp.com/products/rfid-nfc/nfc-software/nfc-tagwriter-app:NFC-TAGWRITER", "https://www.wakdev.com/en/apps/nfc-tools-ios.html", "https://nextjs.org/docs/app/api-reference/cli/next", "https://nextjs.org/docs/app/api-reference/config/next-config-js/allowedDevOrigins", "https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts"]
voice: drafted
author: KR
date: 2026-11-16
week: 11
status: draft
---

Write a plain URL on each sticker, `http://<laptop IP>:3111/tap/<tag>`. iPhone XS and later read it with no app and show a notification; tapping the notification opens Safari. Android does the same. Each tap becomes a page load the game can log, at the cost of two touches per tap. Two things to test on a real iPhone before writing stickers: a LAN address, and a second tap on the same sticker.

---

**The answer to** [Can every phone in the room tap a tag into the game?](can-every-phone-tap-a-tag-into-the-game.md), from a research pass on Nov 16; the full note is `W11/research/nfc-tags-and-phones.md`.

**iPhone.** Apple's Core NFC page: "iPhone XS and later support background tag reading." The system "displays a pop-up notification each time it reads a new tag"; the user taps it and, with no app that claims the link, "the system opens the link in Safari." It reads only when the phone is unlocked and in use, not while the camera or Apple Pay is open. Its table of supported schemes starts "Website URL (HTTP/HTTPS)", so plain `http://` is allowed; custom schemes are not. The page says nothing about IP addresses or ports.

**Android.** With NFC on, a URL tag goes to the browser with no app. Android's docs say Android 17 adds an "open link" notification first, so there too a tap takes two touches. Web NFC itself remains Chrome-on-Android only and HTTPS only (MDN, Chrome).

**The sticker.** An NTAG213 holds 144 bytes of user memory, plenty for that URL. NXP's datasheet says it can mirror its chip ID and a 24-bit tap counter into the URL as text, unsigned and copyable; the NTAG 424 DNA signs each tap if that ever matters. Free writers: NXP TagWriter (iOS and Android, writes batches from a CSV and can lock tags) and NFC Tools (iOS free with a Pro purchase, and Android).

**Reaching the laptop.** `next dev` listens on all interfaces by default (Next.js CLI docs), so a phone on the same Wi-Fi reaches `http://<laptop IP>:3111`. But Next.js "blocks cross-origin requests to dev-only assets and endpoints during development by default" and allows only `localhost` and the hostname it started with, so the laptop's IP has to go in `allowedDevOrigins` in `next.config`, or the app runs with `next build && next start`. A fixed IP is safer on a sticker than a `.local` name.

**Prior art.** Amiibo, Skylanders, DropMix and Beasts of Balance all use a dedicated reader and an app. The research found no game that uses players' own phones as readers through a browser.

**Could not confirm.** Whether an iPhone shows a second notification when the same sticker is tapped twice (Apple says "each time it reads a new tag"; if not, Every tap is a row breaks on iPhone); whether a LAN address opens; which iOS version began background reading; what Android 15 and earlier do; whether Harvard's Wi-Fi lets phones reach a laptop.

*KR's account of a sourced research note, Nov 16.*
