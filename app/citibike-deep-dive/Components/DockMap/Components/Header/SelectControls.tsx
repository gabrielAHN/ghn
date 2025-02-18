import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useGraphMode } from "@/app/citibike-deep-dive/provider/GraphModeContext";
import { covidMarks, congestionMarks } from "@/app/citibike-deep-dive/Components/ModeData";

interface YearDataItem {
    year: number;
    month: number | null;
    complete: boolean;
}

interface SelectControlsProps {
    YearData: YearDataItem[];
    SliderYear: number;
    setSliderYear: (year: number) => void;
    SliderMonth: string;
    setSliderMonth: (month: string) => void;
}

export function SelectControls({
    YearData,
    SliderYear,
    setSliderYear,
    SliderMonth,
    setSliderMonth
}: SelectControlsProps) {
    const { graphMode } = useGraphMode();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const marks = graphMode === "explore" ? [] : graphMode === "covid" ? covidMarks : congestionMarks;
    const years = [...new Set(YearData.map((item) => item.year))].sort((a, b) => a - b);
    const selectedYearData = YearData.find((item) => item.year === SliderYear);
    const startMonthIndex = SliderYear === 2013 ? 5 : 0;
    const endMonthIndex = selectedYearData?.complete ? 11 : (selectedYearData?.month ? selectedYearData.month - 1 : 0);
    const availableMonths = monthNames.slice(startMonthIndex, endMonthIndex + 1);

    return (
        <div className="flex-1 space-y-4">
            <Select
                value={SliderYear !== undefined ? SliderYear.toString() : years[0]?.toString() ?? ""}
                onValueChange={(value) => {
                    const newYear = parseInt(value);
                    setSliderYear(newYear);
                    const newYearData = YearData.find((item) => item.year === newYear);
                    if (newYearData) {
                        const startMonthIndex = newYear === 2013 ? 5 : 0;
                        const endMonthIndex = newYearData.complete ? 11 : (newYearData.month ? newYearData.month - 1 : 0);
                        const newAvailableMonths = monthNames.slice(startMonthIndex, endMonthIndex + 1);
                        if (!newAvailableMonths.includes(SliderMonth)) {
                            setSliderMonth(newAvailableMonths[0]);
                        }
                    }
                }}
            >
                <SelectTrigger className="focus:border-blue-300 focus:ring-0">
                    <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                    {years.map((year) => {
                        const markForYear = marks.find((mark) => mark.year === String(year));
                        return (
                            <SelectItem key={year} value={year.toString()}>
                                {year}
                                {markForYear && ` (${markForYear.label})`}
                            </SelectItem>
                        );
                    })}
                </SelectContent>
            </Select>
            <Select value={SliderMonth} onValueChange={setSliderMonth}>
                <SelectTrigger className="focus:border-blue-300 focus:ring-0">
                    <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                    {availableMonths.map((month) => {
                        const markForMonth = marks.find((mark) => mark.year === String(SliderYear) && mark.month === month);
                        return (
                            <SelectItem key={month} value={month}>
                                {month}
                                {markForMonth && ` (${markForMonth.label})`}
                            </SelectItem>
                        );
                    })}
                </SelectContent>
            </Select>
        </div>
    );
}