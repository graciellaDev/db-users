'use client';

import { apiUser } from "@/types/api";
import React, { Fragment, useState } from "react";
import './listusers.scss';
import './sort.scss';
import { SORT_VALUES, SORT_ITEMS } from "@/constants/users";
import { JSX } from "react";
import List from "./List";
import DeleteUser from "../modal/DeleteUser";


export default function ListUsers ({users} : {users: apiUser[]}) {
    const [usersSort, editUsersSort] = useState<{ usersData: apiUser[] }>({ usersData: users});
    const [isDelete, setDelete] = useState<{id: string | null, name: string | null, isOpen: boolean}>({id: null, name: null, isOpen: false});

    function updateDelete(newValue: {id: string | null, name: string | null, isOpen: boolean}) {
      setDelete({...isDelete, ...newValue});
    };

    const sortValue = (value: string): JSX.Element => {
    return (
        <span className="sort__value" datatype="abs">
            По алфавиту {value}
        </span>
    );}
    const listItems = SORT_ITEMS.map((item: {title: string, attr: string}, index: number) => (
        <li 
            key={index.toString()} 
            className="list-users__sort sort flex" 
            datatype={item.attr}  
            onClick={index === 0 ? sortName : notSort}
        >
            {item.title}
            {index === 0 
              ? sortValue(SORT_VALUES["abs"]) 
              :  ''}
        </li>
    ));
    function notSort() {}
    
    function sortName (event: React.MouseEvent<HTMLElement>) {
        console.log('sort');
        const sortEvent: HTMLElement | null = event.currentTarget.querySelector('.sort__value');
        if (sortEvent) {
            const sortActive = sortEvent?.getAttribute("datatype") as keyof typeof SORT_VALUES;
            if (sortActive === "abs") {
                sortEvent.setAttribute("datatype", "desc");
                sortEvent.innerHTML = `По алфавиту ${SORT_VALUES["desc"]}`;
                
                const newData = usersSort.usersData.sort(
                    (a: apiUser, b: apiUser) => a.last_name + ' ' + a.first_name < b.last_name + ' ' + b.first_name ? 1 : -1
                );
                editUsersSort({...usersSort, usersData: newData});
            } else {
                sortEvent.setAttribute("datatype", "abs");
                sortEvent.innerHTML = `По алфавиту ${SORT_VALUES["abs"]}`;
                const newData = usersSort.usersData.sort(
                    (a: apiUser, b: apiUser) => a.last_name + ' ' +a.first_name > b.last_name + ' ' + b.first_name ? 1 : -1
                );
                 editUsersSort({...usersSort, usersData: newData});
            }
        }  
    }

    if (usersSort.usersData.length === 0) return (
        <div className="list-users--empty">
            Пользователей пока нет
        </div>
    );

    return (
        <Fragment>
            <ul className="list-users grid items-center w-full">
                {listItems}
                <li className="list-users__sort sort_null"> </li>
                { usersSort ? <List users={usersSort.usersData} openDelete={setDelete} /> : '' }
            </ul>
            {isDelete.isOpen && isDelete.id 
               ? <DeleteUser 
                  id={isDelete.id} 
                  name={isDelete.name} 
                  close={() => updateDelete({id: null, name: null, isOpen: false})} 
                /> 
               : ''
            }
        </Fragment>
    );
}