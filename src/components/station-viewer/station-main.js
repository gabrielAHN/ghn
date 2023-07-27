
import FlowMap from './flow-map';
import CsvFileUploader from './file-importer';
import StationUI from './station-ui';
// box-sizing in javascript is camelCase
// font-family in javascript

function StationViewer() {
    return (
        <div className='station-viewer'>
        <StationUI />
        
        {/* <div style={{ 
                height: '10cm',
                position: 'relative'
            }}>
            <FlowMap />
        </div> */}
        </div>
    );
}
export default StationViewer;