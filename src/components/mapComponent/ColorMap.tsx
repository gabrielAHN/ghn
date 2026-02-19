import { ColorDict } from "@/components/style"

export const PointColor = (d, sliderYear, sliderMonth) => {
    try {
        const monthData = d.json_col[sliderYear]?.months[sliderMonth];

        if (!monthData) {
            return ColorDict["unkown"];
        }

        const starts = monthData?.month_starts || 0;
        const ends = monthData?.month_ends || 0;
        const total = starts + ends;

        const startPercent = (starts / total) * 100;
        const endPercent = (ends / total) * 100;
        
        if (startPercent >= 51) {
            return ColorDict["start"];
        } else if (endPercent >= 51) {
            return ColorDict["end"]
        } else {
            return ColorDict["middle"]
        }

    } catch (e) {
        return ColorDict["unkown"];
    }
};