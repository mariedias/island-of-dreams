export const IconButton = ({children, ...rest}) => {
    return (
        <button {...rest} className="border-none">
            {children}
        </button>
    )
}