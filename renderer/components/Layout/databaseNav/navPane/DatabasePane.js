import React from "react"
import { Button, Divider } from "@nextui-org/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { useNavigation } from "../../../../utils/NavigationContext"
import { useTablesContext } from "../../../../utils/TablesManager"


export default function DatabaseNavPane({ connectionInfo }) {

    const { navPaneCurrentSelected,updateNavPaneCurrentSelected } = useNavigation();
    const { tableList } = useTablesContext();

    console.log(tableList)



    

    return (
        <div className="flex flex-col w-full items-start justify-start h-full overflow-y-auto no-scrollbar">
            <div className="flex flex-row w-full items-center justify-between px-4">
                <p className="text-primary text-lg">Tables</p>
            </div>
            <div className="flex flex-col w-full items-start justify-start">
                {tableList.map((table, index) => {
                    return (
                        <div key={index} className="flex flex-row w-full items-center justify-start">
                        <Button
                            color="primary"
                            variant="light"
                            size="small"
                            className="w-full text-left justify-start" 
                        >
                            {table}
                        </Button>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}