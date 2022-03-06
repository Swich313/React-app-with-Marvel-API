import  error from "./error.gif";
const ErrorMessage = () => {
    return(
        // <img src={process.env.PUBLIC_URL + '/error.gif'} /> if error.gif in public folder
        <img style={{display: "block", width:"250px", height:"250px", objectFit:"contain",
        margin: "0 auto"}} src={error} alt="Error Image"/>
    )
}

export default ErrorMessage;