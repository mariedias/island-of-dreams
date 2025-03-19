import { IconButton } from "../IconButton"
import { Search } from "../icons/Search"

export const SearchBar = () => {
    return (
        <form action="/" className="flex justify-center mt-4 border-none rounded-full bg-[#ffffffdd] drop-shadow-lg py-2 px-4">
            <input
                name="q"
                type="text"
                className="ml-2 text-[#00000089] text-sm font-light border-none outline-none ring-0 bg-transparent"
            />
            <IconButton>
                <Search />
            </IconButton>
        </form>
    )
}