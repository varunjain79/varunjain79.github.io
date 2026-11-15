---
title: "GitHub Copilot Model Deprecations in November and December 2026: A CTO Checklist"
description: "GitHub is retiring selected Copilot models on November 16 and December 14. A practical migration checklist for Indian startup CTOs."
publishedDate: 2026-11-15
updatedDate: 2026-11-15
category: "AI & Engineering"
tags: ["GitHub Copilot", "AI coding", "CTO", "Engineering operations", "Model migration"]
featured: false
draft: false
readingTime: "5 min read"
keyTakeaway: "Audit model dependencies now, test replacement models on real repository tasks, and update policies and integrations before GitHub's November 16 and December 14 deadlines."
---

GitHub Copilot is retiring several AI models on **16 November and 14 December 2026**. For Indian startup CTOs, the immediate action is not to buy another coding tool. It is to identify where teams or automations rely on a retiring model, enable a supported alternative, and test that alternative before the deadline.

This is an operational change, not evidence that one model has suddenly become worse. A model disappearing from a selector can interrupt a developer's routine; a hard-coded model identifier in an integration can be more consequential.

## What exactly is changing?

In its [15 October announcement](https://github.blog/changelog/2026-10-15-upcoming-deprecation-of-selected-github-copilot-models-in-mid-november/), GitHub scheduled Claude Opus 4.8, Claude Opus 5, and GPT-5.6 Terra for retirement across Copilot experiences on **16 November 2026**. GitHub suggests Claude Opus 5.5 for the two Opus models, and GPT-6.1 Sol or GPT-6 Luna for GPT-5.6 Terra. GitHub says the Opus 4.8 change does not apply to individual annual-plan subscribers.

A separate [13 November notice](https://github.blog/changelog/2026-11-13-upcoming-deprecation-of-selected-github-copilot-models-in-december/) schedules six more models for **14 December 2026**: Claude Fable 5, Claude Haiku 4.5, Gemini 3.8 Flash, Gemini 4 Argon, Grok 4.6, and Kimi K3. Suggested replacements include Claude Fable 5.2, Claude Haiku 5.5, Gemini 4 Hydrogen, Gemini 4 Carbon, and Grok 4.7. GitHub has not yet named a Kimi K3 replacement in that notice.

There is an important exception: GitHub says Claude Haiku 4.5 remains available to individual subscribers on annual plans. Do not generalise an enterprise migration requirement to every individual account.

GitHub describes these changes as applying to Copilot Chat, inline edits, ask and agent modes, and code completions. They do not automatically establish that the same models are unavailable through every other provider or API.

## Why should a small startup care?

A five-person engineering team can be surprisingly dependent on one person's preferred model. Developers may save prompts, select models for difficult debugging, or build internal tools around a model name. A replacement can behave differently even when the task description is identical.

The risk is not necessarily a catastrophic outage. More likely, an engineer discovers during a production fix that a familiar option is gone, or an administrator has not enabled its replacement. The resulting friction is avoidable.

For a startup shipping frequently, reliability matters more than whether the replacement is advertised as smarter. A new model should earn its place through the quality of reviewed changes, not a launch benchmark.

This also matters for cost control. Model selection may affect consumption under your plan, but the two deprecation announcements do not establish your organisation's future bill. Check current plan terms and actual usage before projecting savings or overruns.

## A practical migration plan for this week

### 1. Inventory real dependencies

Ask each developer which Copilot models they actively select, and why. Search team documentation, configuration files, scripts, and internal integrations for the retiring model names. Distinguish a human preference from an automated dependency.

Record the owner, use case, current model, proposed replacement, and migration status in one shared sheet. A complicated governance system is unnecessary for a small team.

### 2. Check administrator policies

GitHub says suggested alternatives are automatically enabled by default for Copilot Business and Enterprise customers unless an administrator disabled the global default or the specific model.

That exception matters. Verify the actual model policy in your organisation's Copilot settings rather than assuming the replacement will appear for everyone. If the policy is restricted, have an administrator approve only the alternatives the team intends to use.

### 3. Run a small, controlled comparison

Choose six representative tasks: a bug fix, a unit test, a refactor, a database query change, a frontend component, and a security-sensitive code review. Give the old and replacement models equivalent context where both remain accessible.

Measure accepted changes, review corrections, time to merge, test failures, and approximate tool cost. Avoid declaring a winner from a single impressive answer. A model that writes more code may still create more work.

For a fuller measurement approach, see the [AI code review ROI scorecard](/founders-guide/measure-ai-code-review-roi-founder-scorecard/). The point is to evaluate delivery outcomes rather than generated output.

### 4. Update instructions and fallback paths

Replace hard-coded identifiers in supported integrations after checking the relevant API or tool documentation. Update internal onboarding notes and shared prompt templates. Keep a documented second-choice model for urgent work.

Do not assume that a suggested replacement has identical tool permissions, context handling, output format, or pricing. Test the workflow end to end, including code review and CI, before treating the migration as complete.

### 5. Keep engineering controls unchanged

Regardless of the selected model, require human review for consequential changes, run automated tests, and protect credentials. AI-generated patches are still software changes.

Our earlier guide to [AI coding agents and Git bottlenecks](/founders-guide/ai-coding-agents-git-bottlenecks-indian-startups/) explains why faster code generation does not eliminate the integration and review bottleneck.

## What should founders ask their CTO on Monday?

Three questions are sufficient: Which retiring models do we actually use? Are the replacements enabled and tested? Who owns updating integrations before the deadline?

For the **16 November** changes, prioritise immediate continuity today. For the **14 December** changes, use the remaining weeks to benchmark alternatives and avoid rushed migrations.

GitHub's notices are a reminder that AI tooling is becoming a moving dependency. The durable advantage for a startup is not loyalty to a model name. It is an engineering process that can switch models without losing delivery quality, security, or control.

*Sources: [GitHub, 15 October 2026](https://github.blog/changelog/2026-10-15-upcoming-deprecation-of-selected-github-copilot-models-in-mid-november/); [GitHub, 13 November 2026](https://github.blog/changelog/2026-11-13-upcoming-deprecation-of-selected-github-copilot-models-in-december/).*
