import { motion } from 'framer-motion';
import type { ReactNode, FC } from 'react';
import Footer from './Footer';

interface ContainerPagesProps {
    children: ReactNode
    className?: string;
}
export const ContainerPages: FC<ContainerPagesProps> = ({ children, className = "" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`min-h-screen text-xs break-words flex items-center justify-center px-4 bg-gradient-to-tr from-gray-100 to-gray-100 ${className}`}
        >
            <div className="w-full mx-auto">
                {children}
                <Footer />
            </div>
        </motion.div>
    )
}