import React from 'react';
import {
    Card, CardBody, CardFooter, Button, Image} from '@nextui-org/react';
import {faPlug} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditConnectionModal from './EditConnectionModal';
import { useRouter } from 'next/router';


function ConnectionCard({ connection, connectionList, setConnectionList }) {
    const connectionIMG = {
        mysql: 'https://upload.wikimedia.org/wikipedia/fr/thumb/6/62/MySQL.svg/1920px-MySQL.svg.png?20100110142632',
        postgres: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png',
        mssql: 'https://upload.wikimedia.org/wikipedia/de/thumb/8/8c/Microsoft_SQL_Server_Logo.svg/2524px-Microsoft_SQL_Server_Logo.svg.png',
        oracle: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/2560px-Oracle_logo.svg.png',
        sqlite: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/SQLite370.svg/2560px-SQLite370.svg.png',
        mariadb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/MariaDB_colour_logo.svg/2560px-MariaDB_colour_logo.svg.png'

    }
    const router = useRouter()
    const [connectionError, setConnectionError] = React.useState(null)
    const [connectionLoading, setConnectionLoading] = React.useState(false)

    const connect = () => {
        setConnectionLoading(true)
        //connect to database. If success, change page to database page
        window.ipc.send('connect-to-database', connection.id)
    }

    React.useEffect(() => {
        //listen for database-connected event
        window.ipc.on('database-connected', (event, arg) => {
            //if connection successful, change page to database page
            if (event.success) {
                //Save the data in local storage
                localStorage.setItem('connection', JSON.stringify(event.data))
               //change front end page to database page
                router.push('/database')
            }
            else {
                setConnectionError(arg.message)
            }
        })
    }, [])



    return (
        <>
            <Card className='w-full'>
                <CardBody>
                    <div className="flex flex-row gap-4 w-full">
                        <div className="flex flex-col gap-1 w-full justify-center items-center">

                            <Image src={connectionIMG[connection.type]}
                                width={75}
                                height={50}
                                alt={connection.type}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className='text-primary text-lg'>{connection.name}</p>
                            <p className='text-primary text-sm text-opacity-50'>{connection.type}</p>
                            <p className='text-primary text-sm'>{connection.host}</p>
                            <p className='text-primary text-sm'>{connection.username}</p>
                        </div>
                        <div className="flex flex-row gap-1 justify-end self-start w-full">
                            <EditConnectionModal originalConnection={connection} connectionList={connectionList} setConnectionList={setConnectionList} isForEdit/>
                        </div>
                    </div>
                </CardBody>
                <CardFooter className='w-full'>
                    <div className="flex flex-row gap-2 w-full justify-end">
                        <Button color='primary' variant='flat' auto startContent={<FontAwesomeIcon icon={faPlug} />} className='w-full' onClick={connect} isLoading={connectionLoading}>
                            Connect
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </>
    );
}

export default ConnectionCard;
