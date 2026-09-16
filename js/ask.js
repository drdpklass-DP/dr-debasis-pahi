// Ask the Professor — Demo intelligence layer
// Designed to be replaced / connected to the full Ind-AS Professor skill backend

const SAMPLE_KNOWLEDGE = {
  "115": {
    keywords: ["115", "revenue", "five-step", "five step", "performance obligation", "variable consideration"],
    response: `<strong>Ind AS 115 — Revenue from Contracts with Customers</strong><br><br>
<strong>The Five-Step Model</strong> (Core Principle):<br>
1. Identify the contract with a customer<br>
2. Identify the performance obligations in the contract<br>
3. Determine the transaction price<br>
4. Allocate the transaction price to the performance obligations<br>
5. Recognise revenue when (or as) the entity satisfies a performance obligation<br><br>
<strong>Control Transfer</strong> is the key test. Indicators include: present right to payment, legal title, physical possession, significant risks & rewards of ownership, and customer acceptance.<br><br>
<strong>Variable consideration</strong> must be estimated (Expected Value or Most Likely Amount) and constrained so that it is highly probable a significant reversal will not occur.<br><br>
<strong>Classic Red Flags</strong>: Bill-and-hold arrangements, channel stuffing, unconstrained estimates of variable consideration, artificial splitting of performance obligations, and side letters not reflected in the accounting.<br><br>
Would you like the journal-entry templates or a numerical illustration?`
  },
  "116": {
    keywords: ["116", "lease", "rou", "right-of-use", "lessee", "lessor"],
    response: `<strong>Ind AS 116 — Leases (Lessee Perspective)</strong><br><br>
A contract is (or contains) a lease if it conveys the <em>right to control the use</em> of an identified asset for a period of time in exchange for consideration.<br><br>
<strong>Initial Recognition</strong>:<br>
• Lease Liability = Present value of unpaid lease payments (discounted at the interest rate implicit in the lease or the lessee’s incremental borrowing rate)<br>
• Right-of-use (ROU) Asset = Liability + initial direct costs + prepaid lease payments − lease incentives + estimated dismantling costs<br><br>
<strong>Key Journal Entries</strong>:<br>
<code>Dr Right-of-use Asset<br>&nbsp;&nbsp;&nbsp;Cr Lease Liability</code><br><br>
Subsequent:<br>
<code>Dr Finance Cost &nbsp;&nbsp;&nbsp;Cr Lease Liability<br>Dr Depreciation &nbsp;&nbsp;&nbsp;Cr Accum. Dep. – ROU<br>Dr Lease Liability &nbsp;&nbsp;&nbsp;Cr Cash</code><br><br>
<strong>Red Flags</strong>: Arrangements labelled as “service contracts” that actually contain a lease, unrealistic incremental borrowing rates, lease terms that ignore reasonably certain extension options, and sale-and-leaseback structures that accelerate gains.<br><br>
Shall I expand on the exemptions or a numerical example?`
  },
  "109": {
    keywords: ["109", "ecl", "expected credit", "impairment", "stage 1", "stage 2", "stage 3", "sicr"],
    response: `<strong>Ind AS 109 — Expected Credit Losses (ECL)</strong><br><br>
<strong>Three-Stage Model</strong>:<br>
• <strong>Stage 1</strong> — No significant increase in credit risk since initial recognition → 12-month ECL<br>
• <strong>Stage 2</strong> — Significant increase in credit risk (SICR) → Lifetime ECL<br>
• <strong>Stage 3</strong> — Credit-impaired → Lifetime ECL + interest revenue calculated on the net carrying amount<br><br>
<strong>SICR Assessment</strong>: Compare the risk of a default occurring at the reporting date with the risk at initial recognition. Past-due > 30 days is a rebuttable presumption of SICR.<br><br>
<strong>Measurement</strong>: Probability-weighted estimate of credit losses that incorporates unbiased outcomes, time value of money, and reasonable & supportable forward-looking information.<br><br>
<strong>Red Flags for Auditors</strong>: Optimistic staging (keeping exposures in Stage 1), systematically optimistic forward-looking scenarios, unsupported recovery rates, large management overlays without transparent disclosure, and sudden Stage 3 transfers timed with reporting pressure.<br><br>
Would you like the journal entries or a deeper discussion on forward-looking information?`
  },
  "carve": {
    keywords: ["carve", "difference", "ind-as vs ifrs", "ind as vs ifrs", "vs ifrs", "carve-out"],
    response: `<strong>Major Ind-AS vs IFRS Differences (High-level)</strong><br><br>
While Ind-AS is substantially converged with IFRS, important carve-outs and differences remain:<br><br>
• <strong>Ind AS 40</strong> — Investment Property: Cost model is the only model permitted (fair value model not allowed as the primary measurement basis).<br>
• <strong>Ind AS 101</strong> — First-time Adoption: Several additional exemptions and exceptions tailored for the Indian transition.<br>
• <strong>Ind AS 103</strong> — Business Combinations: Specific guidance on common-control transactions (often book-value method).<br>
• <strong>Ind AS 109 / 32</strong> — Certain classification and measurement options and presentation differences for financial instruments.<br>
• Presentation and terminology differences driven by Schedule III of the Companies Act, 2013.<br><br>
Always verify the exact current language in the official Ind-AS text and any MCA notifications, because the carve-out list evolves.<br><br>
Which specific standard’s differences would you like me to expand on?`
  },
  "default": {
    response: `Thank you for the question. In a full deployment this interface is connected to the complete <strong>Ind-AS & IFRS Professor skill</strong>, which has access to the official text of every Ind-AS standard, decision trees, numerical examples, journal entries and red-flag libraries.<br><br>
For this demonstration I can give strong guidance on:<br>
• Ind AS 115 (Revenue)<br>
• Ind AS 116 (Leases)<br>
• Ind AS 109 (Expected Credit Losses)<br>
• Major Ind-AS vs IFRS carve-outs<br><br>
Please try one of the suggestion buttons, or rephrase your question around one of the above topics. For a full personalised consultation or teaching session, please use the <a href="contact.html" class="text-teal-400 underline">Contact</a> page.`
  }
};

function findResponse(text) {
  const lower = text.toLowerCase();
  for (const [key, data] of Object.entries(SAMPLE_KNOWLEDGE)) {
    if (key === "default") continue;
    if (data.keywords.some(k => lower.includes(k))) {
      return data.response;
    }
  }
  return SAMPLE_KNOWLEDGE.default.response;
}

function appendMessage(html, isUser = false) {
  const container = document.getElementById("chat-messages");
  const wrapper = document.createElement("div");
  wrapper.className = "flex gap-3 " + (isUser ? "justify-end" : "");
  
  if (isUser) {
    wrapper.innerHTML = `
      <div class="msg-user rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%] text-sm text-navy-900 font-medium">
        ${html}
      </div>`;
  } else {
    wrapper.innerHTML = `
      <div class="w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-gold-500 flex items-center justify-center font-serif font-bold text-navy-900 text-sm shrink-0">DP</div>
      <div class="msg-prof rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] text-sm leading-relaxed">
        <p class="font-medium text-teal-400 mb-1">Dr. Debasis Pahi</p>
        ${html}
      </div>`;
  }
  container.appendChild(wrapper);
  container.scrollTop = container.scrollHeight;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const suggestions = document.getElementById("suggestions");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    appendMessage(text, true);
    input.value = "";
    suggestions.style.display = "none";

    setTimeout(() => {
      const reply = findResponse(text);
      appendMessage(reply);
    }, 600);
  });

  document.querySelectorAll(".suggest-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      input.value = btn.textContent;
      form.dispatchEvent(new Event("submit"));
    });
  });
});
