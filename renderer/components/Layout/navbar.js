import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Link,
    Button,
    Image

} from "@nextui-org/react";
import SettingsModal from "../settings/SettingsModal";

export default function NavbarComponent() {

    //heading navb
    return (
        <Navbar isBordered className="justify-center bg-primary-100"
         maxWidth="full" color="primary" fixed="top" shadow="xl" height="4rem" padding="0 2rem" >
            <NavbarBrand className="flex gap-2 items-center">
                <Image src="/images/logo.png" width={40} height={40} alt="SQLCLIENT" />
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                
            </NavbarContent>
            <NavbarContent className="flex gap-4" justify="end">
                <NavbarItem>
                    <SettingsModal />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}