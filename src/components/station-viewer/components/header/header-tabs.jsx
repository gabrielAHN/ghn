
import { TabList, TabContext } from "@mui/lab/";
import { Tab } from "@mui/material";

export default function HeaderTabs({ HeaderPage, handleChange, tabPanelItems }) {
    return (
        <TabContext value={HeaderPage}>
            <TabList onChange={handleChange} centered>
                {tabPanelItems.map((item, index) => (
                    <Tab
                        key={item.value}
                        value={item.value}
                        icon={item.icon}
                        iconPosition="top"
                        label={item.label}
                        onClick={item.onClick}
                    />
                ))}
            </TabList>
        </TabContext>
    );
}