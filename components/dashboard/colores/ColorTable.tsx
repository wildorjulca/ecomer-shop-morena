'use client'

import DataTable from '@/components/ui/DataTable';
import { useColores } from '@/src/hooks/admin';
import React, { useCallback, useRef, useState, useTransition } from 'react'
import { coloresColumns } from './columns';

const PAGE_SIZE = 7;

const ColorTable = () => {

    const [search, setSearch] = useState("");
    const [dbSearch, setDbSearch] = useState("");
    const [page, setPage] = useState(1);

    const [, startTx] = useTransition();

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleSearch = useCallback(
        (value: string) => {
            setSearch(value);

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                startTx(() => {
                    setDbSearch(value);
                    setPage(1);
                });
            }, 350);
        },
        [startTx]
    );

    const { data, isLoading, isFetching } = useColores({
        page,
        pageSize: PAGE_SIZE,
        search: dbSearch,
    });


    return (
        <div
            className="bg-white rounded-2xl"
            style={{ boxShadow: "0px 2px 10px 0px rgba(0,0,0,0.06)" }}
        >
            <DataTable
                data={data?.colores || []}
                columns={coloresColumns}

                page={page}
                totalPages={data?.totalPage ?? 1}
                total={data?.total ?? 0}
                onPageChange={setPage}

            />

        </div>
    )
}

export default ColorTable