import { ChangeEventHandler } from 'react';

export interface PaginatedProps {
    currentPage: number;
    totalPages: number;
    limit: number;
    handleLimitChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    loadPage: (page: number) => void;
}