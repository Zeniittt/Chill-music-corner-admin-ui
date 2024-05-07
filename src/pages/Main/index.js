import { useNavigate } from 'react-router-dom';

function Main() {
    const nagative = useNavigate();

    const handleClick = () => {
        // Chuyển hướng đến đường dẫn /home
        nagative('/home');
    };

    return (
        <div>
            <h1>Welcome to THK Music</h1>
            <button onClick={handleClick}>Tu bi không tình yêu!</button>
        </div>
    );
}

export default Main;
