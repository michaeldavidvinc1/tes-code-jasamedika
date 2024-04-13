import { Link } from "@inertiajs/react";

export default function PaginationTable({ links }) {
    return (
        <nav className="flex justify-end mt-3 mt-4 text-center gap-x-1">
            {links.map((link) => (
                <Link
                    preserveScroll
                    href={link.url || ""}
                    key={link.label}
                    className={
                        "inline-block py-2 px-3 rounded-lg text-xs " +
                        (link.active ? " bg-blue-300 " : " ") +
                        (!link.url
                            ? "! cursor-not-allowed "
                            : "hover:bg-blue-300")
                    }
                    dangerouslySetInnerHTML={{ __html: link.label }}
                ></Link>
            ))}
        </nav>
    );
}
