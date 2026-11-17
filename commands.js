// Amadeus GDS Simulator - Commands Module
// Certified IATA and authentic Amadeus Selling Platform Connect command processor
// Complete support for 6 isolated Work Areas (A-F), IATA PRINT validation, TST, and 13-digit E-Ticketing

const COMMANDS = {
    // Current system state with 6 Isolated Work Areas
    state: {
        signedIn: true,
        userId: '1234AA/AS',
        dutyCode: 'GS',
        officeId: 'NYC1A0980',
        activeArea: 'A',
        workArea: 'A',
        workAreas: {
            'A': { currentPNR: null, lastAvailability: null, lastTST: null, queueMode: false, currentQueue: null, directAccessCarrier: null },
            'B': { currentPNR: null, lastAvailability: null, lastTST: null, queueMode: false, currentQueue: null, directAccessCarrier: null },
            'C': { currentPNR: null, lastAvailability: null, lastTST: null, queueMode: false, currentQueue: null, directAccessCarrier: null },
            'D': { currentPNR: null, lastAvailability: null, lastTST: null, queueMode: false, currentQueue: null, directAccessCarrier: null },
            'E': { currentPNR: null, lastAvailability: null, lastTST: null, queueMode: false, currentQueue: null, directAccessCarrier: null },
            'F': { currentPNR: null, lastAvailability: null, lastTST: null, queueMode: false, currentQueue: null, directAccessCarrier: null }
        }
    },

    // Helper to get active work area context
    getActiveAreaContext: function () {
        return this.state.workAreas[this.state.activeArea];
    },

    // Get current active PNR (for compatibility with existing UI)
    get currentPNR() {
        return this.getActiveAreaContext().currentPNR;
    },
    set currentPNR(val) {
        this.getActiveAreaContext().currentPNR = val;
    },

    get lastAvailability() {
        return this.getActiveAreaContext().lastAvailability;
    },
    set lastAvailability(val) {
        this.getActiveAreaContext().lastAvailability = val;
    },

    get queueMode() {
        return this.getActiveAreaContext().queueMode;
    },
    set queueMode(val) {
        this.getActiveAreaContext().queueMode = val;
    },

    get currentQueue() {
        return this.getActiveAreaContext().currentQueue;
    },
    set currentQueue(val) {
        this.getActiveAreaContext().currentQueue = val;
    },

    get directAccessCarrier() {
        return this.getActiveAreaContext().directAccessCarrier || null;
    },
    set directAccessCarrier(val) {
        this.getActiveAreaContext().directAccessCarrier = val;
    },

    // Enhanced command processor with complete cryptic routing
    process: function (input) {
        const cmd = input.trim().toUpperCase();
        if (!cmd) return '';

        // Quick search command
        if (cmd === 'SEARCH' || cmd === 'HELP') {
            return this.handleSearchCommand();
        }

        // Routing table for Amadeus cryptic commands
        if (this.isSignInCommand(cmd)) {
            return this.handleSignIn(cmd);
        } else if (this.isWorkAreaCommand(cmd)) {
            return this.handleWorkArea(cmd);
        } else if (this.isDirectAccessCommand(cmd)) {
            return this.handleDirectAccess(cmd);
        } else if (this.isPNRCommand(cmd)) {
            return this.handlePNR(cmd);
        } else if (this.isAvailabilityCommand(cmd)) {
            return this.handleAvailability(cmd);
        } else if (this.isSellCommand(cmd)) {
            return this.handleSell(cmd);
        } else if (this.isFareCommand(cmd)) {
            return this.handleFare(cmd);
        } else if (this.isTicketCommand(cmd)) {
            return this.handleTicket(cmd);
        } else if (this.isQueueCommand(cmd)) {
            return this.handleQueue(cmd);
        } else if (this.isHelpCommand(cmd)) {
            return this.handleHelp(cmd);
        } else if (this.isEncodingCommand(cmd)) {
            return this.handleEncoding(cmd);
        } else if (this.isHotelCommand(cmd)) {
            return this.handleHotel(cmd);
        } else if (this.isCarCommand(cmd)) {
            return this.handleCar(cmd);
        } else if (this.isScrollCommand(cmd)) {
            return this.handleScroll(cmd);
        } else if (this.isGeneralCommand(cmd)) {
            return this.handleGeneral(cmd);
        } else {
            return this.handleDatabaseFallback(cmd);
        }
    },

    // Command Checkers
    isSignInCommand: function (cmd) {
        return /^JI/.test(cmd) || cmd === 'JO' || cmd === 'JB';
    },

    isWorkAreaCommand: function (cmd) {
        return /^J[MXCD][A-F]$/.test(cmd) || /^JM[A-F]$/.test(cmd) || cmd === 'JD' || cmd === 'JS';
    },

    isDirectAccessCommand: function (cmd) {
        return cmd === '1A' || /^1[A-Z0-9]{2}(\s+.*|\/.*|[A-Z].*)?$/.test(cmd);
    },

    isPNRCommand: function (cmd) {
        return /^RT/.test(cmd) || /^RF/.test(cmd) || cmd === 'RFS' || cmd === 'IG' || cmd === 'ER' || cmd === 'ET' || /^RH/.test(cmd) || /^RL/.test(cmd);
    },

    isAvailabilityCommand: function (cmd) {
        return /^A[NDACW]/.test(cmd) || /^ACR/.test(cmd) || /^SN/.test(cmd) || /^TN/.test(cmd);
    },

    isSellCommand: function (cmd) {
        return /^SS(?!\s*R)/.test(cmd) || /^0\d/.test(cmd) || /^XE\s*\d+/.test(cmd) || cmd === 'XI';
    },

    isFareCommand: function (cmd) {
        return /^FX/.test(cmd) || /^FP/.test(cmd) || /^FQD/.test(cmd) || cmd === 'TQT' || /^TTK/.test(cmd);
    },

    isTicketCommand: function (cmd) {
        return /^TTP/.test(cmd) || /^TRDC/.test(cmd) || /^TRF/.test(cmd) || /^TWX/.test(cmd) || /^EMD/.test(cmd) || /^TTM/.test(cmd);
    },

    isQueueCommand: function (cmd) {
        return /^Q[TSNDIFX]/.test(cmd);
    },

    isHelpCommand: function (cmd) {
        return /^HE/.test(cmd) || /^GG/.test(cmd);
    },

    isEncodingCommand: function (cmd) {
        return /^S\*/.test(cmd) || /^D[CNSA]/.test(cmd) || /^TC/.test(cmd) || /^DNS/.test(cmd) || /^DAN/.test(cmd) || /^DAC/.test(cmd) || /^DNA/.test(cmd) || /^GP/.test(cmd) || cmd === 'GGCODES' || /^DD/.test(cmd) || /^DF/.test(cmd);
    },

    isHotelCommand: function (cmd) {
        return /^H[FLADRTS]/.test(cmd);
    },

    isCarCommand: function (cmd) {
        return /^C[AGLRSTF]/.test(cmd);
    },

    isScrollCommand: function (cmd) {
        return /^M[DUBTP]/.test(cmd);
    },

    isGeneralCommand: function (cmd) {
        return /^NM/.test(cmd) || /^AP/.test(cmd) || /^SR/.test(cmd) || /^SSR/.test(cmd) || /^RM/.test(cmd) || /^RC/.test(cmd) || /^RI/.test(cmd) || /^OS/.test(cmd) || /^TK/.test(cmd) || /^FFN/.test(cmd) || /^SM/.test(cmd) || /^ST\//.test(cmd);
    },

    // 1. Sign In / Sign Off Handlers
    handleSignIn: function (cmd) {
        if (cmd === 'JO') {
            this.state.signedIn = false;
            return 'SIGNED OFF ' + this.state.officeId + ' - SEE YOU AGAIN';
        }

        if (cmd === 'JB') {
            return `AMADEUS SELLING PLATFORM CONNECT\nOFFICE: ${this.state.officeId}  DUTY: ${this.state.dutyCode}\nPLEASE SIGN IN: JI1234AA/AS`;
        }

        const match = cmd.match(/^JI[* ]?([A-Z0-9]+)\/([A-Z]+)$/);
        if (match) {
            this.state.signedIn = true;
            this.state.userId = match[1] + '/' + match[2];
            return `SIGN-IN ACCEPTED\nAGENT: ${this.state.userId}   OFFICE: ${this.state.officeId}   DUTY: ${this.state.dutyCode}\nDATE: ${this.getCurrentDateTime()}   WORK AREA: ${this.state.activeArea}`;
        }

        return 'INVALID SIGN-IN FORMAT - USE JI1234AA/AS';
    },

    // 2. Work Area Switching (Sessions A through F)
    handleWorkArea: function (cmd) {
        if (cmd === 'JD' || cmd === 'JS') {
            return this.getWorkAreaStatus();
        }

        // Jump commands: JMA, JMB, JMC, JMD, JME, JMF or JXA..JXF
        const match = cmd.match(/^J[MX]?([A-F])$/);
        if (match) {
            const targetArea = match[1];
            this.switchWorkArea(targetArea);
            const context = this.getActiveAreaContext();
            let msg = `MOVED TO WORK AREA ${targetArea}\n`;
            if (context.currentPNR) {
                msg += `ACTIVE PNR IN AREA ${targetArea}: ${context.currentPNR.locator}`;
            } else {
                msg += `WORK AREA ${targetArea} FREE - NO ACTIVE PNR`;
            }
            return msg;
        }

        return 'INVALID WORK AREA COMMAND - USE JMA THROUGH JMF OR JD';
    },

    switchWorkArea: function (areaCode) {
        const valid = ['A', 'B', 'C', 'D', 'E', 'F'];
        if (!valid.includes(areaCode)) return false;
        this.state.activeArea = areaCode;
        this.state.workArea = areaCode;
        return true;
    },

    getWorkAreaStatus: function () {
        let lines = ['WORK AREA STATUS - OFFICE: ' + this.state.officeId];
        let statusList = [];
        ['A', 'B', 'C', 'D', 'E', 'F'].forEach(area => {
            const ctx = this.state.workAreas[area];
            const activeIndicator = area === this.state.activeArea ? '*' : ' ';
            if (ctx.currentPNR) {
                statusList.push(`${activeIndicator}${area} IN USE (${ctx.currentPNR.locator})`);
            } else if (ctx.lastAvailability) {
                statusList.push(`${activeIndicator}${area} AVAILABILITY`);
            } else {
                statusList.push(`${activeIndicator}${area} FREE`);
            }
        });
        lines.push(statusList.slice(0, 3).join('   '));
        lines.push(statusList.slice(3, 6).join('   '));
        lines.push(`CURRENT ACTIVE AREA: ${this.state.activeArea}`);
        return lines.join('\n');
    },
    // Helper to clean airline filters:
    // Supports Amadeus 3-char syntax (/AAI, /AAF, /ABA, /A6E)
    // and standard 2-char syntax (/AI, /AF, /AA, /AZ, /BA, /6E)
    // and resets (/A or empty)
    cleanAirlineFilter: function (filterStr) {
        if (!filterStr) return null;
        let code = filterStr.toString().toUpperCase().trim().replace(/^\//, '');
        if (!code || code === 'A') return null; // 'A' or '/A" resets filter

        // 3 -letter Amadeus format starting with 'A' (/AAI -> AI, /ABA -> BA, /AAF -> AF)

        if (code.length === 3 && code.startsWith('A')) {
            return code.substring(1);
        }
        // Direct 2-character IATA carrier code (AI, AF, AA, AZ, EK, QR, etc.)
        if (code.length === 2) {
            return code;
        }
        return code;
    },

    // Resolves a DDMMM date with proper calendar year roll-over:
    // If date in the current calendar year is before today (e.g. 01MAR when today is NOV),
    // it rolls to next year.
    resolveAmadeusDate: function (dateStr, referenceYear = null) {
        const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

        const dayMatch = (dateStr || '').match(/^(\d{1,2})([A-Z]{3})$/);
        const now = new Date();
        const currentYear = referenceYear || now.getFullYear();

        if (!dayMatch) {
            return {
                date: dateStr || '20NOV',
                year: currentYear,
                monthIdx: now.getMonth(),
                day: now.getDate()
            };
        }

        const day = parseInt(dayMatch[1], 10);
        const monthIdx = monthNames.indexOf(dayMatch[2].toUpperCase());
        if (monthIdx === -1) {
            return { date: dateStr, year: currentYear, monthIdx: 0, day: 1 };
        }

        let year = currentYear;
        if (!referenceYear) {
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const target = new Date(currentYear, monthIdx, day);
            if (target < today) {
                year = currentYear + 1; // past date in current calendar rolls over to next year
            }
        }

        const formattedDay = day.toString().padStart(2, '0');
        const formattedMonth = monthNames[monthIdx];
        return {
            date: `${formattedDay}${formattedMonth}`,
            year: year,
            monthIdx: monthIdx,
            day: day
        };
    },

    // Helper to shift DDMMM by N days across year boundaries
    shiftAmadeusDate: function (dateStr, daysOffset, baseYear = null) {
        const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const resolved = this.resolveAmadeusDate(dateStr, baseYear);
        const dt = new Date(resolved.year, resolved.monthIdx, resolved.day);
        dt.setDate(dt.getDate() + daysOffset);

        const newDay = dt.getDate().toString().padStart(2, '0');
        const newMonth = monthNames[dt.getMonth()];
        const newYear = dt.getFullYear();
        return {
            date: `${newDay}${newMonth}`,
            year: newYear
        };
    },

    // Formatter for availability screens (AN, AC, ACR)
    displayAvailabilityScreen: function (origin, destination, date, airlineFilter = null, depTimeFilter = null, title = 'AMADEUS AVAILABILITY - AN', sortMode = null, year = null) {
        if (!DATA.cities[origin] || !DATA.cities[destination]) {
            return `CHECK ITINERARY - INVALID CITY CODE (${!DATA.cities[origin] ? origin : destination})`;
        }

        const resolved = this.resolveAmadeusDate(date, year);
        const formattedDate = resolved.date;
        const activeYear = resolved.year;
        const cleanFilter = this.cleanAirlineFilter(airlineFilter);

        // Fetch genuine flights from data engine
        let flights = DATA.flights.generateFlights(origin, destination, formattedDate, cleanFilter);

        // If a carrier filter was supplied but no direct flights exist on this route
        if (cleanFilter && flights.length === 0) {
            const orgDesc = DATA.cities[origin] || origin;
            const dstDesc = DATA.cities[destination] || destination;
            return `**  ${title}  **  ${origin} ${orgDesc}  TO  ${destination} ${dstDesc}  ${formattedDate}\n\n` +
                `NO DIRECT FLIGHTS FOUND FOR CARRIER ${cleanFilter} ON THIS ROUTE\n` +
                `ENTER AN${formattedDate}${origin}${destination} FOR ALL CARRIER AVAILABILITY`;
        }

        if (sortMode === 'AA') {
            flights.sort((a, b) => a.arr.localeCompare(b.arr));
        } else if (sortMode === 'AD' || depTimeFilter) {
            flights.sort((a, b) => a.dep.localeCompare(b.dep));
        }

        this.lastAvailability = {
            origin,
            destination,
            date: formattedDate,
            year: activeYear,
            flights,
            airlineFilter: cleanFilter
        };

        const orgDesc = DATA.cities[origin] || origin;
        const dstDesc = DATA.cities[destination] || destination;

        let result = `**  ${title}  **  ${origin} ${orgDesc}  TO  ${destination} ${dstDesc}  ${formattedDate}\n\n`;

        flights.forEach((flt, idx) => {
            const lineNum = (idx + 1).toString().padStart(2, ' ');
            result += `${lineNum}   ${flt.airline.padEnd(2)} ${flt.flight.padStart(4, ' ')}  ${flt.classes.line1}  ${origin}${destination}  ${flt.dep}  ${flt.arr}  ${flt.aircraft} 0 /E\n`;
            result += `          ${flt.classes.line2}\n`;
        });

        result += `\nTO BOOK: SS[SEATS][CLASS][LINE] (EXAMPLE: SS1Y1) | ACR FOR RETURN | AC+1/AC-1 FOR DATE CHANGE`;
        return result;
    },

    // 3. Availability Handlers (AN, AC, ACR, SN, TN)
    handleAvailability: function (cmd) {
        if (!this.state.signedIn) return 'SIGN-IN REQUIRED - USE JI1234AA/AS';

        // 3a. ACR - Availability Change Return (e.g. ACR, ACR25NOV, ACR+7, ACR/AI, ACR25NOV/AI)
        if (cmd.startsWith('ACR')) {
            const context = this.getActiveAreaContext();
            const prev = this.lastAvailability || (context.currentPNR && context.currentPNR.segments.length > 0 ? {
                origin: context.currentPNR.segments[0].destination,
                destination: context.currentPNR.segments[0].origin,
                date: context.currentPNR.segments[0].date,
                airlineFilter: context.currentPNR.segments[0].airline
            } : null);

            if (!prev) {
                return 'NO ACTIVE AVAILABILITY DISPLAY - RUN AN COMMAND FIRST (EXAMPLE: AN20NOVDELBOM)';
            }

            // Swap origin & destination for return
            const origin = prev.destination || prev.origin;
            const destination = prev.origin || prev.destination;
            let date = prev.date;
            let year = prev.year;

            const acrParam = cmd.substring(3).trim();
            let airlineFilter = this.directAccessCarrier || prev.airlineFilter || null;

            if (acrParam) {
                const parts = acrParam.split('/');
                const datePart = parts[0];
                if (parts[1]) airlineFilter = this.cleanAirlineFilter(parts[1]);

                if (datePart.startsWith('+')) {
                    const days = parseInt(datePart.substring(1), 10) || 7;
                    const shifted = this.shiftAmadeusDate(date, days, year);
                    date = shifted.date;
                    year = shifted.year;
                } else if (/^\d{1,2}[A-Z]{3}$/.test(datePart)) {
                    const res = this.resolveAmadeusDate(datePart);
                    date = res.date;
                    year = res.year;
                }
            } else {
                const shifted = this.shiftAmadeusDate(date, 7, year);
                date = shifted.date;
                year = shifted.year;
            }

            return this.displayAvailabilityScreen(origin, destination, date, airlineFilter, null, 'AMADEUS AVAILABILITY RETURN - ACR', null, year);
        }

        // 3b. AC - Availability Change (e.g. AC, AC+1, AC-1, AC25NOV, AC1400, AC/AI, ACAA, ACAD)
        if (cmd.startsWith('AC')) {
            const context = this.getActiveAreaContext();
            const prev = this.lastAvailability || (context.currentPNR && context.currentPNR.segments.length > 0 ? {
                origin: context.currentPNR.segments[0].origin,
                destination: context.currentPNR.segments[0].destination,
                date: context.currentPNR.segments[0].date,
                airlineFilter: context.currentPNR.segments[0].airline
            } : null);

            if (!prev) {
                return 'NO ACTIVE AVAILABILITY DISPLAY - RUN AN COMMAND FIRST (EXAMPLE: AN20NOVDELBOM)';
            }

            let origin = prev.origin;
            let destination = prev.destination;
            let date = prev.date;
            let year = prev.year;
            let airlineFilter = this.directAccessCarrier || prev.airlineFilter || null;
            let sortMode = null;
            let depTimeFilter = null;

            const acParam = cmd.substring(2).trim();

            if (acParam) {
                // AC+1, AC+2, AC-1, AC-2
                if (/^[+-]\d+$/.test(acParam)) {
                    const days = parseInt(acParam, 10);
                    const shifted = this.shiftAmadeusDate(date, days, year);
                    date = shifted.date;
                    year = shifted.year;
                }
                // AC25NOV
                else if (/^\d{1,2}[A-Z]{3}$/.test(acParam)) {
                    const res = this.resolveAmadeusDate(acParam);
                    date = res.date;
                    year = res.year;
                }
                // AC/AI or AC/A (reset)
                else if (acParam.startsWith('/')) {
                    airlineFilter = this.cleanAirlineFilter(acParam);
                }
                // AC1400 (departure time change)
                else if (/^\d{4}$/.test(acParam)) {
                    depTimeFilter = acParam;
                }
                // ACAA (arrival sort), ACAD (departure sort), ACAE, ACAN
                else if (['AA', 'AD', 'AE', 'AN'].includes(acParam)) {
                    sortMode = acParam;
                }
                // Combined: AC25NOV/AI or AC+2/AI
                else if (acParam.includes('/')) {
                    const [dt, cr] = acParam.split('/');
                    if (/^[+-]\d+$/.test(dt)) {
                        const shifted = this.shiftAmadeusDate(date, parseInt(dt, 10), year);
                        date = shifted.date;
                        year = shifted.year;
                    } else if (/^\d{1,2}[A-Z]{3}$/.test(dt)) {
                        const res = this.resolveAmadeusDate(dt);
                        date = res.date;
                        year = res.year;
                    }
                    if (cr) airlineFilter = this.cleanAirlineFilter(cr);
                }
            }

            return this.displayAvailabilityScreen(origin, destination, date, airlineFilter, depTimeFilter, 'AMADEUS AVAILABILITY CHANGE - AC', sortMode, year);
        }

        // 3c. AN / AD / AA / AW Standard Availability
        const match = cmd.match(/^A[NDAW]\s*(\d{1,2})([A-Z]{3})\s*([A-Z]{3})\s*([A-Z]{3})(?:[\/*]([A-Z0-9]+))?(?:\s*(\d{4}))?/);
        if (match) {
            const [, day, month, origin, destination, filterPart, depTime] = match;
            const date = day.padStart(2, '0') + month;
            let airlineFilter = filterPart ? this.cleanAirlineFilter(filterPart) : this.directAccessCarrier || null;

            return this.displayAvailabilityScreen(origin, destination, date, airlineFilter, depTime, 'AMADEUS AVAILABILITY - AN');
        }

        // Without date (defaults to current date): e.g. ANDELBOM or AN DEL BOM
        const noDateMatch = cmd.match(/^A[NDAW]\s*([A-Z]{3})\s*([A-Z]{3})(?:[\/*]([A-Z0-9]+))?(?:\s*(\d{4}))?/);
        if (noDateMatch) {
            const [, origin, destination, filterPart, depTime] = noDateMatch;
            const date = this.getCurrentDate();
            let airlineFilter = filterPart ? this.cleanAirlineFilter(filterPart) : this.directAccessCarrier || null;

            return this.displayAvailabilityScreen(origin, destination, date, airlineFilter, depTime, 'AMADEUS AVAILABILITY - AN');
        }

        // Timetable (TN) and Schedule (SN) Handlers
        if (cmd.startsWith('TN') || cmd.startsWith('SN')) {
            const genericMatch = cmd.match(/^[TS]N\s*(\d{1,2})([A-Z]{3})\s*([A-Z]{3})\s*([A-Z]{3})/);
            if (genericMatch) {
                const [, day, month, org, dst] = genericMatch;
                const date = day.padStart(2, '0') + month;
                if (!DATA.cities[org] || !DATA.cities[dst]) {
                    return `CHECK ITINERARY - INVALID CITY CODE (${!DATA.cities[org] ? org : dst})`;
                }
                const flights = DATA.flights.generateFlights(org, dst, date);
                if (flights.length === 0) {
                    return `NO SCHEDULED FLIGHTS FOUND FOR ${org} TO ${dst} ON ${date}`;
                }
                const title = cmd.startsWith('SN') ? 'AMADEUS SCHEDULE DISPLAY - SN' : 'AMADEUS TIMETABLE DISPLAY - TN';
                let result = `**  ${title}  **  ${org} TO ${dst}  ${date}\n\n`;
                flights.forEach((flt, idx) => {
                    const lineNum = (idx + 1).toString().padStart(2, ' ');
                    result += `${lineNum}   ${flt.airline.padEnd(2)} ${flt.flight.padStart(4, ' ')}   DAILY   ${org}${dst}   ${flt.dep}   ${flt.arr}   ${flt.aircraft}   0 /E\n`;
                });
                return result;
            }
        }

        return 'INVALID AVAILABILITY FORMAT - USE AN[DDMMM][ORG][DST] (EXAMPLE: AN20NOVDELBOM) OR AC/ACR';
    },

    // Direct Access Handler: 1A (return) or 1[CARRIER] (direct access link/command)
    handleDirectAccess: function (cmd) {
        if (!this.state.signedIn) return 'SIGN-IN REQUIRED';

        // 1A - Return to Amadeus Central System
        if (cmd === '1A') {
            const prev = this.directAccessCarrier;
            this.directAccessCarrier = null;
            if (prev) {
                const prevName = DATA.airlines[prev] || prev;
                return `1A - RETURNED TO AMADEUS CENTRAL SYSTEM\nDIRECT ACCESS LINK TO ${prevName} (${prev}) TERMINATED\nWORK AREA ${this.state.activeArea} RESET TO 1A GDS MODE`;
            }
            return `1A - AMADEUS CENTRAL SYSTEM ACTIVE IN WORK AREA ${this.state.activeArea}`;
        }

        // 1[CARRIER] or 1[CARRIER] [COMMAND]
        const daMatch = cmd.match(/^1([A-Z0-9]{2})(?:\s+(.+)|[\/](.+)|([A-Z].*))?$/);
        if (daMatch) {
            const carrier = daMatch[1];
            const subCommand = (daMatch[2] || daMatch[3] || daMatch[4] || '').trim();
            const airlineName = DATA.airlines[carrier];

            if (!airlineName) {
                return `DIRECT ACCESS LINK REJECTED - UNKNOWN CARRIER CODE '${carrier}'`;
            }

            // Direct Command execution: 1BA AN20NOVLHRJFK or 1EK AN15DECDXBPEW
            if (subCommand) {
                if (this.isAvailabilityCommand(subCommand)) {
                    let forcedCmd = subCommand;
                    if (!forcedCmd.includes('/')) {
                        forcedCmd += '/' + carrier;
                    }
                    const availResult = this.handleAvailability(forcedCmd);
                    return `** DIRECT ACCESS HOST: ${airlineName} (${carrier}) **\n` +
                        `LINK STATUS: INTERACTIVE DIRECT ACCESS 1:1 REAL-TIME HOST\n\n` +
                        availResult;
                }

                if (this.isSellCommand(subCommand)) {
                    const sellResult = this.handleSell(subCommand);
                    return `** DIRECT ACCESS HOST: ${airlineName} (${carrier}) **\n${sellResult}`;
                }

                if (this.isPNRCommand(subCommand)) {
                    const pnrResult = this.handlePNR(subCommand);
                    return `** DIRECT ACCESS HOST: ${airlineName} (${carrier}) **\n${pnrResult}`;
                }

                const genResult = this.process(subCommand);
                return `** DIRECT ACCESS HOST: ${airlineName} (${carrier}) **\n${genResult}`;
            }

            // Direct Access session connection: 1BA, 1EK, 1AI, 1PK
            this.directAccessCarrier = carrier;
            const hub = (DATA.airline_meta[carrier] && DATA.airline_meta[carrier].hub) || 'HQ';
            const alliance = (DATA.airline_meta[carrier] && DATA.airline_meta[carrier].alliance) || 'INDEPENDENT';

            return `================================================================================\n` +
                `** DIRECT ACCESS CONNECTED - ${airlineName} (${carrier}) **\n` +
                `================================================================================\n` +
                `HOST LINK:      REAL-TIME DIRECT ACCESS (TYPE A LINK)\n` +
                `HEADQUARTERS:   HUB ${hub} | ALLIANCE: ${alliance}\n` +
                `SESSION STATUS: ACTIVE IN WORK AREA ${this.state.activeArea}\n` +
                `COMMAND FORMAT: 1${carrier} [ENTRY] (e.g. 1${carrier} AN20NOVLHRJFK) OR REGULAR ENTRIES\n` +
                `EXIT DIRECT:    ENTER '1A' TO RETURN TO AMADEUS CENTRAL SYSTEM\n` +
                `================================================================================`;
        }

        return `INVALID DIRECT ACCESS SYNTAX - USE 1[AIRLINE] (EXAMPLE: 1BA, 1EK, 1AI, 1PK) OR 1A TO RETURN`;
    },

    // 4. Sell Handlers (SS, XE, XI)
    handleSell: function (cmd) {
        if (!this.state.signedIn) return 'SIGN-IN REQUIRED';

        // SS command: SS1Y1 (sell 1 seat in Y on line 1) or SS2J3 or 01Y1 (short-sell) or SS1WV1
        const ssMatch = cmd.match(/^(?:SS|0)(\d+)([A-Z]+)(\d+)(?:\/.*)?$/);
        if (ssMatch) {
            const [, seats, rawClass, lineStr] = ssMatch;
            const classType = rawClass[0];
            const lineNum = parseInt(lineStr, 10);

            if (!this.lastAvailability) {
                return 'NO ACTIVE AVAILABILITY DISPLAY - RUN AN COMMAND FIRST';
            }

            const flight = this.lastAvailability.flights[lineNum - 1];
            if (!flight) {
                return 'INVALID LINE NUMBER - CHECK AVAILABILITY SCREEN';
            }

            // Check class inventory from availability ladder
            const inventory = {};
            if (flight.classes) {
                `${flight.classes.line1 || ''} ${flight.classes.line2 || ''}`.trim().split(/\s+/).forEach(pair => {
                    if (pair.length >= 2) inventory[pair[0]] = parseInt(pair.substring(1), 10);
                });
            }

            const reqSeats = parseInt(seats, 10);
            let sellStatus = 'HK';
            let statusNotice = '';

            if (inventory[classType] === undefined) {
                return `UNABLE TO SELL - CLASS '${classType}' NOT OFFERED ON ${flight.airline} ${flight.flight}\n` +
                       `OFFERED CLASSES: ${flight.classes ? flight.classes.line1 + ' / ' + flight.classes.line2 : 'CHECK AVAILABILITY'}`;
            }

            if (inventory[classType] === 0 || reqSeats > inventory[classType]) {
                sellStatus = 'HL'; // Have Listed / Waitlist
                statusNotice = ` (WAITLIST - ${inventory[classType]} SEATS REMAINING IN ${classType})`;
            }

            const context = this.getActiveAreaContext();
            if (!context.currentPNR) {
                context.currentPNR = this.createNewPNR();
            }

            const segment = {
                line: context.currentPNR.segments.length + 1,
                airline: flight.airline,
                flight: flight.flight,
                class: classType,
                date: flight.date,
                route: flight.route,
                origin: flight.origin,
                destination: flight.destination,
                dep: flight.dep,
                arr: flight.arr,
                aircraft: flight.aircraft,
                status: sellStatus + seats,
                paxCount: reqSeats,
                ticketed: false
            };

            context.currentPNR.segments.push(segment);
            context.currentPNR.history.push(`${this.getCurrentDate()} ${segment.airline}${segment.flight} ${segment.class} ${segment.status} SOLD`);

            return `SEGMENT SOLD ACCEPTED${statusNotice}:\n` +
                `${segment.line}  ${segment.airline} ${segment.flight} ${segment.class} ${segment.date} ${segment.route} ${segment.status}   ${segment.dep} ${segment.arr}  ${segment.aircraft} /E`;
        }

        // Cancel segment: XE1, XE2, XE 1
        const xeMatch = cmd.match(/^XE\s*(\d+)$/);
        if (xeMatch) {
            const lineNum = parseInt(xeMatch[1], 10);
            const context = this.getActiveAreaContext();
            const pnr = context.currentPNR;
            if (pnr && pnr.segments && pnr.segments[lineNum - 1]) {
                const removed = pnr.segments.splice(lineNum - 1, 1)[0];
                pnr.segments.forEach((seg, i) => { seg.line = i + 1; });
                if (pnr.segments.length === 0) {
                    pnr.itineraryCancelled = true;
                }
                pnr.history.push(`${this.getCurrentDate()} SEGMENT ${lineNum} CANCELLED (${removed.airline}${removed.flight})`);
                return `SEGMENT ${lineNum} CANCELLED (${removed.airline}${removed.flight})` +
                    (pnr.segments.length === 0 ? '\nALL SEGMENTS CANCELLED - ENTER RF AND ET TO COMMIT' : '');
            }
            return 'INVALID SEGMENT NUMBER TO CANCEL';
        }

        // Cancel entire itinerary: XI
        if (cmd === 'XI') {
            const context = this.getActiveAreaContext();
            const pnr = context.currentPNR;
            if (pnr && pnr.segments && pnr.segments.length > 0) {
                pnr.segments = [];
                pnr.itineraryCancelled = true;
                pnr.history.push(`${this.getCurrentDate()} ENTIRE ITINERARY CANCELLED (XI)`);
                return 'ENTIRE ITINERARY CANCELLED (XI)\nENTER RF [AGENT] AND ET TO COMMIT CANCELLATION';
            }
            return 'NO ITINERARY IN WORK AREA TO CANCEL';
        }

        return 'INVALID SELL COMMAND - USE SS[SEATS][CLASS][LINE] (EXAMPLE: SS1Y1)';
    },

    // 5. PNR Creation & General Elements (NM, AP, TK, RF, RM, OS, SR, FFN, SM, ST)
    handleGeneral: function (cmd) {
        if (!this.state.signedIn) return 'SIGN-IN REQUIRED';
        const context = this.getActiveAreaContext();

        // Ensure active PNR container exists for adding elements
        if (!context.currentPNR && (cmd.startsWith('NM') || cmd.startsWith('AP') || cmd.startsWith('TK') || cmd.startsWith('RF') || cmd.startsWith('RM') || cmd.startsWith('RC') || cmd.startsWith('RI'))) {
            context.currentPNR = this.createNewPNR();
        }

        const pnr = context.currentPNR;

        // Seat Map Display: SM1, SM2
        if (cmd.startsWith('SM')) {
            const segLine = parseInt(cmd.substring(2) || '1', 10);
            if (!pnr || !pnr.segments[segLine - 1]) {
                return 'NO VALID FLIGHT SEGMENT FOR SEATMAP - CHECK ITINERARY';
            }
            const seg = pnr.segments[segLine - 1];
            return this.generateSeatMapDisplay(seg);
        }

        // Seat Assignment: ST/12A or ST/12A/P1
        if (cmd.startsWith('ST/')) {
            const seatParam = cmd.substring(3).trim();
            if (!pnr || pnr.segments.length === 0) return 'NO ITINERARY IN PNR TO ASSIGN SEAT';
            pnr.remarks.push(`SEAT ASSIGNED: ${seatParam}`);
            pnr.history.push(`${this.getCurrentDate()} SEAT ${seatParam} ASSIGNED`);
            return `SEAT ASSIGNED ACCEPTED: ${seatParam} HK1`;
        }

        // Passenger Name: NM1SMITH/JOHN MR or NM2SMITH/JOHN MR/MARY MRS
        if (cmd.startsWith('NM')) {
            const nmMatch = cmd.match(/^NM(\d+)(.+)$/);
            if (!nmMatch) return 'INVALID NAME FORMAT - USE NM1SURNAME/FIRSTNAME TITLE';

            const rawBody = nmMatch[2].trim();
            const addedNames = [];

            // Split on '/' outside parentheses to extract surname and given names
            const parts = rawBody.split(/\/(?![^(]*\))/);
            const surname = parts[0].trim();
            const givenNames = parts.slice(1);

            if (givenNames.length === 0) {
                return 'INVALID NAME FORMAT - MISSING FIRST NAME OR TITLE';
            }

            for (let i = 0; i < givenNames.length; i++) {
                let nameStr = givenNames[i].trim();
                let paxType = 'ADT';
                let dob = '';
                let infantName = '';

                // Child passenger with date of birth: (CHD/12JAN16)
                const chdMatch = nameStr.match(/\(CHD\/([0-9A-Z]+)\)/i);
                if (chdMatch) {
                    paxType = 'CHD';
                    dob = chdMatch[1].toUpperCase();
                    nameStr = nameStr.replace(/\(CHD\/[0-9A-Z]+\)/i, '').trim();
                }

                // Infant passenger: (INF/BABY/10JAN25)
                const infMatch = nameStr.match(/\(INF\/([A-Z]+)(?:\/([0-9A-Z]+))?\)/i);
                if (infMatch) {
                    paxType = 'INF';
                    infantName = infMatch[1].toUpperCase();
                    if (infMatch[2]) dob = infMatch[2].toUpperCase();
                    nameStr = nameStr.replace(/\(INF\/[A-Z]+(?:\/[0-9A-Z]+)?\)/i, '').trim();
                }

                const passenger = {
                    name: `${surname}/${nameStr}`,
                    type: paxType,
                    dob: dob,
                    infantName: infantName
                };

                pnr.passengers.push(passenger);
                pnr.history.push(`${this.getCurrentDate()} NAME ADDED ${passenger.name} (${passenger.type})`);
                addedNames.push(`${passenger.name} (${paxType})`);
            }

            return `NAME ELEMENT(S) ADDED (${pnr.passengers.length} TOTAL IN PNR):\n` +
                addedNames.map((n, idx) => `  ${pnr.passengers.length - addedNames.length + idx + 1}.${n}`).join('\n');
        }

        // Contact Information: AP, APM, APE, APA
        if (cmd.startsWith('AP')) {
            let contactType = 'PHONE';
            let val = cmd.substring(2).trim();

            if (cmd.startsWith('APM-') || cmd.startsWith('APM ')) {
                contactType = 'MOBILE';
                val = cmd.substring(4).trim();
            } else if (cmd.startsWith('APE-') || cmd.startsWith('APE ')) {
                contactType = 'EMAIL';
                val = cmd.substring(4).trim();
            } else if (cmd.startsWith('APA-') || cmd.startsWith('APA ')) {
                contactType = 'AGENCY';
                val = cmd.substring(4).trim();
            }

            pnr.contacts.push({ type: contactType, value: val });
            pnr.history.push(`${this.getCurrentDate()} CONTACT ADDED: ${contactType} ${val}`);
            return `CONTACT ELEMENT ADDED: ${contactType} - ${val}`;
        }

        // Ticketing arrangement: TKOK, TKTL25NOV/1800, TKXL
        if (cmd.startsWith('TK')) {
            pnr.ticketing = cmd;
            pnr.history.push(`${this.getCurrentDate()} TICKETING ELEMENT: ${cmd}`);
            return `TICKETING ELEMENT ACCEPTED: ${cmd}`;
        }

        // Remarks: RM, RC, RI
        if (cmd.startsWith('RM ') || cmd.startsWith('RC ') || cmd.startsWith('RI ')) {
            const prefix = cmd.substring(0, 2);
            const remarkText = cmd.substring(3).trim();
            pnr.remarks.push(`${prefix}: ${remarkText}`);
            return `REMARK ADDED (${prefix}): ${remarkText}`;
        }

// OSI: OS EK VIP PASSENGER
if (cmd.startsWith('OS ') || cmd.startsWith('OSI ')) {
    const osiText = cmd.replace(/^OSI?\s+/, '').trim();
    pnr.remarks.push('OSI: ' + osiText);
    return `OSI ELEMENT ADDED: ${osiText}`;
}

// SSR: SR VGML, SR WCHR, SR DOCS...
if (cmd.startsWith('SR ') || cmd.startsWith('SSR ')) {
    const ssrText = cmd.replace(/^SSR?\s+/, '').trim();
    const ssrCode = ssrText.split(' ')[0].toUpperCase();
    const ssrDesc = DATA.ssr_codes[ssrCode] ? ` (${DATA.ssr_codes[ssrCode]})` : '';
    pnr.remarks.push(`SSR ${ssrText}${ssrDesc}`);
    return `SPECIAL SERVICE REQUEST ACCEPTED: ${ssrText}${ssrDesc}`;
}

// Frequent Flyer: FFN EK-123456789
if (cmd.startsWith('FFN')) {
    const ffnText = cmd.substring(3).trim();
    pnr.remarks.push('FFN: ' + ffnText);
    return `FREQUENT FLYER NUMBER ADDED: ${ffnText}`;
}

return 'ENTRY NOT RECOGNIZED';
    },

// 6. PNR Management Handlers (ET, ER, IG, RT, RH, RF) with Strict IATA PRINT Validation
handlePNR: function (cmd) {
    if (!this.state.signedIn) return 'SIGN-IN REQUIRED';
    const context = this.getActiveAreaContext();

    // RF - Received From: RF TRAVEL AGENT, RF JOHN DOE, RFS, RF
    if (cmd.startsWith('RF') || cmd === 'RFS') {
        if (!context.currentPNR) {
            context.currentPNR = this.createNewPNR();
        }
        let receivedFrom = 'TRAVEL AGENT';
        if (cmd === 'RFS') {
            receivedFrom = 'TRAVEL AGENT';
        } else if (cmd.startsWith('RF ') || cmd.startsWith('RF')) {
            receivedFrom = cmd.substring(2).trim();
            if (!receivedFrom) receivedFrom = 'PASSENGER';
        }
        context.currentPNR.received_from = receivedFrom;
        context.currentPNR.history.push(`${this.getCurrentDate()} RECEIVED FROM: ${receivedFrom}`);
        return `RECEIVED FROM ELEMENT ADDED: ${receivedFrom}`;
    }

    // IG - Ignore active changes in current work area
    if (cmd === 'IG') {
        context.currentPNR = null;
        context.lastTST = null;
        this.directAccessCarrier = null;
        return 'TRANSACTION IGNORED - WORK AREA ' + this.state.activeArea + ' CLEARED';
    }

    // ER - End & Redisplay
    if (cmd === 'ER') {
        if (!context.currentPNR) return 'NO PNR IN WORK AREA ' + this.state.activeArea;

        // Strict IATA PRINT check
        const printError = this.validateIataPrintRules(context.currentPNR);
        if (printError) {
            return `TRANSACTION REJECTED - IATA MANDATORY ELEMENTS MISSING:\n${printError}\n\n` +
                `REQUIRED: (P)hone (R)eceived-from (I)tinerary (N)ame (T)icketing`;
        }

        const pnr = context.currentPNR;

        // If itinerary was cancelled (XI or all segments removed)
        if (pnr.itineraryCancelled || pnr.status === 'XX' || (!pnr.segments || pnr.segments.length === 0)) {
            pnr.status = 'XX';
            pnr.history.push(`${this.getCurrentDateTime()} CANCELLATION COMMITTED (ER) AT ${this.state.officeId}`);

            DATA.pnrs[pnr.locator] = JSON.parse(JSON.stringify(pnr));
            this.savePNRToStorage(pnr);

            return `OK ${this.getCurrentDateTime()} ${this.state.officeId}\n` +
                `PNR CANCELLED SUCCESSFULLY (STATUS: XX) - RECORD LOCATOR: ${pnr.locator}\n\n` +
                this.displayPNR(context.currentPNR);
        }

        // Commit PNR
        pnr.status = 'HK';
        pnr.history.push(`${this.getCurrentDateTime()} END TRANSACTION (ER) COMMITTED AT ${this.state.officeId}`);

        DATA.pnrs[pnr.locator] = JSON.parse(JSON.stringify(pnr));
        this.savePNRToStorage(pnr);

        return `OK ${this.getCurrentDateTime()} ${this.state.officeId} - PNR COMMITTED: ${pnr.locator}\n\n` +
            this.displayPNR(context.currentPNR);
    }

    // ET - End & Transmit (Commit PNR with IATA PRINT Enforcement)
    if (cmd === 'ET') {
        if (!context.currentPNR) return 'NO PNR IN WORK AREA ' + this.state.activeArea;

        // Strict IATA PRINT Check
        const printError = this.validateIataPrintRules(context.currentPNR);
        if (printError) {
            return `TRANSACTION REJECTED - IATA MANDATORY ELEMENTS MISSING:\n${printError}\n\n` +
                `REQUIRED: (P)hone (R)eceived-from (I)tinerary (N)ame (T)icketing`;
        }

        const pnr = context.currentPNR;

        // If itinerary was cancelled (XI or all segments removed)
        if (pnr.itineraryCancelled || pnr.status === 'XX' || (!pnr.segments || pnr.segments.length === 0)) {
            pnr.status = 'XX';
            pnr.history.push(`${this.getCurrentDateTime()} CANCELLATION COMMITTED (ET) AT ${this.state.officeId}`);

            DATA.pnrs[pnr.locator] = JSON.parse(JSON.stringify(pnr));
            this.savePNRToStorage(pnr);

            const locator = pnr.locator;
            context.currentPNR = null;
            context.lastTST = null;

            return `OK ${this.getCurrentDateTime()} ${this.state.officeId}\n` +
                `PNR CANCELLED SUCCESSFULLY (STATUS: XX)\n` +
                `RECORD LOCATOR: ${locator}\n` +
                `RE-RETRIEVE WITH: RT${locator}`;
        }

        pnr.status = 'HK';
        pnr.history.push(`${this.getCurrentDateTime()} END TRANSACTION (ET) COMMITTED AT ${this.state.officeId}`);

        // Save to persistent storage
        DATA.pnrs[pnr.locator] = JSON.parse(JSON.stringify(pnr));
        this.savePNRToStorage(pnr);

        const locator = pnr.locator;
        context.currentPNR = null;
        context.lastTST = null;

        return `OK ${this.getCurrentDateTime()} ${this.state.officeId}\n` +
            `PNR COMMITTED SUCCESSFULLY\n` +
            `RECORD LOCATOR: ${locator}\n` +
            `RE-RETRIEVE WITH: RT${locator}`;
    }

    // RT - Retrieve PNR
    if (cmd.startsWith('RT')) {
        if (cmd === 'RT' || cmd === 'RTPNR') {
            if (context.currentPNR) return this.displayPNR(context.currentPNR);
            return 'NO ACTIVE PNR IN WORK AREA ' + this.state.activeArea;
        }

        // By 6-character locator: RTABC123
        const locator = cmd.substring(2).trim().toUpperCase();
        if (DATA.pnrs[locator]) {
            context.currentPNR = JSON.parse(JSON.stringify(DATA.pnrs[locator]));
            return this.displayPNR(context.currentPNR);
        }

        // By name: RT/SMITH or RT1, RT2 from list
        if (locator.startsWith('/')) {
            const searchName = locator.substring(1).toUpperCase();
            const matches = [];

            for (const [loc, savedPNR] of Object.entries(DATA.pnrs)) {
                if (savedPNR.passengers && savedPNR.passengers.some(p => p.name.includes(searchName))) {
                    matches.push(savedPNR);
                }
            }

            if (matches.length === 0) {
                return `NO PNR FOUND MATCHING NAME: ${searchName}`;
            }

            if (matches.length === 1) {
                context.currentPNR = JSON.parse(JSON.stringify(matches[0]));
                return `1 PNR MATCH FOUND FOR ${searchName}:\n\n` + this.displayPNR(context.currentPNR);
            }

            this.nameListMatches = matches;
            let list = `** SIMILAR NAME LIST - ${matches.length} MATCHES FOR /${searchName} **\n\n`;
            matches.forEach((p, idx) => {
                const lineNum = (idx + 1).toString().padStart(2, ' ');
                const paxName = p.passengers[0] ? p.passengers[0].name.padEnd(24, ' ') : 'UNKNOWN'.padEnd(24, ' ');
                const firstSeg = p.segments && p.segments[0] ? `${p.segments[0].airline} ${p.segments[0].flight} ${p.segments[0].date} ${p.segments[0].route}` : 'NO ITIN';
                list += `${lineNum} ${paxName}  ${firstSeg}  ${p.status}   ${p.locator}\n`;
            });
            list += `\nTO RETRIEVE: RT[LINE NUMBER] (EXAMPLE: RT1) OR RT[LOCATOR]`;
            return list;
        }

        // By index from active Similar Name list: RT1, RT2
        const listMatch = cmd.match(/^RT(\d+)$/);
        if (listMatch && this.nameListMatches) {
            const idx = parseInt(listMatch[1], 10) - 1;
            if (this.nameListMatches[idx]) {
                context.currentPNR = JSON.parse(JSON.stringify(this.nameListMatches[idx]));
                return this.displayPNR(context.currentPNR);
            }
        }

        return `NO RECORD FOUND FOR LOCATOR: ${locator}`;
    }

    // RH - Retrieve History
    if (cmd.startsWith('RH')) {
        if (!context.currentPNR) return 'NO ACTIVE PNR IN WORK AREA TO DISPLAY HISTORY';
        let hist = `--- HISTORICAL RECORD FOR PNR ${context.currentPNR.locator} ---\n`;
        context.currentPNR.history.forEach((h, i) => {
            hist += `${(i + 1).toString().padStart(2, ' ')}  ${h}\n`;
        });
        return hist;
    }

    // RL - Record Locator Display
    if (cmd.startsWith('RL')) {
        if (!context.currentPNR) return 'NO ACTIVE PNR IN WORK AREA TO DISPLAY RECORD LOCATOR';
        const air = context.currentPNR.segments && context.currentPNR.segments[0] ? context.currentPNR.segments[0].airline : '1A';
        return `RL - RECORD LOCATOR DISPLAY\n` +
            `AMADEUS (1A): ${context.currentPNR.locator}\n` +
            `AIRLINE HOST: ${air}/${context.currentPNR.locator}`;
    }

    return 'INVALID PNR COMMAND';
},

// Strict IATA "PRINT" Rule Validator
validateIataPrintRules: function (pnr) {
    const errors = [];
    // P - Phone/Contact
    if (!pnr.contacts || pnr.contacts.length === 0) {
        errors.push('NEED PHONE/CONTACT ELEMENT (AP)');
    }
    // R - Received From
    if (!pnr.received_from || pnr.received_from.trim().length === 0) {
        errors.push('NEED RECEIVED FROM ELEMENT (RF)');
    }
    // I - Itinerary (Only required for active non-cancelled PNRs)
    if ((!pnr.segments || pnr.segments.length === 0) && pnr.status !== 'XX' && !pnr.itineraryCancelled) {
        errors.push('NO ITINERARY IN PNR (USE AN & SS TO BOOK FLIGHTS)');
    }
    // N - Name
    if (!pnr.passengers || pnr.passengers.length === 0) {
        errors.push('NO PASSENGER NAME ELEMENT (NM)');
    }
    // T - Ticketing
    if (!pnr.ticketing || pnr.ticketing.trim().length === 0) {
        errors.push('NEED TICKETING ARRANGEMENT (TKOK OR TKTL)');
    }

    return errors.length > 0 ? errors.join('\n') : null;
},

// Authentic Amadeus PNR Cryptic Display Format
displayPNR: function (pnr) {
    let lines = [];
    const office = pnr.officeId || this.state.officeId;
    const agent = pnr.agent || this.state.userId;
    const dateStr = this.getCurrentDateTime();

    // Authentic Amadeus Cryptic Header
    lines.push(`RP/${office}/${office}            AA/SU   ${dateStr}   ${pnr.locator}`);
    if (pnr.status === 'XX' || pnr.itineraryCancelled) {
        lines.push(`*** PNR CANCELLED (STATUS: XX) ***`);
    }

    // 1. Passengers
    if (pnr.passengers && pnr.passengers.length > 0) {
        pnr.passengers.forEach((pax, i) => {
            let paxLine = `  ${i + 1}.${pax.name}`;
            if (pax.type === 'CHD') paxLine += ` (CHD/${pax.dob})`;
            if (pax.type === 'INF') paxLine += ` (INF/${pax.infantName}/${pax.dob})`;
            lines.push(paxLine);
        });
    }

    let elementCounter = (pnr.passengers ? pnr.passengers.length : 0) + 1;

    // 2. Flight Segments
    if (pnr.segments && pnr.segments.length > 0) {
        pnr.segments.forEach(seg => {
            const tkStatus = seg.ticketed ? 'TK' : seg.status;
            lines.push(`  ${elementCounter++}  ${seg.airline.padEnd(2)} ${seg.flight.padStart(4, ' ')} ${seg.class} ${seg.date} ${seg.route} ${tkStatus}   ${seg.dep} ${seg.arr}  ${seg.aircraft || '77W'} /E`);
        });
    } else if (pnr.itineraryCancelled || pnr.status === 'XX') {
        lines.push(`  NO ACTIVE ITINERARY SEGMENTS - ITINERARY CANCELLED`);
    }

    // 3. Contact lines
    if (pnr.contacts && pnr.contacts.length > 0) {
        pnr.contacts.forEach(c => {
            lines.push(`  ${elementCounter++} AP ${c.type} ${c.value}`);
        });
    }

    // 4. Ticketing Line
    if (pnr.ticketing) {
        lines.push(`  ${elementCounter++} TK ${pnr.ticketing}`);
    }

    // 5. Form of Payment
    if (pnr.formOfPayment) {
        lines.push(`  ${elementCounter++} FP ${pnr.formOfPayment}`);
    }

    // 6. E-Tickets Issued (FA Elements)
    if (pnr.tickets && pnr.tickets.length > 0) {
        pnr.tickets.forEach(tkt => {
            let statusLabel = '';
            if (tkt.status === 'RFND') statusLabel = ` / RFND (${tkt.refundNotice || 'REFUNDED'})`;
            else if (tkt.status === 'VOID') statusLabel = ' / VOID';
            lines.push(`  ${elementCounter++} FA PAX ${tkt.ticketNumber}/ET${tkt.carrier}/${tkt.date || this.getCurrentDate()}/${office}${statusLabel}`);
        });
    }

    // 7. Stored TST
    if (pnr.tst) {
        lines.push(`  ${elementCounter++} TST 01 STORED - ${pnr.tst.validating_carrier} ${pnr.tst.fare_basis} ${pnr.tst.currency} ${pnr.tst.total}`);
    }

    // 8. Remarks & SSRs
    if (pnr.remarks && pnr.remarks.length > 0) {
        pnr.remarks.forEach(rm => {
            lines.push(`  ${elementCounter++} RM ${rm}`);
        });
    }

    // 9. Received From
    if (pnr.received_from) {
        lines.push(`  ${elementCounter++} RF ${pnr.received_from}`);
    }

    return lines.join('\n');
},

// 7. Pricing, Fares & TST Creation Handlers (FXP, FXB, FXA, FQD, TQT, FP)
handleFare: function (cmd) {
    if (!this.state.signedIn) return 'SIGN-IN REQUIRED';
    const context = this.getActiveAreaContext();
    const pnr = context.currentPNR;

    // Form of Payment: FP CASH, FP CCVI4111111111111111/1228
    if (cmd.startsWith('FP ')) {
        if (!pnr) return 'NO PNR IN WORK AREA TO ADD FORM OF PAYMENT';
        const fop = cmd.substring(3).trim();
        pnr.formOfPayment = fop;
        pnr.history.push(`${this.getCurrentDate()} FORM OF PAYMENT: ${fop}`);
        return `FORM OF PAYMENT ACCEPTED: ${fop}`;
    }

    // FQD - Fare Quote Display: FQDDELBOM/AAI or FQD DELBOM/AI
    if (cmd.startsWith('FQD')) {
        const fqdMatch = cmd.match(/^FQD\s*([A-Z]{3})\s*([A-Z]{3})(?:\/(?:A\/|A)?([A-Z0-9]{2}))?/);
        if (fqdMatch) {
            const [, org, dst, carrier] = fqdMatch;
            const fareObj = DATA.fares.generateFare(org, dst, 'Y');
            return `FARE QUOTE DISPLAY - ${org} TO ${dst}\n` +
                `LINE  CARRIER  FARE BASIS  CLASS  FARE (${fareObj.currency})  ADV/RES  MIN/MAX\n` +
                ` 1     ${carrier || 'AI'}     Y26OW        Y       ${fareObj.base_fare}        NONE     NONE\n` +
                ` 2     ${carrier || 'AI'}     B26OW        B       ${Math.round(fareObj.base_fare * 0.9)}        7D       NONE\n` +
                ` 3     ${carrier || 'AI'}     J26RT        J       ${Math.round(fareObj.base_fare * 3.0)}        NONE     1M`;
        }
        return 'INVALID FQD SYNTAX - USE FQD[ORIGIN][DESTINATION] (EXAMPLE: FQDDELBOM)';
    }

    // TQT - Display Stored TST (Transitional Stored Ticket)
    if (cmd === 'TQT' || cmd === 'TQT/T1') {
        if (!pnr || !pnr.tst) {
            return 'NO TST STORED IN CURRENT PNR - USE FXP TO PRICE AND STORE TST';
        }
        const tst = pnr.tst;
        return `AMADEUS TRANSITIONAL STORED TICKET (TST 01)\n` +
            `OFFICE: ${this.state.officeId}   DATE: ${this.getCurrentDate()}\n` +
            `PASSENGER: 1.${pnr.passengers[0] ? pnr.passengers[0].name : 'PAX'} (ADT)\n` +
            `VALIDATING CARRIER: ${tst.validating_carrier} (${tst.ticket_prefix})\n` +
            `FARE CALCULATION: ${pnr.segments[0].origin} ${tst.validating_carrier} ${pnr.segments[0].destination} ${tst.fare_basis} NUC ${tst.base_fare} END\n` +
            `FARE:             ${tst.currency}   ${tst.base_fare.toFixed(2)}\n` +
            `TAXES/FEES:       ${tst.currency}   ${tst.taxes.toFixed(2)}  (YQ/XT)\n` +
            `TOTAL AMOUNT:     ${tst.currency}   ${tst.total.toFixed(2)}\n` +
            `BAGGAGE ALLOWANCE: ${tst.baggage}\n` +
            `STATUS: OPEN FOR TICKETING WITH TTP`;
    }

    // FXP / FXB / FXA - Price Itinerary & Store TST
    if (cmd.startsWith('FXP') || cmd.startsWith('FXB') || cmd.startsWith('FXA')) {
        if (!pnr || !pnr.segments || pnr.segments.length === 0) {
            return 'NO FLIGHT SEGMENTS TO PRICE - SELL SEGMENT FIRST WITH SS';
        }

        const passengers = (pnr.passengers && pnr.passengers.length > 0) ? pnr.passengers : [{ name: 'PAX', type: 'ADT' }];
        let grandBase = 0;
        let grandTaxes = 0;
        let valCarrier = 'AI';
        const vcMatch = cmd.match(/VC-([A-Z0-9]{2})/);
        if (vcMatch) valCarrier = vcMatch[1];
        let ticketPrefix = '176';
        let baggage = '1PC 23K';
        let currency = 'USD';
        let fareBasisList = [];

        // Sum fares across all segments (supports round trips and multi-city)
        pnr.segments.forEach(seg => {
            const segFare = DATA.fares.generateFare(seg.origin, seg.destination, seg.class);
            currency = segFare.currency;
            valCarrier = segFare.validating_carrier;
            ticketPrefix = segFare.ticket_prefix;
            baggage = segFare.baggage;
            fareBasisList.push(segFare.fare_basis);

            // Multiply by passengers with type adjustments
            passengers.forEach(pax => {
                let multiplier = 1.0;
                if (pax.type === 'CHD') multiplier = 0.75; // 25% child discount
                if (pax.type === 'INF') multiplier = 0.10; // 90% infant discount

                grandBase += Math.round(segFare.base_fare * multiplier);
                grandTaxes += (pax.type === 'INF' ? 0 : segFare.taxes);
            });
        });

        const grandTotal = grandBase + grandTaxes;
        const fareData = {
            base_fare: grandBase,
            taxes: grandTaxes,
            total: grandTotal,
            currency: currency,
            validating_carrier: valCarrier,
            ticket_prefix: ticketPrefix,
            fare_basis: fareBasisList.join(' / '),
            pax_count: passengers.length,
            baggage: baggage
        };

        // Store TST into PNR
        pnr.tst = fareData;
        context.lastTST = fareData;
        pnr.history.push(`${this.getCurrentDate()} FXP PRICED TST 01 STORED (${currency} ${grandTotal.toFixed(2)} FOR ${passengers.length} PAX)`);

        return `FXP - ITINERARY PRICED & TST 01 STORED\n\n` +
            `PASSENGERS:          ${passengers.length} (${passengers.map(p => p.type).join(', ')})\n` +
            `SEGMENTS PRICED:     ${pnr.segments.length} (${pnr.segments.map(s => s.route).join(', ')})\n` +
            `VALIDATING CARRIER:  ${fareData.validating_carrier} (STOCK: ${fareData.ticket_prefix})\n` +
            `FARE BASIS:          ${fareData.fare_basis}\n` +
            `BASE FARE:           ${fareData.currency} ${grandBase.toFixed(2)}\n` +
            `TAXES & FEES:        ${fareData.currency} ${grandTaxes.toFixed(2)}\n` +
            `TOTAL TST AMOUNT:    ${fareData.currency} ${grandTotal.toFixed(2)}\n` +
            `BAGGAGE ALLOWANCE:   ${fareData.baggage}\n\n` +
            `TST 01 CREATED SUCCESSFULLY IN PNR\n` +
            `ISSUE TICKET ENTRY: FP CASH THEN TTP`;
    }

    return 'INVALID FARE COMMAND - USE FXP TO PRICE OR FQD FOR FARE QUOTE';
},

// 8. Electronic Ticketing Handlers (TTP, TTP/ET, TRDC) with Certified 13-Digit IATA Numbers
handleTicket: function (cmd) {
    if (!this.state.signedIn) return 'SIGN-IN REQUIRED';
    const context = this.getActiveAreaContext();
    const pnr = context.currentPNR;

    // TTP - Issue Electronic Ticket (TTP, TTP/ET, TTP/RT, TTP/ET/RT)
    if (cmd.startsWith('TTP')) {
        if (!pnr || !pnr.segments || pnr.segments.length === 0) {
            return 'NO ITINERARY IN WORK AREA TO ISSUE TICKET';
        }

        if (!pnr.tst) {
            return 'NO STORED TST IN PNR - RUN FXP TO PRICE AND STORE TST BEFORE TICKETING';
        }

        if (!pnr.formOfPayment) {
            return 'FORM OF PAYMENT REQUIRED BEFORE TICKETING - ENTER FP CASH OR FP CC...';
        }

        const prefix = pnr.tst.ticket_prefix || '176';
        if (!pnr.tickets) pnr.tickets = [];

        const passengers = (pnr.passengers && pnr.passengers.length > 0) ? pnr.passengers : [{ name: 'PAX' }];
        const issuedTickets = [];

        passengers.forEach((pax) => {
            const serial = Math.floor(1000000000 + Math.random() * 9000000000).toString();
            const ticketNum = `${prefix}-${serial}`;
            const tkt = {
                ticketNumber: ticketNum,
                passenger: pax.name,
                carrier: pnr.tst.validating_carrier,
                date: this.getCurrentDate(),
                agent: this.state.userId,
                office: this.state.officeId,
                status: 'OK',
                amount: `${pnr.tst.currency} ${(pnr.tst.total / passengers.length).toFixed(2)}`
            };
            pnr.tickets.push(tkt);
            issuedTickets.push(tkt);
            pnr.history.push(`${this.getCurrentDateTime()} ETICKET ISSUED: ${ticketNum} FA PAX ${pax.name}`);
        });

        // Update flight segments to Ticketed Confirmed (TK)
        pnr.segments.forEach(s => {
            s.ticketed = true;
            s.status = 'TK' + (passengers.length || 1);
        });

        DATA.pnrs[pnr.locator] = JSON.parse(JSON.stringify(pnr));
        this.savePNRToStorage(pnr);

        let resp = `OK ETICKET(S) ISSUED (${issuedTickets.length} TICKETS)\n\n`;
        issuedTickets.forEach((t, i) => {
            resp += `TICKET ${i + 1}: ${t.ticketNumber}  PAX: ${t.passenger}  AMOUNT: ${t.amount}\n`;
        });
        resp += `\nFLIGHT COUPONS:\n`;
        pnr.segments.forEach((seg, i) => {
            resp += `  COUPON ${i + 1}: ${seg.airline} ${seg.flight} ${seg.class} ${seg.date} ${seg.route} - STATUS: OPEN FOR USE\n`;
        });
        resp += `TICKETING AGENT: ${this.state.officeId} / ${this.state.userId}`;

        if (cmd === 'TTP/ET') {
            context.currentPNR = null;
            context.lastTST = null;
            resp += `\n\nPNR END AND TRANSMITTED (ET)`;
        }

        return resp;
    }

        // TRDC - Display/Void Ticket
        if (cmd === 'TRDC') {
            if (!pnr || !pnr.tickets || pnr.tickets.length === 0) {
                return 'NO TICKETS ISSUED IN CURRENT PNR';
            }
            const tkt = pnr.tickets[0];
            const statusDesc = tkt.status === 'RFND' ? 'REFUNDED' : (tkt.status === 'VOID' ? 'VOID' : 'OPEN');
            return `ELECTRONIC TICKET RECORD FOR ${ tkt.ticketNumber }\n` +
                `COUPON 1: ${ statusDesc }   STATUS: ${ tkt.status || 'VALID' }   ISSUED: ${ tkt.date || this.getCurrentDate() } AT ${ tkt.office || this.state.officeId }\n` +
                `ENTER 'TRDC/TK-${tkt.ticketNumber}' TO VOID TICKET OR 'TRF' TO CALCULATE REFUND`;
        }

        if (cmd.startsWith('TRDC/') || cmd.startsWith('TRDC/TK')) {
            const tktNum = cmd.replace(/^TRDC\/(?:TK-?)?/, '').trim();
            if (pnr && pnr.tickets) {
                const target = pnr.tickets.find(t => t.ticketNumber === tktNum) || pnr.tickets[0];
                if (target) {
                    target.status = 'VOID';
                    pnr.history.push(`${ this.getCurrentDateTime() } TICKET ${ target.ticketNumber } VOIDED`);
                    DATA.pnrs[pnr.locator] = JSON.parse(JSON.stringify(pnr));
                    this.savePNRToStorage(pnr);
                    return `TICKET ${ target.ticketNumber } VOIDED SUCCESSFULLY - BSP TRANSACTION CANCELLED`;
                }
            }
            return `TICKET ${ tktNum } VOIDED SUCCESSFULLY - BSP TRANSACTION CANCELLED`;
        }

        // TRF - Automated Ticket Refund (Display & Processing)
        if (cmd.startsWith('TRF') || cmd.startsWith('TWX')) {
            // Locate ticket: from current PNR or ticket parameter
            let tkt = null;
            let targetPNR = pnr;

            if (pnr && pnr.tickets && pnr.tickets.length > 0) {
                tkt = pnr.tickets[0];
            } else {
                // Check if ticket number or locator in command: TRF098-7903225908 or TRF/098-7903225908
                const paramMatch = cmd.match(/^TRF(?:\/|\s+)?([0-9A-Z-]+)$/);
                if (paramMatch) {
                    const searchArg = paramMatch[1];
                    for (const [, saved] of Object.entries(DATA.pnrs)) {
                        if (saved.tickets && saved.tickets.some(t => t.ticketNumber === searchArg)) {
                            targetPNR = saved;
                            tkt = saved.tickets.find(t => t.ticketNumber === searchArg);
                            break;
                        }
                    }
                }
            }

            if (!tkt) {
                return 'NO ACTIVE TICKET FOUND FOR REFUND - RETRIEVE TICKETED PNR OR ENTER TRF[TICKET-NUMBER]';
            }

            if (tkt.status === 'RFND') {
                return `TICKET ${ tkt.ticketNumber } ALREADY REFUNDED ON ${ tkt.refundDate || this.getCurrentDate() }(NOTICE: ${ tkt.refundNotice || 'RFND-PROCESSED' })`;
            }

            if (tkt.status === 'VOID') {
                return `TICKET ${ tkt.ticketNumber } IS VOIDED - CANNOT PROCESS REFUND`;
            }

            // Calculation amounts
            const currency = (targetPNR.tst && targetPNR.tst.currency) || 'INR';
            let totalAmount = 10313.00;
            let baseFare = 8250.00;
            let taxes = 2063.00;

            if (targetPNR.tst) {
                totalAmount = targetPNR.tst.total || totalAmount;
                baseFare = targetPNR.tst.base_fare || (totalAmount * 0.8);
                taxes = targetPNR.tst.taxes || (totalAmount * 0.2);
            }

            const isInvoluntary = cmd.includes('INVOL') || cmd.includes('FULL');
            const penalty = isInvoluntary ? 0 : Math.round(baseFare * 0.15);
            const netRefund = Math.max(0, totalAmount - penalty);
            const paxName = targetPNR.passengers && targetPNR.passengers[0] ? targetPNR.passengers[0].name : 'PAX';

            // Execution command: TRFP, TRF/OK, TRF/CONFIRM, TRFP/FULL, TRFP/INVOL, TRF/CP
            if (cmd === 'TRFP' || cmd === 'TRF/OK' || cmd === 'TRF/CONFIRM' || cmd === 'TRFP/FULL' || cmd === 'TRFP/INVOL' || cmd === 'TRF/CP') {
                tkt.status = 'RFND';
                const refNotice = 'RFND-' + Math.floor(10000000 + Math.random() * 90000000);
                tkt.refundNotice = refNotice;
                tkt.refundAmount = netRefund;
                tkt.refundDate = this.getCurrentDate();

                if (!targetPNR.remarks) targetPNR.remarks = [];
                targetPNR.remarks.push(`REFUND NOTICE: ${ refNotice } / TKT ${ tkt.ticketNumber } NET ${ currency } ${ netRefund.toFixed(2) }`);
                targetPNR.history.push(`${ this.getCurrentDateTime() } TRF REFUND COMMITTED: ${ tkt.ticketNumber }(NET ${ currency } ${ netRefund.toFixed(2) })`);

                DATA.pnrs[targetPNR.locator] = JSON.parse(JSON.stringify(targetPNR));
                this.savePNRToStorage(targetPNR);

                return `================================================================================\n` +
                    `  AMADEUS AUTOMATED TICKET REFUND RECEIPT(TRF) \n` +
                    `================================================================================\n` +
                    `REFUND NOTICE: ${ refNotice }\n` +
                    `DOCUMENT NUMBER: ${ tkt.ticketNumber }(COUPON 1) \n` +
                    `PASSENGER: 1.${ paxName }\n` +
                    `VALIDATING CARRIER: ${ tkt.carrier }\n` +
                    `TOTAL TICKET FARE: ${ currency } ${ totalAmount.toFixed(2) }\n` +
                    `CANCELLATION PENALTY: ${ currency } ${ penalty.toFixed(2) } ${ isInvoluntary? '(WAIVED - FULL/INVOLUNTARY)': '(REFUND FEE APPLIED)' }\n` +
                    `REFUNDABLE TAXES: ${ currency } ${ taxes.toFixed(2) }\n` +
                    `--------------------------------------------------------------------------------\n` +
                    `NET REFUND AMOUNT: ${ currency } ${ netRefund.toFixed(2) }\n` +
                    `REFUND METHOD: ORIGINAL FORM OF PAYMENT(${ targetPNR.formOfPayment || 'CASH' }) \n` +
                    `STATUS: RFND(ACCOUNTING COUPON TRANSMITTED TO BSP) \n` +
                    `AGENT / OFFICE: ${ this.state.userId } / ${ this.state.officeId }\n` +
                    `================================================================================ `;
            }

            // Display / Quote Calculation screen: TRF, TRF/FULL, TRF/INVOL
            return `================================================================================\n` +
                `  AMADEUS AUTOMATED TICKET REFUND DISPLAY(TRF) \n` +
                `================================================================================\n` +
                `DOCUMENT NUMBER: ${ tkt.ticketNumber }(COUPON 1 - OPEN) \n` +
                `PASSENGER: 1.${ paxName }\n` +
                `VALIDATING CARRIER: ${ tkt.carrier }\n` +
                `ORIGINAL GROSS FARE: ${ currency } ${ totalAmount.toFixed(2) }\n` +
                `CANCELLATION FEE: ${ currency } ${ penalty.toFixed(2) } ${ isInvoluntary? '(WAIVED - FULL REFUND)': '(STANDARD CANCELLATION CHARGE)' }\n` +
                `REFUNDABLE TAXES: ${ currency } ${ taxes.toFixed(2) }\n` +
                `--------------------------------------------------------------------------------\n` +
                `ESTIMATED NET REFUND: ${ currency } ${ netRefund.toFixed(2) }\n` +
                `REFUND TO: ORIGINAL FORM OF PAYMENT(${ targetPNR.formOfPayment || 'CASH' }) \n` +
                `--------------------------------------------------------------------------------\n` +
                `TO PROCESS REFUND: ENTER 'TRFP'(PROCESS REFUND) OR 'TRF/FULL'(NO PENALTY) \n` +
                `TO CANCEL ITINERARY: ENTER 'XI' THEN 'RF AGENT' AND 'ET'\n` +
                `================================================================================ `;
        }

        return 'INVALID TICKETING COMMAND - USE TTP TO ISSUE TICKET, TRDC TO VOID, TRF TO REFUND';
    },

    // 9. Queue Management Handlers
    handleQueue: function (cmd) {
        if (!this.state.signedIn) return 'SIGN-IN REQUIRED';

        if (cmd === 'QT' || cmd === 'QD') {
            return `QUEUE TOTALS - OFFICE: ${ this.state.officeId }\n\n` +
                `Q 50 GENERAL TICKETING: ${ DATA.queues.general }\n` +
                `Q 70 IMMEDIATE ISSUANCE: ${ DATA.queues.ticketing }\n` +
                `Q 80 DEPARTURE CONTROL: ${ DATA.queues.departure }\n` +
                `Q 90 WAITLIST CONFIRMED: ${ DATA.queues.waitlist }\n` +
                `Q 97 SCHEDULE CHANGES: ${ DATA.queues.schedule_change }\n\n` +
                `ENTRY: QS[QUEUE]C[CAT](EXAMPLE: QS50C1) TO START WORK`;
        }

        const qsMatch = cmd.match(/^QS\s*(\d+)\s*C?\s*(\d+)?$/);
        if (qsMatch) {
            this.queueMode = true;
            this.currentQueue = `${ qsMatch[1]}C${ qsMatch[2] || '1'}`;
            return `ENTERING QUEUE ${ this.currentQueue } - 1 OF 5 ITEMS\n` +
                `USE QN FOR NEXT ITEM, QI TO IGNORE, QF TO EXIT QUEUE`;
        }

        if (cmd === 'QN') {
            return 'NEXT ITEM IN QUEUE... (PNR DEL456 RETRIEVED)';
        }

        if (cmd === 'QI') {
            return 'QUEUE ITEM IGNORED - MOVING TO NEXT ITEM';
        }

        if (cmd === 'QF' || cmd === 'QX') {
            this.queueMode = false;
            this.currentQueue = null;
            return 'EXITED QUEUE MODE - WORK AREA READY';
        }

        return 'INVALID QUEUE ENTRY - USE QT TO VIEW QUEUES OR QF TO EXIT';
    },

    // 10. Encoding & Decoding Handlers (DC, DAC, DAN, DNA, DNS, DD, DF)
    handleEncoding: function (cmd) {
        const cleanCmd = cmd.trim();

        // DD Date/Time Calculator
        if (cleanCmd.startsWith('DD')) {
            const now = new Date();
            return `AMADEUS DATE / TIME: ${ this.getCurrentDateTime() } UTC / GMT\n` +
                `LOCAL OFFICE: ${ this.state.officeId }(GMT - 5)`;
        }

        // DF Currency Converter: DFINRUSD or DF100USDINR
        if (cleanCmd.startsWith('DF')) {
            return `CURRENCY EXCHANGE RATES(BASE USD): \n` +
                `1 USD = 83.50 INR   1 USD = 278.00 PKR   1 USD = 3.67 AED\n` +
                `1 USD = 0.92 EUR    1 USD = 0.79 GBP     1 USD = 3.64 QAR`;
        }

        // GP - AIS Information Page
        if (cleanCmd.startsWith('GP')) {
            const page = cleanCmd.substring(2).trim() || '1';
            return `AMADEUS INFORMATION SYSTEM (AIS) - PAGE ${page}\n` +
                `GENERAL INFORMATION AND PROCEDURAL GUIDELINES LOADED`;
        }

        // DNS - State Encoding/Decoding
        if (cleanCmd.startsWith('DNS')) {
            const param = cleanCmd.substring(3).trim();
            const states = {
                'WASHINGTON': 'USWA - WASHINGTON STATE/US',
                'USWA': 'WASHINGTON STATE/US',
                'CALIFORNIA': 'USCA - CALIFORNIA STATE/US',
                'USCA': 'CALIFORNIA STATE/US',
                'NEWYORK': 'USNY - NEW YORK STATE/US',
                'USNY': 'NEW YORK STATE/US',
                'TEXAS': 'USTX - TEXAS STATE/US',
                'USTX': 'TEXAS STATE/US'
            };
            return states[param.toUpperCase()] || 'STATE NOT FOUND';
        }

        // DAN - Encode City Name -> 3-letter IATA Code
        if (cleanCmd.startsWith('DAN')) {
            const query = cleanCmd.substring(3).trim().toUpperCase();
            for (const [code, desc] of Object.entries(DATA.cities)) {
                if (desc.toUpperCase().includes(query)) {
                    return `${ code } - ${ desc }`;
                }
            }
            return `NO CITY CODE FOUND FOR: ${ query }`;
        }

        // DAC - Decode City Code -> City Name
        if (cleanCmd.startsWith('DAC')) {
            const code = cleanCmd.substring(3).trim().toUpperCase();
            if (DATA.cities[code]) {
                const airport = DATA.airport_names[code] ? ` (${ DATA.airport_names[code] })` : '';
                return `${ code } - ${ DATA.cities[code] }${ airport }`;
            }
            return `INVALID CITY CODE: ${ code }`;
        }

        // DNA - Airline Encode/Decode
        if (cleanCmd.startsWith('DNA')) {
            const param = cleanCmd.substring(3).trim().toUpperCase();
            if (DATA.airlines[param]) {
                const prefix = DATA.airline_prefixes[param] || '---';
                return `${ param } - ${ DATA.airlines[param] }(TICKET STOCK: ${ prefix })`;
            }
            for (const [code, name] of Object.entries(DATA.airlines)) {
                if (name.toUpperCase().includes(param)) {
                    const prefix = DATA.airline_prefixes[code] || '---';
                    return `${ code } - ${ name }(TICKET STOCK: ${ prefix })`;
                }
            }
            return `AIRLINE CODE / NAME NOT FOUND: ${ param }`;
        }

        // DC - General Decode/Encode Country/City/Airline/Aircraft
        if (cleanCmd.startsWith('DC')) {
            const param = cleanCmd.substring(2).trim().toUpperCase();
            if (!param) return 'MISSING PARAMETER FOR DC';

            if (DATA.countries[param]) return `${ param } - ${ DATA.countries[param] }(COUNTRY)`;
            if (DATA.cities[param]) return `${ param } - ${ DATA.cities[param] }(CITY / AIRPORT)`;
            if (DATA.airlines[param]) return `${ param } - ${ DATA.airlines[param] }(AIRLINE - STOCK: ${ DATA.airline_prefixes[param] || '---' })`;
            if (DATA.aircraft[param]) return `${ param } - ${ DATA.aircraft[param] }(AIRCRAFT)`;

            // Reverse search
            for (const [code, name] of Object.entries(DATA.countries)) {
                if (name.includes(param)) return `${ code } - ${ name }(COUNTRY)`;
            }
            for (const [code, name] of Object.entries(DATA.airlines)) {
                if (name.includes(param)) return `${ code } - ${ name }(AIRLINE)`;
            }
            for (const [code, name] of Object.entries(DATA.cities)) {
                if (name.includes(param)) return `${ code } - ${ name }(CITY)`;
            }

            return `CODE OR NAME NOT FOUND: ${ param }`;
        }

        return 'ENTRY NOT RECOGNIZED';
    },

    // 11. Seat Map Graphic Representation
    generateSeatMapDisplay: function (segment) {
        return `AMADEUS SEAT MAP DISPLAY - ${ segment.airline } ${ segment.flight } ${ segment.class } ${ segment.date }\n` +
            `AIRCRAFT: ${ segment.aircraft }  ROUTE: ${ segment.route }\n\n` +
            `     A B C       D E F\n` +
            `10   . .F   W   F. .   10\n` +
            `11   F. .A. .F   11\n` +
            `12   F F.I.F F   12\n` +
            `14   . .F   S   F F.   14\n` +
            `15   F F F   L   F F F   15\n` +
            `16   . . .E. . .   16\n\n` +
            `F = FREE / AVAILABLE SEAT. = OCCUPIED\n` +
            `TO ASSIGN SEAT: ST / 12A OR ST / 12A / P1`;
    },

    // 12. Hotel & Car Handlers
    handleHotel: function (cmd) {
        if (cmd.startsWith('HF')) return 'HOTEL FEATURES & PROPERTY DETAILS DISPLAYED';
        if (cmd.startsWith('HR')) return 'HOTEL RATES & ROOM CATEGORIES DISPLAYED';
        if (cmd.startsWith('HT')) return 'HOTEL TERMS & CANCELLATION POLICIES DISPLAYED';
        return `HOTEL AVAILABILITY DISPLAY(HA) \n` +
            `1  HI DXB  HILTON DUBAI CREEK       120 USD / NIGHT  AVAIL\n` +
            `2  MA DXB  MARRIOTT HOTEL DOWNTOWN  145 USD / NIGHT  AVAIL\n` +
            `BOOKING ENTRY: HS[LINE](EXAMPLE: HS1)`;
    },

    handleCar: function (cmd) {
        if (cmd.startsWith('CF')) return 'CAR FEATURES & VEHICLE SPECIFICATIONS DISPLAYED';
        if (cmd.startsWith('CR')) return 'CAR RATES & INCLUSIONS DISPLAYED';
        if (cmd.startsWith('CT')) return 'CAR TERMS & RENTAL POLICIES DISPLAYED';
        return `CAR RENTAL AVAILABILITY(CA) \n` +
            `1  ZE HERTZ      INTERMEDIATE SEDAN  45 USD / DAY  AVAIL\n` +
            `2  ZI AVIS       FULL SIZE SUV       65 USD / DAY  AVAIL\n` +
            `BOOKING ENTRY: CS[LINE](EXAMPLE: CS1)`;
    },

    handleScroll: function (cmd) {
        if (cmd.startsWith('MD')) return 'END OF DISPLAY';
        if (cmd.startsWith('MU') || cmd.startsWith('MT')) return 'TOP OF DISPLAY';
        if (cmd.startsWith('MB')) return 'BOTTOM OF DISPLAY';
        return 'END OF DISPLAY';
    },

    // 13. Help & General Info
    handleHelp: function (cmd) {
        if (cmd.startsWith('GG ')) {
            const topic = cmd.substring(3).trim().toUpperCase();
            if (DATA.weather[topic]) return DATA.weather[topic];
            return `AMADEUS INFORMATION SYSTEM - TOPIC: ${ topic }\nNO CURRENT ADVISORIES POSTED`;
        }
        return this.handleSearchCommand();
    },

    handleSearchCommand: function () {
        return `AMADEUS SELLING PLATFORM CONNECT - CRYPTIC COMMAND REFERENCE\n\n` +
            `PNR MANAGEMENT: \n` +
            `  RT[LOCATOR]    Retrieve PNR           ET   End & commit PNR\n` +
            `  ER              End & redisplay        IG   Ignore transaction\n` +
            `  RH              Retrieve history       XI   Cancel entire itinerary\n\n` +
            `AVAILABILITY & DISPLAY CHANGE: \n` +
            `  AN[DDMMM][ORG][DST]   Air availability(e.g.AN20NOVDELBOM) \n` +
            `  ACR / ACR[DATE]       Return flight availability(e.g.ACR25NOV) \n` +
            `  AC + 1 / AC - 1           Shift availability date(+/- days) \n` +
            `  AC[DATE] / AC / [AIR]   Change date(AC25NOV) or airline(AC / AI) \n` +
            `  SS[SEATS][CLASS][LINE] Sell seat(e.g.SS1Y1) \n` +
            `  SM[LINE]              Seat map(e.g.SM1) \n` +
            `  ST / [SEAT]             Assign seat(e.g.ST / 12A) \n\n` +
            `DIRECT ACCESS(AIRLINE HOST): \n` +
            `  1[AIRLINE]            Direct host connection(e.g. 1BA, 1EK, 1AI) \n` +
            `  1[AIRLINE][ENTRY]    Direct command(e.g. 1BA AN20NOVLHRJFK) \n` +
            `  1A                    Return to Amadeus Central System\n\n` +
            `MANDATORY PNR ELEMENTS(IATA PRINT): \n` +
            `  NM1[SURNAME] / [FIRST][TITLE]   Name(e.g.NM1SMITH / JOHN MR) \n` +
            `  AP[PHONE]                     Contact(e.g.AP 1 - 212 - 555 -0199) \n` +
            `  TKOK                           Ticketing arrangement\n` +
            `  RF[AGENT]                     Received from(e.g.RF TRAVEL AGENT, RFS) \n\n` +
            `PRICING & TICKETING(TST): \n` +
            `  FXP             Price itinerary & store TST\n` +
            `  TQT             Display stored TST\n` +
            `  FP CASH         Form of payment\n` +
            `  TTP             Issue 13 - digit IATA electronic ticket\n\n` +
            `WORK AREA & SESSIONS: \n` +
            `  JMA - JMF       Jump to Work Area A through F\n` +
            `  JD              Display work area status\n` +
            `  QT              Display queue totals\n` +
            `  DC / DAC / DAN  Encode / decode codes`;
    },

    // 14. Fallback: Consult CRYPTIC_DATABASE
    handleDatabaseFallback: function (cmd) {
        if (typeof CRYPTIC_DATABASE !== 'undefined' && CRYPTIC_DATABASE.commands) {
            for (const [key, item] of Object.entries(CRYPTIC_DATABASE.commands)) {
                if (item && item.pattern && item.pattern.test(cmd)) {
                    return `ENTRY RECOGNIZED[${ key }]: ${ item.description }\nACTION PROCESSED IN SIMULATION`;
                }
            }
        }
        return `ENTRY NOT RECOGNIZED: ${ cmd }\nENTER 'HELP' OR 'SEARCH' FOR COMMAND LIST`;
    },

    // Utility Methods
    createNewPNR: function () {
        return {
            locator: this.generateLocator(),
            created: this.getCurrentDate(),
            officeId: this.state.officeId,
            agent: this.state.userId,
            status: 'IN PROGRESS',
            passengers: [],
            segments: [],
            contacts: [],
            remarks: [],
            received_from: '',
            ticketing: '',
            formOfPayment: '',
            tst: null,
            tickets: [],
            history: [`${ this.getCurrentDateTime() } PNR INITIALIZED AT ${ this.state.officeId }`]
        };
    },

    generateLocator: function () {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let res = '';
        do {
            res = '';
            for (let i = 0; i < 6; i++) {
                res += chars.charAt(Math.floor(Math.random() * chars.length));
            }
        } while (typeof DATA !== 'undefined' && DATA.pnrs && DATA.pnrs[res]);
        return res;
    },

    getCurrentDateTime: function () {
        const now = new Date();
        const d = now.getUTCDate().toString().padStart(2, '0');
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const m = months[now.getUTCMonth()];
        const y = now.getUTCFullYear().toString().substr(-2);
        const time = now.getUTCHours().toString().padStart(2, '0') + now.getUTCMinutes().toString().padStart(2, '0') + 'Z';
        return `${d}${m}${y}/${time}`;
    },

    getCurrentDate: function () {
        const now = new Date();
        const d = now.getUTCDate().toString().padStart(2, '0');
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const m = months[now.getUTCMonth()];
        return `${d}${m}`;
    },

    savePNRToStorage: function (pnr) {
        try {
            let stored = JSON.parse(localStorage.getItem('amadeus_pnrs') || '{}');
            stored[pnr.locator] = pnr;
            localStorage.setItem('amadeus_pnrs', JSON.stringify(stored));
        } catch (e) {
            console.log('localStorage unavailable');
        }
    },

    loadPNRsFromStorage: function () {
        try {
            const stored = JSON.parse(localStorage.getItem('amadeus_pnrs') || '{}');
            Object.assign(DATA.pnrs, stored);
        } catch (e) {
            console.log('localStorage unavailable');
        }
    },

    init: function () {
        this.loadPNRsFromStorage();
    }
};

// Export for node or browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = COMMANDS;
}
