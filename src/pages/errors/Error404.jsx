import style from "./Error404.module.css";

function Error404() {
    return(
        <div className={style.container}>
            <h1 className={style.heading}>Error 404</h1>
            <h2 className={style.description}>Not Found!</h2>
            {/*<img src="/images/404.webp" alt="404 Not Found!" className={style.image}></img>*/}
        </div>
    )
}

export default Error404;