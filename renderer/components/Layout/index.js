import NavbarComponent from "./navbar";

export default function Layout({ children }) {
    return (
        <div className="purlple-dark">
            <NavbarComponent />
            <div className="container mx-auto p-4">
                {children}
            </div>
        </div>
    );
}