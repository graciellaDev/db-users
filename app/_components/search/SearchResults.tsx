"use client";

import { apiUser } from "@/types/api";
import { motion } from "framer-motion";


function NullSearch () {
    return (
        <div className="search-results__null">
            Пользователя с такими параметрами <strong>не найден</strong>, проверьте правильность написнаия или создайте нового!
        </div>
    );
};

function AddUser ({click}: {click: () => void}) {
    return (
        <button className="search-results__add-user" onClick={click} >
            <span className="search-results__add-user__icon"></span>
            Добавить пользователя
        </button>
    );
};
export default function SearchResults({users, close, clickUser = () => {}} 
: {users: apiUser[], close: () => void, clickUser?: () => void}) {
    const listItems = users.map((user: apiUser, index: number) => (
        <li key={index} className="search-results__list-item" onClick={clickUser}>
            <span className="search-results__list-item__name">{`${user.last_name} ${user.first_name}`}</span>
        </li>
    ));

    function clickAddUser () {
        close();
    }
    return (
        <div className="search__container relative"
        >
            <motion.div
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 exit={{ opacity: 0, y: 20 }}
                 transition={{ ease: "easeInOut", duration: 0.5 }}
                 className="search-results absolute w-full bg-white rounded-2xl"
            >
            {users.length === 0 ? <NullSearch /> : <ul className="search-results__list">{listItems}</ul>}
            <AddUser click={clickAddUser}/>
            </motion.div>
        </div>
    );
}