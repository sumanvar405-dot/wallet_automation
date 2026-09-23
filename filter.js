(async function () {

    // =========================
    // Cyber Panel Styles
    // =========================
    const style = document.createElement("style");
    style.innerHTML = `
    #cyberPanel{ 
        position:fixed; 
        right:20px; 
        bottom:20px; 
        width:280px; 
        z-index:999999; 
        background:rgba(10, 15, 31, 0.9); 
        border:1px solid #00f7ff33; 
        border-radius:16px; 
        backdrop-filter:blur(16px); 
        box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.4),
            0 0 15px #00f7ff22; 
        overflow:hidden; 
        font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
    } 
    
    .cyber-header{ 
        padding:10px 15px; 
        background:linear-gradient(90deg,#00f7ff15,#7a00ff15); 
        color:#00f7ff; 
        font-size: 11px;
        letter-spacing: 1px;
        font-weight:bold; 
        text-align:center; 
        cursor:move; 
        border-bottom:1px solid #00f7ff22; 
        user-select:none;
        text-transform: uppercase;
    } 
    
    .cyber-body{ 
        padding:15px; 
    } 
    
    .cyber-label{ 
        color:#8defff; 
        font-size:10px; 
        margin-bottom:6px; 
        display:block; 
        text-transform: uppercase;
        letter-spacing: 0.5px;
        opacity: 0.8;
    } 
    
    .cyber-input{ 
        width:100%; 
        box-sizing:border-box; 
        padding:8px 12px; 
        background:rgba(17, 24, 39, 0.5); 
        border:1px solid #00f7ff33; 
        border-radius:10px; 
        color:#fff; 
        font-size:14px; 
        outline:none; 
        transition: all 0.3s ease;
    } 
    
    .cyber-input:focus{ 
        border-color: #00f7ff88;
        box-shadow:0 0 12px #00f7ff33; 
    } 
    
    .cyber-buttons{ 
        display:flex; 
        gap:10px; 
        margin-top:12px; 
    } 
    
    .cyber-btn{ 
        flex:1; 
        border:none; 
        padding:8px; 
        border-radius:8px; 
        cursor:pointer; 
        font-size: 11px;
        font-weight:bold; 
        transition:all .2s ease; 
        text-transform: uppercase;
        letter-spacing: 0.5px;
    } 
    
    .start-btn{ 
        background:#00f7ff; 
        color:#000; 
    } 
    
    .start-btn:hover{ 
        transform:translateY(-1px); 
        box-shadow:0 0 12px #00f7ff88; 
    } 
    
    .stop-btn{ 
        background:rgba(255, 45, 85, 0.2); 
        color:#ff2d55; 
        border: 1px solid #ff2d5544;
    } 
    
    .stop-btn:hover{ 
        background:rgba(255, 45, 85, 0.3); 
        transform:translateY(-1px); 
        box-shadow:0 0 12px #ff2d5533; 
    } 
    
    .cyber-status{ 
        margin-top:12px; 
        background:rgba(17, 24, 39, 0.6); 
        border-radius:10px; 
        padding:8px 12px; 
        display: flex;
        align-items: center;
        justify-content: center;
        text-align:center; 
        color:#00ff95; 
        font-size:11px; 
        border:1px solid #00ff9533; 
        min-height: 36px;
        box-shadow: inset 0 0 5px #00ff9511;
        text-transform: uppercase;
        letter-spacing: 0.3px;
        transition: all 0.3s ease;
    } 

    /* Toggle Switch Styles */
    .toggle-container {
        display: flex;
        background: #111827;
        border: 1px solid #00f7ff33;
        border-radius: 10px;
        margin-bottom: 12px;
        padding: 3px;
        gap: 3px;
    }

    .toggle-option {
        flex: 1;
        padding: 6px;
        text-align: center;
        color: #8defff;
        font-size: 11px;
        font-weight: bold;
        cursor: pointer;
        border-radius: 6px;
        transition: .3s;
        user-select: none;
    }

    .toggle-option.active {
        background: #00f7ff;
        color: #000;
        box-shadow: 0 0 8px #00f7ff66;
    }

    #overlay-status-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        padding: 32px 50px;
        background: radial-gradient(circle at top, rgba(16, 26, 56, 0.88), rgba(7, 11, 25, 0.96));
        border: 1px solid rgba(0, 247, 255, 0.25);
        border-radius: 20px;
        box-shadow: 
            0 24px 60px rgba(0, 0, 0, 0.6),
            0 0 30px rgba(0, 247, 255, 0.12);
        backdrop-filter: blur(20px);
    }

    .overlay-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 2.5px;
        color: #00f7ff;
        background: rgba(0, 247, 255, 0.08);
        border: 1px solid rgba(0, 247, 255, 0.2);
        padding: 5px 14px;
        border-radius: 20px;
        text-transform: uppercase;
    }

    .overlay-badge-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #00ff95;
        box-shadow: 0 0 8px #00ff95;
        animation: cyberPulse 2s infinite ease-in-out;
    }

    @keyframes cyberPulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.35; transform: scale(0.85); }
    }

    #overlay-live-status {
        font-size: 20px;
        font-weight: 600;
        color: #ffffff;
        letter-spacing: 1px;
        margin: 4px 0 0;
        text-align: center;
    }

    #overlay-sub-status {
        font-size: 11px;
        letter-spacing: 3px;
        color: #8defff;
        opacity: 0.65;
        text-transform: uppercase;
        font-weight: 600;
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
                SMART ENGINE ACTIVE
            </div>
            <div id="overlay-live-status">INITIALIZING</div>
            <div id="overlay-sub-status">AUTOMATED RANGE MATCH</div>
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
            AUTO BUY PANEL 
        </div> 
    
        <div class="cyber-body"> 
            
            <label class="cyber-label"> 
                Search Mode 
            </label>
            <div class="toggle-container" id="modeToggle">
                <div class="toggle-option active" data-mode="range">RANGE SEARCH</div>
                <div class="toggle-option" data-mode="fixed">FIXED AMOUNT</div>
            </div>

            <label class="cyber-label"> 
                Payment Type 
            </label>
            <div class="toggle-container" id="orderTypeToggle">
                <div class="toggle-option active" data-value="1">UPI</div>
                <div class="toggle-option" data-value="2">BANK</div>
            </div>

            <!-- Fixed Amount Section -->
            <div id="fixedSection" style="display:none;">
                <label class="cyber-label"> 
                    Amount 
                </label> 
                <input 
                    type="text" 
                    id="buyAmount" 
                    class="cyber-input" 
                    value="2000"
                    min="1" 
                    oninput="this.value=this.value.replace(/[^0-9]/g,'')"
                    style="margin-bottom:12px;"
                > 
            </div>

            <!-- Range Search Section -->
            <div id="rangeSection">
                <label class="cyber-label"> 
                    Select Range 
                </label> 
                <div class="toggle-container" id="rangeToggle">
                    <div class="toggle-option active" data-min="700" data-max="1000">700 - 1000</div>
                    <div class="toggle-option" data-min="1000" data-max="2000">1000 - 2000</div>
                </div>
            </div>
    
            <div class="cyber-buttons"> 
                <button 
                    id="startBtn" 
                    class="cyber-btn start-btn" 
                > 
                    START 
                </button> 
    
                <button 
                    id="stopBtn" 
                    class="cyber-btn stop-btn" 
                > 
                    STOP 
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

    function setStatus(msg, sub = "") {
        console.log(msg);
        if (statusEl) {
            statusEl.innerText = msg;
            
            // Check for error or warning keywords
            const isError = /denied|not found|Error|Stopped|Retry/i.test(msg);
            const isSuccess = /SUCCESS|MATCHED|Running/i.test(msg);
            
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
            overlayLiveStatus.innerText = msg;
            const isError = /denied|not found|Error|Stopped|Retry/i.test(msg);
            const isSuccess = /SUCCESS|MATCHED/i.test(msg);
            overlayLiveStatus.style.color = isError ? "#ff4d6d" : (isSuccess ? "#00ff95" : "#ffffff");
        }
        const overlaySubStatus = document.getElementById("overlay-sub-status");
        if (overlaySubStatus && sub) {
            overlaySubStatus.innerText = sub;
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
            const endTime = startTime + (durationMs / 1000);

            // Ringtone cadence: melodic ringing pulses
            const pulseLen = 0.18;
            const pulseGap = 0.08;
            let t = startTime;
            let toggle = false;

            while (t < endTime - 0.05) {
                const freqs = toggle ? [784, 1046.5] : [659.25, 880];
                freqs.forEach(freq => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = "sine";
                    osc.frequency.setValueAtTime(freq, t);
                    gain.gain.setValueAtTime(0.25, t);
                    gain.gain.exponentialRampToValueAtTime(0.001, t + pulseLen);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(t);
                    osc.stop(t + pulseLen);
                });
                toggle = !toggle;
                t += pulseLen + pulseGap;
            }
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
            setStatus(`Running | Fixed ₹${amount} (${typeLabel})`, "ENGINE ACTIVE");
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
            setStatus(`Running | ₹${selectedMinAmount} - ₹${selectedMaxAmount} (${typeLabel})`, "ENGINE ACTIVE");
            runRangeLoop(selectedMinAmount, selectedMaxAmount, selectedOrderType);
        }
    };

    stopBtn.onclick = () => {
        isRunning = false;
        localStorage.setItem("cyber_auto_running", "false");
        overlay.style.display = "none";
        setStatus("System Idle", "STOPPED");
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

    // =========================
    // FIXED AMOUNT LOOP (LEGACY)
    // =========================
    async function runLegacyLoop(targetAmount, type) {
        while (isRunning) {

            try {

                const typeLabel = type === 1 ? "UPI" : "BANK";
                setStatus(`Scanning ${typeLabel} Orders | ₹${targetAmount}`, "SEARCHING");

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
                    setStatus("No orders found...", "WAITING");
                    await sleep(300);
                    continue;
                }

                const candidates = orders.filter(
                    item => Number(item.amount) === targetAmount
                );

                if (!candidates.length) {
                    setStatus(`Waiting for order ₹${targetAmount}`, "SEARCHING");
                    await sleep(300);
                    continue;
                }

                for (const order of candidates) {
                    if (!isRunning) break;

                    setStatus(`Trying ₹${order.amount}`, "PROCESSING");

                    const payload = {
                        amount: order.amount,
                        platformOrder: order.platformOrder,
                        payType: order.payType,
                        orderType: order.orderType
                    };

                    try {
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
                            continue;
                        }

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
                                    buyBankCode: "moneyView",
                                    buyerKycId: ""
                                })
                            }
                        );

                        const buyData = await buyRes.json();

                        if (buyData.code === "1" || buyData.msg === "Success") {
                            setStatus(`Order Completed | ₹${order.amount}`, "SUCCESS");
                            localStorage.setItem("cyber_auto_running", "true");
                            playRingtone(2000);
                            await sleep(2000);
                            location.reload();
                            return;
                        }

                    } catch (err) {
                        console.error(err);
                    }
                }

                await sleep(300);

            } catch (e) {
                console.error(e);
                setStatus("Connection Error | Retrying...", "RECONNECTING");
                await sleep(500);
            }
        }
    }

    // =========================
    // RANGE SEARCH LOOP (SMART)
    // =========================
    async function runRangeLoop(minAmount, maxAmount, type) {
        while (isRunning) {

            try {

                const typeLabel = type === 1 ? "UPI" : "BANK";
                setStatus(`Scanning Orders | ₹${minAmount} - ₹${maxAmount}`, `MATCHING ${typeLabel}`);

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
                    buyBankCode: "moneyView",
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
                    setStatus("Order Matched | Refreshing in 2s...", "ORDER COMPLETED");
                    console.log("Match success! Playing ringtone for 2s and refreshing page...");
                    localStorage.setItem("cyber_auto_running", "true");
                    playRingtone(2000);
                    await sleep(2000);
                    location.reload();
                    return;
                }

                // If not matched, update live status and keep running
                if (String(data?.code) === "1") {
                    const statusText = matchResult || data?.msg || "Searching";
                    setStatus(`${statusText} | ₹${minAmount} - ₹${maxAmount}`, "SCANNING ACTIVE");
                } else {
                    setStatus(`${data?.msg || "Matching..."}`, "SEARCHING");
                }

                await sleep(1000);

            } catch (err) {
                console.error("Match loop error:", err);
                setStatus("Connection Error | Retrying...", "RECONNECTING");
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
