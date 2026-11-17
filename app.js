// Amadeus GDS Simulator - Main Application
// Handles UI interactions, work areas, interactive terminal lines, and real-time command assistance

class AmadeusSimulator {
    constructor() {
        this.output = null;
        this.input = null;
        this.prompt = null;
        this.executeBtn = null;
        this.assistText = null;
        this.history = [];
        this.historyIndex = -1;
        this.clockInterval = null;

        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeUI());
        } else {
            this.initializeUI();
        }
    }

    initializeUI() {
        // DOM Elements
        this.output = document.getElementById('output');
        this.input = document.getElementById('command-input');
        this.prompt = document.getElementById('prompt');
        this.executeBtn = document.getElementById('execute-btn');
        this.assistText = document.getElementById('assist-text');

        // Initialize COMMANDS
        COMMANDS.init();

        // Welcome screen
        this.displayWelcomeMessage();

        // Event listeners
        this.setupEventListeners();
        this.setupWorkAreaTabs();
        this.startClock();
        this.updateStatusDisplay();

        // Autofocus command line
        this.input.focus();
    }

    displayWelcomeMessage() {
        const welcome =
            `================================================================================
 AMADEUS SELLING PLATFORM CONNECT - IATA CERTIFIED GDS TRAINING SIMULATOR
 OFFICE: NYC1A0980 / 0001AA   DUTY: GS   AGENT: 1234AA/AS   SESSIONS: A-F
================================================================================
READY FOR TRANSACTIONS. ENTER 'SEARCH' OR 'HELP' FOR COMMAND SYNTAX GUIDE.
QUICK START:
  1. AN20NOVDELBOM          (Check Availability)
  2. SS1Y1                  (Sell 1 Seat in Y on Line 1)
  3. NM1SMITH/JOHN MR       (Add Passenger Name)
  4. AP 1-212-555-0199      (Add Contact Phone)
  5. TKOK                   (Add Ticketing OK)
  6. RF TRAVEL AGENT        (Add Received From)
  7. FXP                    (Price Itinerary & Store TST)
  8. FP CASH                (Add Form of Payment)
  9. TTP                    (Issue 13-Digit Electronic Ticket)
 10. ET                     (End & Commit PNR to Storage)
--------------------------------------------------------------------------------`;
        this.appendOutput(welcome, 'header-text');
    }

    setupEventListeners() {
        // Execute command on Enter
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const cmd = this.input.value;
                this.historyIndex = -1;
                this.handleUserCommand(cmd);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateHistory(-1);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateHistory(1);
            } else if (e.ctrlKey && e.key === 'l') {
                e.preventDefault();
                this.clearScreen();
            } else if (e.ctrlKey && (e.key === 'c' || e.key === 'C')) {
                const hasSelection = (this.input.selectionStart !== this.input.selectionEnd) ||
                    (window.getSelection && window.getSelection().toString().length > 0);
                if (!hasSelection) {
                    e.preventDefault();
                    this.input.value = '';
                    this.updateAssistText('');
                }
            }
        });

        // Click execute button
        if (this.executeBtn) {
            this.executeBtn.addEventListener('click', () => {
                const cmd = this.input.value;
                this.historyIndex = -1;
                this.handleUserCommand(cmd);
                this.input.focus();
            });
        }

            // Real-time syntax assist on typing
            this.input.addEventListener('input', (e) => {
                this.updateAssistText(e.target.value);
            });

            // Click quick help button
            const helpBtn = document.getElementById('quick-help-btn');
            if (helpBtn) {
                helpBtn.addEventListener('click', () => {
                    this.executeCommand('HELP');
                });
            }

            // Global hotkeys: Alt+1..6 for Work Areas, Alt+H for Help
            document.addEventListener('keydown', (e) => {
                if (e.altKey && e.key >= '1' && e.key <= '6') {
                    e.preventDefault();
                    const areas = ['A', 'B', 'C', 'D', 'E', 'F'];
                    const selected = areas[parseInt(e.key, 10) - 1];
                    this.selectWorkArea(selected);
                } else if (e.altKey && (e.key === 'h' || e.key === 'H')) {
                    e.preventDefault();
                    this.executeCommand('HELP');
                }
            });

            // Keep input focused when clicking screen
            document.addEventListener('click', (e) => {
                if (!window.getSelection().toString() && !e.target.closest('button')) {
                    this.input.focus();
                }
            });
        }

    setupWorkAreaTabs() {
            const tabs = document.querySelectorAll('.area-tab');
            tabs.forEach(tab => {
                tab.addEventListener('click', (e) => {
                    const area = e.currentTarget.getAttribute('data-area');
                    this.selectWorkArea(area);
                });
            });
        }

    selectWorkArea(areaCode) {
            if(!COMMANDS.switchWorkArea(areaCode)) return;

        // Update Tab Active styling
        document.querySelectorAll('.area-tab').forEach(tab => {
            tab.classList.toggle('active', tab.getAttribute('data-area') === areaCode);
        });

        // Update Prompt
        if (this.prompt) {
            this.prompt.textContent = `${areaCode}:`;
        }

        const ctx = COMMANDS.getActiveAreaContext();
        let statusMsg = `MOVED TO WORK AREA ${areaCode}`;
        if (ctx.currentPNR) {
            statusMsg += ` | ACTIVE PNR: ${ctx.currentPNR.locator}`;
        } else {
            statusMsg += ` | NO ACTIVE PNR`;
        }

        this.appendOutput(`\n--- WORK AREA ${areaCode} ---  (${statusMsg})`, 'header-text');
        this.updateStatusDisplay();
        this.input.focus();
    }

    navigateHistory(direction) {
        if (this.history.length === 0) return;

        if (direction === -1) { // Up
            if (this.historyIndex === -1) {
                this.historyIndex = this.history.length - 1;
            } else if (this.historyIndex > 0) {
                this.historyIndex--;
            }
        } else { // Down
            if (this.historyIndex !== -1) {
                if (this.historyIndex < this.history.length - 1) {
                    this.historyIndex++;
                } else {
                    this.historyIndex = -1;
                    this.input.value = '';
                    this.updateAssistText('');
                    return;
                }
            }
        }

        if (this.historyIndex >= 0 && this.historyIndex < this.history.length) {
            this.input.value = this.history[this.historyIndex];
            this.updateAssistText(this.input.value);
        }
    }

    handleUserCommand(rawCommand) {
        const cmd = rawCommand.trim();
        if (!cmd) return;

        // Add to history
        this.history.push(cmd);
        if (this.history.length > 50) this.history.shift();

        // Echo command
        const area = COMMANDS.state.activeArea || 'A';
        this.appendOutput(`${area}:${cmd}`, 'user-command');

        // Execute command
        try {
            const response = COMMANDS.process(cmd);
            const isError = response && (response.includes('INVALID') || response.includes('REJECTED') || response.includes('ERROR') || response.includes('WARNING'));

            // Special IG clear screen check
            if (cmd.toUpperCase() === 'IG') {
                this.appendOutput(response, 'warning');
            } else if (response) {
                this.appendOutput(response, isError ? 'error' : '');
            }

            if (isError && this.input.select) {
                this.input.select(); // Preserve on typo so user can edit immediately
            } else {
                this.input.value = '';
                this.updateAssistText('');
            }

            // Update UI elements
            this.updateStatusDisplay();
        } catch (err) {
            console.error('Command Execution Error:', err);
            this.appendOutput('SYSTEM ERROR - UNABLE TO PROCESS ENTRY', 'error');
            if (this.input.select) this.input.select();
        }

        this.scrollToBottom();
    }

    appendOutput(text, customClass = '') {
        if (!text && text !== '') return;

        const lines = text.toString().split('\n');
        lines.forEach(line => {
            const lineDiv = document.createElement('div');
            lineDiv.className = 'terminal-line';
            lineDiv.textContent = line || ' ';

            // Check if line is an availability flight row (e.g. " 1   AI  101  J9...")
            const availMatch = line.match(/^\s*(\d{1,2})\s+([A-Z0-9]{2})\s+(\d{1,4})\s+(?:[A-Z]\d\s*){3,}\s+([A-Z]{6})/);
            if (availMatch) {
                const lineNum = availMatch[1];
                lineDiv.classList.add('interactive-row');
                lineDiv.title = `Click to Sell 1 Seat in Y Class on Line ${lineNum} (SS1Y${lineNum})`;
                lineDiv.addEventListener('click', () => {
                    this.input.value = `SS1Y${lineNum}`;
                    this.input.focus();
                    this.updateAssistText(this.input.value);
                });
            }

            // Apply syntax coloring
            if (customClass) {
                lineDiv.classList.add(customClass);
            } else {
                this.applySyntaxColoring(lineDiv, line);
            }

            this.output.appendChild(lineDiv);
        });

        this.scrollToBottom();
    }

    applySyntaxColoring(el, lineText) {
        const upper = lineText.toUpperCase();

        if (upper.includes('ERROR') || upper.includes('REJECTED') || upper.includes('INVALID') || upper.includes('NOT RECOGNIZED') || upper.includes('CHECK ITINERARY') || upper.includes('MISSING')) {
            el.classList.add('error');
        } else if (upper.includes('WARNING') || upper.includes('NEED ')) {
            el.classList.add('warning');
        } else if (upper.includes('OK ') || upper.includes('ACCEPTED') || upper.includes('SUCCESS') || upper.includes('COMMITTED') || upper.includes('ETICKET ISSUED') || upper.includes('SEGMENT SOLD')) {
            el.classList.add('success');
        } else if (upper.includes('TST 01') || upper.includes('TOTAL') || upper.includes('FARE:') || upper.includes('BASE FARE') || upper.includes('TAXES')) {
            el.classList.add('price-info');
        } else if (upper.startsWith('RP/') || upper.includes('LOCATOR:') || upper.includes('PASSENGERS:')) {
            el.classList.add('pnr-element');
        } else if (upper.startsWith('**') || upper.startsWith('---') || upper.startsWith('AMADEUS') || upper.startsWith('WORK AREA')) {
            el.classList.add('header-text');
        }
    }

    updateAssistText(currentVal) {
        if (!this.assistText) return;
        const input = currentVal.trim().toUpperCase();

        if (!input) {
            this.assistText.textContent = "Type an Amadeus cryptic entry (AN..., SS..., NM..., AP..., FXP, TTP, ET, RT)";
            return;
        }

        if (input.startsWith('TRF')) {
            this.assistText.textContent = "Ticket Refund: TRF (Display Refund Quote), TRFP (Process Refund), TRF/FULL (Full Involuntary Refund)";
        } else if (input.startsWith('TRDC')) {
            this.assistText.textContent = "Ticket Record/Void: TRDC (Display Ticket Record), TRDC/TK-[NUMBER] (Void Same-Day Issued Ticket)";
        } else if (input.startsWith('XE')) {
            this.assistText.textContent = "Cancel Segment: XE[LINE] (e.g. XE1 to cancel segment 1, XE2 to cancel segment 2)";
        } else if (input === 'XI') {
            this.assistText.textContent = "Cancel Itinerary: XI (Cancel all active flight segments in current work area)";
        } else if (input.startsWith('ACR')) {
            this.assistText.textContent = "Return Availability: ACR (Swap Route), ACR[DATE] (e.g. ACR25NOV), ACR+7 (7 Days Return), ACR/[AIRLINE]";
        } else if (input.startsWith('AC')) {
            this.assistText.textContent = "Availability Change: AC (Refresh), AC+1/AC-1 (Shift Date), AC[DATE] (e.g. AC25NOV), AC/[AIRLINE] (e.g. AC/AI)";
        } else if (input.startsWith('1')) {
            this.assistText.textContent = "Direct Access: 1[AIRLINE] (e.g. 1BA, 1EK, 1AI to connect), 1[AIRLINE] [CMD] (Direct Entry), 1A (Return to Amadeus)";
        } else if (input.startsWith('AN')) {
            this.assistText.textContent = "Air Availability: AN[DDMMM][ORIGIN][DEST] (e.g. AN20NOVDELBOM, AN25DECDXBLON/AEK)";
        } else if (input.startsWith('SS')) {
            this.assistText.textContent = "Sell Segment: SS[SEATS][CLASS][LINE] (e.g. SS1Y1, SS2J3)";
        } else if (input.startsWith('NM')) {
            this.assistText.textContent = "Passenger Name: NM1[SURNAME]/[FIRSTNAME] [TITLE] (e.g. NM1SMITH/JOHN MR, NM1ALI/M MSTR(CHD/12JAN18))";
        } else if (input.startsWith('AP')) {
            this.assistText.textContent = "Contact Info: AP [PHONE], APM-[MOBILE], APE-[EMAIL] (e.g. AP 1-212-555-0199, APE-JOHN@GMAIL.COM)";
        } else if (input.startsWith('TK')) {
            this.assistText.textContent = "Ticketing Arrangement: TKOK (OK to ticket), TKTL[DATE]/[TIME] (Time limit)";
        } else if (input.startsWith('RF')) {
            this.assistText.textContent = "Received From: RF [CALLER/AGENT] or RFS (e.g. RF TRAVEL AGENT, RFS)";
        } else if (input.startsWith('FX')) {
            this.assistText.textContent = "Pricing & TST: FXP (Price & Store TST), FXB (Lowest Fare Available)";
        } else if (input.startsWith('FP')) {
            this.assistText.textContent = "Form of Payment: FP CASH, FP CCVI[16-digit card]/[MMYY]";
        } else if (input.startsWith('TTP')) {
            this.assistText.textContent = "Issue Electronic Ticket: TTP (Issue E-Ticket for Stored TST), TTP/ET (Issue & Commit PNR)";
        } else if (input.startsWith('RT')) {
            this.assistText.textContent = "Retrieve PNR: RT [LOCATOR] (e.g. RTABC123), RT/[SURNAME] (e.g. RT/SMITH)";
        } else if (input === 'ET') {
            this.assistText.textContent = "End Transaction: Validates IATA PRINT rules (Phone, Received-from, Itinerary, Name, Ticketing) and saves PNR";
        } else if (input.startsWith('JM')) {
            this.assistText.textContent = "Jump Work Area: JMA through JMF (e.g. JMA, JMB, JMC)";
        } else if (input.startsWith('DC') || input.startsWith('DAC') || input.startsWith('DAN') || input.startsWith('DNA')) {
            this.assistText.textContent = "Encode / Decode: DC [CODE/NAME], DAC [CITY-CODE], DAN [CITY-NAME], DNA [AIRLINE]";
        } else if (input.startsWith('SM')) {
            this.assistText.textContent = "Seat Map: SM[LINE] (e.g. SM1 to display seat map for segment 1)";
        } else if (input.startsWith('ST')) {
            this.assistText.textContent = "Seat Assignment: ST/[SEAT] (e.g. ST/12A, ST/14C/P1)";
        } else {
            this.assistText.textContent = `Entry: ${input} - Press Enter to execute`;
        }
    }

    updateStatusDisplay() {
        const area = COMMANDS.state.activeArea || 'A';
        const ctx = COMMANDS.getActiveAreaContext();
        const da = COMMANDS.directAccessCarrier;

        // Synchronize Tab Bar highlighting with active work area
        document.querySelectorAll('.area-tab').forEach(tab => {
            tab.classList.toggle('active', tab.getAttribute('data-area') === area);
        });

        // Prompt
        if (this.prompt) {
            this.prompt.textContent = da ? `${area}:${da}>` : `${area}:`;
        }

        // Area Status
        const areaEl = document.getElementById('status-area');
        if (areaEl) areaEl.textContent = `AREA: ${area}`;

        // PNR Status
        const pnrEl = document.getElementById('status-pnr');
        if (pnrEl) {
            pnrEl.textContent = ctx.currentPNR ? ctx.currentPNR.locator : 'NO PNR';
            pnrEl.style.color = ctx.currentPNR ? '#10B981' : '#94A3B8';
        }

        // TST Status
        const tstEl = document.getElementById('status-tst');
        if (tstEl) {
            tstEl.textContent = ctx.currentPNR && ctx.currentPNR.tst ? `TST 01 (${ctx.currentPNR.tst.currency} ${ctx.currentPNR.tst.total})` : 'NO TST';
            tstEl.style.color = ctx.currentPNR && ctx.currentPNR.tst ? '#FBBF24' : '#94A3B8';
        }

        // Queue Status
        const queueEl = document.getElementById('status-queue');
        if (queueEl) {
            queueEl.textContent = ctx.queueMode ? `QUEUE: ${ctx.currentQueue}` : 'NORMAL';
            queueEl.style.color = ctx.queueMode ? '#38BDF8' : '#94A3B8';
        }

        // Live Indicator
        const indEl = document.querySelector('.status-indicator');
        if (indEl) {
            if (da) {
                indEl.textContent = `● DIRECT: ${da}`;
                indEl.style.color = '#38BDF8';
            } else {
                indEl.textContent = '● IATA CONNECTED';
                indEl.style.color = '';
            }
        }

        // Office & Agent
        const officeEl = document.getElementById('office-id');
        if (officeEl) officeEl.textContent = COMMANDS.state.officeId;

        const agentEl = document.getElementById('agent-sine');
        if (agentEl) agentEl.textContent = COMMANDS.state.userId;
    }

    startClock() {
        const clockEl = document.getElementById('clock-display');
        const update = () => {
            const now = new Date();
            const h = now.getUTCHours().toString().padStart(2, '0');
            const m = now.getUTCMinutes().toString().padStart(2, '0');
            const s = now.getUTCSeconds().toString().padStart(2, '0');
            if (clockEl) clockEl.textContent = `${h}:${m}:${s}Z`;
        };
        update();
        this.clockInterval = setInterval(update, 1000);
    }

    clearScreen() {
        if (this.output) {
            this.output.innerHTML = '';
        }
    }

    scrollToBottom() {
        if (this.output) {
            this.output.scrollTop = this.output.scrollHeight;
        }
    }

    executeCommand(cmd) {
        if (this.input) {
            this.input.value = cmd;
            this.handleUserCommand(cmd);
            this.input.value = '';
            this.input.focus();
        }
    }
}

// Global initialization
function initAmadeus() {
    window.amadeusApp = new AmadeusSimulator();
    window.executeCommand = (cmd) => window.amadeusApp && window.amadeusApp.executeCommand(cmd);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAmadeus);
} else {
    initAmadeus();
}
