---
title: "Tutors help when they are built to tutor"
description: "In the trials since 2024, chat tutors built for one course raised learning, an open chatbot raised practice scores and then lowered exam scores, and the best results kept a teacher in the loop."
kind: reading
convolute: learning-harnesses
tags: [research, agency, design]
audience: [ll, faculty, tdm155ai]
links: [do-ai-tutors-help-or-harm-learning, who-needs-a-teacher, build-your-own-learning-harness, what-a-learning-harness-needs, the-learning-harness-is-this-weeks-game, learning/examples/khanmigo, learning/examples/learnlm]
sources: ["W11/research/ai-tutor-trials.md", "https://www.nature.com/articles/s41598-025-97652-6", "https://www.ebi.ac.uk/europepmc/webservices/rest/PMC12232635/fullTextXML", "https://econpapers.repec.org/RePEc:wbk:wbrwps:11125", "https://arxiv.org/abs/2410.03017", "https://www.nber.org/papers/w35620", "https://arxiv.org/abs/2512.23633", "https://arxiv.org/abs/2402.09809", "https://arxiv.org/abs/2409.09047", "https://arxiv.org/abs/2412.09315", "https://arxiv.org/abs/2506.08872"]
voice: drafted
author: KR
date: 2026-11-16
week: 11
status: draft
---

The trials point both ways for a reason. An open GPT-4 chat raised high-school students' practice scores and then cut their exam scores by 17%; tutors written for one course, walking students step by step, produced the large gains. Guardrails prevented the harm more reliably than they produced gains, and the strongest results keep a teacher or tutor in the loop.

---

**The answer to** [Do AI tutors help or harm learning?](do-ai-tutors-help-or-harm-learning.md), from a research pass on Nov 16; the full note, with sample sizes and every caveat, is `W11/research/ai-tutor-trials.md`.

**The harm, and the guardrail.** Bastani et al. (*PNAS* 2025, peer reviewed, about 1,000 Turkish high-school students): GPT-4 as an open chat raised practice scores by 48%, and with guardrails by 127%; on the later exam without AI, the open-chat group scored 17% lower than control, and the guardrailed group no different from control.

**The gains.** Kestin et al. (*Scientific Reports* 2025, peer reviewed, 194 Harvard physics students): an AI tutor beat in-class active learning, by 0.73 to 1.3 standard deviations by quantile regression and 0.63 by ordinary regression. The platform walked students through each part of each problem using pre-written solutions; the paper lists "when the AI tutor should openly provide answers" as an open question. A World Bank working paper on Nigeria (De Simone et al., not peer reviewed): 0.31 SD over six weeks of after-school sessions, though the authors can't separate the chatbot from the teachers who ran them. Ghana's Rori (preprint): 0.37 SD.

**Small or none.** Khanmigo across 18 Tennessee schools (NBER working paper, 2026): about 0.06 to 0.08 SD a year, with students rarely using it for real dialogue. Lehmann et al. (preprint, two preregistered experiments): no overall effect; students who had the chatbot produce solutions covered more and understood less, and those who asked for explanations understood more.

**Teacher in the loop.** Tutor CoPilot (Stanford, preprint, 900 tutors, 1,800 students): AI coaching human tutors raised topic mastery 4 points, and 9 for weaker tutors. LearnLM with Eedi (preprint): an expert tutor approved each AI message.

**What separated them**, as the researcher sums up the sources: hints rather than final answers, expert solutions in the prompt, structure enforced by the software rather than the prompt alone, a match to the curriculum, a person in the loop. Two much-cited warnings are weaker than their headlines: MIT's "Your Brain on ChatGPT" is an unreviewed preprint about essay writing, and Fan et al. name "metacognitive laziness" as a risk, not a measured loss.

**For "who needs a teacher?", as KR reads it.** On this evidence the teacher moves rather than disappears: into writing the course-specific tutor, its solutions and its limits, and into the loop beside it. A learner who builds their own harness ([Build your own learning harness](build-your-own-learning-harness.md)) is doing some of that work.

*KR's account of a sourced research note, Nov 16. The last paragraph is KR's proposal.*
