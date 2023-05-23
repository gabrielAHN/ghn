
import FlowMap from './flow-map';
// box-sizing in javascript is camelCase
// font-family in javascript

function StationViewer() {
    return (
        <div className='station-viewer'>
        <h1>Station Viewer</h1>
        <FlowMap height='100'/>
        </div>
    );
}
export default StationViewer;