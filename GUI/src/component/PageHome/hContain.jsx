// import HomeIcon from '@mui/icons-material/Home';
import background from '../PageHome/IMG.jpg';

const hContain = () => {

    return (
        <div className="hContain">
            {/* <HomeIcon className="hicon" /> */}
            {/*  style={{  display: 'block' , margin : 'auto'}}  */}
            <img src={background} className='hicon' alt='IMG'></img>
        </div>
    )
}
export default hContain;