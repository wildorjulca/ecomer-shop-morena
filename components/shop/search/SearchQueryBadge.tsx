"use client";

import { X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchQueryBadge() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const query = searchParams.get("query");

    if (!query) return null;

    const handleRemove = () => {
        const params = new URLSearchParams(searchParams.toString());

        params.delete("query");

        const url = params.toString()
            ? `${pathname}?${params.toString()}`
            : pathname;

        router.push(url);
    };

    return (
        <div className="inline-flex items-center gap-2 px-3 mb-4 py-1 rounded-full border">
            <span>{query}</span>

            <button
                onClick={handleRemove}
                className="cursor-pointer"
            >
                <X size={14} />
            </button>
        </div>
    );
}