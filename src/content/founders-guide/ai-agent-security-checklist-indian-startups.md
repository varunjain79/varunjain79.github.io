---
title: "AI Agent Security Checklist for Indian Startups: 10 Controls Before Production"
description: "A practical AI agent security checklist for Indian startup CTOs: permissions, secrets, tool access, logging, approvals and incident response."
publishedDate: 2026-11-06
updatedDate: 2026-11-06
category: "Build Guide"
tags: ["AI agents", "AI security", "startup CTO", "access control", "engineering operations"]
featured: false
draft: false
readingTime: "7 min read"
keyTakeaway: "Treat an AI agent as a privileged software identity, not a chatbot. Give it minimum access, constrain its tools, require approval for irreversible actions and retain enough logs to investigate mistakes."
---

**The short answer:** Before connecting an AI agent to production data, a startup should define what it can read, what it can change, who approves sensitive actions, how secrets are protected and how the agent can be stopped. An impressive demo is not a security review.

A [Reuters investigation published on November 3, 2026](https://www.reuters.com/business/openai-employees-warned-about-operational-security-lapses-years-sources-say-2026-11-03/) described warnings from former OpenAI employees about internal access and security practices. OpenAI disputed the implication that its most sensitive work was unprotected, saying it separates sensitive systems and invests in security. The reporting is a reminder that even sophisticated AI organisations face trade-offs between speed and control.

For an Indian startup, the lesson is not to copy the internal practices of a large AI lab. It is to ask a simpler question: **If an agent behaves incorrectly tomorrow, what can it actually damage?**

## The risk changes when AI can take actions

A chatbot that drafts a response is relatively easy to supervise. An agent connected to GitHub, customer records, email, payments or cloud infrastructure can execute changes at machine speed.

Three failure modes deserve attention:

- **Excessive permissions:** A tool intended to read a record also receives permission to update or delete it.
- **Untrusted instructions:** Content from a webpage, document or message attempts to redirect the agent's behaviour.
- **Weak accountability:** A production change occurs without a clear owner, approval trail or reproducible log.

These are familiar security problems with a new interface. The model adds uncertainty because it interprets instructions probabilistically; the surrounding software must enforce hard boundaries.

## A ten-control checklist for founders and CTOs

### 1. Give every agent its own identity

Avoid using a founder's personal administrator account as the agent credential. Use a separate service identity, with permissions tied to a defined workflow. That makes revocation and audit easier.

### 2. Default to read-only access

An agent analysing recruitment funnel data should not automatically be able to change candidate statuses. Begin with read permissions. Add narrowly scoped write actions only when a real business use case justifies them.

### 3. Separate research from execution

Let one stage gather evidence and propose a change. Let another stage validate and execute it. For high-impact actions, require human approval. A draft email and a sent email should never be treated as equivalent.

### 4. Keep secrets outside prompts

API keys, database credentials and access tokens belong in a secrets manager or controlled runtime, not pasted into instructions or stored in generated files. Rotate credentials after suspected exposure and avoid printing secrets in logs.

### 5. Validate every tool argument

The backend must enforce permissions, allowed resources and input constraints even if the agent's prompt says to behave safely. Never rely on natural-language instructions as the only authorization layer.

### 6. Treat retrieved content as untrusted

A résumé, support ticket or scraped webpage may contain instructions addressed to the assistant. Those instructions are data, not commands. Keep the agent's governing instructions separate from retrieved material and restrict which tools can act on that material.

### 7. Put limits on spending and volume

Set caps on API expenditure, emails sent, records modified and tool calls per run. A malfunction should be contained to a small, measurable blast radius rather than becoming a surprise cloud bill or mass update.

### 8. Log decisions and tool calls

Capture the agent identity, request ID, tool name, target resource, approval decision, outcome and timestamp. Protect sensitive data in logs. Retention should match the business's privacy and compliance obligations.

### 9. Build a kill switch

Document how to disable the workflow, revoke its credentials, stop scheduled runs and roll back reversible changes. Test this before granting broad access.

### 10. Test failures, not just happy paths

Include malicious document instructions, unauthorized record requests, duplicate actions, network timeouts and partial failures in evaluation. A successful demo tells you little about how the system behaves under pressure.

## A seven-day rollout plan

**Day 1:** Inventory every agent, connected tool, credential and dataset. Identify who owns each workflow.

**Day 2:** Classify actions as read-only, reversible write or high-impact write. Remove unnecessary permissions.

**Day 3:** Implement server-side authorization and explicit allowlists for sensitive tools. Do not assume the model will enforce them.

**Day 4:** Add approval checkpoints for sending messages, changing customer data, deleting records and modifying production infrastructure.

**Day 5:** Configure logging, spending limits, rate limits and alerts. Verify that logs do not leak credentials or private records.

**Day 6:** Run adversarial tests using untrusted documents and deliberately invalid requests. Confirm that unauthorized actions fail.

**Day 7:** Conduct a simulated incident: revoke access, stop the agent, identify affected records and restore the previous state.

Keep the pilot small. Expand permissions only after evidence supports the decision.

## What should the founder measure?

Measure attempted unauthorized actions blocked, percentage of sensitive writes requiring approval, time to revoke agent access, incidents per workflow and the number of workflows with a tested rollback process. Also track delivery speed: controls should make safe automation repeatable, not merely slow it down.

The goal is not zero automation risk. It is to make failures visible, bounded and recoverable.

For teams already using coding agents, my earlier [seven-day GitHub agent workflow pilot](/founders-guide/github-agentic-workflows-seven-day-pilot-indian-startups/) explains how to start with low-risk engineering investigations. The [AI coding delivery guide](/founders-guide/ai-code-cheaper-startups-struggle-to-ship/) covers why generated output still needs verification and ownership.

## The founder decision

Startups cannot afford enterprise-sized security teams. They also cannot afford an agent with unrestricted access to their customer database.

The sensible middle ground is straightforward: **small permissions, clear approvals, hard backend checks and a tested shutdown path**. Build those before you connect the next agent.

*Source note: The November 3 Reuters report provides the news context. The checklist and rollout plan are independent operational recommendations, not findings attributed to Reuters or OpenAI.*
