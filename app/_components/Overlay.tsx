import { motion } from "framer-motion";

export default function Overlay({classCustom = '', close}: {classCustom: string, close: () => void}) {
    const classes =  classCustom + '__overlay overlay fixed w-full h-full top-0 left-0';
    function closeOverlay(event: React.MouseEvent<HTMLDivElement>) {
        if (event.target === event.currentTarget) {
            close();
        }
    }
    return (
        <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className={classes} onClick={(event) => closeOverlay(event)}
        >
            {/* <div className={classes} onClick={(event) => closeOverlay(event)}></div> */}
        </motion.div>
    );
}