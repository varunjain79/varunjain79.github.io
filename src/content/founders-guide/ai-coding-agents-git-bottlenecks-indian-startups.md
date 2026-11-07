---
title: "AI Coding Agents Are Stressing Git: What Indian Startup CTOs Should Fix First"
description: "OpenAI rebuilt its Git backend for agent-scale development. A practical guide for Indian startup CTOs to identify CI, branch and review bottlenecks before changing infrastructure."
publishedDate: 2026-11-07
category: "Build Guide"
tags: ["AI coding agents", "Git", "CI/CD", "engineering productivity", "Indian startups"]
featured: false
draft: false
readingTime: "6 min read"
keyTakeaway: "Before scaling AI coding agents, measure the full path from branch creation to production. Fix CI queues, merge conflicts, review capacity and repository hygiene before considering new source-control infrastructure."
---

AI coding agents can produce changes faster than engineering teams can review, test and merge them. The next constraint may not be the model. It may be the delivery system around the model.

**For most Indian startups, the answer is not to rebuild Git.** It is to measure where agent-generated changes wait, fail or collide, then improve the existing workflow. More generated pull requests are valuable only when more reliable customer-facing changes reach production.

On November 2, 2026, [OpenAI described its new Git-compatible source-control backend, Pando](https://openai.com/index/scaling-git-at-openai/). The company says increased concurrent work from Codex strained its monorepo, contributing to slow fetches and pushes and, at times, merge reliability below 90%. It reports that Pando subsequently reduced median push latency by nearly five times and now serves close to a petabyte of Git data daily.

Those are OpenAI's reported operational results, not a benchmark that a 15-person startup should expect to reproduce.

## The real lesson is about bottlenecks, not Git replacement

OpenAI retained Git compatibility while changing its backend to handle many independent branch updates and large volumes of reads. Its design uses independent reference updates, reusable packfiles and caching. These are sensible choices at its scale.

But a typical startup's limiting factors are different: one overworked reviewer, a slow integration test suite, flaky deployments, unclear ownership or long-lived branches. Adding agents can magnify each problem.

Consider a hypothetical team with five developers. If AI doubles the number of proposed changes but the same two people review everything, the queue grows. If every pull request launches an expensive full test suite, infrastructure cost grows too. Neither outcome proves that the team is shipping more value.

The useful metric is **time from an accepted task to a verified production release**, not the number of commits.

## Five checks before expanding agent-driven development

### 1. Measure the entire change lifecycle

Record when work starts, when a pull request opens, when CI finishes, when review completes and when production deploys. Segment the figures by human-authored and AI-assisted changes without assuming either group is inherently better.

Track median and 90th-percentile lead times, not just averages. One stuck migration can distort an average, while a long tail of blocked changes reveals recurring friction.

**Action:** Review the ten slowest changes each week and identify the actual waiting stage.

### 2. Put limits on concurrent agent work

Parallel agents are useful when tasks are independent. They are less useful when several agents modify the same configuration, database model or shared component.

Define file ownership and task boundaries. Use short-lived branches, small changes and explicit integration points. Avoid launching five agents against one tightly coupled module simply because the tools permit it.

**Action:** Start with a small concurrency cap and raise it only when merge and review times remain stable.

### 3. Separate fast checks from expensive checks

A typo fix should not always consume the same CI resources as a database migration. Build a quick validation layer for formatting, types and targeted tests, followed by deeper integration and security checks where the risk justifies them.

Do not use this as an excuse to skip essential tests. Authentication, payments, permissions and personal-data handling need stronger verification regardless of who wrote the code.

**Action:** Measure CI queue time separately from test execution time. Buying faster runners will not solve flaky tests.

### 4. Make reviews explain the change

An AI-generated pull request should state its purpose, assumptions, affected modules, tests performed and rollback considerations. A reviewer needs to understand the intended behaviour, not read thousands of lines without context.

Require a human owner for production changes. Agents can propose, test and explain; accountability remains with the engineering team.

**Action:** Reject oversized changes that cannot be reviewed safely. Split them into independently testable units.

### 5. Keep the release path reversible

OpenAI describes initially deploying Pando as a proxy alongside its existing backend, keeping the two systems synchronized while migrating traffic. That is a useful rollout principle even if the underlying architecture is irrelevant to your company.

For startup features, use feature flags, staged rollouts, migration safeguards and tested rollback procedures. A faster implementation is not a win if recovery from failure takes a day.

**Action:** Every high-risk release should have a named owner and an explicit rollback decision.

## A seven-day operating experiment

**Day 1:** Export the last 30 merged pull requests. Record creation-to-merge time, CI duration, review waiting time and post-release defects.

**Day 2:** Identify the biggest bottleneck. Do not optimize five stages simultaneously.

**Day 3:** Introduce a standard AI-assisted pull-request template with assumptions, testing evidence and ownership.

**Day 4:** Set a concurrency limit for agents working in the same repository. Prefer tasks with minimal overlapping files.

**Day 5:** Add a fast CI lane for low-risk changes while preserving full checks for sensitive paths.

**Day 6:** Run a staged deployment and rehearse rollback on a non-critical feature.

**Day 7:** Compare lead time, review effort, failed checks and defects against the baseline. If the data is inconclusive, extend the experiment rather than declaring success.

A useful scorecard has four numbers: median time to merge, reviewer minutes per change, percentage of failed CI runs and escaped defects. Add customer adoption or operational savings when a feature reaches production.

## When should a startup actually rethink source control?

Only after measurement shows that repository operations themselves are a material constraint. If clone and fetch times dominate CI, branch operations repeatedly fail under concurrent load, and simpler measures have been exhausted, infrastructure changes may be justified.

Even then, evaluate caching, shallow clones, artifact reuse, repository boundaries and CI architecture before adopting a new backend. OpenAI's architecture solves a very specific scale problem. Copying it without that problem creates complexity rather than leverage.

For an Indian founder watching cloud costs and hiring budgets, this distinction is important. Engineering time spent on impressive infrastructure is time not spent improving the product.

For related operating decisions, see my guides on [turning AI-generated code into reliable releases](/founders-guide/ai-code-cheaper-startups-struggle-to-ship/) and [running a bounded GitHub agent pilot](/founders-guide/github-agentic-workflows-seven-day-pilot-indian-startups/).

## What I would ask in the next engineering review

Not “How many pull requests did our agents create?” Ask: “Which stage is now slowing delivery, how much does it cost, and what evidence shows the fix worked?”

The strongest engineering teams will not be those generating the most code. They will be those converting more changes into reliable outcomes without letting review, testing and operations become the new bottleneck.

*Source note: OpenAI's [November 2 engineering report](https://openai.com/index/scaling-git-at-openai/) is the primary source for Pando's architecture and reported performance. The startup recommendations and seven-day experiment are independent analysis; the hypothetical team example is illustrative.*
