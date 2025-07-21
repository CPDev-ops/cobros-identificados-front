import { motion, AnimatePresence } from 'framer-motion';
import type { FC, ReactNode } from 'react';

interface props {
    children: ReactNode
}

export const ContainerModals: FC<props> = ({ children }) => {
    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="bg-[var(--bg-100)] rounded-lg shadow-2xl  w-full  max-h-[90vh] max-w-xs  sm:max-w-md lg:max-w-lg 2xl:max-w-2xl mx-auto overflow-y-auto"
                >
                    <div className="">
                        {children}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}