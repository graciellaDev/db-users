import Overlay from "../Overlay"
import Icon from "../Icon";
import './modal-block.scss';
import { apiDeleteUser } from "@/lib/api";
import { useState } from "react";
import Success from "./Success";
import Error from "./Error";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

export default function DeleteUser(
    {id, name, close}: {id: string, name: string | null, close: () => void}
) {
    const textSuccess = `Пользователь ${name} успешно удален`;
    const [isDelete, setDelete] = useState<boolean>(true);
    const [statusDelete, setStatusDelete] = useState<boolean | null>(null);
    async function deleteUser (id: string) {
        const response = await apiDeleteUser(id.toString());
        if (response.result) {
            setStatusDelete(true);
        } else {
            setStatusDelete(false);
        }
        setDelete(false);
    }

    const blockDelete = () => {
        return (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeInOut", duration: 0.5 }}
                className="modal__block flex flex-col items-center"
            >
                <Icon className="modal__icon" name="delete" width={80} height={80} />
                <div className="modal__text">Вы хотите удалить пользователя:</div>
                <div className="modal__text-big">{name}</div>
                <div className="modal__buttons flex w-full">
                    <button className="modal__button modal__button_delete" onClick={() => deleteUser(id.toString())}>Удалить</button>
                    <button className="modal__button modal__button_cancel" onClick={close}>Отменить</button>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="modal modal_delete">
            <AnimatePresence>
                <Overlay key="overlay" classCustom='modal' close={close} />
                {isDelete ? blockDelete() : ''}
                {statusDelete === true ? <Success text={textSuccess} close={close}  /> : ''}
                {statusDelete === false ? <Error text="Произошла ошибка при удалении пользователя" close={close}  /> : ''}
            </AnimatePresence>
        </div>
    );
}