import { motion } from "framer-motion";
import Image from "next/image";
import './modal-block.scss';

export default function Error({text, close}: {text: string, close: () => void}) {

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="modal__block flex flex-col items-center"
        >
            <Image src="/error-connect.png" width={273} height={160} alt="Ошибка запроса" />
            <div className="modal__text-big">{text}</div>
            <div className="modal__buttons flex w-full">
                <button className="modal__button modal__button_cancel" onClick={close}>Закрыть</button>
            </div>
        </motion.div>
    );
}