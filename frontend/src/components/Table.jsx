const Table = function ({children, className}) {
    return (
        <>
            <div className={`overflow-x-scroll overflow-y-hidden rounded-lg shadow bg-neutral-800 ${className}`}>
                <table className="w-full">
                    {children}
                </table>
            </div>
        </>
    );
}

const Header = function ({children}) {
    return (
        <thead className="border-b-2 border-stone-500">
            <tr className="whitespace-nowrap">{children}</tr>
        </thead>
    )
}

const Body = function ({children, className}) {
    return (
        <tbody className={className}>
        {children}
        </tbody>
    )
}

const HeadData = function ({children, className}) {
    return (
        <th className={`p-5 tracking-wide font-semibold text-left ${className && className}`}>{children}</th>
    )
}

const BodyData = function ({children, className=""}) {
    return (
        <td className={`p-5 font-semibold ${className}`}>{children}</td>
    )
}

const Row = function ({children, className}) {
    return (
        <tr className={`whitespace-nowrap ${className}`}>{children}</tr>
    )
}

Table.TBody = Body;
Table.THead = Header;
Table.TH = HeadData;
Table.TD = BodyData;
Table.TR = Row;

export default Table;