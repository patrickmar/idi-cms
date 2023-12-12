// import { useMediaQuery } from 'react-responsive'

import { useMediaQuery } from "react-responsive"

// xs: "480px",
// sm: "640px",
// md: "768px",
// lg: "1024px",
// xl: "1280px",
//export type IBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 })
    return isDesktop ? children : null
}
export const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
    return isTablet ? children : null
}
export const Mobile = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    console.log(isMobile)
    return isMobile
}
export const Default = ({ children }) => {
    const isNotMobile = useMediaQuery({ minWidth: 768 })
    return isNotMobile ? children : null
}

// const GetMediaQuery = (breakpoint) => {
//     switch (breakpoint) {
//         case 'xs':
//             const isXs = useMediaQuery({ minWidth: 480 })
//             console.log(isXs);
//             return isXs 
//         case 'sm':
//             const isSm = useMediaQuery({ minWidth: 640 })
//             console.log(isSm);
//             return isSm 
//         case 'md':
//             const isMd = useMediaQuery({ minWidth: 768 })
//             console.log(isMd);
//             return isMd 
//         case 'lg':
//             const isLg = useMediaQuery({ minWidth: 1024 })
//             console.log(isLg);
//             return isLg 
//         case 'xl':
//             const isXl = useMediaQuery({ minWidth: 1280 })
//             console.log(isXl);
//             return isXl 
//         default:
//             const Default = useMediaQuery({ minWidth: 768 })
//             return Default 

//     } 

// }

// export default GetMediaQuery