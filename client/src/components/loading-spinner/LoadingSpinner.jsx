import img from '../../image/03.webp';
import './loading-spinner.css'


export default function LoadingSpinner() {
    return (
        <img className="loading-spinner__image" src={img} alt='img' />
        )
} 