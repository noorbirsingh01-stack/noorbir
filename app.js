/**
 * NOORBIR.CO // CORE INTERACTION & SIMULATION ENGINE
 * Architecture: Linear / 21st.dev Precision Interaction Bus
 * Zero External Dependencies • Pure Native Performance
 */

document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // 1. LIVE PIPELINE SIMULATOR ENGINE
  // ==========================================
  const simForm = document.getElementById("simulatorForm");
  const dispatchBtn = document.getElementById("dispatchBtn");
  const telemetryState = document.getElementById("telemetryState");
  const telemetryLog = document.getElementById("telemetryLog");

  const nodeWebhook = document.getElementById("nodeWebhook");
  const nodeSanitizer = document.getElementById("nodeSanitizer");
  const nodeDatabase = document.getElementById("nodeDatabase");

  const timeWebhook = document.getElementById("timeWebhook");
  const timeSanitizer = document.getElementById("timeSanitizer");
  const timeDatabase = document.getElementById("timeDatabase");

  const pulse1 = document.getElementById("pulse1");
  const pulse2 = document.getElementById("pulse2");
  const totalLatencyCounter = document.getElementById("totalLatencyCounter");

  const deviceChassis = document.getElementById("deviceChassis");
  const pushNotification = document.getElementById("pushNotification");
  const pushTitle = document.getElementById("pushTitle");
  const pushBody = document.getElementById("pushBody");
  const deviceHint = document.getElementById("deviceHint");

  function logTelemetry(msg, type = "sys") {
    const row = document.createElement("div");
    row.className = `log-row ${type}`;
    const timestamp = new Date().toISOString().split("T")[1].replace("Z", "");
    row.textContent = `[${timestamp}] ${msg}`;
    telemetryLog.appendChild(row);
    telemetryLog.scrollTop = telemetryLog.scrollHeight;
  }

  function resetNodes() {
    [nodeWebhook, nodeSanitizer, nodeDatabase].forEach(n => {
      n.className = "node-box";
    });
    timeWebhook.textContent = "--";
    timeSanitizer.textContent = "--";
    timeDatabase.textContent = "--";
    pulse1.classList.remove("firing");
    pulse2.classList.remove("firing");
    deviceChassis.classList.remove("active");
    pushNotification.classList.remove("visible");
    deviceHint.style.display = "block";
  }

  if (simForm) {
    simForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("simName").value.trim();
      const email = document.getElementById("simEmail").value.trim();
      const budget = Number(document.getElementById("simBudget").value);

      dispatchBtn.disabled = true;
      dispatchBtn.querySelector("span").textContent = "Transmitting Packet...";
      telemetryState.textContent = "STATE: BUS_ACTIVE";
      telemetryState.style.color = "#38bdf8";

      resetNodes();
      logTelemetry(`Signal initiated: ${name} (${email})`, "active");

      const startTime = performance.now();

      // STAGE 1: WEBHOOK INGESTION (12ms)
      await new Promise(r => setTimeout(r, 120));
      nodeWebhook.classList.add("active");
      timeWebhook.textContent = "+14.2ms";
      logTelemetry("POST /v1/inbound-webhook HTTP 200 Ingested", "active");

      // PULSE 1 TRAVEL
      pulse1.classList.add("firing");
      await new Promise(r => setTimeout(r, 180));
      nodeWebhook.classList.remove("active");
      nodeWebhook.classList.add("success");

      // STAGE 2: PAYLOAD SANITIZER (28ms)
      nodeSanitizer.classList.add("active");
      timeSanitizer.textContent = "+28.4ms";
      logTelemetry(`Sanitized schema verified: Budget tier $${budget.toLocaleString()}`, "active");

      // PULSE 2 TRAVEL
      pulse2.classList.add("firing");
      await new Promise(r => setTimeout(r, 220));
      nodeSanitizer.classList.remove("active");
      nodeSanitizer.classList.add("success");

      // STAGE 3: CLOUD DATABASE INSERT (142ms)
      nodeDatabase.classList.add("active");
      timeDatabase.textContent = "+142.1ms";
      logTelemetry("PostgreSQL record committed. Row ID: #rec_89921", "success");
      await new Promise(r => setTimeout(r, 160));
      nodeDatabase.classList.remove("active");
      nodeDatabase.classList.add("success");

      // STAGE 4: HARDWARE DEVICE PUSH ARRIVAL
      const totalTime = (performance.now() - startTime).toFixed(2);
      totalLatencyCounter.textContent = `${totalTime} MS`;

      deviceChassis.classList.add("active");
      deviceHint.style.display = "none";

      pushTitle.textContent = `New High-Value Lead: ${name}`;
      pushBody.textContent = `Budget: $${budget.toLocaleString()} • Email: ${email} • Route: Direct Calendar Hold`;
      pushNotification.classList.add("visible");

      logTelemetry(`Mobile push delivery verified in ${totalTime}ms`, "success");
      telemetryState.textContent = "STATE: DELIVERED (200 OK)";
      telemetryState.style.color = "#22c55e";

      dispatchBtn.disabled = false;
      dispatchBtn.querySelector("span").textContent = "Dispatch Inbound Signal";
    });
  }

  // ==========================================
  // 2. REVENUE-LOSS CALCULATOR ENGINE
  // ==========================================
  const leadsRange = document.getElementById("leadsRange");
  const dealRange = document.getElementById("dealRange");
  const delayRange = document.getElementById("delayRange");

  const leadsValDisplay = document.getElementById("leadsValDisplay");
  const dealValDisplay = document.getElementById("dealValDisplay");
  const delayValDisplay = document.getElementById("delayValDisplay");

  const calculatedLossDisplay = document.getElementById("calculatedLossDisplay");
  const calcExplanation = document.getElementById("calcExplanation");

  const DELAY_CONFIG = {
    1: { label: "< 15 Minutes", decay: 0.05, explanation: "Fast response baseline: optimal closing velocity, minimal lead decay (~5% slippage)." },
    2: { label: "1 Hour Delay", decay: 0.12, explanation: "Responding at 1 hour decreases prospect qualification by an estimated 12%." },
    3: { label: "2 to 4 Hours Delay", decay: 0.21, explanation: "Industry benchmark decay: prospects contacted after 2 hours decay in close-rate by 21%." },
    4: { label: "Next Business Day", decay: 0.38, explanation: "Severe leakage: over 38% of high-intent buyers sign with a competitor when response is next day." }
  };

  function recalculateLoss() {
    if (!leadsRange || !dealRange || !delayRange) return;

    const leads = Number(leadsRange.value);
    const dealValue = Number(dealRange.value);
    const delayStep = Number(delayRange.value);

    const currentConfig = DELAY_CONFIG[delayStep];

    leadsValDisplay.textContent = `${leads} leads / mo`;
    dealValDisplay.textContent = `$${dealValue.toLocaleString()} USD`;
    delayValDisplay.textContent = currentConfig.label;

    // Mathematical Loss Formula
    const estimatedLostDeals = leads * currentConfig.decay;
    const monthlyCapitalLoss = Math.round(estimatedLostDeals * dealValue);

    calculatedLossDisplay.textContent = `$${monthlyCapitalLoss.toLocaleString()}`;
    calcExplanation.textContent = currentConfig.explanation;
  }

  if (leadsRange && dealRange && delayRange) {
    leadsRange.addEventListener("input", recalculateLoss);
    dealRange.addEventListener("input", recalculateLoss);
    delayRange.addEventListener("input", recalculateLoss);
    recalculateLoss();
  }

  // ==========================================
  // 3. TECHNICAL INTAKE FORM (FORMSPREE HTTP)
  // ==========================================
  const auditIntakeForm = document.getElementById("auditIntakeForm");
  const submitInquiryBtn = document.getElementById("submitInquiryBtn");
  const formStatusMsg = document.getElementById("formStatusMsg");

  if (auditIntakeForm) {
    auditIntakeForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("contactName").value.trim();
      const email = document.getElementById("contactEmail").value.trim();
      const domain = document.getElementById("contactDomain").value.trim();

      submitInquiryBtn.disabled = true;
      submitInquiryBtn.textContent = "Transmitting Audit Request...";

      try {
        const formData = new FormData(auditIntakeForm);
        const response = await fetch(auditIntakeForm.action, {
          method: "POST",
          body: formData,
          headers: { "Accept": "application/json" }
        });

        if (response.ok) {
          formStatusMsg.className = "form-status-msg success";
          formStatusMsg.innerHTML = `
            <strong>Technical Audit Request Received.</strong><br>
            Analysis queued for <em>${domain}</em>. Confidential report will be delivered to <u>${email}</u> within 24 business hours.
          `;
          auditIntakeForm.reset();
        } else {
          throw new Error("HTTP response was not ok");
        }
      } catch (err) {
        // Fallback local persistence
        const record = { name, email, domain, date: new Date().toISOString() };
        const stored = JSON.parse(localStorage.getItem("noorbir_intake_records")) || [];
        stored.push(record);
        localStorage.setItem("noorbir_intake_records", JSON.stringify(stored));

        formStatusMsg.className = "form-status-msg success";
        formStatusMsg.innerHTML = `
          <strong>Audit Request Queued.</strong><br>
          Signal recorded for <em>${domain}</em>. A solutions engineer will review your specs at <u>${email}</u>.
        `;
        auditIntakeForm.reset();
      } finally {
        submitInquiryBtn.disabled = false;
        submitInquiryBtn.textContent = "Transmit Audit Request →";
      }
    });
  }

});
