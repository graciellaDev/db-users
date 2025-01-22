import Icon from "../Icon";
import './modal-block.scss';
import { motion } from "framer-motion"

export default function Success({text, close}: {text: string, close: () => void}) {

    return (
        <motion.div 
            initial={{opacity: 0}} 
            animate={{opacity: 1}} 
            exit={{opacity: 0}} 
            className="modal__block flex flex-col items-center"
        >
            <Icon className="modal__icon" name="success" width={80} height={80} />
            <div className="modal__text-big">{text}</div>
            <div className="modal__buttons flex w-full">
                <button className="modal__button modal__button_cancel" onClick={close}>Закрыть</button>
            </div>
        </motion.div>
    );
}