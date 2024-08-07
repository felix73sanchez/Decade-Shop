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
        <div className=""> {/* Asegúrate de aplicar esta clase */}
            <table className="min-w-full text-colorPrimary font-fw9 text-fs1rem mysm:text-[0.6rem]">
                <thead className="bg-colorGray border-b uppercase rounded-b-brAll overflow-hidden">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-4 mysm:py-2 mysm:px-3 whitespace-nowrap mysm:whitespace-normal text-left"
                        >
                            Email
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-4 mysm:py-2 mysm:px-3 whitespace-nowrap mysm:whitespace-normal text-left"
                        >
                            Nombre completo
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-4 mysm:py-2 mysm:px-3 whitespace-nowrap mysm:whitespace-normal text-left"
                        >
                            Rol
                        </th>
                    </tr>
                </thead>
                <tbody className="">
                    {updatedUsers.map((user) => (
                        <tr
                            key={user.id}
                            className="bg-colorSecondary border-b transition duration-300 ease-in-out hover:bg-colorHoverGray font-fw5 text-fs2 mysm:text-[0.6rem] w-full rounded-b-brAll "
                        >
                            <td className="px-6 py-4 mysm:py-2 mysm:px-2 whitespace-nowrap mysm:whitespace-normal">
                                {user.email}
                            </td>
                            <td className="px-6 py-4 mysm:py-2 mysm:px-2 whitespace-nowrap mysm:whitespace-normal">
                                {user.name}
                            </td>
                            <td className="flex items-center px-6 py-4 mysm:py-2 mysm:px-2 whitespace-nowrap mysm:whitespace-normal relative">
                                <div className="custom-select">
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
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
