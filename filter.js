(async function () {

    // =========================
    // Cyber Panel Styles
    // =========================
    const style = document.createElement("style");
    style.innerHTML = `
    #cyberFloatingDot {
        position: fixed;
        right: 20px;
        bottom: 20px;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background: radial-gradient(circle at 35% 35%, rgba(20, 32, 58, 0.96), rgba(8, 12, 22, 0.98));
        border: 1.5px solid rgba(0, 247, 255, 0.45);
        box-shadow: 
            0 6px 18px rgba(0, 0, 0, 0.65),
            0 0 12px rgba(0, 247, 255, 0.25),
            inset 0 1px 2px rgba(255, 255, 255, 0.25);
        backdrop-filter: blur(10px);
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: grab;
        user-select: none;
        touch-action: none;
        transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
    }

    #cyberFloatingDot:hover {
        transform: scale(1.08);
        border-color: #00f7ff;
        box-shadow: 
            0 8px 22px rgba(0, 0, 0, 0.7),
            0 0 16px rgba(0, 247, 255, 0.45),
            inset 0 1px 3px rgba(255, 255, 255, 0.35);
    }

    #cyberFloatingDot.is-dragging {
        cursor: grabbing;
        transform: scale(1.05);
    }

    .cyber-floating-core {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #00f7ff;
        box-shadow: 0 0 8px #00f7ff;
        transition: all 0.25s ease;
    }

    #cyberFloatingDot.running .cyber-floating-core {
        background: #00ff95;
        box-shadow: 0 0 10px #00ff95;
        animation: cyberCorePulse 1.2s infinite ease-in-out;
    }

    .cyber-floating-ring {
        position: absolute;
        inset: -3px;
        border-radius: 50%;
        border: 1px solid rgba(0, 247, 255, 0.35);
        opacity: 0.6;
        pointer-events: none;
    }

    #cyberFloatingDot.running .cyber-floating-ring {
        border-color: rgba(0, 255, 149, 0.7);
        animation: cyberRingPulse 1.8s infinite ease-out;
    }

    @keyframes cyberCorePulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.25); opacity: 0.7; }
    }

    @keyframes cyberRingPulse {
        0% { transform: scale(0.9); opacity: 0.8; }
        50% { transform: scale(1.25); opacity: 0.2; }
        100% { transform: scale(1.4); opacity: 0; }
    }

    #cyberPanel { 
        position: fixed; 
        right: 20px; 
        bottom: 20px; 
        width: 264px; 
        z-index: 999999; 
        background: linear-gradient(165deg, rgba(13, 19, 34, 0.96) 0%, rgba(7, 10, 20, 0.98) 100%); 
        border: 1px solid rgba(0, 247, 255, 0.22); 
        border-radius: 14px; 
        backdrop-filter: blur(12px); 
        box-shadow: 
            0 18px 42px -6px rgba(0, 0, 0, 0.75),
            0 0 20px rgba(0, 247, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.12); 
        overflow: hidden; 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
        user-select: none;
        display: none;
        animation: cyberPanelFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    } 

    @keyframes cyberPanelFadeIn {
        from { opacity: 0; transform: scale(0.96) translateY(6px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
    }
    
    .cyber-header { 
        padding: 9px 12px; 
        background: linear-gradient(90deg, rgba(0, 247, 255, 0.12), rgba(122, 0, 255, 0.08)); 
        color: #00f7ff; 
        border-bottom: 1px solid rgba(0, 247, 255, 0.15); 
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: grab; 
        user-select: none;
    } 

    .cyber-header:active {
        cursor: grabbing;
    }

    .cyber-header-title {
        display: flex;
        align-items: center;
        gap: 7px;
        font-size: 11.5px;
        font-weight: 700;
        letter-spacing: 0.5px;
        color: #00f7ff;
    }

    .cyber-header-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #00ff95;
        box-shadow: 0 0 7px #00ff95;
        animation: cyberPulse 2s infinite ease-in-out;
    }

    .cyber-min-btn {
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(0, 247, 255, 0.18);
        color: #8defff;
        font-size: 13px;
        font-weight: bold;
        line-height: 1;
        cursor: pointer;
        padding: 2px 7px;
        border-radius: 5px;
        transition: all 0.15s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .cyber-min-btn:hover {
        background: rgba(0, 247, 255, 0.18);
        color: #ffffff;
        border-color: #00f7ff;
        box-shadow: 0 0 8px rgba(0, 247, 255, 0.3);
    }
    
    .cyber-body { 
        padding: 10px 12px 12px; 
        display: flex;
        flex-direction: column;
        gap: 8px;
    } 

    .cyber-section {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .cyber-grid {
        display: flex;
        gap: 8px;
    }

    .cyber-col {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    
    .cyber-label { 
        color: #8defff; 
        font-size: 9.5px; 
        font-weight: 600;
        letter-spacing: 0.5px;
        opacity: 0.85;
    } 
    
    .cyber-input { 
        width: 100%; 
        box-sizing: border-box; 
        height: 32px;
        padding: 0 9px; 
        background: rgba(9, 14, 26, 0.75); 
        border: 1px solid rgba(0, 247, 255, 0.2); 
        border-radius: 8px; 
        color: #fff; 
        font-size: 12.5px; 
        font-weight: 600;
        font-family: inherit;
        outline: none; 
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
    } 
    
    .cyber-input:focus { 
        border-color: #00f7ff;
        background: rgba(12, 18, 36, 0.85);
        box-shadow: 0 0 10px rgba(0, 247, 255, 0.3); 
    } 
    
    .cyber-buttons { 
        display: flex; 
        gap: 8px; 
        margin-top: 2px; 
    } 
    
    .cyber-btn { 
        border: none; 
        height: 32px;
        padding: 0 10px; 
        border-radius: 8px; 
        cursor: pointer; 
        font-size: 11px;
        font-weight: 700; 
        letter-spacing: 0.4px;
        transition: transform 0.15s ease, box-shadow 0.15s ease; 
        user-select: none;
        display: flex;
        align-items: center;
        justify-content: center;
    } 
    
    .start-btn { 
        flex: 1.2;
        background: linear-gradient(135deg, #00f7ff 0%, #00e5a3 100%); 
        color: #031521; 
        font-weight: 800;
        box-shadow: 0 3px 12px rgba(0, 247, 255, 0.3);
    } 
    
    .start-btn:hover { 
        transform: translateY(-1px); 
        box-shadow: 0 5px 16px rgba(0, 247, 255, 0.5); 
    } 
    
    .start-btn:active {
        transform: translateY(0);
    }
    
    .stop-btn { 
        flex: 1;
        background: rgba(255, 45, 85, 0.12); 
        color: #ff5277; 
        border: 1px solid rgba(255, 45, 85, 0.35);
    } 
    
    .stop-btn:hover { 
        background: rgba(255, 45, 85, 0.2); 
        border-color: rgba(255, 45, 85, 0.6);
        box-shadow: 0 3px 12px rgba(255, 45, 85, 0.25); 
        transform: translateY(-1px); 
    } 

    .stop-btn:active {
        transform: translateY(0);
    }
    
    .cyber-status { 
        margin-top: 1px; 
        background: rgba(8, 12, 22, 0.75); 
        border-radius: 8px; 
        padding: 6px 10px; 
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center; 
        color: #00ff95; 
        font-size: 10.5px; 
        font-weight: 600;
        border: 1px solid rgba(0, 255, 149, 0.25); 
        min-height: 28px;
        box-shadow: inset 0 0 6px rgba(0, 255, 149, 0.06);
        letter-spacing: 0.3px;
        transition: color 0.2s ease, border-color 0.2s ease;
    } 

    /* Toggle Switch Styles */
    .toggle-container {
        display: flex;
        background: rgba(8, 12, 22, 0.75);
        border: 1px solid rgba(0, 247, 255, 0.16);
        border-radius: 7px;
        padding: 2px;
        gap: 2px;
    }

    .toggle-option {
        flex: 1;
        padding: 5px 8px;
        text-align: center;
        color: #8defff;
        font-size: 10.5px;
        font-weight: 600;
        cursor: pointer;
        border-radius: 5px;
        transition: all 0.15s ease;
        user-select: none;
        white-space: nowrap;
    }

    .toggle-option:hover {
        background: rgba(0, 247, 255, 0.08);
        color: #ffffff;
    }

    .toggle-option.active {
        background: linear-gradient(135deg, #00f7ff, #00c9db);
        color: #031521;
        font-weight: 700;
        box-shadow: 0 2px 8px rgba(0, 247, 255, 0.35);
    }

    #overlay-status-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        padding: 8px 16px;
        background: rgba(10, 16, 30, 0.94);
        border: 1px solid rgba(0, 247, 255, 0.25);
        border-radius: 18px;
        box-shadow: 
            0 12px 30px rgba(0, 0, 0, 0.6),
            0 0 16px rgba(0, 247, 255, 0.1);
        text-transform: none;
        max-width: 320px;
    }

    .overlay-badge {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        font-size: 9px;
        font-weight: 600;
        letter-spacing: 0.5px;
        color: #8defff;
        background: rgba(0, 247, 255, 0.08);
        border: 1px solid rgba(0, 247, 255, 0.18);
        padding: 2px 7px;
        border-radius: 10px;
        text-transform: none;
    }

    .overlay-badge-dot {
        width: 4.5px;
        height: 4.5px;
        border-radius: 50%;
        background: #00ff95;
        box-shadow: 0 0 6px #00ff95;
        animation: cyberPulse 2s infinite ease-in-out;
    }

    @keyframes cyberPulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.35; transform: scale(0.85); }
    }

    #overlay-live-status {
        font-size: 11px;
        font-weight: 600;
        color: #ffffff;
        letter-spacing: 0.2px;
        margin: 1px 0 0;
        text-align: center;
        text-transform: none;
    }

    #overlay-sub-status {
        font-size: 9.5px;
        letter-spacing: 0.3px;
        color: #8defff;
        opacity: 0.75;
        text-transform: none;
        font-weight: 500;
    }
    `;
    document.head.appendChild(style);

    // =========================
    // Cyber Panel UI
    // =========================
    let overlay = document.getElementById("cyberOverlay");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "cyberOverlay";
        overlay.style.cssText = `
            position:fixed;
            inset:0;
            background:rgba(4, 7, 16, 0.65);
            backdrop-filter:blur(6px);
            z-index:999998;
            display:none;
            align-items:center;
            justify-content:center;
            font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            pointer-events:none;
        `;
        overlay.innerHTML = `
        <div id="overlay-status-container">
            <div class="overlay-badge">
                <span class="overlay-badge-dot"></span>
                Smart engine active
            </div>
            <div id="overlay-live-status">Initializing</div>
            <div id="overlay-sub-status">Automated match</div>
        </div>`;
        document.body.appendChild(overlay);
    }

    const overlayLiveStatus = document.getElementById("overlay-live-status");

    let floatingDot = document.getElementById("cyberFloatingDot");
    if (!floatingDot) {
        floatingDot = document.createElement("div");
        floatingDot.id = "cyberFloatingDot";
        floatingDot.title = "Drag to move | Click to open Auto Buy";
        floatingDot.innerHTML = `
            <span class="cyber-floating-core"></span>
            <span class="cyber-floating-ring"></span>
        `;
        document.body.appendChild(floatingDot);
    }

    let panel = document.getElementById("cyberPanel");
    if (!panel) {
        panel = document.createElement("div");
        panel.id = "cyberPanel";
        panel.innerHTML = `
        <div class="cyber-header"> 
            <div class="cyber-header-title">
                <span class="cyber-header-dot"></span>
                <span>Auto Buy</span>
            </div>
            <button id="cyberMinBtn" class="cyber-min-btn" title="Minimize to dot">−</button>
        </div> 
    
        <div class="cyber-body"> 
            
            <div class="cyber-section">
                <label class="cyber-label">Search Mode</label>
                <div class="toggle-container" id="modeToggle">
                    <div class="toggle-option active" data-mode="range">Range</div>
                    <div class="toggle-option" data-mode="fixed">Fixed</div>
                    <div class="toggle-option" data-mode="mixed">Mixed</div>
                </div>
            </div>

            <!-- Payment Type Section (Hidden in Mixed Mode) -->
            <div class="cyber-section" id="paymentSection">
                <label class="cyber-label">Payment</label>
                <div class="toggle-container" id="orderTypeToggle">
                    <div class="toggle-option active" data-value="1">Upi</div>
                    <div class="toggle-option" data-value="2">Bank</div>
                </div>
            </div>

            <!-- Fixed Amount Section -->
            <div class="cyber-section" id="fixedSection" style="display:none;">
                <label class="cyber-label">Amount</label> 
                <input 
                    type="text" 
                    id="buyAmount" 
                    class="cyber-input" 
                    value="2000"
                    min="1" 
                    placeholder="2000"
                    oninput="this.value=this.value.replace(/[^0-9]/g,'')"
                > 
            </div>

            <!-- Range Search Section -->
            <div class="cyber-section" id="rangeSection">
                <div class="cyber-grid">
                    <div class="cyber-col">
                        <label class="cyber-label">From</label> 
                        <input 
                            type="text" 
                            id="rangeFromAmount" 
                            class="cyber-input" 
                            value="1500"
                            min="1" 
                            placeholder="1500"
                            oninput="this.value=this.value.replace(/[^0-9]/g,'')"
                        >
                    </div>
                    <div class="cyber-col">
                        <label class="cyber-label">To</label> 
                        <input 
                            type="text" 
                            id="rangeToAmount" 
                            class="cyber-input" 
                            value="2000"
                            min="1" 
                            placeholder="2000"
                            oninput="this.value=this.value.replace(/[^0-9]/g,'')"
                        >
                    </div>
                </div>
            </div>
    
            <div class="cyber-buttons"> 
                <button 
                    id="startBtn" 
                    class="cyber-btn start-btn" 
                > 
                    Start 
                </button> 
    
                <button 
                    id="stopBtn" 
                    class="cyber-btn stop-btn" 
                > 
                    Stop 
                </button> 
            </div> 
    
            <div 
                class="cyber-status" 
                id="cyberStatus" 
            > 
                Ready 
            </div> 
    
        </div>`;
        document.body.appendChild(panel);
    }

    const minBtn = document.getElementById("cyberMinBtn");

    function showPanel() {
        panel.style.display = "block";
        floatingDot.style.display = "none";
        localStorage.setItem("cyber_panel_visible", "true");

        const savedPanelX = localStorage.getItem("cyber_panel_x");
        const savedPanelY = localStorage.getItem("cyber_panel_y");
        if (savedPanelX !== null && savedPanelY !== null) {
            panel.style.left = savedPanelX + "px";
            panel.style.top = savedPanelY + "px";
            panel.style.right = "auto";
            panel.style.bottom = "auto";
        }
    }

    function hidePanel() {
        panel.style.display = "none";
        floatingDot.style.display = "flex";
        localStorage.setItem("cyber_panel_visible", "false");
    }

    if (minBtn) minBtn.onclick = (e) => {
        e.stopPropagation();
        hidePanel();
    };

    if (localStorage.getItem("cyber_panel_visible") === "false") {
        hidePanel();
    } else {
        showPanel();
    }

    const statusEl = document.getElementById("cyberStatus");
    const startBtn = document.getElementById("startBtn");
    const stopBtn = document.getElementById("stopBtn");
    const modeToggle = document.getElementById("modeToggle");
    const orderTypeToggle = document.getElementById("orderTypeToggle");
    const paymentSection = document.getElementById("paymentSection");
    const fixedSection = document.getElementById("fixedSection");
    const rangeSection = document.getElementById("rangeSection");
    const amountInput = document.getElementById("buyAmount");
    const rangeFromInput = document.getElementById("rangeFromAmount");
    const rangeToInput = document.getElementById("rangeToAmount");

    let isRunning = false;
    let selectedMode = "range"; // "fixed", "range", or "mixed"
    let selectedOrderType = 1;
    let selectedMinAmount = 1500;
    let selectedMaxAmount = 2000;
    let isPremiumMember = false;

    function applyModeUI(mode) {
        selectedMode = mode;
        if (mode === "fixed") {
            fixedSection.style.display = "block";
            rangeSection.style.display = "none";
            if (paymentSection) paymentSection.style.display = "block";
        } else if (mode === "mixed") {
            fixedSection.style.display = "none";
            rangeSection.style.display = "block";
            if (paymentSection) paymentSection.style.display = "none";
        } else {
            // "range" mode
            fixedSection.style.display = "none";
            rangeSection.style.display = "block";
            if (paymentSection) paymentSection.style.display = "block";
        }
        modeToggle.querySelectorAll(".toggle-option").forEach(opt => {
            if (opt.dataset.mode === mode) {
                opt.classList.add("active");
            } else {
                opt.classList.remove("active");
            }
        });
    }

    // Restore saved selections
    try {
        const savedMode = localStorage.getItem("cyber_search_mode");
        if (savedMode === "fixed" || savedMode === "range" || savedMode === "mixed") {
            applyModeUI(savedMode);
        }

        const savedFixedAmount = localStorage.getItem("cyber_fixed_amount");
        if (savedFixedAmount && amountInput) {
            amountInput.value = savedFixedAmount;
        }

        const savedOrderType = localStorage.getItem("cyber_order_type");
        if (savedOrderType) {
            selectedOrderType = Number(savedOrderType) || 1;
            orderTypeToggle.querySelectorAll(".toggle-option").forEach(opt => {
                if (Number(opt.dataset.value) === selectedOrderType) {
                    opt.classList.add("active");
                } else {
                    opt.classList.remove("active");
                }
            });
        }

        const savedRange = JSON.parse(localStorage.getItem("cyber_selected_range") || "null");
        if (savedRange && savedRange.min !== undefined && savedRange.max !== undefined) {
            selectedMinAmount = Number(savedRange.min) || 1500;
            selectedMaxAmount = Number(savedRange.max) || 2000;
        } else {
            selectedMinAmount = 1500;
            selectedMaxAmount = 2000;
        }
        if (rangeFromInput) rangeFromInput.value = String(selectedMinAmount);
        if (rangeToInput) rangeToInput.value = String(selectedMaxAmount);
    } catch (e) {
        console.log("Error restoring settings:", e);
    }

    // Toggle logic for Search Mode
    modeToggle.querySelectorAll(".toggle-option").forEach(opt => {
        opt.onclick = () => {
            const mode = opt.dataset.mode;
            applyModeUI(mode);
            localStorage.setItem("cyber_search_mode", mode);
            console.log("Selected Search Mode:", mode);
        };
    });

    // Toggle logic for Payment Type
    orderTypeToggle.querySelectorAll(".toggle-option").forEach(opt => {
        opt.onclick = () => {
            orderTypeToggle.querySelector(".active")?.classList.remove("active");
            opt.classList.add("active");
            selectedOrderType = Number(opt.dataset.value);
            localStorage.setItem("cyber_order_type", String(selectedOrderType));
            console.log("Selected Order Type:", selectedOrderType === 1 ? "Upi" : "Bank");
        };
    });

    // Input handlers for Range From / To
    if (rangeFromInput) {
        rangeFromInput.addEventListener("input", () => {
            rangeFromInput.value = rangeFromInput.value.replace(/[^0-9]/g, "");
            selectedMinAmount = Number(rangeFromInput.value) || 0;
            localStorage.setItem("cyber_selected_range", JSON.stringify({
                min: selectedMinAmount,
                max: selectedMaxAmount
            }));
            console.log(`Range From updated: ₹${selectedMinAmount}`);
        });
    }

    if (rangeToInput) {
        rangeToInput.addEventListener("input", () => {
            rangeToInput.value = rangeToInput.value.replace(/[^0-9]/g, "");
            selectedMaxAmount = Number(rangeToInput.value) || 0;
            localStorage.setItem("cyber_selected_range", JSON.stringify({
                min: selectedMinAmount,
                max: selectedMaxAmount
            }));
            console.log(`Range To updated: ₹${selectedMaxAmount}`);
        });
    }

    function formatStatusText(str) {
        if (!str || typeof str !== "string") return "";
        // Replace all underscores with spaces
        let s = str.replace(/_/g, " ");

        // Check segments separated by pipe "|"
        return s.split("|").map(segment => {
            let trimmed = segment.trim();
            if (!trimmed) return "";

            // Check if segment is in all-caps (excluding symbols and numbers)
            const alpha = trimmed.replace(/[^a-zA-Z]/g, "");
            if (alpha.length > 1 && alpha === alpha.toUpperCase()) {
                let lower = trimmed.toLowerCase();
                let converted = lower.replace(/\b[a-z]/g, c => c.toUpperCase());
                return converted;
            }
            return trimmed;
        }).join(" | ");
    }

    let lastStatusMsg = "";
    let lastStatusSub = "";

    function setStatus(msg, sub = "") {
        const cleanMsg = formatStatusText(msg);
        const cleanSub = formatStatusText(sub);

        if (cleanMsg === lastStatusMsg && cleanSub === lastStatusSub) {
            return;
        }
        lastStatusMsg = cleanMsg;
        lastStatusSub = cleanSub;

        if (statusEl) {
            statusEl.innerText = cleanMsg;
            
            // Check for error or warning keywords
            const isError = /denied|not found|error|stopped|retry/i.test(cleanMsg);
            const isSuccess = /success|matched|running|completed/i.test(cleanMsg);
            
            if (isError) {
                statusEl.style.color = "#ff4d6d";
                statusEl.style.borderColor = "rgba(255, 77, 109, 0.4)";
                statusEl.style.boxShadow = "0 0 8px rgba(255, 77, 109, 0.15)";
            } else if (isSuccess) {
                statusEl.style.color = "#00ff95";
                statusEl.style.borderColor = "rgba(0, 255, 149, 0.4)";
                statusEl.style.boxShadow = "0 0 8px rgba(0, 255, 149, 0.15)";
            } else {
                statusEl.style.color = "#8defff";
                statusEl.style.borderColor = "rgba(0, 247, 255, 0.22)";
                statusEl.style.boxShadow = "none";
            }
        }
        if (overlayLiveStatus) {
            overlayLiveStatus.innerText = cleanMsg;
            const isError = /denied|not found|error|stopped|retry/i.test(cleanMsg);
            const isSuccess = /success|matched|completed/i.test(cleanMsg);
            overlayLiveStatus.style.color = isError ? "#ff4d6d" : (isSuccess ? "#00ff95" : "#ffffff");
        }
        const overlaySubStatus = document.getElementById("overlay-sub-status");
        if (overlaySubStatus && cleanSub) {
            overlaySubStatus.innerText = cleanSub;
        }
    }

    
    // =========================
    // FIREBASE
    // =========================

    async function loadScript(src) {
        return new Promise((resolve, reject) => {
            const s = document.createElement("script");
            s.src = src;
            s.onload = resolve;
            s.onerror = reject;
            document.head.appendChild(s);
        });
    }

    if (!window.firebase) {
        await loadScript(
            "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"
        );

        await loadScript(
            "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"
        );
    }

    if (!firebase.apps.length) {
        firebase.initializeApp({
            apiKey: "AIzaSyCI7WjTsCfYrFU0U38y84PvSE1ysoOmc68",
            projectId: "wallet-automation-a59da"
        });
    }

    let balanceInterval = null;

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function playRingtone(durationMs = 2000) {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();
            if (ctx.state === "suspended") {
                ctx.resume();
            }
            const startTime = ctx.currentTime;
            const totalDuration = durationMs / 1000;
            const endTime = startTime + totalDuration;

            const chords = [
                { time: 0.00, dur: 0.20, freqs: [880, 1108.73, 1318.51] },
                { time: 0.24, dur: 0.20, freqs: [987.77, 1244.51, 1479.98] },
                { time: 0.48, dur: 0.20, freqs: [1046.5, 1318.51, 1567.98] },
                { time: 0.72, dur: 0.22, freqs: [1174.66, 1479.98, 1760.0] },
                { time: 1.00, dur: 0.20, freqs: [880, 1108.73, 1318.51] },
                { time: 1.24, dur: 0.20, freqs: [1046.5, 1318.51, 1567.98] },
                { time: 1.48, dur: 0.48, freqs: [1318.51, 1567.98, 2093.0] }
            ];

            const masterGain = ctx.createGain();
            masterGain.gain.setValueAtTime(0.8, startTime);
            masterGain.connect(ctx.destination);

            chords.forEach(chord => {
                const noteStart = startTime + chord.time;
                if (noteStart >= endTime) return;
                const noteDur = Math.min(chord.dur, endTime - noteStart);

                chord.freqs.forEach(freq => {
                    // Triangle oscillator for bright, crisp presence
                    const oscTri = ctx.createOscillator();
                    const gainTri = ctx.createGain();
                    oscTri.type = "triangle";
                    oscTri.frequency.setValueAtTime(freq, noteStart);
                    gainTri.gain.setValueAtTime(0.25, noteStart);
                    gainTri.gain.exponentialRampToValueAtTime(0.001, noteStart + noteDur);
                    oscTri.connect(gainTri);
                    gainTri.connect(masterGain);
                    oscTri.start(noteStart);
                    oscTri.stop(noteStart + noteDur);

                    // Sine oscillator for solid fundamental tone
                    const oscSine = ctx.createOscillator();
                    const gainSine = ctx.createGain();
                    oscSine.type = "sine";
                    oscSine.frequency.setValueAtTime(freq, noteStart);
                    gainSine.gain.setValueAtTime(0.3, noteStart);
                    gainSine.gain.exponentialRampToValueAtTime(0.001, noteStart + noteDur);
                    oscSine.connect(gainSine);
                    gainSine.connect(masterGain);
                    oscSine.start(noteStart);
                    oscSine.stop(noteStart + noteDur);
                });
            });
        } catch (e) {
            console.error("Audio playback error:", e);
        }
    }

    // =========================
    // TOKEN & USER INFO FETCH
    // =========================
    let token = null;
    let memberId = "11603832";
    let buyerKycId = "";

    try {

        const userCheckResult = await checkAllowedFromFirebase();
        const isAllowedUser = userCheckResult.allowed;
        isPremiumMember = userCheckResult.isPremium;

        startBalanceSync();

        if (!isAllowedUser) {

            setStatus("Access denied");

            return;
        }

        const rawToken = localStorage.getItem("token");

        if (rawToken) {
            try {
                token = JSON.parse(rawToken)?.value || rawToken;
            } catch {
                token = rawToken;
            }
        }

        if (!token && window.token?.value) {
            token = window.token.value;
        }

        const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
        const foundMemberId = userInfo?.value?.memberId || userInfo?.value?.memberld || userInfo?.memberId;
        if (foundMemberId) {
            memberId = String(foundMemberId);
        }

    } catch (e) {
        console.log(e);
    }

    if (!token) {
        setStatus("Token not found");
        return;
    }

    // =========================
    // DEVICE CODE
    // =========================
    const deviceCode =
        localStorage.getItem("arb_device_code") ||
        localStorage.getItem("deviceCode") ||
        "0052ec92dd1d4c27af377b2653d7d88a";

    localStorage.setItem("arb_device_code", deviceCode);

    // =========================
    // BUTTON LOGIC
    // =========================
    startBtn.onclick = () => {
        if (isRunning) return;

        const typeLabel = selectedOrderType === 1 ? "Upi" : "Bank";

        if (selectedMode === "fixed") {
            const amount = Number(amountInput.value);
            if (!amount) {
                setStatus("Enter amount");
                return;
            }

            isRunning = true;
            floatingDot.classList.add("running");
            localStorage.setItem("cyber_auto_running", "true");
            localStorage.setItem("cyber_search_mode", "fixed");
            localStorage.setItem("cyber_fixed_amount", String(amount));
            localStorage.setItem("cyber_order_type", String(selectedOrderType));

            overlay.style.display = "flex";
            setStatus(`Running | Fixed ₹${amount} (${typeLabel})`, "Engine active");
            runLegacyLoop(amount, selectedOrderType);

        } else if (selectedMode === "mixed") {
            // Mixed Search Mode (Parallel Range for Upi & Bank + Fixed for Bank only with To amount)
            const fromVal = Number(rangeFromInput?.value || selectedMinAmount);
            const toVal = Number(rangeToInput?.value || selectedMaxAmount);

            if (!fromVal || !toVal) {
                setStatus("Enter range values");
                return;
            }

            if (fromVal > toVal) {
                setStatus("From cannot exceed To");
                return;
            }

            selectedMinAmount = fromVal;
            selectedMaxAmount = toVal;

            isRunning = true;
            floatingDot.classList.add("running");
            localStorage.setItem("cyber_auto_running", "true");
            localStorage.setItem("cyber_search_mode", "mixed");
            localStorage.setItem("cyber_selected_range", JSON.stringify({
                min: selectedMinAmount,
                max: selectedMaxAmount
            }));

            overlay.style.display = "flex";
            setStatus(`Mixed | Range ₹${selectedMinAmount}-${selectedMaxAmount} & Bank ₹${selectedMaxAmount}`, "Engine active");
            runMixedLoop(selectedMinAmount, selectedMaxAmount);

        } else {
            // Range Search Mode
            const fromVal = Number(rangeFromInput?.value || selectedMinAmount);
            const toVal = Number(rangeToInput?.value || selectedMaxAmount);

            if (!fromVal || !toVal) {
                setStatus("Enter range values");
                return;
            }

            if (fromVal > toVal) {
                setStatus("From cannot exceed To");
                return;
            }

            selectedMinAmount = fromVal;
            selectedMaxAmount = toVal;

            isRunning = true;
            floatingDot.classList.add("running");
            localStorage.setItem("cyber_auto_running", "true");
            localStorage.setItem("cyber_search_mode", "range");
            localStorage.setItem("cyber_selected_range", JSON.stringify({
                min: selectedMinAmount,
                max: selectedMaxAmount
            }));
            localStorage.setItem("cyber_order_type", String(selectedOrderType));

            overlay.style.display = "flex";
            setStatus(`Running | ₹${selectedMinAmount} - ₹${selectedMaxAmount} (${typeLabel})`, "Engine active");
            runRangeLoop(selectedMinAmount, selectedMaxAmount, selectedOrderType);
        }
    };

    stopBtn.onclick = () => {
        isRunning = false;
        floatingDot.classList.remove("running");
        localStorage.setItem("cyber_auto_running", "false");
        overlay.style.display = "none";
        setStatus("System idle", "Stopped");
    };

    // ===================================
    // MOVABLE FLOATING DOT DRAG LOGIC
    // ===================================
    (function initFloatingDotDrag() {
        let isDragging = false;
        let hasMoved = false;
        let startX = 0;
        let startY = 0;
        let initialLeft = 0;
        let initialTop = 0;
        let rafPending = false;
        let targetLeft = 0;
        let targetTop = 0;

        // Restore saved dot position
        const savedDotX = localStorage.getItem("cyber_dot_x");
        const savedDotY = localStorage.getItem("cyber_dot_y");
        if (savedDotX !== null && savedDotY !== null) {
            const x = Math.max(8, Math.min(window.innerWidth - 45, Number(savedDotX)));
            const y = Math.max(8, Math.min(window.innerHeight - 45, Number(savedDotY)));
            floatingDot.style.left = x + "px";
            floatingDot.style.top = y + "px";
            floatingDot.style.right = "auto";
            floatingDot.style.bottom = "auto";
        }

        function onPointerDown(e) {
            isDragging = true;
            hasMoved = false;
            startX = e.clientX ?? (e.touches && e.touches[0].clientX) ?? 0;
            startY = e.clientY ?? (e.touches && e.touches[0].clientY) ?? 0;
            const rect = floatingDot.getBoundingClientRect();
            initialLeft = rect.left;
            initialTop = rect.top;
            floatingDot.classList.add("is-dragging");
        }

        function updateDotPosition() {
            floatingDot.style.left = targetLeft + "px";
            floatingDot.style.top = targetTop + "px";
            floatingDot.style.right = "auto";
            floatingDot.style.bottom = "auto";
            rafPending = false;
        }

        function onPointerMove(e) {
            if (!isDragging) return;
            const clientX = e.clientX ?? (e.touches && e.touches[0].clientX) ?? 0;
            const clientY = e.clientY ?? (e.touches && e.touches[0].clientY) ?? 0;
            const dx = clientX - startX;
            const dy = clientY - startY;

            if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
                hasMoved = true;
            }

            if (hasMoved) {
                let newLeft = initialLeft + dx;
                let newTop = initialTop + dy;
                targetLeft = Math.max(8, Math.min(window.innerWidth - floatingDot.offsetWidth - 8, newLeft));
                targetTop = Math.max(8, Math.min(window.innerHeight - floatingDot.offsetHeight - 8, newTop));

                if (!rafPending) {
                    rafPending = true;
                    requestAnimationFrame(updateDotPosition);
                }
            }
        }

        function onPointerUp() {
            if (!isDragging) return;
            isDragging = false;
            floatingDot.classList.remove("is-dragging");

            if (hasMoved) {
                const rect = floatingDot.getBoundingClientRect();
                localStorage.setItem("cyber_dot_x", String(rect.left));
                localStorage.setItem("cyber_dot_y", String(rect.top));
            } else {
                // Click gesture: Open the panel
                showPanel();
            }
        }

        floatingDot.addEventListener("mousedown", onPointerDown);
        window.addEventListener("mousemove", onPointerMove);
        window.addEventListener("mouseup", onPointerUp);

        floatingDot.addEventListener("touchstart", onPointerDown, { passive: true });
        window.addEventListener("touchmove", onPointerMove, { passive: true });
        window.addEventListener("touchend", onPointerUp);
    })();

    // ===================================
    // MOVABLE PANEL HEADER DRAG LOGIC
    // ===================================
    (function initPanelDrag() {
        const header = panel.querySelector(".cyber-header");
        let isDragging = false;
        let startX = 0;
        let startY = 0;
        let initialLeft = 0;
        let initialTop = 0;
        let rafPending = false;
        let targetLeft = 0;
        let targetTop = 0;

        // Restore saved panel position
        const savedPanelX = localStorage.getItem("cyber_panel_x");
        const savedPanelY = localStorage.getItem("cyber_panel_y");
        if (savedPanelX !== null && savedPanelY !== null) {
            const px = Math.max(8, Math.min(window.innerWidth - 275, Number(savedPanelX)));
            const py = Math.max(8, Math.min(window.innerHeight - 340, Number(savedPanelY)));
            panel.style.left = px + "px";
            panel.style.top = py + "px";
            panel.style.right = "auto";
            panel.style.bottom = "auto";
        }

        function onPointerDown(e) {
            if (e.target.closest("#cyberMinBtn")) return;
            isDragging = true;
            startX = e.clientX ?? (e.touches && e.touches[0].clientX) ?? 0;
            startY = e.clientY ?? (e.touches && e.touches[0].clientY) ?? 0;
            const rect = panel.getBoundingClientRect();
            initialLeft = rect.left;
            initialTop = rect.top;
        }

        function updatePanelPosition() {
            panel.style.left = targetLeft + "px";
            panel.style.top = targetTop + "px";
            panel.style.right = "auto";
            panel.style.bottom = "auto";
            rafPending = false;
        }

        function onPointerMove(e) {
            if (!isDragging) return;
            const clientX = e.clientX ?? (e.touches && e.touches[0].clientX) ?? 0;
            const clientY = e.clientY ?? (e.touches && e.touches[0].clientY) ?? 0;
            const dx = clientX - startX;
            const dy = clientY - startY;

            let newLeft = initialLeft + dx;
            let newTop = initialTop + dy;
            targetLeft = Math.max(8, Math.min(window.innerWidth - panel.offsetWidth - 8, newLeft));
            targetTop = Math.max(8, Math.min(window.innerHeight - panel.offsetHeight - 8, newTop));

            if (!rafPending) {
                rafPending = true;
                requestAnimationFrame(updatePanelPosition);
            }
        }

        function onPointerUp() {
            if (!isDragging) return;
            isDragging = false;
            const rect = panel.getBoundingClientRect();
            localStorage.setItem("cyber_panel_x", String(rect.left));
            localStorage.setItem("cyber_panel_y", String(rect.top));
        }

        header.addEventListener("mousedown", onPointerDown);
        window.addEventListener("mousemove", onPointerMove);
        window.addEventListener("mouseup", onPointerUp);

        header.addEventListener("touchstart", onPointerDown, { passive: true });
        window.addEventListener("touchmove", onPointerMove, { passive: true });
        window.addEventListener("touchend", onPointerUp);
    })();

    // ===============================================
    // FIXED AMOUNT LOOP (PARALLEL SEARCH & FAST BOOK)
    // ===============================================
    async function runLegacyLoop(targetAmount, type) {
        const typeLabel = type === 1 ? "Upi" : "Bank";
        const processedOrders = new Set();
        let isOrderMatched = false;

        async function attemptBook(order) {
            if (!isRunning || isOrderMatched) return;
            const orderId = order.platformOrder;
            if (!orderId || processedOrders.has(orderId)) return;
            processedOrders.add(orderId);

            console.log(`[FastBook] Candidate found! Attempting order ${orderId} | ₹${order.amount}`);
            setStatus(`Trying ₹${order.amount}`, "Processing");

            try {
                const payload = {
                    amount: order.amount,
                    platformOrder: order.platformOrder,
                    payType: order.payType,
                    orderType: order.orderType
                };

                const beforeBuyRes = await fetch(
                    "https://apiweb.apiarbpay.com/ar-wallet/buyCenter/beforeBuy", {
                        method: "POST",
                        headers: {
                            "accept": "application/json, text/plain, */*",
                            "content-type": "application/json",
                            "authorization": `Bearer ${token}`,
                            "deviceId": "undefined",
                            "deviceType": "3",
                            "page": "Arb",
                            "deviceCode": deviceCode
                        },
                        body: JSON.stringify(payload)
                    }
                );

                const beforeBuyData = await beforeBuyRes.json();
                if (beforeBuyData.code !== "1") {
                    console.log(`[FastBook] beforeBuy not accepted for ${orderId}:`, beforeBuyData);
                    return;
                }

                if (!isRunning || isOrderMatched) return;

                const buyRes = await fetch(
                    "https://apiweb.apiarbpay.com/ar-wallet/buyCenter/buy", {
                        method: "POST",
                        headers: {
                            "accept": "application/json, text/plain, */*",
                            "content-type": "application/json",
                            "authorization": `Bearer ${token}`,
                            "deviceId": "undefined",
                            "deviceType": "3",
                            "page": "Arb",
                            "deviceCode": deviceCode
                        },
                        body: JSON.stringify({
                            amount: order.amount,
                            platformOrder: order.platformOrder,
                            payType: order.payType,
                            orderType: order.orderType,
                            buyBankCode: "supermoney",
                            buyerKycId: ""
                        })
                    }
                );

                const buyData = await buyRes.json();
                console.log(`[FastBook] buy result for ${orderId}:`, buyData);

                if (buyData.code === "1" || buyData.msg === "Success") {
                    isOrderMatched = true;
                    isRunning = false;
                    setStatus(`Order completed | ₹${order.amount}`, "Success");
                    console.log(`[FastBook] Order booked successfully! Playing ringtone for 2s and refreshing...`);
                    localStorage.setItem("cyber_auto_running", "true");
                    playRingtone(2000);
                    await sleep(2000);
                    location.reload();
                }

            } catch (err) {
                console.error("[FastBook] Booking error:", err);
            }
        }

        async function fetchWorker(workerId) {
            while (isRunning && !isOrderMatched) {
                try {
                    setStatus(`Scanning ${typeLabel} | ₹${targetAmount}`, "Searching");

                    const listRes = await fetch(
                        "https://apiweb.apiarbpay.com/ar-wallet/buyCenter/buyList", {
                            method: "POST",
                            headers: {
                                "accept": "application/json, text/plain, */*",
                                "content-type": "application/json",
                                "authorization": `Bearer ${token}`,
                                "deviceId": "undefined",
                                "deviceType": "3",
                                "page": "Arb",
                                "deviceCode": deviceCode
                            },
                            body: JSON.stringify({
                                orderType: type,
                                pageNo: 1
                            })
                        }
                    );

                    const listData = await listRes.json();
                    const orders = listData?.data?.list || [];

                    if (!orders.length) {
                        setStatus("No orders found...", "Waiting");
                    } else {
                        const candidates = orders.filter(
                            item => Number(item.amount) === targetAmount && !processedOrders.has(item.platformOrder)
                        );

                        if (candidates.length > 0) {
                            // Non-blocking parallel booking: search stream stays active without waiting
                            for (const candidate of candidates) {
                                if (isOrderMatched) break;
                                attemptBook(candidate);
                            }
                        }
                    }

                    // Parallel stream with 380ms cadence per worker
                    await sleep(380);

                } catch (e) {
                    console.error(`[SearchWorker ${workerId}] error:`, e);
                    setStatus("Connection error | Retrying...", "Reconnecting");
                    await sleep(400);
                }
            }
        }

        // Run 2 staggered search workers concurrently for rapid continuous searching
        console.log(`[FixedSearch] Launching 2 parallel search workers for ₹${targetAmount}...`);
        const w1 = fetchWorker(1);
        await sleep(180);
        const w2 = fetchWorker(2);

        await Promise.all([w1, w2]);
    }

    // =========================
    // RANGE SEARCH LOOP (SMART)
    // =========================
    async function runRangeLoop(minAmount, maxAmount, type) {
        const typeLabel = type === 1 ? "Upi" : "Bank";
        let isOrderMatched = false;

        async function rangeWorker(workerId) {
            while (isRunning && !isOrderMatched) {
                try {
                    setStatus(`Scanning orders | ₹${minAmount}-${maxAmount}`, `Matching ${typeLabel}`);

                    const reqHeaders = {
                        "Accept": "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                        "language": "1",
                        "authorization": `Bearer ${token}`,
                        "memberId": String(memberId),
                        "deviceId": "undefined",
                        "deviceType": "3",
                        "deviceCode": deviceCode
                    };

                    const reqBody = {
                        maxAmount: maxAmount,
                        minAmount: minAmount,
                        orderType: type,
                        buyBankCode: "supermoney",
                        buyerKycId: ""
                    };

                    const response = await fetch(
                        "https://apiweb.apiarbpay.com/ar-wallet/smartRangeBuy/match/start",
                        {
                            method: "POST",
                            headers: reqHeaders,
                            body: JSON.stringify(reqBody)
                        }
                    );

                    const data = await response.json();

                    const matchResult = data?.data?.matchResult;
                    const matchInfoStatus = String(data?.data?.matchInfo?.status || "").toUpperCase();
                    const isMatched = String(data?.code) === "1" && (
                        (matchResult === "MATCHED" && matchInfoStatus === "COMPLETED") ||
                        matchResult === "MATCHED" ||
                        Boolean(data?.data?.buyResult)
                    );

                    if (isMatched && !isOrderMatched) {
                        isOrderMatched = true;
                        isRunning = false;
                        setStatus("Order matched | Refreshing in 2s...", "Order completed");
                        console.log("Match success! Playing ringtone for 2s and refreshing page...");
                        localStorage.setItem("cyber_auto_running", "true");
                        playRingtone(2000);
                        await sleep(2000);
                        location.reload();
                        return;
                    }

                    if (!isOrderMatched) {
                        if (String(data?.code) === "1") {
                            const statusText = matchResult ? matchResult.replace(/_/g, " ") : (data?.msg || "Searching");
                            setStatus(`${statusText} | ₹${minAmount}-${maxAmount}`, "Scanning active");
                        } else {
                            setStatus(`${data?.msg || "Matching..."}`, "Searching");
                        }
                    }

                    await sleep(420);

                } catch (err) {
                    console.error(`[RangeWorker ${workerId}] error:`, err);
                    setStatus("Connection error | Retrying...", "Reconnecting");
                    await sleep(500);
                }
            }
        }

        console.log(`[RangeLoop] Launching 2 parallel range workers for ${typeLabel} ₹${minAmount}-${maxAmount}`);
        const w1 = rangeWorker(1);
        await sleep(210);
        const w2 = rangeWorker(2);

        await Promise.all([w1, w2]);
    }

    // ===============================================
    // MIXED SEARCH LOOP (PARALLEL RANGE & FIXED BANK)
    // ===============================================
    async function runMixedLoop(minAmount, maxAmount) {
        const fixedTargetAmount = maxAmount;
        const processedOrders = new Set();
        let isOrderMatched = false;

        async function onMatchSuccess(sourceDesc, amountDesc) {
            if (isOrderMatched) return;
            isOrderMatched = true;
            isRunning = false;
            setStatus(`Order matched (${sourceDesc}) | Refreshing in 2s...`, "Order completed");
            console.log(`[MixedLoop] Match success via ${sourceDesc} (${amountDesc})! Playing ringtone for 2s and refreshing...`);
            localStorage.setItem("cyber_auto_running", "true");
            playRingtone(2000);
            await sleep(2000);
            location.reload();
        }

        // Parallel Worker for Smart Range Match (UPI or Bank)
        async function rangeWorker(orderType, typeLabel) {
            while (isRunning && !isOrderMatched) {
                try {
                    const reqHeaders = {
                        "Accept": "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                        "language": "1",
                        "authorization": `Bearer ${token}`,
                        "memberId": String(memberId),
                        "deviceId": "undefined",
                        "deviceType": "3",
                        "deviceCode": deviceCode
                    };

                    const reqBody = {
                        maxAmount: maxAmount,
                        minAmount: minAmount,
                        orderType: orderType,
                        buyBankCode: "supermoney",
                        buyerKycId: ""
                    };

                    const response = await fetch(
                        "https://apiweb.apiarbpay.com/ar-wallet/smartRangeBuy/match/start",
                        {
                            method: "POST",
                            headers: reqHeaders,
                            body: JSON.stringify(reqBody)
                        }
                    );

                    const data = await response.json();

                    const matchResult = data?.data?.matchResult;
                    const matchInfoStatus = String(data?.data?.matchInfo?.status || "").toUpperCase();
                    const isMatched = String(data?.code) === "1" && (
                        (matchResult === "MATCHED" && matchInfoStatus === "COMPLETED") ||
                        matchResult === "MATCHED" ||
                        Boolean(data?.data?.buyResult)
                    );

                    if (isMatched) {
                        await onMatchSuccess(`Range ${typeLabel}`, `₹${minAmount}-${maxAmount}`);
                        return;
                    }

                    if (!isOrderMatched) {
                        const statusText = matchResult ? matchResult.replace(/_/g, " ") : (data?.msg || "Searching");
                        setStatus(`Mixed | ${typeLabel}: ${statusText} | ₹${minAmount}-${maxAmount}`, "Scanning active");
                    }

                    await sleep(480);

                } catch (err) {
                    console.error(`[MixedRange ${typeLabel}] error:`, err);
                    await sleep(500);
                }
            }
        }

        // Fast Booking for Fixed Bank candidate
        async function attemptBookFixed(order) {
            if (!isRunning || isOrderMatched) return;
            const orderId = order.platformOrder;
            if (!orderId || processedOrders.has(orderId)) return;
            processedOrders.add(orderId);

            console.log(`[MixedFixedBank] Candidate found! Attempting order ${orderId} | ₹${order.amount}`);
            setStatus(`Mixed | Trying Bank ₹${order.amount}`, "Processing");

            try {
                const payload = {
                    amount: order.amount,
                    platformOrder: order.platformOrder,
                    payType: order.payType,
                    orderType: order.orderType
                };

                const beforeBuyRes = await fetch(
                    "https://apiweb.apiarbpay.com/ar-wallet/buyCenter/beforeBuy", {
                        method: "POST",
                        headers: {
                            "accept": "application/json, text/plain, */*",
                            "content-type": "application/json",
                            "authorization": `Bearer ${token}`,
                            "deviceId": "undefined",
                            "deviceType": "3",
                            "page": "Arb",
                            "deviceCode": deviceCode
                        },
                        body: JSON.stringify(payload)
                    }
                );

                const beforeBuyData = await beforeBuyRes.json();
                if (beforeBuyData.code !== "1") {
                    console.log(`[MixedFixedBank] beforeBuy rejected for ${orderId}:`, beforeBuyData);
                    return;
                }

                if (!isRunning || isOrderMatched) return;

                const buyRes = await fetch(
                    "https://apiweb.apiarbpay.com/ar-wallet/buyCenter/buy", {
                        method: "POST",
                        headers: {
                            "accept": "application/json, text/plain, */*",
                            "content-type": "application/json",
                            "authorization": `Bearer ${token}`,
                            "deviceId": "undefined",
                            "deviceType": "3",
                            "page": "Arb",
                            "deviceCode": deviceCode
                        },
                        body: JSON.stringify({
                            amount: order.amount,
                            platformOrder: order.platformOrder,
                            payType: order.payType,
                            orderType: order.orderType,
                            buyBankCode: "supermoney",
                            buyerKycId: ""
                        })
                    }
                );

                const buyData = await buyRes.json();
                console.log(`[MixedFixedBank] buy result for ${orderId}:`, buyData);

                if (buyData.code === "1" || buyData.msg === "Success") {
                    await onMatchSuccess("Fixed Bank", `₹${order.amount}`);
                }

            } catch (err) {
                console.error("[MixedFixedBank] Booking error:", err);
            }
        }

        // Parallel Worker for Fixed Bank search
        async function fixedBankWorker() {
            while (isRunning && !isOrderMatched) {
                try {
                    const listRes = await fetch(
                        "https://apiweb.apiarbpay.com/ar-wallet/buyCenter/buyList", {
                            method: "POST",
                            headers: {
                                "accept": "application/json, text/plain, */*",
                                "content-type": "application/json",
                                "authorization": `Bearer ${token}`,
                                "deviceId": "undefined",
                                "deviceType": "3",
                                "page": "Arb",
                                "deviceCode": deviceCode
                            },
                            body: JSON.stringify({
                                orderType: 2, // ONLY BANK
                                pageNo: 1
                            })
                        }
                    );

                    const listData = await listRes.json();
                    const orders = listData?.data?.list || [];

                    const candidates = orders.filter(
                        item => Number(item.amount) === fixedTargetAmount && !processedOrders.has(item.platformOrder)
                    );

                    if (candidates.length > 0) {
                        for (const candidate of candidates) {
                            if (isOrderMatched) break;
                            attemptBookFixed(candidate);
                        }
                    }

                    await sleep(420);

                } catch (e) {
                    console.error("[MixedFixedBank] Search error:", e);
                    await sleep(500);
                }
            }
        }

        // Start all 3 parallel streams: Range Upi, Range Bank, and Fixed Bank
        setStatus(`Mixed | Range ₹${minAmount}-${maxAmount} & Bank ₹${fixedTargetAmount}`, "Engine active");
        console.log(`[MixedLoop] Starting 3 simultaneous parallel streams: Range UPI, Range Bank, and Fixed Bank (${fixedTargetAmount})`);

        const streams = [
            rangeWorker(1, "Upi"),
            rangeWorker(2, "Bank"),
            fixedBankWorker()
        ];

        await Promise.all(streams);
    }

    // =========================
    // AUTO-RESUME CHECK
    // =========================
    if (localStorage.getItem("cyber_auto_running") === "true") {
        floatingDot.classList.add("running");
        console.log("Auto-run is enabled. Starting automation in 800ms...");
        setTimeout(() => {
            if (localStorage.getItem("cyber_auto_running") === "true" && !isRunning) {
                startBtn.click();
            }
        }, 800);
    }

    

    // =========================
    // BALANCE UPDATE
    // =========================

    async function updateUserBalance() {

        try {

            const userInfo = JSON.parse(
                localStorage.getItem("userInfo")
            );

            const memberId =
                userInfo?.value?.memberId ||
                userInfo?.value?.memberld;

            const balance =
                userInfo?.balance ?? userInfo?.value?.balance;

            if (
                !memberId ||
                balance === undefined ||
                balance === null
            ) {
                return;
            }

            const db = firebase.firestore();

            const snap = await db
                .collection("members")
                .where(
                    "walletUserId",
                    "==",
                    String(memberId)
                )
                .limit(1)
                .get();

            if (snap.empty) {
                return;
            }

            const doc = snap.docs[0];

            const docRef = db
                .collection("members")
                .doc(doc.id);

            const memberData = doc.data();

            const previousBalance = Number(
                memberData.balance ?? 0
            );

            const updatedBalance = Number(balance);

            if (previousBalance === updatedBalance) {
                return;
            }

            const difference =
                updatedBalance - previousBalance;

            await db.collection("transactions").add({
                walletUserId: String(memberId),
                previousBalance,
                updatedBalance,
                amount: Math.abs(difference),
                type: difference > 0 ?
                    "credit" :
                    "debit",
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            await docRef.update({
                balance: updatedBalance,
                balanceUpdatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

        } catch (err) {

            console.error(
                "Balance sync error:",
                err
            );

        }
    }

    // =========================
    // START BALANCE SYNC
    // =========================

    function startBalanceSync() {

        if (balanceInterval) {
            return;
        }

        updateUserBalance();

        balanceInterval = setInterval(
            updateUserBalance,
            15000
        );
    }

    // =========================
    // CHECK ALLOWED USER
    // =========================

    async function checkAllowedFromFirebase() {

        try {

            const userInfo = JSON.parse(
                localStorage.getItem("userInfo")
            );

            const memberId =
                userInfo?.value?.memberId ||
                userInfo?.value?.memberld;

            if (!memberId) {
                return { allowed: false, isPremium: false };
            }

            const snap = await firebase
                .firestore()
                .collection("members")
                .where(
                    "walletUserId",
                    "==",
                    String(memberId)
                )
                .where(
                    "active",
                    "==",
                    true
                )
                .limit(1)
                .get();

            if (snap.empty) {
                return { allowed: false, isPremium: false };
            }

            const memberData = snap.docs[0].data();
            return { 
                allowed: true, 
                isPremium: memberData.is_premium === true 
            };

        } catch {

            return { allowed: false, isPremium: false };

        }
    }

})();
