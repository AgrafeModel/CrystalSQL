

export default function SplashScreen(){

    return(
        <div className="h-screen w-screen flex justify-center items-center bg-primary bg-opacity-50">
            <div className="flex flex-col justify-center items-center">
                <img src="/images/logo.png" alt="logo" className="w-32 h-32"/>
            </div>
        </div>
    )
}