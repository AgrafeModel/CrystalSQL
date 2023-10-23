import React from 'react';
import { Card,CardBody,CardFooter,Button,Image } from '@nextui-org/react';
import {
    faPlug,
    faEdit
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function ConnectionCard({ connection }) {
    const connectionIMG = {
        mysql: 'https://upload.wikimedia.org/wikipedia/fr/thumb/6/62/MySQL.svg/1920px-MySQL.svg.png?20100110142632',
        postgres: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png',
        mssql: 'https://upload.wikimedia.org/wikipedia/de/thumb/8/8c/Microsoft_SQL_Server_Logo.svg/2524px-Microsoft_SQL_Server_Logo.svg.png'
    }



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
                            <span className='text-primary text-sm'>
                                {connection.username}@{connection.host}:{connection.port}
                            </span>
                        </div>
                        <div className="flex flex-row gap-1 justify-end self-start w-full">
                            <Button color='primary' variant='flat' auto startContent={<FontAwesomeIcon icon={faEdit} />} isIconOnly>
                            </Button>
                        </div>
                    </div>
                </CardBody>
                <CardFooter className='w-full'>
                    <div className="flex flex-row gap-2 w-full justify-end">
                        <Button color='primary' variant='flat' auto startContent={<FontAwesomeIcon icon={faPlug} />} className='w-full'>
                            Connect
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </>
    );
}

export default ConnectionCard;
