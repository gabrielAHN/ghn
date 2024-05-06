import {gradientColors} from '../../station-view-main';

export default function SliderColorGradient({minTime, maxtime}) {

    const gradient = gradientColors.map(color => `rgb(${color.join(',')})`).join(', ');

    const style = {
      background: `linear-gradient(to right, ${gradient})`,
      width: '100%',
      height: '2vh',
      borderRadius: '8px'
    };

    return (
        <>
            <div style={style}></div>
        </>
    );
}