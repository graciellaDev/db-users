"use client";

import './search.scss';
import { apiUser } from "@/types/api";
import React, { Fragment, useState, useEffect } from 'react';
import SearchResults from './SearchResults';
import { AnimatePresence } from 'framer-motion';
import Overlay from '../Overlay';

export default function Search ({users, classCustom = '', placeholder = 'Поиск ...'} : {users: apiUser[], classCustom?: string, placeholder?: string}) {
    const [searchUsers, editUsers] = useState<apiUser[]>([]);
    const [searchCount, editSearchCount] = useState<number>(0);
    const classes = classCustom + ' search w-full relative';

    function getSearchUsers(request: string,dataUsers: apiUser[]): apiUser[] {
        if (request.length > 2) {

            return dataUsers.filter((user: apiUser) => {
                const name: string = `${user.last_name} ${user.first_name}`.toLowerCase();

                if(name.startsWith(request.toLowerCase())) {
                    return user;
                }
            });
        } else {
            return [];
        }
    }

    function handlerSubmit (event: React.FormEvent<HTMLFormElement> |  React.MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();
        
        const inputSearch: HTMLInputElement | null = event.currentTarget.querySelector('input[type="search"]');
        
        if (inputSearch) {
            editSearchCount(inputSearch.value.length);
            if (inputSearch.value.length > 2) {
                editUsers(getSearchUsers(event.currentTarget.value, users));
            } else {
                if (event.currentTarget.value.length <=  2) {
                    editUsers([]);
                }
            }
        }
        
    }

    function handlerInput (event: React.FormEvent<HTMLInputElement>): void {
        editSearchCount(event.currentTarget.value.length);
        if (event.currentTarget.value.length > 2) {
            editUsers(getSearchUsers(event.currentTarget.value, users));
        } else {
            if (event.currentTarget.value.length <=  2) {
                editUsers([]);
            }
        }
    }

    function closeSearchResults (): void {
        editUsers([]);
        editSearchCount(0);
    }
    
    function watchScroll() {
          window.addEventListener("scroll", closeSearchResults);
    }

    useEffect(() => {
        watchScroll();
        return () => {
          window.removeEventListener("scroll", () => closeSearchResults);
        };
    });


    return (
        <Fragment>
            <form className={classes} role="search" onSubmit={handlerSubmit}
            >
                <span className="search__icon absolute w-4 h-4" style={{backgroundImage: "url(/search.svg)"}}></span>
                <input className="search__input w-full rounded-2xl" type="search"  onInput={handlerInput} placeholder={placeholder} />
            </form>
            <AnimatePresence>
                {searchCount > 2 
                ? <Fragment>
                    <Overlay classCustom='search-results' close={closeSearchResults} />
                    <SearchResults key="search" users={searchUsers} close={closeSearchResults} /> 
                  </Fragment>
                : ''}
            </AnimatePresence> 
        </Fragment>
    );
}