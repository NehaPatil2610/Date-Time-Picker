export const TIMEZONES = [
    'UTC',
    'America/New_York',
    'America/Los_Angeles',
    'Europe/London',
    'Asia/Tokyo',
    'Australia/Sydney',
    'Asia/Kolkata',
] as const;

export type Timezone = typeof TIMEZONES[number];

/**
 * creates a formatter for a specific timezone
 */
export const getFormatter = (timezone: string, options: Intl.DateTimeFormatOptions) => {
    return new Intl.DateTimeFormat('en-US', {
        ...options,
        timeZone: timezone,
    });
};

/**
 * Returns a new Date object representing the start of the day in the given timezone
 * This effectively "strips" the time part relative to that timezone
 */
export const startOfDayInZone = (date: Date, timezone: string): Date => {
    const formatter = getFormatter(timezone, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });
    
    // Format to string parts in the target timezone
    const parts = formatter.formatToParts(date);
    const getPart = (type: Intl.DateTimeFormatPartTypes) => parts.find(p => p.type === type)?.value;
    
    // Reconstruct date assuming local time matches target timezone time (mocking "local" manipulation)
    // OR better: construct a string ISO-like and parse it in the context of the timezone.
    
    // Actually, safer approach for "Start of Day" in a timezone:
    // 1. Get the Y-M-D of the date in that timezone.
    // 2. Create a date corresponding to Y-M-D 00:00:00 in that timezone.
    
    const year = parseInt(getPart('year')!);
    const month = parseInt(getPart('month')!);
    const day = parseInt(getPart('day')!);
    
    return createDateFromZone(year, month, day, 0, 0, timezone);
};


// Robust version of creating a date from timezone-specific parts
export const createDateFromZone = (year: number, month: number, day: number, hour: number, minute: number, timezone: string): Date => {
    // 1. Create a UTC date as a rough guess
    const guess = new Date(Date.UTC(year, month - 1, day, hour, minute));
    
    // 2. Get the components of this guess in the target timezone
    const getComponents = (d: Date) => {
        const f = getFormatter(timezone, {
             year: 'numeric', month: 'numeric', day: 'numeric',
             hour: 'numeric', minute: 'numeric', second: 'numeric',
             hour12: false
        });
        const parts = f.formatToParts(d);
        const get = (t: string) => parseInt(parts.find(p => p.type === t)?.value || '0');
        return {
            y: get('year'), m: get('month'), d: get('day'),
            h: get('hour'), min: get('minute')
        };
    };

    // 3. Iteratively adjust
    // This is "inverse timezone projection"
    // Since offset is max 14 hours, we can converge quickly.
    
    let current = guess;
    for (let i = 0; i < 5; i++) { // usually converges in 1-2 steps
        const comp = getComponents(current);
        const diffMinutes = 
            (comp.h * 60 + comp.min) - (hour * 60 + minute) +
            (comp.d - day) * 1440; // simplified, assumes month/year match for small adjust
            
        if (diffMinutes === 0) return current;
        
        current = new Date(current.getTime() - diffMinutes * 60000);
    }
    return current;
};

export const formatDate = (date: Date, timezone: string): string => {
    return new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        year: 'numeric',
        month: 'long', 
        day: 'numeric'
    }).format(date);
};

export const formatTime = (date: Date, timezone: string): string => {
     return new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    }).format(date);
};

export const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
};

export const addMonths = (date: Date, amount: number): Date => {
    const d = new Date(date);
    d.setMonth(d.getMonth() + amount);
    return d;
};
