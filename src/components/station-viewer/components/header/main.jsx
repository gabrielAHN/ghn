import { Grid } from "@mui/material";
import HeaderTabs from "./header-tabs";
import HeaderDrawer from "./header-drawer";


export default function StationViewerHeader({
    handleChange, tabPanelItems, HeaderPage
}) {

    return (
        <Grid container justifyContent="center" spacing={2} sx={{ marginBottom: '3vh' }}>
            <Grid item xs sm={12} container justifyContent="center">
                <h1>Station 🚉 Viz</h1>
            </Grid>
            <Grid item xs={2} sm={false} container justifyContent="flex-end"
                sx={{ display: { xs: "block", sm: "none" }, marginTop: { xs: "2.5vh" } }}>
                <HeaderDrawer
                    tabPanelItems={tabPanelItems}
                    HeaderPage={HeaderPage}
                    handleChange={handleChange}
                />
            </Grid>
            <Grid item xs={false} sm={12} container justifyContent="center"
                sx={{ display: { xs: "none", sm: "block" } }}>
                <HeaderTabs
                    HeaderPage={HeaderPage}
                    handleChange={handleChange}
                    tabPanelItems={tabPanelItems}
                />
            </Grid>
        </Grid>
    );
}