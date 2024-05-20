
import './style/inputStyle.css'
import nodeRight from '../../img/noodle.png'
import nodeLeft from '../../img/noodle2.png'
function Login(){
    return(
        <>
        <img className='rightSH' src={nodeRight}></img>
        <img className='leftSH' src={nodeLeft}></img>
        <div className="in-block">
            <h1>Вход</h1>
            
            <div className = "input-group">
            <label>Номер телефона</label>
            <input type='text' ></input>
            </div>
            <div className = "input-group">
            <label>Пароль</label>
            <input type='password' ></input>
            </div>
            <button>Вход</button>
        </div>
        </>
        
    );
}

export default Login;
