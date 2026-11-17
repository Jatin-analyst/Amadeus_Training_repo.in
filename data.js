// Amadeus GDS Simulator - Data Module
// Certified IATA reference data for realistic airline, airport, aircraft, and ticketing simulation

const DATA = {

    // IATA Certified Airlines
    airlines: {
        'AA': 'AMERICAN AIRLINES',
        'DL': 'DELTA AIR LINES',
        'UA': 'UNITED AIRLINES',
        'AC': 'AIR CANADA',
        'AF': 'AIR FRANCE',
        'KL': 'KLM ROYAL DUTCH AIRLINES',
        'LH': 'LUFTHANSA',
        'LX': 'SWISS INTERNATIONAL AIR LINES',
        'OS': 'AUSTRIAN AIRLINES',
        'BA': 'BRITISH AIRWAYS',
        'VS': 'VIRGIN ATLANTIC',
        'IB': 'IBERIA',
        'AZ': 'ITA AIRWAYS',
        'TK': 'TURKISH AIRLINES',
        'EK': 'EMIRATES',
        'QR': 'QATAR AIRWAYS',
        'EY': 'ETIHAD AIRWAYS',
        'SV': 'SAUDIA',
        'GF': 'GULF AIR',
        'WY': 'OMAN AIR',
        'KU': 'KUWAIT AIRWAYS',
        'AI': 'AIR INDIA',
        '6E': 'INDIGO',
        'UK': 'VISTARA',
        'SG': 'SPICEJET',
        'IX': 'AIR INDIA EXPRESS',
        'QP': 'AKASA AIR',
        'PK': 'PAKISTAN INTERNATIONAL AIRLINES',
        'PA': 'AIRBLUE',
        'ER': 'SERENE AIR',
        'SQ': 'SINGAPORE AIRLINES',
        'MH': 'MALAYSIA AIRLINES',
        'TG': 'THAI AIRWAYS',
        'CX': 'CATHAY PACIFIC',
        'JL': 'JAPAN AIRLINES',
        'NH': 'ALL NIPPON AIRWAYS',
        'KE': 'KOREAN AIR',
        'QF': 'QANTAS AIRWAYS',
        'NZ': 'AIR NEW ZEALAND',
        'ET': 'ETHIOPIAN AIRLINES',
        'MS': 'EGYPTAIR',
        'SA': 'SOUTH AFRICAN AIRWAYS'
    },

    // IATA 3-Digit Accounting Prefixes (Standard for electronic tickets)
    airline_prefixes: {
        'AA': '001', 'DL': '006', 'UA': '016', 'AC': '014', 'AF': '057',
        'KL': '074', 'LH': '220', 'LX': '724', 'OS': '257', 'BA': '125',
        'VS': '932', 'IB': '075', 'AZ': '055', 'TK': '235', 'EK': '176',
        'QR': '157', 'EY': '607', 'SV': '065', 'GF': '072', 'WY': '910',
        'KU': '229', 'AI': '098', '6E': '312', 'UK': '228', 'SG': '775',
        'IX': '188', 'QP': '601', 'PK': '214', 'PA': '241', 'ER': '269',
        'SQ': '618', 'MH': '232', 'TG': '217', 'CX': '160', 'JL': '131',
        'NH': '205', 'KE': '180', 'QF': '081', 'NZ': '086', 'ET': '071',
        'MS': '077', 'SA': '083'
    },

    // Airline Alliances & Headquarters
    airline_meta: {
        'AA': { alliance: 'ONEWORLD', country: 'US', hub: 'DFW' },
        'DL': { alliance: 'SKYTEAM', country: 'US', hub: 'ATL' },
        'UA': { alliance: 'STAR ALLIANCE', country: 'US', hub: 'ORD' },
        'AF': { alliance: 'SKYTEAM', country: 'FR', hub: 'CDG' },
        'KL': { alliance: 'SKYTEAM', country: 'NL', hub: 'AMS' },
        'LH': { alliance: 'STAR ALLIANCE', country: 'DE', hub: 'FRA' },
        'LX': { alliance: 'STAR ALLIANCE', country: 'CH', hub: 'ZRH' },
        'BA': { alliance: 'ONEWORLD', country: 'GB', hub: 'LHR' },
        'VS': { alliance: 'SKYTEAM', country: 'GB', hub: 'LHR' },
        'TK': { alliance: 'STAR ALLIANCE', country: 'TR', hub: 'IST' },
        'EK': { alliance: 'INDEPENDENT', country: 'AE', hub: 'DXB' },
        'QR': { alliance: 'ONEWORLD', country: 'QA', hub: 'DOH' },
        'EY': { alliance: 'INDEPENDENT', country: 'AE', hub: 'AUH' },
        'AI': { alliance: 'STAR ALLIANCE', country: 'IN', hub: 'DEL' },
        '6E': { alliance: 'INDEPENDENT', country: 'IN', hub: 'DEL' },
        'UK': { alliance: 'INDEPENDENT', country: 'IN', hub: 'DEL' },
        'PK': { alliance: 'INDEPENDENT', country: 'PK', hub: 'KHI' },
        'SQ': { alliance: 'STAR ALLIANCE', country: 'SG', hub: 'SIN' },
        'CX': { alliance: 'ONEWORLD', country: 'HK', hub: 'HKG' },
        'QF': { alliance: 'ONEWORLD', country: 'AU', hub: 'SYD' }
    },

    // Countries - ISO 3166-1 alpha-2 Certified
    countries: {
        'US': 'UNITED STATES',
        'GB': 'UNITED KINGDOM',
        'FR': 'FRANCE',
        'DE': 'GERMANY',
        'IT': 'ITALY',
        'ES': 'SPAIN',
        'NL': 'NETHERLANDS',
        'BE': 'BELGIUM',
        'AT': 'AUSTRIA',
        'CH': 'SWITZERLAND',
        'SE': 'SWEDEN',
        'NO': 'NORWAY',
        'DK': 'DENMARK',
        'FI': 'FINLAND',
        'IE': 'IRELAND',
        'IN': 'INDIA',
        'SG': 'SINGAPORE',
        'TH': 'THAILAND',
        'MY': 'MALAYSIA',
        'JP': 'JAPAN',
        'KR': 'SOUTH KOREA',
        'AU': 'AUSTRALIA',
        'NZ': 'NEW ZEALAND',
        'CA': 'CANADA',
        'AE': 'UNITED ARAB EMIRATES',
        'QA': 'QATAR',
        'HK': 'HONG KONG',
        'PK': 'PAKISTAN',
        'SA': 'SAUDI ARABIA',
        'OM': 'OMAN',
        'KW': 'KUWAIT',
        'BH': 'BAHRAIN',
        'EG': 'EGYPT',
        'TR': 'TURKEY',
        'RU': 'RUSSIA',
        'CN': 'CHINA',
        'ID': 'INDONESIA',
        'BD': 'BANGLADESH',
        'LK': 'SRI LANKA',
        'NP': 'NEPAL',
        'AF': 'AFGHANISTAN',
        'IR': 'IRAN',
        'IQ': 'IRAQ',
        'SY': 'SYRIA',
        'JO': 'JORDAN',
        'LB': 'LEBANON',
        'IL': 'ISRAEL',
        'KE': 'KENYA',
        'ET': 'ETHIOPIA',
        'ZA': 'SOUTH AFRICA',
        'NG': 'NIGERIA',
        'GH': 'GHANA',
        'MA': 'MOROCCO',
        'MX': 'MEXICO',
        'BR': 'BRAZIL',
        'AR': 'ARGENTINA',
        'CL': 'CHILE',
        'CO': 'COLOMBIA',
        'PE': 'PERU'
    },

    // Cities & Airports - Official IATA 3-Letter Codes with Country
    cities: {
        // Indian Subcontinent
        'DEL': 'NEW DELHI/IN',
        'BOM': 'MUMBAI/IN',
        'BLR': 'BENGALURU/IN',
        'MAA': 'CHENNAI/IN',
        'CCU': 'KOLKATA/IN',
        'HYD': 'HYDERABAD/IN',
        'COK': 'KOCHI/IN',
        'AMD': 'AHMEDABAD/IN',
        'GOI': 'GOA/IN',
        'GOX': 'GOA-MOPA/IN',
        'PNQ': 'PUNE/IN',
        'JAI': 'JAIPUR/IN',
        'IXC': 'CHANDIGARH/IN',
        'TRV': 'TRIVANDRUM/IN',
        'ATQ': 'AMRITSAR/IN',
        'LHE': 'LAHORE/PK',
        'KHI': 'KARACHI/PK',
        'ISB': 'ISLAMABAD/PK',
        'PEW': 'PESHAWAR/PK',
        'SKT': 'SIALKOT/PK',
        'FSD': 'FAISALABAD/PK',
        'MLT': 'MULTAN/PK',
        'GWD': 'GWADAR/PK',
        'SKZ': 'SUKKUR/PK',
        'DAC': 'DHAKA/BD',
        'CMB': 'COLOMBO/LK',
        'KTM': 'KATHMANDU/NP',

        // Middle East & Gulf
        'DXB': 'DUBAI/AE',
        'DWC': 'DUBAI-AL MAKTOUM/AE',
        'AUH': 'ABU DHABI/AE',
        'SHJ': 'SHARJAH/AE',
        'DOH': 'DOHA/QA',
        'JED': 'JEDDAH/SA',
        'RUH': 'RIYADH/SA',
        'DMM': 'DAMMAM/SA',
        'MCT': 'MUSCAT/OM',
        'KWI': 'KUWAIT/KW',
        'BAH': 'BAHRAIN/BH',
        'AMM': 'AMMAN/JO',
        'BEY': 'BEIRUT/LB',
        'TLV': 'TEL AVIV/IL',
        'CAI': 'CAIRO/EG',

        // Europe
        'LHR': 'LONDON HEATHROW/GB',
        'LGW': 'LONDON GATWICK/GB',
        'LON': 'LONDON/GB',
        'MAN': 'MANCHESTER/GB',
        'CDG': 'PARIS CHARLES DE GAULLE/FR',
        'ORY': 'PARIS ORLY/FR',
        'PAR': 'PARIS/FR',
        'FRA': 'FRANKFURT/DE',
        'MUC': 'MUNICH/DE',
        'AMS': 'AMSTERDAM/NL',
        'ZUR': 'ZURICH/CH',
        'GVA': 'GENEVA/CH',
        'VIE': 'VIENNA/AT',
        'FCO': 'ROME FIUMICINO/IT',
        'MXP': 'MILAN MALPENSA/IT',
        'MIL': 'MILAN/IT',
        'ROM': 'ROME/IT',
        'MAD': 'MADRID/ES',
        'BCN': 'BARCELONA/ES',
        'BRU': 'BRUSSELS/BE',
        'DUB': 'DUBLIN/IE',
        'CPH': 'COPENHAGEN/DK',
        'ARN': 'STOCKHOLM/SE',
        'OSL': 'OSLO/NO',
        'HEL': 'HELSINKI/FI',
        'IST': 'ISTANBUL/TR',
        'SAW': 'ISTANBUL SABIHA/TR',

        // North America
        'JFK': 'NEW YORK JFK/US',
        'EWR': 'NEWARK/US',
        'NYC': 'NEW YORK/US',
        'ORD': 'CHICAGO OHARE/US',
        'LAX': 'LOS ANGELES/US',
        'SFO': 'SAN FRANCISCO/US',
        'MIA': 'MIAMI/US',
        'DFW': 'DALLAS FT WORTH/US',
        'ATL': 'ATLANTA/US',
        'SEA': 'SEATTLE/US',
        'BOS': 'BOSTON/US',
        'IAD': 'WASHINGTON DULLES/US',
        'YYZ': 'TORONTO PEARSON/CA',
        'YVR': 'VANCOUVER/CA',
        'YUL': 'MONTREAL/CA',

        // Asia-Pacific & Africa
        'SIN': 'SINGAPORE/SG',
        'BKK': 'BANGKOK/TH',
        'KUL': 'KUALA LUMPUR/MY',
        'HKG': 'HONG KONG/HK',
        'NRT': 'TOKYO NARITA/JP',
        'HND': 'TOKYO HANEDA/JP',
        'TYO': 'TOKYO/JP',
        'ICN': 'SEOUL INCHEON/KR',
        'SYD': 'SYDNEY/AU',
        'MEL': 'MELBOURNE/AU',
        'PER': 'PERTH/AU',
        'AKL': 'AUCKLAND/NZ',
        'JNB': 'JOHANNESBURG/ZA',
        'NBO': 'NAIROBI/KE'
    },

    // Airport Specific Information
    airport_names: {
        'DEL': 'INDIRA GANDHI INTL',
        'BOM': 'CHHATRAPATI SHIVAJI INTL',
        'BLR': 'KEMPEGOWDA INTL',
        'MAA': 'CHENNAI INTL',
        'CCU': 'NETAJI SUBHASH CHANDRA INTL',
        'HYD': 'RAJIV GANDHI INTL',
        'KHI': 'JINNAH INTL',
        'LHE': 'ALLAMA IQBAL INTL',
        'ISB': 'ISLAMABAD INTL',
        'DXB': 'DUBAI INTL',
        'DOH': 'HAMAD INTL',
        'LHR': 'LONDON HEATHROW',
        'CDG': 'CHARLES DE GAULLE',
        'FRA': 'FRANKFURT MAIN',
        'JFK': 'JOHN F KENNEDY INTL',
        'SIN': 'SINGAPORE CHANGI'
    },

    // Aircraft Types - Certified IATA 3-Character Equipment Codes
    aircraft: {
        '77W': 'BOEING 777-300ER/396 PAX',
        '789': 'BOEING 787-9/290 PAX',
        '788': 'BOEING 787-8/248 PAX',
        '78X': 'BOEING 787-10/330 PAX',
        '359': 'AIRBUS A350-900/325 PAX',
        '351': 'AIRBUS A350-1000/380 PAX',
        '388': 'AIRBUS A380-800/525 PAX',
        '333': 'AIRBUS A330-300/295 PAX',
        '32N': 'AIRBUS A320NEO/186 PAX',
        '32Q': 'AIRBUS A321NEO/220 PAX',
        '320': 'AIRBUS A320-200/180 PAX',
        '321': 'AIRBUS A321-200/210 PAX',
        '738': 'BOEING 737-800/189 PAX',
        '739': 'BOEING 737-900/215 PAX',
        '7M8': 'BOEING 737 MAX 8/189 PAX',
        '772': 'BOEING 777-200ER/305 PAX',
        'AT7': 'ATR 72-600/72 PAX',
        'B737': 'BOEING 737-800/189 PAX',
        'B738': 'BOEING 737-800/189 PAX',
        'B777': 'BOEING 777-300ER/396 PAX',
        'B787': 'BOEING 787-9/290 PAX',
        'A320': 'AIRBUS A320/180 PAX',
        'A321': 'AIRBUS A321/220 PAX',
        'A330': 'AIRBUS A330-300/295 PAX',
        'A350': 'AIRBUS A350-900/325 PAX',
        'A380': 'AIRBUS A380-800/525 PAX',
        '747': 'BOEING 747-400/416 PAX',
        'ATR': 'ATR 72-600/78 PAX',
        'E90': 'EMBRAER 190/100 PAX'
    },

    // Currencies - ISO 4217 Currency Rates against Base USD
    currencies: {
        'USD': 1.00,
        'EUR': 0.92,
        'GBP': 0.79,
        'INR': 83.50,
        'PKR': 278.00,
        'AED': 3.67,
        'QAR': 3.64,
        'SAR': 3.75,
        'CAD': 1.35,
        'AUD': 1.52,
        'SGD': 1.34,
        'JPY': 154.50,
        'CHF': 0.88,
        'CNY': 7.24,
        'KWD': 0.31,
        'BHD': 0.38,
        'OMR': 0.38
    },

    // Hotels
    hotels: {
        'HI': 'HILTON',
        'MA': 'MARRIOTT',
        'IC': 'INTERCONTINENTAL',
        'SH': 'SHERATON',
        'RD': 'RADISSON',
        'HY': 'HYATT',
        'AC': 'ACCOR',
        'BW': 'BEST WESTERN',
        'TA': 'TAJ HOTELS',
        'OB': 'OBEROI HOTELS',
        'PC': 'PEARL CONTINENTAL',
        'SE': 'SERENA HOTELS'
    },

    // Car rental companies
    car_companies: {
        'ZE': 'HERTZ',
        'ZI': 'AVIS',
        'ZR': 'BUDGET',
        'ET': 'ENTERPRISE',
        'ZD': 'DOLLAR',
        'ZT': 'THRIFTY',
        'EP': 'EUROPCAR',
        'SX': 'SIXT'
    },

    // Official IATA SSR (Special Service Request) Codes
    ssr_codes: {
        'WCHR': 'WHEELCHAIR - CAN WALK TO SEAT AND ASCEND STEPS',
        'WCHS': 'WHEELCHAIR - CAN WALK TO SEAT BUT CANNOT ASCEND STEPS',
        'WCHC': 'WHEELCHAIR - IMMOBILE TO CABIN SEAT',
        'VGML': 'VEGETARIAN VEGAN MEAL',
        'AVML': 'ASIAN VEGETARIAN / HINDU MEAL',
        'VJML': 'VEGETARIAN JAIN MEAL',
        'KSML': 'KOSHER CERTIFIED MEAL',
        'MOML': 'MUSLIM HALAL CERTIFIED MEAL',
        'DBML': 'DIABETIC MEAL',
        'GFML': 'GLUTEN FREE INTOLERANCE MEAL',
        'LFML': 'LOW FAT MEAL',
        'LSML': 'LOW SODIUM MEAL',
        'NLML': 'NON LACTOSE MEAL',
        'CHML': 'CHILD MEAL (2-11 YEARS)',
        'BBML': 'BABY INFANT MEAL (UNDER 2 YEARS)',
        'HNML': 'HINDU NON-VEGETARIAN MEAL',
        'FPML': 'FRUIT PLATTER MEAL',
        'SFML': 'SEAFOOD MEAL',
        'BLND': 'BLIND PASSENGER',
        'DEAF': 'DEAF PASSENGER',
        'DPNA': 'DISABLED PASSENGER INTELLECTUAL ASSISTANCE',
        'MEDA': 'MEDICAL CASE CLEARANCE',
        'STCR': 'STRETCHER PASSENGER ON BOARD',
        'UMNR': 'UNACCOMPANIED MINOR',
        'PETC': 'PET IN CABIN',
        'AVIH': 'ANIMAL IN CARGO HOLD',
        'BSCT': 'BASSINET BULKHEAD CARRY COT',
        'EXST': 'EXTRA SEAT PURCHASED FOR COMFORT',
        'CBBG': 'CABIN BAGGAGE ON SEAT',
        'DOCS': 'PRIMARY TRAVEL PASSPORT DOCUMENTATION',
        'DOCO': 'SECONDARY TRAVEL VISA DOCUMENTATION',
        'DOCA': 'PASSENGER DESTINATION RESIDENCE ADDRESS',
        'CTCM': 'CONTACT MOBILE PHONE',
        'CTCE': 'CONTACT EMAIL ADDRESS',
        'FOID': 'FORM OF IDENTIFICATION FOR E-TICKET',
        'FQTV': 'FREQUENT FLYER ACCRUAL NUMBER'
    },

    // Standard IATA Taxes & Airport Fees Dictionary
    taxes: {
        'YQ': { name: 'CARRIER FUEL / SURCHARGE FEE', type: 'CARRIER' },
        'YR': { name: 'CARRIER MISC OPERATIONAL FEE', type: 'CARRIER' },
        'IN': { name: 'USER DEVELOPMENT FEE - ARRIVAL/DEPARTURE', type: 'AIRPORT' },
        'K3': { name: 'GOODS AND SERVICES TAX (GST - INDIA)', type: 'TAX' },
        'F6': { name: 'PASSENGER SERVICE FEE (PSF)', type: 'AIRPORT' },
        'US': { name: 'US TRANSPORTATION TAX', type: 'AIRPORT' },
        'AY': { name: 'US PASSENGER CIVIL AVIATION SECURITY FEE', type: 'AIRPORT' },
        'GB': { name: 'AIR PASSENGER DUTY (APD - UNITED KINGDOM)', type: 'AIRPORT' },
        'UB': { name: 'PASSENGER SERVICE CHARGE (UNITED KINGDOM)', type: 'AIRPORT' },
        'AE': { name: 'UAE PASSENGER SERVICE CHARGE', type: 'AIRPORT' },
        'TP': { name: 'UAE PASSENGER SECURITY FEE', type: 'AIRPORT' },
        'ZR': { name: 'PASSENGER SAFETY SURCHARGE', type: 'AIRPORT' }
    },

    // Realistic Fare Calculation Engine conforming to IATA TST Standards
    fares: {
        generateFare: function (origin, destination, class_type = 'Y', pax_type = 'ADT') {
            const orgCode = (origin || 'DEL').toUpperCase();
            const dstCode = (destination || 'BOM').toUpperCase();

            const orgStr = DATA.cities[orgCode] || 'DEL/IN';
            const dstStr = DATA.cities[dstCode] || 'BOM/IN';

            const orgCountry = orgStr.split('/')[1] || 'IN';
            const dstCountry = dstStr.split('/')[1] || 'IN';
            const isDomestic = orgCountry === dstCountry;

            // Currency determination
            let currency = 'USD';
            if (orgCountry === 'IN') currency = 'INR';
            else if (orgCountry === 'PK') currency = 'PKR';
            else if (orgCountry === 'GB') currency = 'GBP';
            else if (['FR', 'DE', 'ES', 'IT', 'NL', 'BE', 'AT', 'FI', 'IE'].includes(orgCountry)) currency = 'EUR';
            else if (orgCountry === 'AE') currency = 'AED';
            else if (orgCountry === 'QA') currency = 'QAR';

            // Base rate in USD equivalent
            let baseRateUSD = 450;
            if (isDomestic) {
                baseRateUSD = 95;
            } else if (['US', 'GB', 'FR', 'DE'].includes(orgCountry) && ['IN', 'PK', 'TH', 'SG', 'AE'].includes(dstCountry)) {
                baseRateUSD = 680;
            } else if (orgCountry === 'AE' || orgCountry === 'QA') {
                baseRateUSD = 320;
            }

            const classMultipliers = {
                'F': 4.5, 'A': 4.0,
                'J': 3.2, 'C': 3.0, 'D': 2.6, 'I': 2.2,
                'W': 1.6, 'P': 1.5,
                'Y': 1.0, 'B': 0.95, 'M': 0.90, 'U': 0.85, 'H': 0.80, 'Q': 0.75, 'V': 0.70, 'S': 0.60, 'T': 0.55, 'L': 0.50, 'K': 0.45
            };

            const multiplier = classMultipliers[class_type] || 1.0;
            let paxMultiplier = 1.0;
            if (pax_type === 'CHD') paxMultiplier = 0.75;
            if (pax_type === 'INF') paxMultiplier = 0.10;

            const convRate = DATA.currencies[currency] || 1.0;
            const baseFareCalculated = Math.round(baseRateUSD * multiplier * paxMultiplier * convRate);

            // Taxes breakdown
            const yq = Math.round(baseFareCalculated * 0.18);
            const govTax = Math.round(baseFareCalculated * 0.08);
            const securityTax = Math.round(baseFareCalculated * 0.04);
            const totalTaxes = yq + govTax + securityTax;
            const totalAmount = baseFareCalculated + totalTaxes;

            // Validating carrier assignment with certified 3-digit IATA ticket prefix
            let valCarrier = 'EK';
            if (orgCountry === 'IN' || dstCountry === 'IN') valCarrier = 'AI';
            else if (orgCountry === 'PK' || dstCountry === 'PK') valCarrier = 'PK';
            else if (orgCountry === 'GB' || dstCountry === 'GB') valCarrier = 'BA';
            else if (orgCountry === 'US' || dstCountry === 'US') valCarrier = 'UA';
            else if (orgCountry === 'FR' || dstCountry === 'FR') valCarrier = 'AF';
            else if (orgCountry === 'QA' || dstCountry === 'QA') valCarrier = 'QR';

            const ticketPrefix = DATA.airline_prefixes[valCarrier] || '176';
            const fareBasis = class_type + '26OW' + (pax_type === 'CHD' ? 'CH' : '');
            const baggage = ['F', 'A', 'J', 'C', 'D'].includes(class_type) ? '2PC' : '1PC 23K';

            return {
                base_fare: baseFareCalculated,
                taxes: totalTaxes,
                tax_breakdown: [
                    { code: 'YQ', amount: yq },
                    { code: isDomestic ? 'IN' : 'US', amount: govTax },
                    { code: isDomestic ? 'F6' : 'ZR', amount: securityTax }
                ],
                total: totalAmount,
                currency: currency,
                validating_carrier: valCarrier,
                ticket_prefix: ticketPrefix,
                fare_basis: fareBasis,
                pax_type: pax_type,
                baggage: baggage
            };
        }
    },

    // Procedural Flight Availability Engine with Authentic IATA Scheduling
    flights: {
        generateFlights: function (origin, destination, date, airlineFilter = null) {
            const flights = [];
            const routeAirlines = this.getCertifiedRouteAirlines(origin, destination);
            const aircraftPool = ['77W', '359', '789', '388', '32N', '738', '32Q'];
            const flightTimes = [
                '0215', '0440', '0715', '0930', '1145', '1420', '1650', '1835', '2045', '2310'
            ];

            // If an airline filter was requested 
            if (airlineFilter) {
                // Check if this carrier is certified to fly this city pair
                if (!routeAirlines.includes(airlineFilter)) {
                    return []; // Carrier does NOT operate this route (e.g. QR on DEL-BOM)
                }

                // Carrier flies the route: generate authentic flights specifically for this carrier
                const airlineName = DATA.airlines[airlineFilter] || 'AIRLINE';
                const ticketPrefix = DATA.airline_prefixes[airlineFilter] || '176';
                const carrierTimes = ['0215', '0715', '1145', '1650', '2045'];

                for (let i = 0; i < carrierTimes.length; i++) {
                    const depTime = carrierTimes[i];
                    flights.push({
                        line: i + 1,
                        airline: airlineFilter,
                        airlineName: airlineName,
                        ticketPrefix: ticketPrefix,
                        flight: this.generateRealisticFlightNumber(airlineFilter),
                        date: date,
                        route: origin + destination,
                        origin: origin,
                        destination: destination,
                        dep: depTime,
                        arr: this.calculateArrival(depTime, origin, destination),
                        aircraft: aircraftPool[Math.floor(Math.random() * aircraftPool.length)],
                        classes: this.generateAmadeusClassLadder()
                    });
                }

                return flights;
            }

            // default: round-robin through certified route airlines
            for (let i = 0; i < Math.min(8, flightTimes.length); i++) {
                const airlineCode = routeAirlines[i % routeAirlines.length];
                const airlineName = DATA.airlines[airlineCode] || 'AIRLINE';
                const ticketPrefix = DATA.airline_prefixes[airlineCode] || '176';
                const flightNum = this.generateRealisticFlightNumber(airlineCode);
                const equip = aircraftPool[Math.floor(Math.random() * aircraftPool.length)];
                const depTime = flightTimes[i];
                const arrTime = this.calculateArrival(depTime, origin, destination);

                flights.push({
                    line: i + 1,
                    airline: airlineCode,
                    airlineName: airlineName,
                    ticketPrefix: ticketPrefix,
                    flight: flightNum,
                    date: date,
                    route: origin + destination,
                    origin: origin,
                    destination: destination,
                    dep: depTime,
                    arr: arrTime,
                    aircraft: equip,
                    classes: this.generateAmadeusClassLadder()
                });
            }

            return flights;
        },

        getCertifiedRouteAirlines: function (origin, destination) {
            const orgStr = DATA.cities[origin] || '';
            const dstStr = DATA.cities[destination] || '';
            const org = orgStr.split('/')[1] || '';
            const dst = dstStr.split('/')[1] || '';

            if (org === 'IN' && dst === 'IN') return ['AI', '6E', 'UK', 'SG', 'QP'];
            if (org === 'PK' && dst === 'PK') return ['PK', 'PA', 'ER'];
            if ((org === 'IN' && dst === 'AE') || (org === 'AE' && dst === 'IN')) return ['EK', 'AI', '6E'];
            if ((org === 'IN' && dst === 'QA') || (org === 'QA' && dst === 'IN')) return ['QR', 'AI', '6E'];
            if ((org === 'IN' && dst === 'GB') || (org === 'GB' && dst === 'IN')) return ['AI', 'BA', 'VS', 'EK', 'QR'];
            if ((org === 'IN' && dst === 'US') || (org === 'US' && dst === 'IN')) return ['AI', 'UA', 'EK', 'QR', 'BA', 'LH'];
            if ((org === 'PK' && dst === 'AE') || (org === 'AE' && dst === 'PK')) return ['EK', 'PK', 'PA'];
            if ((org === 'PK' && dst === 'QA') || (org === 'QA' && dst === 'PK')) return ['QR', 'PK'];
            if ((org === 'PK' && dst === 'GB') || (org === 'GB' && dst === 'PK')) return ['BA', 'PK', 'EK', 'QR', 'TK'];
            if ((org === 'US' && dst === 'GB') || (org === 'GB' && dst === 'US')) return ['BA', 'AA', 'VS', 'UA', 'DL'];
            if ((org === 'FR' && dst === 'US') || (org === 'US' && dst === 'FR')) return ['AF', 'DL', 'UA', 'AA'];

            return ['EK', 'QR', 'BA', 'LH', 'AF', 'TK', 'SQ', 'AI'];
        },

        calculateArrival: function (depTime, origin, destination) {
            let depH = parseInt(depTime.substring(0, 2), 10);
            let depM = parseInt(depTime.substring(2, 4), 10);

            const orgStr = DATA.cities[origin] || '';
            const dstStr = DATA.cities[destination] || '';
            const org = orgStr.split('/')[1] || '';
            const dst = dstStr.split('/')[1] || '';

            let durationHours = 4;
            if (org === dst) durationHours = 2;
            else if ((org === 'IN' || org === 'PK') && (dst === 'US' || dst === 'CA')) durationHours = 15;
            else if ((org === 'IN' || org === 'PK') && dst === 'GB') durationHours = 9;
            else if ((org === 'IN' || org === 'PK') && (dst === 'AE' || dst === 'QA')) durationHours = 4;
            else if (org === 'US' && dst === 'GB') durationHours = 7;

            let arrH = (depH + durationHours) % 24;
            let arrM = (depM + 15) % 60;
            return arrH.toString().padStart(2, '0') + arrM.toString().padStart(2, '0');
        },

        generateRealisticFlightNumber: function (airline) {
            const baseRanges = {
                'EK': 500, 'QR': 570, 'AI': 101, 'BA': 142, 'LH': 760, 'AF': 228,
                '6E': 2045, 'UK': 945, 'PK': 701, 'TK': 716, 'UA': 801, 'AA': 292
            };
            const base = baseRanges[airline] || 300;
            return (base + Math.floor(Math.random() * 80)).toString();
        },

        generateAmadeusClassLadder: function () {
            const classes1 = ['J9', 'C9', 'D9', 'I7', 'W9', 'P9', 'Y9', 'B9', 'M9'];
            const classes2 = ['U9', 'H9', 'Q7', 'V7', 'W4', 'S4', 'T2', 'L1', 'K0'];

            const line1 = classes1.map(cls => cls[0] + (Math.floor(Math.random() * 9) + 1)).join(' ');
            const line2 = classes2.map(cls => cls[0] + (Math.floor(Math.random() * 8))).join(' ');
            return { line1, line2 };
        }
    },

    // Weather simulation
    weather: {
        'LON': 'LONDON LHR: 14C SCATTERED CLOUDS, WIND 240/12KT, VIS 10KM, QNH 1016',
        'NYC': 'NEW YORK JFK: 18C CLEAR SKIES, WIND 180/08KT, VIS 10KM, QNH 1019',
        'DEL': 'NEW DELHI DEL: 31C HAZY SUNSHINE, WIND 090/06KT, VIS 4000M, QNH 1008',
        'BOM': 'MUMBAI BOM: 32C PARTLY CLOUDY, WIND 260/14KT, VIS 5000M, QNH 1010',
        'DXB': 'DUBAI DXB: 36C CLEAR, WIND 340/10KT, VIS 10KM, QNH 1012',
        'KHI': 'KARACHI KHI: 31C SUNNY, WIND 230/14KT, VIS 6000M, QNH 1011',
        'LHE': 'LAHORE LHE: 29C CLEAR, WIND 310/05KT, VIS 5000M, QNH 1010',
        'ISB': 'ISLAMABAD ISB: 24C PLEASANT, WIND 020/04KT, VIS 10KM, QNH 1014',
        'DOH': 'DOHA DOH: 34C SUNNY, WIND 350/11KT, VIS 10KM, QNH 1013',
        'PAR': 'PARIS CDG: 16C OVERCAST, WIND 270/14KT, VIS 8000M, QNH 1015'
    },

    // Queues
    queues: {
        general: 12,
        ticketing: 6,
        departure: 4,
        waitlist: 9,
        schedule_change: 3
    },

    // In-memory PNR Storage (seeded with sample PNRs)
    pnrs: {
        'ABC123': {
            locator: 'ABC123',
            created: '12OCT',
            status: 'HK',
            officeId: 'NYC1A0980',
            agent: '1234AA/AS',
            passengers: [
                { name: 'SMITH/JOHN MR', type: 'ADT' }
            ],
            segments: [
                {
                    line: 1,
                    airline: 'EK',
                    flight: '501',
                    class: 'Y',
                    date: '25NOV',
                    route: 'DXBLON',
                    dep: '0215',
                    arr: '0615',
                    status: 'HK',
                    pax: 1
                }
            ],
            contacts: [
                { type: 'PHONE', value: '1-212-555-0199-TRAVEL AGENT' },
                { type: 'EMAIL', value: 'JOHN.SMITH@AMADEUS-SIM.COM' }
            ],
            ticketing: 'TKTL20NOV/NYC1A0980',
            received_from: 'JOHN SMITH',
            remarks: ['VIP PASSENGER CORPORATE TIER'],
            history: ['12OCT 10:15Z NYC1A0980 PNR CREATED']
        }
    }
};

// Export for node or browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DATA;
}
