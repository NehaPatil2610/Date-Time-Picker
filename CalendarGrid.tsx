import { useEffect, useRef, useState } from 'react';
import { getDaysInMonth, formatTime } from './timeUtils';

interface CalendarGridProps {
    viewDate: Date; // The first day of the month we are viewing (in correct timezone context)
    range: { start: Date | null; end: Date | null };
    onSelect: (date: Date) => void;
    timezone: string;
    minDate?: Date;
    maxDate?: Date;
}

export const CalendarGrid = ({ viewDate, range, onSelect, timezone }: CalendarGridProps) => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Sunday. Note: this uses local time construction which maps nicely for 0-24hr extraction usually, but let's be careful.
    // Actually, we must use the timezone to determine "What day is the 1st of this month in THIS timezone?"
    // Construct 1st of month in target timezone
    // TODO: Verify if viewDate is already properly set to strict midnight in target zone? Yes, parent should ensure that.

    // Generate days
    const days: (Date | null)[] = [];
    for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) {
        // We construct the date at NOON to avoid DST shifts causing day jumps when purely working with dates
        // OR better: use our safe constructor
        days.push(new Date(year, month, i, 12, 0, 0)); 
    }

    const isSelected = (date: Date) => {
        if (!range.start) return false;
        // Compare YMD
        const isSameDay = (d1: Date, d2: Date) => 
            d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate();

        if (range.end) {
            return date >= range.start && date <= range.end;
        }
        return isSameDay(date, range.start);
    };

    const isStart = (date: Date) => range.start && date.getFullYear() === range.start.getFullYear() && date.getMonth() === range.start.getMonth() && date.getDate() === range.start.getDate();
    const isEnd = (date: Date) => range.end && date.getFullYear() === range.end.getFullYear() && date.getMonth() === range.end.getMonth() && date.getDate() === range.end.getDate();

    // Accessibility: Keyboard Navigation
    const [focusedIndex, setFocusedIndex] = useState<number>(-1);
    const gridRef = useRef<HTMLDivElement>(null);
    const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

    // Initialize focus when view changes
    useEffect(() => {
        // Find first focusable day (usually day 1)
        const firstDayIndex = days.findIndex(d => d !== null);
        if (focusedIndex === -1 || focusedIndex < firstDayIndex) {
            setFocusedIndex(firstDayIndex);
        }
    }, [viewDate]);

    // Handle focus connection
    useEffect(() => {
        if (focusedIndex >= 0 && buttonsRef.current[focusedIndex]) {
            buttonsRef.current[focusedIndex]?.focus();
        }
    }, [focusedIndex]);

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        const totalCells = days.length;
        let nextIndex = index;

        switch (e.key) {
            case 'ArrowRight':
                nextIndex++;
                break;
            case 'ArrowLeft':
                nextIndex--;
                break;
            case 'ArrowDown':
                nextIndex += 7;
                break;
            case 'ArrowUp':
                nextIndex -= 7;
                break;
            case 'Home':
                // Find first non-null day
                nextIndex = days.findIndex(d => d !== null);
                break;
            case 'End':
                nextIndex = days.length - 1;
                break;
            default:
                return;
        }

        if (nextIndex >= 0 && nextIndex < totalCells && days[nextIndex]) {
            e.preventDefault();
            setFocusedIndex(nextIndex);
        }
    };

    return (
        <div 
            role="grid" 
            className="w-full"
            aria-label={`Calendar for ${new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(viewDate)}`}
        >
            <div role="row" className="grid grid-cols-7 mb-4 text-center">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                    <span key={d} role="columnheader" aria-label={d} className="text-[10px] font-black uppercase text-indigo-300 tracking-widest">{d}</span>
                ))}
            </div>
            
            <div className="grid grid-cols-7 gap-y-1" role="presentation">
                {days.map((date, i) => {
                    if (!date) return <div key={`empty-${i}`} role="gridcell" className="h-10 w-full" aria-hidden="true" />;

                    const selected = isSelected(date);
                    const start = isStart(date);
                    const end = isEnd(date);
                    const inRange = selected && !start && !end;

                    return (
                        <div key={date.toISOString()} className="relative flex items-center justify-center py-1">
                            {/* Range Background */}
                            {selected && (
                                <div className={`
                                    absolute inset-y-1.5 z-0 transition-all duration-300 range-3d
                                    ${inRange ? 'inset-x-0' : ''}
                                    ${start && range.end ? 'left-1/2 right-0 rounded-l-none' : ''}
                                    ${end && range.start ? 'left-0 right-1/2 rounded-r-none' : ''}
                                    ${start && !range.end ? 'w-10 h-10 rounded-full' : ''}
                                    ${end && !range.start ? 'w-10 h-10 rounded-full' : ''}
                                `} />
                            )}

                            <button
                                ref={el => buttonsRef.current[i] = el}
                                role="gridcell"
                                tabIndex={focusedIndex === i ? 0 : -1}
                                aria-selected={selected}
                                aria-label={new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(date)}
                                onClick={() => onSelect(date)}
                                onKeyDown={(e) => handleKeyDown(e, i)}
                                className={`
                                    h-11 w-11 rounded-2xl text-sm font-bold transition-all duration-300 relative z-10
                                    flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-brand-500/30
                                    day-3d
                                    ${start || end ? 'day-3d-selected shadow-2xl scale-110' : ''}
                                    ${inRange ? 'text-white font-extrabold' : ''}
                                    ${!selected ? 'hover:bg-white/10 text-white' : ''}
                                `}
                                type="button"
                            >
                                <span className="relative z-10">{date.getDate()}</span>
                                {(start || end) && (
                                    <span className="absolute inset-0 bg-white/20 rounded-2xl blur-[2px]"></span>
                                )}
                            </button>

                        </div>
                    );
                })}
            </div>
        </div>
    );
};

