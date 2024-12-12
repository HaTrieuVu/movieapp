import { IoHomeSharp, IoSearchOutline } from "react-icons/io5";
import { PiTelevisionFill } from "react-icons/pi";
import { BiSolidMoviePlay } from "react-icons/bi";

export const navigation = [
    {
        label: "TV Show",
        href: "tv",
        icon: <PiTelevisionFill/>
    },
    {
        label: "Movies",
        href: "movie",
        icon: <BiSolidMoviePlay/>
    }
]

export const mobileNavigation = [
    {
        label: "Home",
        href: "/",
        icon: <IoHomeSharp/>
    },
    ...navigation,
    {
        label: "Search",
        href: "/search",
        icon: <IoSearchOutline/>
    }
]