'use client';

import { JSX } from "react";
import './sort.scss';

export default function SortUsers () {
    const sortValues: {abs: string, desc: string}= {
        abs: 'А-Я',
        desc: 'Я-А'
    };
    const sortItems: {title: string, attr: string}[] = [
        {
            title: 'ФИО пользователя',
            attr: 'name'
        },
        {
            title: 'Контактные данные',
            attr: 'email'
        },
        {
            title: 'Дата рождения',
            attr: 'date'
        },
        {
            title: 'Пол',
            attr: 'gender'
        },
        {
            title: 'Роль',
            attr: 'role'
        }
    ];
    const sortValue = (value: string, clickSort: (event: React.MouseEvent<HTMLButtonElement>) => void): JSX.Element => {
    return (
        <span className="sort__value" datatype="abs" onClick={clickSort}>
            По алфавиту {value}
        </span>
    );}
    const listItems = sortItems.map((item: {title: string, attr: string}, index: number) => (
        <li key={index} className="sort__item flex" datatype={item.attr}>
            {item.title}
            {index === 0 
              ? sortValue(sortValues["abs"], clickSort) 
              :  ''}
        </li>
    ));
    
    function clickSort (event: React.MouseEvent<HTMLButtonElement>) {
        const sortActive = event.currentTarget.getAttribute("datatype") as keyof typeof sortValues;
        
        if (sortActive === "abs") {
            event.currentTarget.setAttribute("datatype", "desc");
            event.currentTarget.innerHTML = `По алфавиту ${sortValues["desc"]}`;
        } else {
            event.currentTarget.setAttribute("datatype", "abs");
            event.currentTarget.innerHTML = `По алфавиту ${sortValues["abs"]}`;
        }
    }
    return (
        <ul className="sort w-full grid gap-4 items-center">
            {listItems}
            <li className="sort__item-null"> </li>
        </ul>
    );
}