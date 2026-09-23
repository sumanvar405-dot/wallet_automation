(async function () {

    // =========================
    // Cyber Panel Styles
    // =========================
    const style = document.createElement("style");
    style.innerHTML = `
    #cyberPanel{ 
        position:fixed; 
        right:18px; 
        bottom:18px; 
        width:250px; 
        z-index:999999; 
        background:rgba(10, 15, 30, 0.94); 
        border:1px solid rgba(0, 247, 255, 0.22); 
        border-radius:12px; 
        backdrop-filter:blur(20px); 
        box-shadow: 
            0 12px 36px rgba(0, 0, 0, 0.55),
            0 0 15px rgba(0, 247, 255, 0.08); 
        overflow:hidden; 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
        user-select: none;
    } 
    
    .cyber-header{ 
        padding:7px 12px; 
        background:linear-gradient(90deg, rgba(0, 247, 255, 0.12), rgba(122, 0, 255, 0.12)); 
        color:#00f7ff; 
        font-size: 10.5px;
        letter-spacing: 0.6px;
        font-weight:600; 
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor:move; 
        border-bottom:1px solid rgba(0, 247, 255, 0.15); 
        text-transform: none;
    } 

    .cyber-header-dot {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #00ff95;
        box-shadow: 0 0 6px #00ff95;
    }
    
    .cyber-body{ 
        padding:9px 11px; 
    } 

    .cyber-grid {
        display: flex;
        gap: 8px;
        margin-bottom: 7px;
    }

    .cyber-col {
        flex: 1;
        min-width: 0;
    }
    
    .cyber-label{ 
        color:#8defff; 
        font-size:9.5px; 
        margin-bottom:3px; 
        display:block; 
        text-transform: none;
        letter-spacing: 0.3px;
        opacity: 0.85;
        font-weight: 500;
    } 
    
    .cyber-input{ 
        width:100%; 
        box-sizing:border-box; 
        padding:5px 8px; 
        background:rgba(17, 24, 39, 0.6); 
        border:1px solid rgba(0, 247, 255, 0.25); 
        border-radius:7px; 
        color:#fff; 
        font-size:12px; 
        outline:none; 
        transition: all 0.25s ease;
    } 
    
    .cyber-input:focus{ 
        border-color: #00f7ff;
        box-shadow:0 0 10px rgba(0, 247, 255, 0.25); 
    } 
    
    .cyber-buttons{ 
        display:flex; 
        gap:6px; 
        margin-top:7px; 
    } 
    
    .cyber-btn{ 
        flex:1; 
        border:none; 
        padding:6px 10px; 
        border-radius:7px; 
        cursor:pointer; 
        font-size: 10.5px;
        font-weight:600; 
        transition:all .2s ease; 
        text-transform: none;
        letter-spacing: 0.3px;
    } 
    
    .start-btn{ 
        background:linear-gradient(135deg, #00f7ff, #00c9db); 
        color:#06111e; 
        font-weight: 700;
        box-shadow: 0 2px 10px rgba(0, 247, 255, 0.25);
    } 
    
    .start-btn:hover{ 
        transform:translateY(-1px); 
        box-shadow:0 4px 14px rgba(0, 247, 255, 0.45); 
    } 
    
    .stop-btn{ 
        background:rgba(255, 45, 85, 0.15); 
        color:#ff5277; 
        border: 1px solid rgba(255, 45, 85, 0.35);
    } 
    
    .stop-btn:hover{ 
        background:rgba(255, 45, 85, 0.25); 
        transform:translateY(-1px); 
        box-shadow:0 2px 10px rgba(255, 45, 85, 0.25); 
    } 
    
    .cyber-status{ 
        margin-top:7px; 
        background:rgba(17, 24, 39, 0.6); 
        border-radius:7px; 
        padding:5px 8px; 
        display: flex;
        align-items: center;
        justify-content: center;
        text-align:center; 
        color:#00ff95; 
        font-size:10px; 
        border:1px solid rgba(0, 255, 149, 0.25); 
        min-height: 26px;
        box-shadow: inset 0 0 5px rgba(0, 255, 149, 0.08);
        text-transform: none;
        letter-spacing: 0.2px;
        transition: all 0.25s ease;
    } 

    /* Toggle Switch Styles */
    .toggle-container {
        display: flex;
        background: rgba(17, 24, 39, 0.7);
        border: 1px solid rgba(0, 247, 255, 0.2);
        border-radius: 7px;
        margin-bottom: 7px;
        padding: 2px;
        gap: 2px;
    }

    .toggle-option {
        flex: 1;
        padding: 4px 6px;
        text-align: center;
        color: #8defff;
        font-size: 10px;
        font-weight: 500;
        cursor: pointer;
        border-radius: 5px;
        transition: all 0.2s ease;
        user-select: none;
        white-space: nowrap;
    }

    .toggle-option.active {
        background: #00f7ff;
        color: #06111e;
        font-weight: 600;
        box-shadow: 0 0 8px rgba(0, 247, 255, 0.35);
    }

    #overlay-status-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 16px 28px;
        background: radial-gradient(circle at top, rgba(16, 26, 56, 0.9), rgba(7, 11, 25, 0.96));
        border: 1px solid rgba(0, 247, 255, 0.22);
        border-radius: 14px;
        box-shadow: 
            0 16px 40px rgba(0, 0, 0, 0.6),
            0 0 20px rgba(0, 247, 255, 0.08);
        backdrop-filter: blur(16px);
        text-transform: none;
    }

    .overlay-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 9px;
        font-weight: 600;
        letter-spacing: 1.2px;
        color: #8defff;
        background: rgba(0, 247, 255, 0.08);
        border: 1px solid rgba(0, 247, 255, 0.2);
        padding: 3px 10px;
        border-radius: 12px;
        text-transform: none;
    }

    .overlay-badge-dot {
        width: 5px;
        height: 5px;
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
        font-size: 13px;
        font-weight: 600;
        color: #ffffff;
        letter-spacing: 0.3px;
        margin: 2px 0 0;
        text-align: center;
        text-transform: none;
    }

    #overlay-sub-status {
        font-size: 10px;
        letter-spacing: 0.5px;
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
            background:rgba(5, 8, 18, 0.82);
            backdrop-filter:blur(14px);
            z-index:999998;
            display:none;
            align-items:center;
            justify-content:center;
            font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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

    let panel = document.getElementById("cyberPanel");
    if (!panel) {
        panel = document.createElement("div");
        panel.id = "cyberPanel";
        panel.innerHTML = `
        <div class="cyber-header"> 
            <span>Auto Buy</span>
            <span class="cyber-header-dot"></span>
        </div> 
    
        <div class="cyber-body"> 
            
            <div class="cyber-grid">
                <div class="cyber-col">
                    <label class="cyber-label">Search Mode</label>
                    <div class="toggle-container" id="modeToggle">
                        <div class="toggle-option active" data-mode="range">Range</div>
                        <div class="toggle-option" data-mode="fixed">Fixed</div>
                    </div>
                </div>

                <div class="cyber-col">
                    <label class="cyber-label">Payment</label>
                    <div class="toggle-container" id="orderTypeToggle">
                        <div class="toggle-option active" data-value="1">UPI</div>
                        <div class="toggle-option" data-value="2">Bank</div>
                    </div>
                </div>
            </div>

            <!-- Fixed Amount Section -->
            <div id="fixedSection" style="display:none; margin-bottom: 7px;">
                <label class="cyber-label">Amount</label> 
                <input 
                    type="text" 
                    id="buyAmount" 
                    class="cyber-input" 
                    value="2000"
                    min="1" 
                    oninput="this.value=this.value.replace(/[^0-9]/g,'')"
                > 
            </div>

            <!-- Range Search Section -->
            <div id="rangeSection" style="margin-bottom: 7px;">
                <label class="cyber-label">Select Range</label> 
                <div class="toggle-container" id="rangeToggle" style="margin-bottom:0;">
                    <div class="toggle-option active" data-min="700" data-max="1000">700 - 1000</div>
                    <div class="toggle-option" data-min="1000" data-max="2000">1000 - 2000</div>
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

    const statusEl = document.getElementById("cyberStatus");
    const startBtn = document.getElementById("startBtn");
    const stopBtn = document.getElementById("stopBtn");
    const modeToggle = document.getElementById("modeToggle");
    const orderTypeToggle = document.getElementById("orderTypeToggle");
    const rangeToggle = document.getElementById("rangeToggle");
    const fixedSection = document.getElementById("fixedSection");
    const rangeSection = document.getElementById("rangeSection");
    const amountInput = document.getElementById("buyAmount");

    let isRunning = false;
    let selectedMode = "range"; // "fixed" or "range"
    let selectedOrderType = 1;
    let selectedMinAmount = 700;
    let selectedMaxAmount = 1000;
    let isPremiumMember = false;

    function applyModeUI(mode) {
        selectedMode = mode;
        if (mode === "fixed") {
            fixedSection.style.display = "block";
            rangeSection.style.display = "none";
        } else {
            fixedSection.style.display = "none";
            rangeSection.style.display = "block";
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
        if (savedMode === "fixed" || savedMode === "range") {
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
        if (savedRange && savedRange.min && savedRange.max) {
            selectedMinAmount = Number(savedRange.min);
            selectedMaxAmount = Number(savedRange.max);
            rangeToggle.querySelectorAll(".toggle-option").forEach(opt => {
                if (Number(opt.dataset.min) === selectedMinAmount && Number(opt.dataset.max) === selectedMaxAmount) {
                    opt.classList.add("active");
                } else {
                    opt.classList.remove("active");
                }
            });
        }
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
            console.log("Selected Order Type:", selectedOrderType === 1 ? "UPI" : "BANK");
        };
    });

    // Toggle logic for Range Selection
    rangeToggle.querySelectorAll(".toggle-option").forEach(opt => {
        opt.onclick = () => {
            rangeToggle.querySelector(".active")?.classList.remove("active");
            opt.classList.add("active");
            selectedMinAmount = Number(opt.dataset.min);
            selectedMaxAmount = Number(opt.dataset.max);
            localStorage.setItem("cyber_selected_range", JSON.stringify({
                min: selectedMinAmount,
                max: selectedMaxAmount
            }));
            console.log(`Selected Range: ₹${selectedMinAmount} - ₹${selectedMaxAmount}`);
        };
    });

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
                converted = converted.replace(/\bUpi\b/g, "UPI");
                return converted;
            }
            return trimmed;
        }).join(" | ");
    }

    function setStatus(msg, sub = "") {
        const cleanMsg = formatStatusText(msg);
        const cleanSub = formatStatusText(sub);
        console.log(cleanMsg);
        if (statusEl) {
            statusEl.innerText = cleanMsg;
            
            // Check for error or warning keywords
            const isError = /denied|not found|error|stopped|retry/i.test(cleanMsg);
            const isSuccess = /success|matched|running|completed/i.test(cleanMsg);
            
            if (isError) {
                statusEl.style.color = "#ff4d6d";
                statusEl.style.borderColor = "rgba(255, 77, 109, 0.4)";
                statusEl.style.boxShadow = "0 0 10px rgba(255, 77, 109, 0.15)";
            } else if (isSuccess) {
                statusEl.style.color = "#00ff95";
                statusEl.style.borderColor = "rgba(0, 255, 149, 0.4)";
                statusEl.style.boxShadow = "0 0 10px rgba(0, 255, 149, 0.15)";
            } else {
                statusEl.style.color = "#8defff";
                statusEl.style.borderColor = "rgba(0, 247, 255, 0.25)";
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

        const typeLabel = selectedOrderType === 1 ? "UPI" : "BANK";

        if (selectedMode === "fixed") {
            const amount = Number(amountInput.value);
            if (!amount) {
                setStatus("Enter amount");
                return;
            }

            if (!isPremiumMember && amount < 2000) {
                setStatus("Minimum order value is 2000");
                return;
            }

            isRunning = true;
            localStorage.setItem("cyber_auto_running", "true");
            localStorage.setItem("cyber_search_mode", "fixed");
            localStorage.setItem("cyber_fixed_amount", String(amount));
            localStorage.setItem("cyber_order_type", String(selectedOrderType));

            overlay.style.display = "flex";
            setStatus(`Running | Fixed ₹${amount} (${typeLabel})`, "Engine active");
            runLegacyLoop(amount, selectedOrderType);

        } else {
            // Range Search Mode
            isRunning = true;
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
        localStorage.setItem("cyber_auto_running", "false");
        overlay.style.display = "none";
        setStatus("System idle", "Stopped");
    };

    // =========================
    // DRAGGABLE LOGIC
    // =========================
    (function () {
        const header = panel.querySelector(".cyber-header");
        let drag = false;
        let x = 0;
        let y = 0;

        header.addEventListener("mousedown", e => {
            drag = true;
            x = e.clientX - panel.offsetLeft;
            y = e.clientY - panel.offsetTop;
        });

        document.addEventListener("mouseup", () => {
            drag = false;
        });

        document.addEventListener("mousemove", e => {
            if (!drag) return;
            panel.style.left = (e.clientX - x) + "px";
            panel.style.top = (e.clientY - y) + "px";
            panel.style.right = "auto";
            panel.style.bottom = "auto";
        });
    })();

    // ===============================================
    // FIXED AMOUNT LOOP (PARALLEL SEARCH & FAST BOOK)
    // ===============================================
    async function runLegacyLoop(targetAmount, type) {
        const typeLabel = type === 1 ? "UPI" : "Bank";
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
                    setStatus(`Scanning ${typeLabel} orders | ₹${targetAmount}`, "Searching");

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

                    // Keep rapid parallel stream active with 250ms cadence per worker
                    await sleep(250);

                } catch (e) {
                    console.error(`[SearchWorker ${workerId}] error:`, e);
                    setStatus("Connection error | Retrying...", "Reconnecting");
                    await sleep(500);
                }
            }
        }

        // Run 2 staggered search workers concurrently for zero-delay continuous searching
        const w1 = fetchWorker(1);
        await sleep(125);
        const w2 = fetchWorker(2);

        await Promise.all([w1, w2]);
    }

    // =========================
    // RANGE SEARCH LOOP (SMART)
    // =========================
    async function runRangeLoop(minAmount, maxAmount, type) {
        while (isRunning) {

            try {

                const typeLabel = type === 1 ? "UPI" : "Bank";
                setStatus(`Scanning orders | ₹${minAmount} - ₹${maxAmount}`, `Matching ${typeLabel}`);

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
                console.log("Match response:", data);
                if (data?.data?.buyResult) {
                    console.table([data.data.buyResult]);
                }

                // Check match condition:
                // Response matched: {"code":"1","data":{"matchResult":"MATCHED","matchInfo":{"status":"COMPLETED"
                const matchResult = data?.data?.matchResult;
                const matchInfoStatus = String(data?.data?.matchInfo?.status || "").toUpperCase();
                const isMatched = String(data?.code) === "1" && (
                    (matchResult === "MATCHED" && matchInfoStatus === "COMPLETED") ||
                    matchResult === "MATCHED" ||
                    Boolean(data?.data?.buyResult)
                );

                if (isMatched) {
                    setStatus("Order matched | Refreshing in 2s...", "Order completed");
                    console.log("Match success! Playing ringtone for 2s and refreshing page...");
                    localStorage.setItem("cyber_auto_running", "true");
                    playRingtone(2000);
                    await sleep(2000);
                    location.reload();
                    return;
                }

                // If not matched, update live status and keep running
                if (String(data?.code) === "1") {
                    const statusText = matchResult ? matchResult.replace(/_/g, " ") : (data?.msg || "Searching");
                    setStatus(`${statusText} | ₹${minAmount} - ₹${maxAmount}`, "Scanning active");
                } else {
                    setStatus(`${data?.msg || "Matching..."}`, "Searching");
                }

                await sleep(1000);

            } catch (err) {
                console.error("Match loop error:", err);
                setStatus("Connection error | Retrying...", "Reconnecting");
                await sleep(1500);
            }
        }
    }

    // =========================
    // AUTO-RESUME CHECK
    // =========================
    if (localStorage.getItem("cyber_auto_running") === "true") {
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
