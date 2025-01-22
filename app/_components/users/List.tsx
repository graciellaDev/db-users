import { apiUser } from "@/types/api";
import { Fragment } from "react";
import Image from "next/image";

export default function List({users, openDelete}: {
    users: apiUser[], 
    openDelete: (value: {id: string | null, name: string | null, isOpen: boolean}) => void
}) {
    function open(id: string, name: string, isOpen: boolean) {
        openDelete({id: id, name: name, isOpen: isOpen});
    }

    return (
        users.map((user: apiUser, index: number) => (
        <Fragment key={index}>
            <li className="list-users__item list-users__name flex items-center">
                <Image 
                className="rounded-2xl"
                  src={user.avatar} 
                  width={44} 
                  height={44} 
                  alt={`${user.last_name} ${user.first_name}`} 
                  title={`${user.last_name} ${user.first_name}`} 
                  priority 
                />
                {user.last_name} {user.first_name}
            </li>
            <li className="list-users__item list-users__email  flex items-center">{user.email}</li>
            <li className="list-users__item list-users__data flex items-center">24.10.1998</li>
            <li className="list-users__item list-users__gender flex items-center">Женский</li>
            <li className="list-users__item list-users__role flex items-center">Доктор</li>
            <li className="list-users__item list-users__edit  flex items-center">
                <button 
                    className="list-users__edit list-users__btn" 
                    style={{backgroundImage: "url(/edit.svg)"}}
                ></button>
                <button 
                    className="list-users__delete list-users__btn" 
                    style={{backgroundImage: "url(/delete.svg)"}} 
                    onClick={() => open(user.id.toString(), `${user.last_name} ${user.first_name}`, true)}
                ></button>
            </li>
        </Fragment> 
    ))
    );
}