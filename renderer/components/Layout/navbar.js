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

} from "@nextui-org/react";

export default function NavbarComponent() {

    //heading navb
    return (
        <Navbar isBordered>
            <NavbarBrand>
               <p className="text-2xl font-bold text-primary">SQLCLIENT</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                
            </NavbarContent>
            <NavbarContent justify="end">

            </NavbarContent>
        </Navbar>
    );




}