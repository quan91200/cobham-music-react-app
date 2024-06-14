
import { AnimatePresence, motion } from "framer-motion";
import PlayListCard from "./PlayListCard";

const Panel = ({ isPanelVisible }) => {
    return (
        <AnimatePresence>
            {isPanelVisible && (
                <motion.div
                    initial={{ width: isPanelVisible ? "20%" : "0" }}
                    animate={{ width: isPanelVisible ? "20%" : "0" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="h-full sticky top-0 py-3 overflow-y-auto"
                >
                    <PlayListCard />
                </motion.div>

            )}
        </AnimatePresence>
    )
}

export default Panel