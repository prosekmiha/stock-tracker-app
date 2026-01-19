'use client'

import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"

type TvSymbol = {
    symbol: string
    name: string
}

const SearchDialog = () => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<TvSymbol[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!query) {
            setResults([])
            return
        }

        const timeout = setTimeout(async () => {
            setLoading(true)
            try {
                const res = await fetch(`/api/search?q=${query}`)
                const data = await res.json()
                console.log(data)
                setResults(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }, 300) // debounce

        return () => clearTimeout(timeout)
    }, [query])


    return (
        <DialogContent className="search-dialog">
            <DialogHeader>
                <DialogTitle className="text-gray-400">
                    Search stocks
                </DialogTitle>
            </DialogHeader>

            {/* SEARCH INPUT */}
            <div className="search-field">
                <Input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search stocks, crypto, forex…"
                    className="search-input"
                />

                {loading && (
                    <Loader2 className="search-loader" />
                )}
            </div>

            {!!results.length && (
                <div className="search-count">
                    {results.length} results
                </div>
            )}

            <div className="search-list scrollbar-hide-default overflow-y-auto">
                {!loading && query && results.length === 0 && (
                    <div className="search-list-empty">
                        No results found
                    </div>
                )}

                {results.map((item) => (
                    <div key={`${item.symbol}`} className="search-item">
                        <Link
                            href={`/stock/${item.symbol}`}
                            className="search-item-link"
                        >
                            <div className="flex flex-col">
                                <span className="search-item-name">
                                    {item.symbol}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {item.name}
                                </span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </DialogContent>
    )
}

export default SearchDialog
