import Link from "next/link";

export default function DashboardNavPane({ connectionInfo }) {

    return (
        <div className="flex flex-col w-full items-start justify-start px-4">
            <p className="text-primary">Dashboard</p>
            <Link href="/database/dashboard">
                <p className="text-primary">testdashboard</p>
            </Link>


        </div>
    )
}