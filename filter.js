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
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background: radial-gradient(circle at 35% 30%, #1f4277 0%, #0e2042 55%, #050b18 100%);
        border: 1.8px solid #00f7ff;
        box-shadow: 
            0 0 14px rgba(0, 247, 255, 0.85),
            0 0 28px rgba(0, 247, 255, 0.5),
            0 0 42px rgba(0, 247, 255, 0.25),
            inset 0 0 10px rgba(0, 247, 255, 0.6),
            inset 0 1.5px 3px rgba(255, 255, 255, 0.8),
            0 8px 24px rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: grab;
        user-select: none;
        touch-action: none;
        transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, border-color 0.2s ease;
        animation: cyberDotGlow 2.5s infinite ease-in-out;
    }

    @keyframes cyberDotGlow {
        0%, 100% {
            box-shadow: 
                0 0 12px rgba(0, 247, 255, 0.8),
                0 0 25px rgba(0, 247, 255, 0.45),
                0 0 40px rgba(0, 247, 255, 0.2),
                inset 0 0 10px rgba(0, 247, 255, 0.55),
                inset 0 1.5px 2px rgba(255, 255, 255, 0.75),
                0 8px 20px rgba(0, 0, 0, 0.75);
            border-color: #00f7ff;
        }
        50% {
            box-shadow: 
                0 0 22px rgba(0, 247, 255, 1),
                0 0 44px rgba(0, 247, 255, 0.8),
                0 0 65px rgba(0, 247, 255, 0.5),
                inset 0 0 14px rgba(0, 247, 255, 0.85),
                inset 0 1.5px 3px #ffffff,
                0 10px 28px rgba(0, 0, 0, 0.85);
            border-color: #7df9ff;
        }
    }

    #cyberFloatingDot:hover {
        transform: scale(1.12);
        border-color: #ffffff;
        box-shadow: 
            0 0 26px rgba(0, 247, 255, 1),
            0 0 52px rgba(0, 247, 255, 0.9),
            0 0 80px rgba(0, 247, 255, 0.65),
            inset 0 0 16px rgba(0, 247, 255, 0.95),
            inset 0 2px 4px #ffffff,
            0 12px 32px rgba(0, 0, 0, 0.9);
    }

    #cyberFloatingDot.is-dragging {
        cursor: grabbing;
        transform: scale(1.08);
        box-shadow: 
            0 0 30px rgba(0, 247, 255, 1),
            0 0 60px rgba(0, 247, 255, 0.9),
            inset 0 0 16px rgba(0, 247, 255, 0.9);
    }

    .cyber-orb-shine {
        position: absolute;
        top: 4px;
        left: 7px;
        width: 14px;
        height: 7px;
        border-radius: 50%;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%);
        transform: rotate(-25deg);
        pointer-events: none;
    }

    .cyber-floating-icon {
        display: block;
        pointer-events: none;
        filter: drop-shadow(0 0 6px #00f7ff) drop-shadow(0 0 12px rgba(0, 247, 255, 0.85));
        transition: all 0.25s ease;
    }

    #cyberFloatingDot.running {
        border-color: #00ff95;
        animation: cyberDotRunningGlow 1.4s infinite ease-in-out;
    }

    @keyframes cyberDotRunningGlow {
        0%, 100% {
            box-shadow: 
                0 0 15px rgba(0, 255, 149, 0.85),
                0 0 30px rgba(0, 255, 149, 0.55),
                0 0 48px rgba(0, 255, 149, 0.3),
                inset 0 0 10px rgba(0, 255, 149, 0.6),
                inset 0 1.5px 2px rgba(255, 255, 255, 0.8),
                0 8px 20px rgba(0, 0, 0, 0.8);
        }
        50% {
            box-shadow: 
                0 0 26px rgba(0, 255, 149, 1),
                0 0 50px rgba(0, 255, 149, 0.85),
                0 0 75px rgba(0, 255, 149, 0.55),
                inset 0 0 16px rgba(0, 255, 149, 0.9),
                inset 0 1.5px 3px #ffffff,
                0 10px 28px rgba(0, 0, 0, 0.85);
        }
    }

    #cyberFloatingDot.running .cyber-floating-icon {
        stroke: #00ff95;
        filter: drop-shadow(0 0 8px #00ff95) drop-shadow(0 0 16px rgba(0, 255, 149, 0.9));
        animation: cyberIconPulse 1.2s infinite ease-in-out;
    }

    .cyber-floating-ring {
        position: absolute;
        inset: -4px;
        border-radius: 50%;
        border: 1.5px solid rgba(0, 247, 255, 0.6);
        box-shadow: 0 0 10px rgba(0, 247, 255, 0.45);
        opacity: 0.75;
        pointer-events: none;
    }

    #cyberFloatingDot.running .cyber-floating-ring {
        border-color: rgba(0, 255, 149, 0.85);
        box-shadow: 0 0 14px rgba(0, 255, 149, 0.6);
        animation: cyberRingPulse 1.6s infinite ease-out;
    }

    @keyframes cyberIconPulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.15); opacity: 0.85; }
    }

    @keyframes cyberRingPulse {
        0% { transform: scale(0.95); opacity: 0.85; }
        50% { transform: scale(1.2); opacity: 0.3; }
        100% { transform: scale(1.35); opacity: 0; }
    }

    #cyberPanel { 
        position: fixed; 
        right: 20px; 
        bottom: 20px; 
        width: 250px; 
        z-index: 999999; 
        background: linear-gradient(165deg, rgba(13, 19, 34, 0.96) 0%, rgba(7, 10, 20, 0.98) 100%); 
        border: 1px solid rgba(0, 247, 255, 0.22); 
        border-radius: 12px; 
        backdrop-filter: blur(12px); 
        box-shadow: 
            0 16px 36px -6px rgba(0, 0, 0, 0.75),
            0 0 18px rgba(0, 247, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.12); 
        overflow: hidden; 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
        user-select: none;
        display: none;
        animation: cyberPanelFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    } 

    @keyframes cyberPanelFadeIn {
        from { opacity: 0; transform: scale(0.96) translateY(5px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
    }
    
    .cyber-header { 
        padding: 7px 10px; 
        background: linear-gradient(90deg, rgba(0, 247, 255, 0.12), rgba(122, 0, 255, 0.08)); 
        color: #00f7ff; 
        border-bottom: 1px solid rgba(0, 247, 255, 0.15); 
        display: flex;
        align-items: center;
        justify-content: space-between;
        user-select: none;
    } 

    .cyber-header-title {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.4px;
        color: #00f7ff;
    }

    .cyber-header-dot {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #00ff95;
        box-shadow: 0 0 6px #00ff95;
        animation: cyberPulse 2s infinite ease-in-out;
    }

    .cyber-min-btn {
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(0, 247, 255, 0.18);
        color: #8defff;
        font-size: 12px;
        font-weight: bold;
        line-height: 1;
        cursor: pointer;
        width: 18px;
        height: 18px;
        padding: 0;
        border-radius: 4px;
        transition: all 0.15s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .cyber-min-btn:hover {
        background: rgba(0, 247, 255, 0.18);
        color: #ffffff;
        border-color: #00f7ff;
        box-shadow: 0 0 6px rgba(0, 247, 255, 0.3);
    }
    
    .cyber-body { 
        padding: 7px 9px 9px; 
        display: flex;
        flex-direction: column;
        gap: 6px;
    } 

    .cyber-section {
        display: flex;
        flex-direction: column;
        gap: 3px;
    }

    .cyber-grid {
        display: flex;
        gap: 6px;
    }

    .cyber-col {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 3px;
    }
    
    .cyber-label { 
        color: #8defff; 
        font-size: 8.5px; 
        font-weight: 600;
        letter-spacing: 0.4px;
        opacity: 0.85;
    } 
    
    .cyber-input { 
        width: 100%; 
        box-sizing: border-box; 
        height: 28px;
        padding: 0 8px; 
        background: rgba(9, 14, 26, 0.75); 
        border: 1px solid rgba(0, 247, 255, 0.2); 
        border-radius: 6px; 
        color: #fff; 
        font-size: 12px; 
        font-weight: 600;
        font-family: inherit;
        outline: none; 
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
    } 
    
    .cyber-input:focus { 
        border-color: #00f7ff;
        background: rgba(12, 18, 36, 0.85);
        box-shadow: 0 0 8px rgba(0, 247, 255, 0.3); 
    } 
    
    .cyber-buttons { 
        display: flex; 
        gap: 6px; 
        margin-top: 2px; 
    } 
    
    .cyber-btn { 
        border: none; 
        height: 29px;
        padding: 0 8px; 
        border-radius: 6px; 
        cursor: pointer; 
        font-size: 10.5px;
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
        box-shadow: 0 2px 10px rgba(0, 247, 255, 0.3);
    } 
    
    .start-btn:hover { 
        transform: translateY(-1px); 
        box-shadow: 0 4px 14px rgba(0, 247, 255, 0.5); 
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
        box-shadow: 0 2px 10px rgba(255, 45, 85, 0.25); 
        transform: translateY(-1px); 
    } 

    .stop-btn:active {
        transform: translateY(0);
    }
    
    .cyber-status { 
        margin-top: 1px; 
        background: rgba(8, 12, 22, 0.75); 
        border-radius: 6px; 
        padding: 4px 8px; 
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center; 
        color: #00ff95; 
        font-size: 10px; 
        font-weight: 600;
        border: 1px solid rgba(0, 255, 149, 0.25); 
        min-height: 25px;
        box-shadow: inset 0 0 5px rgba(0, 255, 149, 0.06);
        letter-spacing: 0.3px;
        transition: color 0.2s ease, border-color 0.2s ease;
    } 

    /* Toggle Switch Styles */
    .toggle-container {
        display: flex;
        background: rgba(8, 12, 22, 0.75);
        border: 1px solid rgba(0, 247, 255, 0.16);
        border-radius: 6px;
        padding: 2px;
        gap: 2px;
    }

    .toggle-option {
        flex: 1;
        padding: 4px 6px;
        text-align: center;
        color: #8defff;
        font-size: 10px;
        font-weight: 600;
        cursor: pointer;
        border-radius: 4px;
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
        box-shadow: 0 2px 6px rgba(0, 247, 255, 0.35);
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
            <div class="cyber-orb-shine"></div>
            <svg class="cyber-floating-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#00f7ff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
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
                    <div class="toggle-option active" data-value="1">UPI</div>
                    <div class="toggle-option" data-value="2">BANK</div>
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
        panel.style.left = "auto";
        panel.style.top = "auto";
        panel.style.right = "20px";
        panel.style.bottom = "20px";
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

    // By default, do NOT open card; show only the floating dot. Open card only when clicked.
    hidePanel();

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
            if (e) {
                e.stopPropagation();
            }
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
            if (e) {
                e.stopPropagation();
            }
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

        function onPointerUp(e) {
            if (!isDragging) return;
            if (e) {
                e.stopPropagation();
            }
            isDragging = false;
            floatingDot.classList.remove("is-dragging");

            if (hasMoved) {
                const rect = floatingDot.getBoundingClientRect();
                localStorage.setItem("cyber_dot_x", String(rect.left));
                localStorage.setItem("cyber_dot_y", String(rect.top));
            }
            // Do NOT hide floatingDot here; let the click event fire on floatingDot
            // so floatingDot consumes the click and prevents elements behind from being clicked.
        }

        function onTouchEnd(e) {
            if (!isDragging) return;
            isDragging = false;
            floatingDot.classList.remove("is-dragging");

            if (hasMoved) {
                const rect = floatingDot.getBoundingClientRect();
                localStorage.setItem("cyber_dot_x", String(rect.left));
                localStorage.setItem("cyber_dot_y", String(rect.top));
            } else {
                // Prevent synthetic mouse/click events from firing on elements behind
                if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                showPanel();
            }
        }

        // Intercept all mouse, pointer, and touch events on floatingDot to protect elements behind it
        floatingDot.addEventListener("pointerdown", (e) => e.stopPropagation(), true);
        floatingDot.addEventListener("pointerup", (e) => e.stopPropagation(), true);
        floatingDot.addEventListener("mousedown", (e) => {
            e.stopPropagation();
            onPointerDown(e);
        }, true);
        floatingDot.addEventListener("mouseup", (e) => {
            e.stopPropagation();
        }, true);

        // Click handler absorbs and terminates the click so behind elements NEVER receive it
        floatingDot.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            if (!hasMoved) {
                showPanel();
            }
        }, true);

        window.addEventListener("mousemove", onPointerMove, true);
        window.addEventListener("mouseup", onPointerUp, true);

        floatingDot.addEventListener("touchstart", onPointerDown, { passive: false });
        window.addEventListener("touchmove", onPointerMove, { passive: true });
        window.addEventListener("touchend", onTouchEnd, { passive: false });
    })();

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
            console.log("Selected Order Type:", selectedOrderType === 1 ? "UPI" : "BANK");
        };
    });

    // Input handlers for Fixed Amount & Range From / To
    if (amountInput) {
        amountInput.addEventListener("input", () => {
            amountInput.value = amountInput.value.replace(/[^0-9]/g, "");
            localStorage.setItem("cyber_fixed_amount", amountInput.value);
            console.log(`Fixed Amount updated: ₹${amountInput.value}`);
        });
    }

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

    // Stop event propagation on inputs so typing/changing amount never triggers global handlers or forms
    [amountInput, rangeFromInput, rangeToInput].forEach(inp => {
        if (!inp) return;
        inp.addEventListener("click", e => e.stopPropagation());
        inp.addEventListener("mousedown", e => e.stopPropagation());
        inp.addEventListener("keydown", e => {
            e.stopPropagation();
            if (e.key === "Enter") {
                e.preventDefault();
                inp.blur();
            }
        });
        inp.addEventListener("keyup", e => e.stopPropagation());
        inp.addEventListener("keypress", e => e.stopPropagation());
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
            let res = trimmed;
            if (alpha.length > 1 && alpha === alpha.toUpperCase()) {
                let lower = trimmed.toLowerCase();
                res = lower.replace(/\b[a-z]/g, c => c.toUpperCase());
            }
            // Always keep UPI and BANK in all caps
            return res.replace(/\bupi\b/gi, "UPI").replace(/\bbank\b/gi, "BANK");
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

    // ===================================
    // TOKEN & USER INFO FETCH + PERMISSION
    // ===================================
    let token = null;
    let memberId = "11603832";
    let buyerKycId = "";
    let isAllowedUser = false;
    let permissionInterval = null;

    // Ensure auto-running is never enabled across sessions/reloads
    localStorage.removeItem("cyber_auto_running");

    function refreshAuthData() {
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
    }

    async function checkPermissionWithRetry() {
        const initialCheck = await checkAllowedFromFirebase();
        if (initialCheck.allowed) {
            isAllowedUser = true;
            isPremiumMember = initialCheck.isPremium;
            return initialCheck;
        }

        // If permission denied: show "Permission denied" and check again after every 3 sec interval
        setStatus("Permission denied");
        console.warn("[Firebase Permission] Permission denied. Retrying every 3 seconds...");

        return new Promise((resolve) => {
            permissionInterval = setInterval(async () => {
                try {
                    const retryCheck = await checkAllowedFromFirebase();
                    if (retryCheck.allowed) {
                        // If permission granted from firebase then stop the 3 sec check interval
                        clearInterval(permissionInterval);
                        permissionInterval = null;
                        isAllowedUser = true;
                        isPremiumMember = retryCheck.isPremium;
                        console.log("[Firebase Permission] Permission granted. Stopping 3s interval check.");
                        setStatus("Ready");
                        resolve(retryCheck);
                    } else {
                        // Otherwise check every 3 sec
                        setStatus("Permission denied");
                    }
                } catch (err) {
                    console.error("[Firebase Permission] Error during retry check:", err);
                    setStatus("Permission denied");
                }
            }, 3000);
        });
    }

    try {

        await checkPermissionWithRetry();

        startBalanceSync();
        refreshAuthData();

    } catch (e) {
        console.log(e);
    }

    if (!token) {
        refreshAuthData();
        if (!token) {
            setStatus("Token not found");
            return;
        }
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
        if (!isAllowedUser) {
            setStatus("Permission denied");
            return;
        }

        if (!token) {
            refreshAuthData();
            if (!token) {
                setStatus("Token not found");
                return;
            }
        }

        if (isRunning) return;

        const typeLabel = selectedOrderType === 1 ? "UPI" : "BANK";

        if (selectedMode === "fixed") {
            const amount = Number(amountInput.value);
            if (!amount) {
                setStatus("Enter amount");
                return;
            }

            isRunning = true;
            floatingDot.classList.add("running");
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

    // ===============================================
    // FIXED AMOUNT LOOP (PARALLEL SEARCH & FAST BOOK)
    // ===============================================
    async function runLegacyLoop(targetAmount, type) {
        const typeLabel = type === 1 ? "UPI" : "BANK";
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
                    localStorage.setItem("cyber_auto_running", "false");
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
        const typeLabel = type === 1 ? "UPI" : "BANK";
        let isOrderMatched = false;

        async function rangeWorker() {
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
                        localStorage.setItem("cyber_auto_running", "false");
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

                    // 1 second delay before next range API call for this channel
                    await sleep(1000);

                } catch (err) {
                    console.error(`[RangeWorker] error:`, err);
                    setStatus("Connection error | Retrying...", "Reconnecting");
                    await sleep(1000);
                }
            }
        }

        console.log(`[RangeLoop] Launching range search for ${typeLabel} ₹${minAmount}-${maxAmount} with 1s cadence`);
        await rangeWorker();
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
            localStorage.setItem("cyber_auto_running", "false");
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

                    // 1 second (1000ms) delay before next call for this channel (UPI or BANK)
                    await sleep(1000);

                } catch (err) {
                    console.error(`[MixedRange ${typeLabel}] error:`, err);
                    await sleep(1000);
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

        // Start all 3 parallel streams: Range UPI, Range BANK, and Fixed BANK
        setStatus(`Mixed | Range ₹${minAmount}-${maxAmount} & Bank ₹${fixedTargetAmount}`, "Engine active");
        console.log(`[MixedLoop] Starting 3 simultaneous parallel streams: Range UPI, Range BANK, and Fixed BANK (${fixedTargetAmount})`);

        const streams = [
            rangeWorker(1, "UPI"),
            rangeWorker(2, "BANK"),
            fixedBankWorker()
        ];

        await Promise.all(streams);
    }

    // ========================================================
    // AUTO-START DISABLED: ONLY STARTS WHEN USER CLICKS START
    // ========================================================

    

    // =========================
    // BALANCE UPDATE
    // =========================

    async function updateUserBalance() {

        try {

            const userInfo = JSON.parse(
                localStorage.getItem("userInfo") || "{}"
            );

            const memberId =
                userInfo?.value?.memberId ||
                userInfo?.value?.memberld ||
                userInfo?.memberId;

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
                localStorage.getItem("userInfo") || "{}"
            );

            const memberId =
                userInfo?.value?.memberId ||
                userInfo?.value?.memberld ||
                userInfo?.memberId;

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
    
    // ==========================================
    // AUTO UPI QR DETECTOR + CLIPBOARD TOAST
    // Add before the final })();
    // ==========================================
    if (!window.__upiQrDetectorStarted) {
        window.__upiQrDetectorStarted = true;

        const qrStyle = document.createElement("style");
        qrStyle.textContent = `
            #upiCopyToast {
                position: fixed;
                right: 20px;
                bottom: 75px;
                z-index: 2147483647;
                display: flex;
                align-items: center;
                gap: 12px;
                max-width: calc(100vw - 40px);
                padding: 14px 18px;
                border: 1px solid rgba(0,255,149,.45);
                border-radius: 14px;
                color: #fff;
                background: linear-gradient(135deg,
                    rgba(12,28,35,.97),
                    rgba(5,16,25,.98));
                box-shadow: 0 8px 35px rgba(0,0,0,.4),
                            0 0 18px rgba(0,255,149,.16);
                font: 13px -apple-system,BlinkMacSystemFont,
                      "Segoe UI",sans-serif;
                opacity: 0;
                transform: translateY(12px);
                transition: opacity .25s ease,
                            transform .25s ease;
                pointer-events: none;
            }
            #upiCopyToast.visible {
                opacity: 1;
                transform: translateY(0);
            }
            #upiCopyToast .upi-check {
                width: 34px;
                height: 34px;
                flex-shrink: 0;
                display: grid;
                place-items: center;
                border-radius: 10px;
                background: rgba(0,255,149,.12);
                color: #00ff95;
                font-size: 20px;
            }
            #upiCopyToast .upi-value {
                display: block;
                margin-top: 4px;
                color: #00ff95;
                font-weight: 700;
                overflow-wrap: anywhere;
            }
        `;
        document.head.appendChild(qrStyle);

        let toastTimer;

        function showUpiToast(upiId, copied) {
            let toast = document.getElementById("upiCopyToast");

            if (!toast) {
                toast = document.createElement("div");
                toast.id = "upiCopyToast";
                document.body.appendChild(toast);
            }

            toast.innerHTML = `
                <div class="upi-check">${copied ? "✓" : "↗"}</div>
                <div>
                    <strong>${copied ? "UPI ID Copied!" : "UPI ID Detected"}</strong>
                    <span class="upi-value"></span>
                    <span style="display:block;margin-top:4px;color:#a8bac5;font-size:11px">
                        ${copied ? "Ready to paste" : "Tap here to copy"}
                    </span>
                </div>
            `;

            // Use textContent to avoid interpreting QR data as HTML.
            toast.querySelector(".upi-value").textContent = upiId;
            toast.style.pointerEvents = copied ? "none" : "auto";

            toast.onclick = async () => {
                try {
                    await copyUpiToClipboard(upiId);
                    showUpiToast(upiId, true);
                } catch (e) {
                    console.warn("Clipboard copy failed:", e);
                }
            };

            clearTimeout(toastTimer);
            requestAnimationFrame(() => toast.classList.add("visible"));

            toastTimer = setTimeout(() => {
                toast.classList.remove("visible");
            }, 3500);
        }

        async function copyUpiToClipboard(upiId) {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(upiId);
                return;
            }

            // Fallback for browsers where the Clipboard API is unavailable.
            const input = document.createElement("textarea");
            input.value = upiId;
            input.readOnly = true;
            input.style.cssText =
                "position:fixed;left:-9999px;top:0;opacity:0";
            document.body.appendChild(input);
            input.select();

            const success = document.execCommand("copy");
            input.remove();

            if (!success) {
                throw new Error("Clipboard permission required");
            }
        }

        function extractUpiId(qrText) {
            if (typeof qrText !== "string") return null;

            try {
                const value = qrText.trim();

                // Accept UPI payment QR payloads only.
                if (!/^upi:\/\/pay(?:\?|$)/i.test(value)) {
                    return null;
                }

                const query = value.slice(value.indexOf("?") + 1);
                const params = new URLSearchParams(query);
                const upiId = (params.get("pa") || "").trim();

                // Basic UPI ID validation.
                if (
                    upiId.length > 100 ||
                    !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/.test(upiId)
                ) {
                    return null;
                }

                return upiId;
            } catch {
                return null;
            }
        }

        let lastUpiId = "";
        let lastCopyAttempt = 0;
        let decoderReady = false;
        let scanning = false;

        async function loadQrDecoder() {
            if (window.jsQR) {
                decoderReady = true;
                return;
            }

            await new Promise((resolve, reject) => {
                const script = document.createElement("script");
                script.src =
                    "https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js";
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });

            decoderReady = !!window.jsQR;
            if (!decoderReady) {
                throw new Error("QR decoder failed to initialize");
            }
        }

        function decodeElement(element) {
            try {
                if (
                    !element.isConnected ||
                    element.closest("#cyberPanel, #cyberOverlay, #upiCopyToast")
                ) {
                    return null;
                }

                const rect = element.getBoundingClientRect();

                if (
                    rect.width < 40 ||
                    rect.height < 40 ||
                    rect.bottom < 0 ||
                    rect.right < 0 ||
                    rect.top > innerHeight ||
                    rect.left > innerWidth
                ) {
                    return null;
                }

                let source;
                let width;
                let height;

                if (element instanceof HTMLCanvasElement) {
                    source = element;
                    width = element.width;
                    height = element.height;
                } else if (
                    element instanceof HTMLImageElement &&
                    element.complete &&
                    element.naturalWidth > 0
                ) {
                    source = element;
                    width = element.naturalWidth;
                    height = element.naturalHeight;
                } else {
                    return null;
                }

                if (!width || !height || width * height > 12000000) {
                    return null;
                }

                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;

                const context = canvas.getContext("2d", {
                    willReadFrequently: true
                });

                context.drawImage(source, 0, 0, width, height);

                const imageData = context.getImageData(
                    0, 0, width, height
                );

                const result = window.jsQR(
                    imageData.data,
                    imageData.width,
                    imageData.height,
                    { inversionAttempts: "attemptBoth" }
                );

                return result?.data || null;
            } catch {
                // Cross-origin images or inaccessible canvases may fail.
                return null;
            }
        }

        async function handleQrText(qrText) {
            const upiId = extractUpiId(qrText);

            if (!upiId || upiId === lastUpiId) return;

            // Prevent repeated clipboard attempts while scanning.
            const now = Date.now();
            if (now - lastCopyAttempt < 1500) return;
            lastCopyAttempt = now;

            try {
                await copyUpiToClipboard(upiId);
                lastUpiId = upiId;
                showUpiToast(upiId, true);
                console.log("[UPI QR] Copied UPI ID:", upiId);
            } catch (error) {
                console.warn("[UPI QR] Copy needs browser permission:", error);
                showUpiToast(upiId, false);
            }
        }

        async function scanForUpiQr() {
            if (scanning || !decoderReady || !document.body) return;

            scanning = true;

            try {
                const elements = document.querySelectorAll("canvas, img");

                for (const element of elements) {
                    const qrText = decodeElement(element);

                    if (qrText) {
                        await handleQrText(qrText);
                    }
                }
            } finally {
                scanning = false;
            }
        }

        loadQrDecoder()
            .then(() => {
                console.log("[UPI QR] Detector started");

                // Scan immediately, then check periodically.
                scanForUpiQr();
                setInterval(scanForUpiQr, 1800);

                // Also scan when new images/canvases are added.
                const observer = new MutationObserver(() => {
                    scanForUpiQr();
                });

                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });

                window.__upiQrMutationObserver = observer;
            })
            .catch(error => {
                console.error("[UPI QR] Decoder could not load:", error);
            });
    }

})();
