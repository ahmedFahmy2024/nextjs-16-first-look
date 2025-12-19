import { Loader2, Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const results = useQuery(
    api.posts.searchPosts,
    query.length >= 2 ? { limit: 5, query: query } : "skip",
  );

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);

    setOpen(true);
  }

  return (
    <div className="relative w-full max-w-sm z-10">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search posts..."
          className="w-full pl-8 bg-background"
          value={query}
          onChange={handleInputChange}
        />
      </div>

      {open && query.length >= 2 && (
        <div className="absolute top-full mt-2 rounded-md border bg-popover text-popover-foreground shadow-md outline animate-in fade-in-0 zoom-in-95 ">
          {results === undefined ? (
            <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
              <Loader2 className="animate-spin mr-2 size-4" />
              searching...
            </div>
          ) : results.length === 0 ? (
            <div className="p-4 text-sm text-muted-foreground">
              No results found!
            </div>
          ) : (
            <div className="py-1">
              {results.map((result) => {
                console.log("result", result);
                return (
                  <Link
                    key={result._id}
                    href={`/blog/${result._id}`}
                    className="flex flex-col px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
                    onClick={() => {
                      setOpen(false);
                      setQuery("");
                    }}
                  >
                    <p className="font-medium truncate">{result.title}</p>
                    <p className="text-muted-foreground text-xs pt-1">
                      {result.body.substring(0, 50)}
                    </p>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
