'use client';

import { changeUserRole } from "@/actions";
import { User } from "@/interfaces";
import { useState, useRef, useEffect } from 'react';
import { PiCaretDown, PiCaretUp } from 'react-icons/pi'; // Importar los íconos
import './styles.css'; // Ruta actualizada

interface Props {
    users: User[];
}

export const UsersTable = ({ users }: Props) => {
    const [updatedUsers, setUpdatedUsers] = useState(users);
    const [openSelect, setOpenSelect] = useState<string | null>(null);
    const selectRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    useEffect(() => {
        // Ordenar los usuarios para que los administradores aparezcan primero
        const sortedUsers = [...updatedUsers].sort((a, b) => {
            if (a.role === 'admin' && b.role !== 'admin') return -1;
            if (a.role !== 'admin' && b.role === 'admin') return 1;
            return 0;
        });
        setUpdatedUsers(sortedUsers);
    }, [users]);

    const handleChangeRole = async (userId: string, newRole: string) => {
        await changeUserRole(userId, newRole);
        // Actualizar el rol localmente y luego ordenar los usuarios
        setUpdatedUsers((prevUsers) => {
            const updatedUsers = prevUsers.map((user) =>
                user.id === userId ? { ...user, role: newRole } : user
            );
            // Ordenar los usuarios para que los administradores aparezcan primero
            return updatedUsers.sort((a, b) => {
                if (a.role === 'admin' && b.role !== 'admin') return -1;
                if (a.role !== 'admin' && b.role === 'admin') return 1;
                return 0;
            });
        });
    };

    const handleSelect = (userId: string) => {
        setOpenSelect(prevId => {
            if (prevId === userId) {
                return null;
            }
            if (prevId && selectRefs.current[prevId]) {
                selectRefs.current[prevId]?.classList.remove('select-show');
            }
            if (selectRefs.current[userId]) {
                selectRefs.current[userId].classList.add('select-show');
            }
            return userId;
        });
    };

    const handleOptionClick = (userId: string, newRole: string) => {
        handleChangeRole(userId, newRole);
        if (selectRefs.current[userId]) {
            selectRefs.current[userId].classList.remove('select-show');
        }
        setOpenSelect(null);
    };

    return (
        <div className="min-w-full"> {/* Asegúrate de aplicar esta clase */}
            <div className=" text-colorPrimary font-fw9 text-fs1rem mysm:text-[0.6rem]">
                {/* Header */}
                <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 bg-colorSecondary px-5 py-3 uppercase font-fw7 text-fs1rem">
                    <div className="text-left">Email</div>
                    <div className="text-left">Nombre</div>
                    <div className="text-left">Rol</div>
                </div>

                {/* Body */}
                {updatedUsers.map((user) => (
                    <div
                        key={user.id}
                        className="grid lg:grid-cols-3 sm:grid-cols-1 grid-cols-1 bg-colorSecondary  border-y-customBW hover:bg-colorHover hover:border-colorPrimary hover:rounded-brAll hover:border-customBW transition duration-300 ease-in-out px-5 py-3 uppercase font-fw5 text-fs1rem items-center"
                    >
                        <div className="">
                            {user.email}
                        </div>
                        <div className="">
                            {user.name}
                        </div>
                        <div className="flex items-center relative whitespace-nowrap mysm:whitespace-normal">
                            <div className="custom-select w-full">
                                <div
                                    className="select-selected flex items-center justify-between cursor-pointer"
                                    onClick={() => handleSelect(user.id)}
                                >
                                    <span className={`text-left ${user.role === 'admin' ? 'admin-role' : ''}`}>
                                        {user.role}
                                    </span>
                                    <div className="ml-2 flex items-center">
                                        {openSelect === user.id ? (
                                            <PiCaretUp className="w-4 h-4 transition-transform" />
                                        ) : (
                                            <PiCaretDown className="w-4 h-4 transition-transform" />
                                        )}
                                    </div>
                                </div>
                                <div
                                    ref={(el) => { selectRefs.current[user.id] = el; }}
                                    className={`select-items ${openSelect === user.id ? 'select-show' : ''}`}
                                >
                                    <div
                                        className={user.role === 'admin' ? 'same-as-selected' : ''}
                                        onClick={() => handleOptionClick(user.id, 'admin')}
                                    >
                                        Admin
                                    </div>
                                    <div
                                        className={user.role === 'user' ? 'same-as-selected' : ''}
                                        onClick={() => handleOptionClick(user.id, 'user')}
                                    >
                                        User
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
