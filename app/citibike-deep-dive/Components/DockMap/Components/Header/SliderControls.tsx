import { Slider } from "@/components/ui/slider";
import { useGraphMode } from "@/app/citibike-deep-dive/provider/GraphModeContext";
import { covidMarks, congestionMarks } from "@/app/citibike-deep-dive/Components/ModeData";

interface YearDataItem {
    year: number;
    month: number | null;
    complete: boolean;
}

interface SliderControlsProps {
    YearData: YearDataItem[];
    SliderYear: number;
    setSliderYear: (year: number) => void;
    SliderMonth: string;
    setSliderMonth: (month: string) => void;
}

export function SliderControls({
    YearData,
    SliderYear,
    setSliderYear,
    SliderMonth,
    setSliderMonth,
}: SliderControlsProps) {
    const { graphMode } = useGraphMode();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const marks = graphMode === "explore" ? [] : graphMode === "covid" ? covidMarks : congestionMarks;
    const monthToIndex = Object.fromEntries(monthNames.map((name, index) => [name, index + 1]));

    const years = [...new Set(YearData.map((item) => item.year))].sort((a, b) => a - b);
    const selectedYearData = YearData.find((item) => item.year === SliderYear);
    const startMonthIndex = SliderYear === 2013 ? 5 : 0;
    const endMonthIndex = selectedYearData?.complete ? 11 : (selectedYearData?.month ? selectedYearData.month - 1 : 0);
    const availableMonths = monthNames.slice(startMonthIndex, endMonthIndex + 1);
    const currentMonthIndex = SliderMonth ? monthToIndex[SliderMonth] : 1;

    const sliderClassName =
        "w-full [&_[role=slider]]:bg-blue-400 [&_[role=slider]]:border-blue-300 [&>span:first-child]:bg-blue-200 [&>span:first-child>span]:bg-blue-500 [&_[role=slider]]:transition-transform [&_[role=slider]]:duration-200 [&_[role=slider]]:ease-in-out";

    const handleMonthChange = (value: number[]) => {
        const monthIndex = value[0] - 1;
        setSliderMonth(monthNames[monthIndex]);
    };

    return (
        <div className="flex-1 space-y-3">
            <div>
                <Slider
                    value={[years.indexOf(SliderYear) !== -1 ? years.indexOf(SliderYear) : 0]}
                    min={0}
                    max={years.length - 1}
                    step={1}
                    onValueChange={(value) => {
                        const index = value[0];
                        if (index >= 0 && index < years.length) {
                            const newYear = years[index];
                            const newYearData = YearData.find((item) => item.year === newYear);
                            if (newYearData) {
                                const startMonthIndex = newYear === 2013 ? 5 : 0;
                                const endMonthIndex = newYearData.complete ? 11 : (newYearData.month ? newYearData.month - 1 : 0);
                                const newAvailableMonths = monthNames.slice(startMonthIndex, endMonthIndex + 1);
                                setSliderYear(newYear);
                                setSliderMonth(newAvailableMonths[0]);
                            }
                        }
                    }}
                    className={sliderClassName}
                />
                <div className="flex justify-between text-xs mt-2 px-1">
                    {years.map((year) => (
                        <span key={year}
                            className={`${year === SliderYear ? "font-bold text-foreground" : "text-muted-foreground"} text-[0.75rem]`} 
                        >{year}</span>
                    ))}
                </div>
            </div>
            <div>
                <Slider
                    value={[currentMonthIndex]}
                    min={startMonthIndex + 1}
                    max={endMonthIndex + 1}
                    step={1}
                    onValueChange={handleMonthChange}
                    className={sliderClassName}
                />
                <div className="flex mt-2 px-1 w-full">
                    {availableMonths.map((month) => {
                        const markForMonth = marks.find((mark) => mark.year === String(SliderYear) && mark.month === month);
                        return (
                            <div key={month} className="flex flex-col items-center" style={{ width: `${100 / availableMonths.length}%` }}>
                                <span
                                    className={`${month === SliderMonth ? "font-bold text-foreground" : "text-muted-foreground"} text-[0.75rem]`}
                                >
                                    {month.slice(0, 3)}
                                </span>
                                {markForMonth && (
                                    <span
                                        className={`text-[0.6rem] text-center text-red-500 ${month === SliderMonth ? "font-bold text-foreground" : "text-muted-foreground"
                                            }`}
                                    >
                                        {markForMonth.label}
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}