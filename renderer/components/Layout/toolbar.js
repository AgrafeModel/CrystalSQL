import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faSquare, faTimes } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

export default function Toolbar() {
    const [isMaximized, setIsMaximized] = React.useState(false)
    //Get if the user is on a Mac   
    const isMac = process.platform === 'darwin' ? true : false

    const minimizeApp = () => {
        window.ipc.send('minimize-app')

    }
    const toggleMaximize = () => {
        window.ipc.send('toggle-maximize')
    }

    const closeApp = () => {
        window.ipc.send('close-app')
    }




    return (
        <div className="flex flex-row justify-between items-center w-full h-8 bg-primary-200"
            style={{ WebkitAppRegion: 'drag', zIndex: 1000 }}>
            {!isMac ? <div className="flex flex-row gap-2 items-center px-2">
                    <p className="text-primary text-opacity-50 text-sm">CrystalSQL</p>
                </div> : null}
            {isMac ? <div className="flex flex-row gap-2 items-center" style={{ WebkitAppRegion: 'no-drag' }}>
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div> : 
            <div className="flex flex-row gap-2 items-center" style={{ WebkitAppRegion: 'no-drag' }}>
                <button className="w-8 h-8  hover:bg-primary-300 flex justify-center items-center" onClick={minimizeApp} style={{ WebkitAppRegion: 'no-drag' }}>
                    <FontAwesomeIcon icon={faMinus} className="text-primary text-opacity-50" />
                </button>
                <button className="w-8 h-8  hover:bg-primary-300 flex justify-center items-center" onClick={toggleMaximize} style={{ WebkitAppRegion: 'no-drag' }}>
                    <FontAwesomeIcon icon={isMaximized ? faSquare : faSquare} className="text-primary text-opacity-50" />
                </button>
                <button className="w-8 h-8  hover:bg-primary-300 flex justify-center items-center" onClick={closeApp} style={{ WebkitAppRegion: 'no-drag' }}>
                    <FontAwesomeIcon icon={faTimes} className="text-primary text-opacity-50" />
                </button>
            </div>
            }
            {isMac ? <div className="flex flex-row gap-2 items-center px-2">
                    <p className="text-primary text-opacity-50 text-sm">Amethyst</p>
                </div> : null}
                
        </div>
    )


}