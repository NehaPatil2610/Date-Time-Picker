import { useState, useCallback } from 'react';
// Changed: Look in the same folder instead of ../logic/
import { validateDate, validateRange, ValidationConstraints } from './validation';
import { addMonths, startOfDayInZone } from './timeUtils';

export const usePickerState = (timezone: string = 'UTC') => {
    // We store ranges as start/end dates. 
    // Important: These Date objects should represent the specific instant in time selected.
    // However, when selecting a "Date" on the calendar, we usually mean "Start of that day in the given timezone".
    const [range, setRange] = useState<{start: Date | null, end: Date | null}>({ start: null, end: null });
    const [error, setError] = useState<string | null>(null);
    
    // View date usually tracks the month we are looking at.
    // We can default to "Now" in the target timezone.
    const [viewDate, setViewDate] = useState<Date>(() => startOfDayInZone(new Date(), timezone));
    
    // Constraints (could be passed in props, but for now hardcoded or expandable)
    const constraints: ValidationConstraints = {
        // Example: maxDurationDays: 14,
    };

    const handleSelect = useCallback((newDate: Date) => {
        // newDate comes from the calendar, which should be the correct "start of day" for the timezone.
        
        setError(null);
        
        // State Machine:
        // 0. Start is null -> Set Start
        // 1. Start is set, End is null -> Set End (if valid)
        // 2. Start and End are set -> Reset to just Start
        
        if (!range.start || (range.start && range.end)) {
            // New selection
            const valError = validateDate(newDate, constraints);
            if (valError) {
                setError(`Invalid date: ${valError}`);
                return;
            }
            setRange({ start: newDate, end: null });
        } else {
            // Completing the range
            if (newDate < range.start) {
                // User clicked a date before start. 
                // UX Decision: Flip them? Or Reset?
                // Assignment says "Constraint handling... Explicit validation feedback".
                // Let's assume user might want to correct the start.
                // But usually "End date must be after start" is better feedback or just swap.
                // Let's swap for better UX, unless it violates validation.
                
                // Let's just set error as per strict requirements "Enforce constraints with explicit validation feedback"
                // "No silent coercion of invalid input" - this might suggest we shouldn't auto-swap.
                setError("End date cannot be before start date.");
            } else {
                const rangeError = validateRange(range.start, newDate, constraints);
                if (rangeError) {
                    setError(`Invalid range: ${rangeError}`);
                } else {
                    setRange(prev => ({ ...prev, end: newDate }));
                }
            }
        }
    }, [range, constraints]);

    const navigateMonth = (direction: 'prev' | 'next') => {
        setViewDate(prev => addMonths(prev, direction === 'next' ? 1 : -1));
    };

    return { 
        range, 
        setRange, 
        handleSelect, 
        error, 
        viewDate, 
        setViewDate, 
        navigateMonth 
    };
};

