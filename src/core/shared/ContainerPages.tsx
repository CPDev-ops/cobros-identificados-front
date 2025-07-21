interface ContainerPagesProps {
    children: React.ReactNode
    className?: string;
}
export const ContainerPages: React.FC<ContainerPagesProps> = ({ children, className = "" }) => {
    return (
        <div className={`min-h-screen text-xs break-words flex items-center justify-center px-4 ${className}`}>
            <div className="w-full  mx-auto">
                {children}
            </div>
        </div>
    )
}