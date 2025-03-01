import dynamic from "next/dynamic";
import { PointColor } from "@/components/mapComponent/ColorMap";
import { rgbToHex } from "@/components/style";

interface ClickPopupProps {
  ClickInfo: {
    json_col: Record<number, { months: Record<string, { month_total: number; month_starts: number; month_ends: number }> }>;
    station_name: string;
  };
  SliderYear: number;
  SliderMonth: string;
}

const PieChart = dynamic(() => import("../Graphs/PieGraph"), { ssr: false });
const LineGraph = dynamic(() => import("../Graphs/LineGraph"), { ssr: false });
const BarGraph = dynamic(() => import("../Graphs/BarGraph"), { ssr: false });

function ClickPopup({ ClickInfo, SliderYear, SliderMonth }: ClickPopupProps) {
  const monthData = ClickInfo.json_col[SliderYear]?.months;
  const PopupColor = PointColor(ClickInfo, SliderYear, SliderMonth);
  
  return (
    <div
      style={{ borderColor: rgbToHex(PopupColor) }}
      className="h-full w-full p-2 rounded-md border-4 text-center font-extrabold flex flex-col"
    >
      <h1 className="font-bold text-lg">{ClickInfo.station_name}</h1>

      {monthData ? (
        <>
          <h1 className="text-sm">{SliderMonth} Amount</h1>
          <div className="flex-grow h-[30%]">
            <PieChart monthData={monthData[SliderMonth]} />
          </div>
          <h1 className="text-sm">By Month</h1>
          <div className="flex-grow h-[9em]">
            <LineGraph monthData={monthData} />
          </div>

          <h1 className="text-sm">By Year</h1>
          <div className="flex-grow h-[30%]">
            <BarGraph stationData={ClickInfo.json_col} currentYear={SliderYear} />
          </div>
        </>
      ) : (
        <p>No data available for this month</p>
      )}
    </div>
  );
}

export default ClickPopup;
