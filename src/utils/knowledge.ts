export const knowledgeContent = `
# Agency Services & Pricing - Knowledge Base
## 1. Who we are & what we do

We are a product-focused agency that designs and builds:

* Modern websites and landing pages
* Full-stack web applications
* Mobile apps
* AI & **agentic** solutions (RAG chatbots, workflow agents, automation)
* Large-scale, production-grade systems

We help clients go from vague ideas to fully shipped products:
**strategy → UX/UI → architecture → development → deployment → iteration.**

All prices mentioned below reflect our **current early-bird offer: 35% discount** on our standard rates for projects booked in this period.

---

## 2. Service categories (for chatbot understanding)

The chatbot should recognize these broad categories when users describe their needs:

1. **Basic Website (Frontend Only)**

   * Examples: simple portfolio, small business site, basic marketing page.
   * No custom backend, usually 1-5 pages, minimal or no integrations.

2. **Full-Stack Website / Web App (Frontend + Backend)**

   * Examples: dashboards, SaaS apps, admin panels, internal tools.
   * Includes a backend (API, database, auth, basic business logic).

3. **Mobile Apps**

   * Native or cross-platform apps that mirror or extend web functionality.
   * Often paired with an existing or new backend.

4. **AI & Agentic Solutions**

   * RAG-based chatbots.
   * Workflow/agent automations (e.g., an agent to answer docs, schedule tasks, trigger API calls).
   * Multi-agent setups (one agent for support, one for analytics, etc.).

5. **Large-Scale / Custom Enterprise Solutions**

   * Complex systems with multiple services, data pipelines, or heavy traffic needs.
   * Examples: multi-tenant SaaS, complex integrations, data/ML pipelines, internal tools for large teams.

---

## 3. Pricing – high-level rules

> All prices below are **starting prices** and assume typical scope, normal timelines, and standard complexity.
> **All current prices already include a 35% early-bird discount.**

When the chatbot is asked for cost estimates, it should:

* Treat these as **rough estimates / ballparks**, not final quotes.
* Ask about:

  * Type of project (website, web app, mobile app, AI agent, etc.).
  * Key features (auth, dashboard, payment, integrations, admin panel, etc.).
  * Rough number of pages/screens.
  * Any special requirements (real-time, analytics, AI, etc.).
* Then map the answer to a **tier** using the sections below.

---

## 4. Website pricing

### 4.1 Basic website (frontend only)

**Definition**
A simple, mostly static marketing site or portfolio with minimal interactivity and no custom backend logic.

**Includes typically:**

* Custom design & responsive layout
* 1–5 pages (e.g., Home, About, Services, Contact, Blog listing)
* Basic animations & transitions
* Simple contact form (can send to email or existing service)
* Basic SEO setup (meta tags, mobile friendly)

**Starting price (with 35% early-bird discount):**

* **From $500** for extremely generic/basic websites (frontend only).

**When the chatbot should map to this tier:**

* User mentions: “simple website”, “basic landing page”, “portfolio website”, “static site”, “no backend”, “just show information”.
* Very few pages, no logins, no dashboards, no payments, no complex integrations.

---

### 4.2 Full-stack website / web application (frontend + backend)

**Definition**
A site or app that has both UI and backend logic with a database, APIs, and dynamic features.

**Typical features:**

* User authentication (login, signup, password reset)
* Dashboards or admin panels
* CRUD operations (create, read, update, delete data)
* Role-based access (admin vs normal user)
* Payment integrations (Stripe, Razorpay, etc.)
* Basic analytics, logs, email notifications

**Starting price (with 35% early-bird discount):**

* **From $1,000** for a small full-stack application (frontend + backend).

**Example scaling guidelines (for chatbot to use as language, not exact math):**

* Add **user authentication**: usually pushes you toward or above the $1,000–$1,500 range.
* Add **payments / subscriptions**: often in the **$1,500–$2,500+** range depending on complexity.
* Add **complex dashboards / multiple user roles**: can push to **$2,000–$3,500+**.
* Large multi-module web apps, complex workflows, or heavy integrations can go higher.

**When the chatbot should map to this tier:**

* User mentions: “web app”, “admin panel”, “dashboard”, “users can log in”, “database”, “backend API”, “SaaS”, “portal”, “internal tool”.

---

## 5. AI & agentic solutions (RAG, agents, automation)

### 5.1 What we build

We offer AI-powered and **agentic** solutions, such as:

* **RAG-based chatbots** that answer from your documents, website, or internal knowledge base.
* **Agentic workflows** where an agent can:

  * Look up information across tools/DBs,
  * Take actions (e.g., create tickets, send emails, update records),
  * Orchestrate multi-step flows.
* Multi-agent systems (e.g., one agent for customer support, another for incident triage, another for analytics).
* Integrations with third-party tools and APIs (CRM, ticketing, analytics, etc.).

### 5.2 Pricing

**Starting price (with 35% early-bird discount):**

* **From $2,500** for a focused, single-agent or RAG solution with a clear, limited scope.

**Example scaling guidelines:**

* **Basic AI chatbot with RAG**, answering from a small set of documents or a single knowledge base:

  * Roughly **$2,500–$4,000+** depending on integration complexity and UI.

* **Agentic workflow** (agent that can call tools/APIs, perform actions, and handle multi-step flows):

  * Often **$3,500–$7,500+** depending on number of tools, depth of logic, and monitoring.

* **Multi-agent platform** (several agents with different roles, dashboards, analytics, custom tooling):

  * Can go beyond **$7,500+** depending on scope and enterprise requirements.

**When the chatbot should map to this tier:**

* User mentions: “AI agent”, “agentic solution”, “RAG chatbot”, “LLM”, “knowledge base bot”, “automation with AI”, “AI that can take actions”, “AI for my company processes”, etc.

---

## 6. Mobile apps

We also build mobile apps, usually as part of or on top of a backend or web system.

**Typical mobile app scope:**

* iOS and/or Android app with several core screens (homepage, profile, settings, etc.).
* Uses an existing backend or a new backend we create.
* Can include push notifications, in-app purchases, basic offline support, etc.

**High-level guidance (for chatbot wording):**

* A **simple app** reusing an existing backend is typically in a similar range to a full-stack web app, often **starting around the $1,500–$2,500+** mark with the 35% early-bird discount applied.
* A **more complex app** (multiple features, custom backend, custom integrations) will scale beyond that.

(Exact starting number is flexible; the chatbot should frame it as “similar to or higher than our full-stack web app pricing” and recommend speaking to us for a detailed quote.)

---

## 7. Large-scale & enterprise solutions

For large scale / enterprise-grade systems:

* Multiple services or microservices
* Data pipelines, analytics, or ML integrations
* Role-based systems across teams or departments
* Multi-tenant SaaS platforms
* Heavy traffic / performance constraints

**Pricing is highly custom.**
The chatbot should:

* Clearly say that such projects are **scoped individually**.
* Mention that they **start from several thousand dollars** and can go significantly higher depending on scale.
* Encourage the user to book a call or share detailed requirements for a precise quote.

---

## 8. Early-bird discount (35%)

We are currently running an **early-bird offer**:

* All starting prices mentioned in this document **already include a 35% discount** compared to our usual list prices.
* This discount applies to projects **booked during the early-bird period**.
* Final pricing is still based on:

  * Scope and complexity
  * Timelines (standard vs urgent)
  * Integrations and non-functional requirements (security, compliance, scale)

When the chatbot is asked about discounts, it should respond along the lines of:

> “We currently offer a 35% early-bird discount on our standard pricing. The starting prices I’m quoting (e.g., $500 for basic websites, $1,000 for full-stack sites, $2,500 for agentic solutions) already include this discount.”

---

## 9. How the chatbot should talk about estimates

When a user clicks **“Estimate Cost”** or asks about pricing, the chatbot should:

1. **Identify category** (basic website / full-stack app / mobile app / AI agent / large-scale solution).
2. **Ask 2–4 clarifying questions**:

   * “Do you need just a simple frontend website or also a backend with logins/dashboards?”
   * “Do you need AI/agentic functionality like a chatbot or workflow automation?”
   * “Roughly how many pages or screens do you expect?”
   * “Do you need payments, subscriptions, or third-party integrations?”
3. **Map to starting tier + rough range** using this document:

   * Basic website → mention **“starts from $500”**.
   * Full-stack site/app → mention **“starts from $1,000”** and ranges up with complexity.
   * Agentic solutions → mention **“starts from $2,500”** and scales with workflows & integrations.
4. **Always add a disclaimer**:

   * “This is a rough estimate based on what you’ve shared. We can give you a more accurate quote after a short call or detailed requirements.”

---

## 10. Example answers the chatbot can give

These are sample phrasings the chatbot can reuse or adapt.

### Example 1 – Simple website

> For a simple, frontend-only website (like a basic portfolio or marketing page with a few sections and no backend), our projects **start from around $500** with our current **35% early-bird discount**.
> If you need more pages, custom design, or animations, the price can increase slightly, but $500 is a good starting reference.

### Example 2 – Web app with login + dashboard

> For a full-stack web application with a frontend and backend, including features like user login and a basic dashboard, pricing **starts from around $1,000** with our early-bird discount.
> As you add more features (roles, payments, complex dashboards, integrations), it can move into the **$1,500–$3,000+** range.
> I can give a tighter ballpark if you share the main features you have in mind.

### Example 3 – AI / agentic solution with RAG

> For an AI or agentic solution, such as a chatbot that answers from your own documents or an agent that can call tools and automate workflows, pricing **starts from about $2,500** with our 35% early-bird discount.
> A simple, focused agent or RAG chatbot will be near the lower end.
> More advanced multi-step workflows, multiple tools, or multi-agent setups can cost more, and are usually scoped individually.

### Example 4 – Large-scale / enterprise project

> Large, enterprise-level systems (multi-service architectures, complex data pipelines, heavy traffic, or many user roles) are priced on a custom basis.
> They typically start from several thousand dollars and scale with complexity and non-functional requirements.
> For this kind of project, the best next step is a short call where we can understand your needs and then share a proper proposal.

---

## 11. General FAQs

**Q: Are these prices fixed?**
A: No, these are **starting points** and rough estimates. Final pricing depends on scope, complexity, integrations, and timelines. The early-bird discount (35%) is already applied to these starting figures.

**Q: Do you offer maintenance and support?**
A: Yes, we can provide ongoing maintenance, support, and feature upgrades as a separate retainer or support plan, depending on your needs.

**Q: How long does a typical project take?**
A:

* Simple websites can often be done in a few weeks.
* Full-stack apps and AI/agentic solutions typically take a few weeks to a couple of months, depending on scope.
  The exact timeline is shared once we understand your requirements.

**Q: What tech stack do you use?**
A: We use modern, production-ready stacks for frontend, backend, and AI (for example, React/Next.js, modern backend frameworks, cloud providers, and LLMs for agentic solutions). We pick the tools that best fit the project.

**Q: Do I own the code and IP?**
A: Yes. Unless specified otherwise, once the project is completed and paid for, you own the code and project IP.

`;