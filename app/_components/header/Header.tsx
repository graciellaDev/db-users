"use client";

import   "./header.scss";
import { Fragment, useState } from "react";
import ModalUser from "../modal/ModalUser";
import { apiUser } from "@/types/api";
import { AnimatePresence } from "framer-motion";

export default function Header({ users = [], isOpenModal= false }: { users?: apiUser[], isOpenModal: boolean}) {
    const [isModal, closeModal] = useState<boolean>(isOpenModal);
    function openModal() {
        closeModal(true);
    }

    return (
        <Fragment>
        <header className="header flex flex-wrap gap-5 items-center">
            <div className="flex flex-row items-center gap-3 py-2">
                <h1 className="header__title text-3xl">Пользователи клиники</h1>
                <span className="header__count">{ users ? users.length + ' человека': 0 + 'человек' }</span>
            </div>
            <button className="header__button py-3 px-6 rounded-2xl" onClick={openModal}>
                <span className="header__add-icon mr-3 rounded-full"></span>
                Добавить нового пользователя
            </button>
        </header>
        <AnimatePresence>
            {isModal ? <ModalUser key="modal-user" users={users} close={closeModal} /> : ''}
        </AnimatePresence>
    </Fragment>
    );
}