import Link from 'next/link'

const DestinationBreadcrumb = () => {
    return (
        <div>
            <div className="text-sm text-gray-600 lg:mb-8 mb-4 md:mt-6 mt-3">
                <Link href={"/"} className="hover:text-orange-600 transition-colors cursor-pointer">Home</Link>
                <span className="mx-2">→</span>
                <Link href={"/destinations"} className="text-orange-600 font-semibold">Destinations</Link>
            </div>
        </div>
    )
}

export default DestinationBreadcrumb