"use client";

import "./modal.scss";
import Overlay from "../Overlay";
import Search from "../search/Search";
import { apiUser } from "@/types/api";
import React, {  useEffect, useState } from "react";
import Icon from "../Icon";
import { motion } from "framer-motion";

export default function ModalUser ({users, close}: {users: apiUser[], close: (event: boolean) => void}) {
    
    function closeModal() {
        close(false);
    }

    function clickSelect(event: React.MouseEvent<HTMLLabelElement>) {
        event.currentTarget.classList.add('fixed-open');
        closeSelect();
        event.currentTarget.classList.remove('fixed-open');
        event.currentTarget.classList.toggle('modal__label_open');
        document.querySelector ('.modal__label_open')?.classList.add('modal__label_open');
    }

    function closeSelect() {
        const openNotFixed = document.querySelectorAll('.modal__label_open:not(.fixed-open)');
        if (openNotFixed !== null) {
            openNotFixed.forEach((item) => {
                item.classList.remove('modal__label_open');
            });
        }
    }

    function changeSelect(event: React.ChangeEvent<HTMLElement>) {
        const spanEl: HTMLElement = event.currentTarget.nextSibling as HTMLElement;
        if (spanEl && spanEl.classList.contains('modal__label-title_novalid')) {
            spanEl.classList.remove('modal__label-title_novalid');
        }
    }

     const [selectedOption, setSelectedOption] = useState('female');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let errors: boolean = false;
        const date: HTMLInputElement | null = event.currentTarget.querySelector('input[type="date"]');
        const role: HTMLSelectElement | null = event.currentTarget.querySelector('select[name="role"]');

        if (date !== null && date.parentElement !== null) {
            if (date.value === '') {
                if (!date.parentElement.classList.contains('modal__label_novalid')) {
                    date.parentElement.classList.add('modal__label_novalid');
                    errors = true;
                }
            } else {
                const now = new Date();
                const dateChange = new Date(date.value);
                if (now.getFullYear() -  dateChange.getFullYear() <  18) {
                    if (!date.parentElement.classList.contains('modal__label_novalid')) {
                        date.parentElement.classList.add('modal__label_novalid');
                        errors = true;
                    }
                } else {
                    if (date.parentElement.classList.contains('modal__label_novalid')) {
                        date.parentElement.classList.remove('modal__label_novalid');
                    }
                }
            }
        }
        
        if (role !== null && role.parentElement !== null) {
            console.log(role.value);
            if (role.value === 'default') {
                if (!role.parentElement.classList.contains('modal__label_novalid')) {
                    role.parentElement.classList.add('modal__label_novalid');
                    errors = true;
                }
            } else {
                if (role.parentElement.classList.contains('modal__label_novalid')) {
                    role.parentElement.classList.remove('modal__label_novalid');
                }
            }
        }
       
        if (!errors) {}
    }

    function clickOver() {
        document.addEventListener('click', (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (target.closest('.modal__label') === null) {
                if (document.querySelector ('.modal__label_open') !== null) {
                    document.querySelector ('.modal__label_open')?.classList.remove('modal__label_open');
                }
            }
        }); 
    }

    useEffect(() => {
        clickOver();
    });

    return (
        <div className="modal">
            <Overlay classCustom='modal' close={closeModal} />
            <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeInOut", duration: 0.5 }}
                className="modal__close absolute" onClick={closeModal}
            ></motion.button>
            <motion.div 
                initial={{ right: -200, opacity: 0 }}
                animate={{ right: 0, opacity: 1 }}
                exit={{ right: -200, opacity: 0 }}
                transition={{ ease: "easeInOut", duration: 0.5 }}
                className="modal__container absolute h-full"
            >
                <h2 className="modal__title">Добавить нового пользователя</h2>
                <p className="modal__subtitle">Найти в списке</p>
                <Search users={users} placeholder="Пользователь" classCustom="modal__search" />
                <form className="modal__form grid grid-cols-3" method="post" onSubmit={submitForm}>
                    <label className="modal__label" htmlFor="date" onClick={clickSelect} onChange={clickSelect}>
                        <input className="modal__input rounded-2xl" name="date" placeholder="Дата рождения" type="date" onChange={changeSelect}></input>
                        <span className="modal__label-title  modal__label-title_novalid">Дата рождения</span>
                    </label>
                    <div className="modal__gender flex align-center rounded-2xl">
                        <div className="modal__gender-btn modal__gender-btn--female">
                            <input 
                               id="female" className="modal__gender-input" 
                               type="radio" 
                               name="gender" 
                               value="female"  
                               onChange={handleChange} 
                               checked={selectedOption === 'female'}
                            />
                            <label className="modal__gender-label flex w-full h-full rounded-2xl" htmlFor="female">
                                <Icon className="modal__gender-icon modal__gender-icon--female" name="female" width={16} height={16} />
                                Женский
                            </label>
                        </div>
                        <div className="modal__gender-btn modal__gender-btn--male">
                            <input 
                                id="male" 
                                className="modal__gender-input" 
                                type="radio" 
                                name="gender" 
                                value="male" checked={selectedOption === 'male'}
                                onChange={handleChange} 
                            />
                            <label className="modal__gender-label flex w-full h-full rounded-2xl" htmlFor="male">
                                <Icon className="modal__gender-icon modal__gender-icon--male" name="male" width={11} height={16} />
                                Мужской
                            </label>
                        </div>
                    </div>
                    <label className="modal__label" htmlFor="role" onClick={clickSelect}>
                        <select 
                            className="modal__select rounded-2xl"
                            name="role" 
                            defaultValue={'default'}
                            onChange={changeSelect}
                            required 
                        >
                            <option value="default"  disabled hidden>Роль</option>
                            <option value="nurse">Доктор</option>
                            <option value="therapist">Медсестра/Медбрат</option>
                            <option value="obstetrician">Админ</option>
                        </select>
                        <span className="modal__label-title modal__label-title--select modal__label-title_novalid">Роль</span>
                    </label>
                    <div className="modal__buttons flex w-full">
                        <button className="modal__button modal__button_add-user" type="submit">Добавить</button>
                        <button className="modal__button modal__button_cancel-user" onClick={closeModal}>Отменить</button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}