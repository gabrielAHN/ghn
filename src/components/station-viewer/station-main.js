
import FlowMap from './flow-map';
import CsvFileUploader from './file-importer';
// box-sizing in javascript is camelCase
// font-family in javascript

function StationViewer() {
    return (
        <div className='station-viewer'>
        <h1>Station Viewer</h1>
        <CsvFileUploader />
        <div style={{ 
                height: '10cm',
                position: 'relative'
            }}>
            <FlowMap />
        </div>
        </div>
    );
}
export default StationViewer;