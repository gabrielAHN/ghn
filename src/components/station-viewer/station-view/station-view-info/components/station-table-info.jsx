import { STOP_TYPE_COLORS } from "../../station-view-main";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import NodeTypeTable from "./node-type-table";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";


export default function StationTableInfo({NodeTypes, nodes, setClickInfo, setViewState}) {
  return (
    <>
      {
        Object.entries(NodeTypes).map(([key, value]) => {
          if (NodeTypes[key].checked) {
            return (
              <Accordion 
                key={key}
                sx={{
                border: `1vh solid rgb(${STOP_TYPE_COLORS[key].color})`,
                borderRadius: "1vh",
                marginBottom: "2vh"
              }}>
                <AccordionSummary
                  key={key}
                  expandIcon={<ArrowDownwardIcon />}
                  aria-controls="panel1-content"
                >
                  <h1>{STOP_TYPE_COLORS[key].name}</h1>
                </AccordionSummary>
                <AccordionDetails sx={{overflowX: 'auto'}} key={key}>
                  <NodeTypeTable
                    key={key}
                    nodes={nodes}
                    nodeType={key}
                    setClickInfo={setClickInfo}
                    setViewState={setViewState}
                  />
                </AccordionDetails>
              </Accordion>
            )
          }
        }
        )
      }
    </>
  );
}