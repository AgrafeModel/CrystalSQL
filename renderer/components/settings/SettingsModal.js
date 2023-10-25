import React from 'react';
import {
    Card, CardBody, CardFooter, Button, Modal, ModalBody, ModalHeader, ModalFooter, useDisclosure, ModalContent, Input, Select, SelectItem, Switch, Accordion, AccordionItem,
    Popover,
    PopoverTrigger,
    PopoverContent,
    CardHeader,
    Skeleton,
} from '@nextui-org/react';
import {
    faCog, faSun, faMoon
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTheme } from "next-themes";
import * as twtheme from '../../tailwindthemes'


function DarkmodeSwitcher() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <Switch
            defaultSelected={theme === 'dark'}
            size="lg"
            color="secondary"
            thumbIcon={({ isSelected, className }) =>
                isSelected ? (
                    <FontAwesomeIcon icon={faMoon} className={className} />
                ) : (
                    <FontAwesomeIcon icon={faSun} className={className} />

                )
            }
            onChange={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark');
            }}

        >
            Dark mode
        </Switch>
    );
}

function ThemeSelector() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    React.useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    function ExampleCard({ theme }) {
        const colorsByTheme = {
            light: twtheme.purplelight_theme,
            dark: twtheme.purpledark_theme,
            lightblue: twtheme.bluelight_theme,
            darkblue: twtheme.bluedark_theme,
            lightgreen: twtheme.greenlight_theme,
            darkgreen: twtheme.greendark_theme,
            lightorange: twtheme.orangelight_theme,
            darkorange: twtheme.orangedark_theme,
            lightgrey: twtheme.greylight_theme,
            darkgrey: twtheme.greydark_theme,
            lightpink: twtheme.pinklight_theme,
            darkpink: twtheme.pinkdark_theme,
        }

        const selectedColor = {
            200: colorsByTheme[theme].colors.primary[200],
            300: colorsByTheme[theme].colors.primary[300],
            500: colorsByTheme[theme].colors.primary[500],
            secondary: colorsByTheme[theme].colors.primary.foreground,
            background: colorsByTheme[theme].colors.background,
        }
        return (
            <Card className={"w-[200px] space-y-5 p-4 px-6 h-64"}
                style={{ background: selectedColor.background }}
                radius="lg">
                <Skeleton isLoaded={true} className="rounded-lg">
                    <div className="w-full h-[200px] rounded-lg" style={{ background: `linear-gradient(135deg, ${selectedColor[200]} 0%, ${selectedColor[300]} 100%)` }}
                    ></div>

                </Skeleton>
                <div className="space-y-3">
                    <Skeleton isLoaded={true} className="w-3/5 rounded-lg">
                        <div className="h-3 w-full rounded-lg " style={{ background: selectedColor[500] }}></div>
                    </Skeleton>
                    <Skeleton isLoaded={true} className="w-4/5 rounded-lg">
                        <div className="h-3 w-full rounded-lg bg-secondary-300" style={{ background: selectedColor[500] }}></div>
                    </Skeleton>
                    <Skeleton isLoaded={true} className="w-2/5 rounded-lg">
                        <div className="h-3 w-full rounded-lg bg-secondary-200" style={{ background: selectedColor[500] }}></div>
                    </Skeleton>
                    <p style={{ color: selectedColor.secondary }} className="text-sm">
                        {theme}
                    </p>
                </div>
            </Card>
        )
    }


    const themeList = [
        'light',
        'dark',
        'lightblue',
        'darkblue',
        'lightgreen',
        'darkgreen',
        'lightorange',
        'darkorange',
        'lightgrey',
        'darkgrey',
        'lightpink',
        'darkpink',
    ]


    const updateTheme = (n) => {
        console.log(n, theme)
        //check if not [Object object] to avoid strange bug, or object type
        if (n !== "[object Object]" && n !== "[object Object]" && typeof n !== 'object' && n !== null && n !== undefined && n !== theme) {
                setTheme(n)
                //rerender all components 
                
            
        }
    }


    return (
        <>
            <Button color='primary' variant='flat' auto onPress={onOpen} >
                Theme
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='3xl'>
                <ModalContent>
                    <ModalHeader>
                        <div className='flex flex-row gap-2'>
                            <p className='text-primary text-opacity-50 text-sm'>Theme</p>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[400px] overflow-y-auto'>
                        {themeList.map((theme) => (
                            <Button key={theme} onClick={() => updateTheme(theme)} color='secondary' variant='flat' className='w-full h-full bg-transparent'>
                                <ExampleCard theme={theme} />
                            </Button>
                        ))}

                    </div>
                    </ModalBody>
                    <ModalFooter>
                    <Button auto onClick={() => window.location.reload()} color='primary' variant='flat' className='w-full mt-4'>
                        Refresh
                    </Button>
                    <Button auto onClick={onOpenChange} color='primary' variant='flat' className='w-full mt-4'>
                        Close
                    </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );


}


export default function SettingsModal() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button color='primary' variant='light' auto startContent={<FontAwesomeIcon icon={faCog} />} isIconOnly onPress={onOpen} radius='full' />
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='3xl'>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1" align='center' justify='center' color='primary'>
                        Settings
                    </ModalHeader>
                    <ModalBody>
                        <div className='flex flex-col gap-4'>
                            <p className='text-primary text-opacity-50 text-sm'>Theme</p>
                            <ThemeSelector />
                        </div>
                    </ModalBody>
                    <ModalFooter className='flex flex-row gap-1 justify-between'>

                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    );
}

