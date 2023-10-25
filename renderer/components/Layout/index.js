import NavbarComponent from "./navbar";
import Toolbar from "./toolbar";

export default function Layout({ children }) {
    return (
        <div className="purlple-dark w-full h-full">
            <Toolbar />
            <NavbarComponent />
            <div className="flex flex-col w-full h-full">
                {children}
            </div>
        </div>
    );
}