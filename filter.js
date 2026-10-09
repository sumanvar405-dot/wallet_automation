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

    
/* =========================================================
   CONTINUOUS QR → UPI ID DETECTOR
   Insert BEFORE: // FIREBASE
   Scans immediately and continues every second.
   ========================================================= */
(() => {
    if (window.__upiQrDetectorStarted) {
        console.log("[UPI QR] Detector already running.");
        return;
    }

    window.__upiQrDetectorStarted = true;

    const SCAN_INTERVAL_MS = 1000;
    let scanBusy = false;
    let lastCopiedUpi = "";
    let jsQrLoadPromise = null;

    // -------------------------
    // Toast notification
    // -------------------------
    function showUpiToast(message, success = true) {
        let toast = document.getElementById("upiQrToast");

        if (!toast) {
            const style = document.createElement("style");
            style.id = "upiQrToastStyles";
            style.textContent = `
                #upiQrToast {
                    position: fixed;
                    top: 22px;
                    right: 20px;
                    z-index: 2147483647;
                    max-width: calc(100vw - 40px);
                    padding: 14px 18px;
                    border-radius: 12px;
                    color: #fff;
                    font: 600 14px/1.5 system-ui, sans-serif;
                    box-shadow: 0 10px 35px rgba(0,0,0,.3);
                    border: 1px solid rgba(255,255,255,.18);
                    background: #123c2b;
                    opacity: 0;
                    transform: translateY(-12px);
                    transition: opacity .2s ease, transform .2s ease;
                    pointer-events: none;
                    overflow-wrap: anywhere;
                }
                #upiQrToast.upi-error {
                    background: #64252b;
                }
                #upiQrToast.upi-visible {
                    opacity: 1;
                    transform: translateY(0);
                }
            `;
            (document.head || document.documentElement)
                .appendChild(style);

            toast = document.createElement("div");
            toast.id = "upiQrToast";
            (document.body || document.documentElement)
                .appendChild(toast);
        }

        toast.classList.toggle("upi-error", !success);
        toast.textContent = message;
        toast.classList.add("upi-visible");

        clearTimeout(toast.__hideTimer);
        toast.__hideTimer = setTimeout(() => {
            toast.classList.remove("upi-visible");
        }, 3500);
    }

    // -------------------------
    // Load QR decoder once
    // -------------------------
    function loadJsQR() {
        if (typeof window.jsQR === "function") {
            return Promise.resolve();
        }

        if (jsQrLoadPromise) {
            return jsQrLoadPromise;
        }

        jsQrLoadPromise = new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src =
                "https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js";
            script.async = true;

            script.onload = () => {
                if (typeof window.jsQR === "function") {
                    resolve();
                } else {
                    reject(new Error("QR decoder did not load."));
                }
            };

            script.onerror = () => {
                jsQrLoadPromise = null;
                reject(new Error("Could not load QR decoder."));
            };

            (document.head || document.documentElement)
                .appendChild(script);
        });

        return jsQrLoadPromise;
    }

    // -------------------------
    // Extract UPI ID from QR text
    // -------------------------
    function extractUpiId(qrText) {
        if (typeof qrText !== "string") return "";

        const text = qrText.trim();

        // Expected format:
        // upi://pay?pa=name@bank&am=100&cu=INR
        try {
            const url = new URL(text);

            if (
                url.protocol.toLowerCase() === "upi:" &&
                url.hostname.toLowerCase() === "pay"
            ) {
                const pa = url.searchParams.get("pa");
                if (pa) return validateUpiId(pa);
            }
        } catch (_) {
            // Continue with fallback parsing.
        }

        // Fallback for encoded or unusual UPI payloads.
        const match = text.match(
            /(?:[?&]pa=|(?:^|\s)pa=)([^&\s]+)/i
        );

        if (match) {
            try {
                return validateUpiId(
                    decodeURIComponent(match[1].replace(/\+/g, "%20"))
                );
            } catch (_) {
                return validateUpiId(match[1]);
            }
        }

        // Also accept a QR whose content is just a UPI ID.
        return validateUpiId(text);
    }

    function validateUpiId(value) {
        if (!value) return "";

        const upiId = String(value).trim();

        // Basic UPI ID format: name@bank
        return /^[a-zA-Z0-9._-]{2,256}@[a-zA-Z0-9.-]{2,64}$/
            .test(upiId)
            ? upiId
            : "";
    }

    // -------------------------
    // Copy UPI ID to clipboard
    // -------------------------
    async function copyUpiToClipboard(upiId) {
        try {
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(upiId);
                return true;
            }
        } catch (error) {
            console.debug(
                "[UPI QR] Clipboard API unavailable:",
                error
            );
        }

        // Fallback; browser security may still block this.
        try {
            const textarea = document.createElement("textarea");
            textarea.value = upiId;
            textarea.readOnly = true;
            textarea.style.cssText =
                "position:fixed;left:-9999px;top:0;opacity:0;";

            document.body.appendChild(textarea);
            textarea.select();
            textarea.setSelectionRange(0, textarea.value.length);

            const copied = document.execCommand("copy");
            textarea.remove();

            return copied;
        } catch (error) {
            console.warn("[UPI QR] Copy failed:", error);
            return false;
        }
    }

    // -------------------------
    // Check element visibility
    // -------------------------
    function isVisible(element) {
        if (!element.isConnected) return false;

        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);

        return (
            rect.width >= 40 &&
            rect.height >= 40 &&
            style.display !== "none" &&
            style.visibility !== "hidden" &&
            Number(style.opacity) !== 0
        );
    }

    // -------------------------
    // Decode an IMG or CANVAS
    // -------------------------
    function decodeElement(element) {
        return new Promise(resolve => {
            try {
                if (!isVisible(element)) {
                    resolve("");
                    return;
                }

                let width;
                let height;

                if (element instanceof HTMLImageElement) {
                    if (!element.complete ||
                        !element.naturalWidth ||
                        !element.naturalHeight) {
                        resolve("");
                        return;
                    }

                    width = element.naturalWidth;
                    height = element.naturalHeight;
                } else if (element instanceof HTMLCanvasElement) {
                    width = element.width;
                    height = element.height;
                } else {
                    resolve("");
                    return;
                }

                if (!width || !height) {
                    resolve("");
                    return;
                }

                // Avoid excessive canvas allocations.
                const maxDimension = 1200;
                const scale = Math.min(
                    1,
                    maxDimension / Math.max(width, height)
                );

                const canvas = document.createElement("canvas");
                canvas.width = Math.max(1, Math.round(width * scale));
                canvas.height = Math.max(1, Math.round(height * scale));

                const context = canvas.getContext("2d", {
                    willReadFrequently: true
                });

                if (!context) {
                    resolve("");
                    return;
                }

                context.drawImage(
                    element,
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );

                const imageData = context.getImageData(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );

                const result = window.jsQR(
                    imageData.data,
                    imageData.width,
                    imageData.height,
                    {
                        inversionAttempts: "attemptBoth"
                    }
                );

                resolve(result?.data || "");
            } catch (error) {
                // Cross-origin images or tainted canvases may be unreadable.
                resolve("");
            }
        });
    }

    // -------------------------
    // Process decoded QR payload
    // -------------------------
    async function handleQrText(qrText) {
        const upiId = extractUpiId(qrText);

        if (!upiId || upiId === lastCopiedUpi) {
            return false;
        }

        const copied = await copyUpiToClipboard(upiId);

        if (!copied) {
            showUpiToast(
                "QR detected, but clipboard access was blocked. Allow clipboard access and try again.",
                false
            );
            console.warn("[UPI QR] UPI ID:", upiId);
            return false;
        }

        lastCopiedUpi = upiId;
        console.log("[UPI QR] UPI ID copied:", upiId);

        showUpiToast("✓ UPI ID copied: " + upiId, true);
        return true;
    }

    // -------------------------
    // Scan all available images
    // and canvases
    // -------------------------
    async function scanForUpiQr() {
        if (scanBusy || !document.documentElement) return;

        scanBusy = true;

        try {
            await loadJsQR();

            const elements = document.querySelectorAll(
                "img, canvas"
            );

            for (const element of elements) {
                if (!isVisible(element)) continue;

                const qrText = await decodeElement(element);
                if (!qrText) continue;

                const copied = await handleQrText(qrText);

                if (copied) {
                    break;
                }
            }
        } catch (error) {
            console.warn("[UPI QR] Scan issue:", error);
        } finally {
            scanBusy = false;
        }
    }

    // -------------------------
    // Start continuous detection
    // -------------------------
    function startContinuousScanner() {
        // Detect a QR that already exists.
        scanForUpiQr();

        // Keep checking indefinitely while this page is alive.
        window.__upiQrScanInterval = setInterval(
            scanForUpiQr,
            SCAN_INTERVAL_MS
        );

        // React to new images, changed image sources,
        // new canvases, and page updates.
        if (document.documentElement) {
            window.__upiQrObserver = new MutationObserver(() => {
                scanForUpiQr();
            });

            window.__upiQrObserver.observe(
                document.documentElement,
                {
                    childList: true,
                    subtree: true,
                    attributes: true,
                    attributeFilter: [
                        "src",
                        "srcset",
                        "style",
                        "class"
                    ]
                }
            );
        }

        console.log(
            "[UPI QR] Continuous scanner started; checking every second."
        );
    }

    startContinuousScanner();
})();
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
                            buyBankCode: "moneyView",
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
})();
