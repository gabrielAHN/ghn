import { TableCell } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, XCircle, Zap } from "lucide-react";

function TableComponent({ TableData, activeTrips, setActiveTrips }) {
  const toggleRowActive = (index) => {
    setActiveTrips((prevActiveTrips) => {
      const activeCount = TableData.length - prevActiveTrips.length;
      if (!prevActiveTrips.includes(index)) {
        if (activeCount === 1) {
          return [];
        } else {
          const allIndices = TableData.map((_, i) => i);
          const newActiveTrips = allIndices.filter((i) => i !== index);
          return newActiveTrips;
        }
      } else {
        return prevActiveTrips.filter((i) => i !== index);
      }
    });
  };

  return (
    <div className="w-full overflow-x-auto rounded-md border">
      <ScrollArea className="h-[34em] w-full">
        <table className="min-w-full border-collapse">
          <thead className="sticky z-30 top-0 bg-white h-[3em] w-full text-sm">
            <tr>
              <th />
              <th>From</th>
              <th>To</th>
              <th>Year Count</th>
            </tr>
          </thead>
          <tbody>
            {TableData.map((row, index) => {
              const isDeactivated = activeTrips.includes(index);
              return (
                <tr
                  key={index}
                  className={`text-xs border-b ${isDeactivated ? "opacity-50" : ""}`}
                >
                  <TableCell className="relative">
                    {row.rideable_type === "electric_bike" && (
                      <span className="absolute top-0.5 left-0.5">
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-yellow-400">
                          <Zap className="w-3 h-3 text-black" />
                        </span>
                      </span>
                    )}
                    <div
                      className="font-medium cursor-pointer"
                      onClick={() => toggleRowActive(index)}
                    >
                      {isDeactivated ? (
                        <XCircle className="text-red-500" />
                      ) : (
                        <CheckCircle className="text-green-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{row.from_station}</TableCell>
                  <TableCell className="font-medium">{row.to_station}</TableCell>
                  <TableCell className="font-medium">{row.trip_count}</TableCell>
                </tr>
              );
            })}
          </tbody>
        </table>
      </ScrollArea>
    </div>
  );
}

export default TableComponent;