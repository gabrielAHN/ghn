import React, { useState } from "react";
import {
    Drawer,
    Tab,
    Tabs,
    IconButton
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";


export default function HeaderDrawer({ tabPanelItems, HeaderPage, handleChange }) {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <React.Fragment key={"test"}>
            <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon style={{ fontSize: "3vh" }} />
            </IconButton>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={HeaderPage}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    {
                        tabPanelItems.map((item) => (
                            <Tab
                                key={item.value}
                                value={item.value}
                                icon={item.icon}
                                iconPosition="top"
                                label={item.label}
                                onClick={item.onClick}
                            />
                        )
                        )
                    }
                </Tabs>
            </Drawer>
        </React.Fragment>
    );
}