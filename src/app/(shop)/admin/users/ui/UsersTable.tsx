'use client';

import { changeUserRole } from "@/actions";
import { User } from "@/interfaces";
import { useState } from 'react';

interface Props {
    users: User[];
}

export const UsersTable = ({ users }: Props) => {
    const [updatedUsers, setUpdatedUsers] = useState(users);

    const handleChangeRole = async (userId: string, newRole: string) => {
        await changeUserRole(userId, newRole);
        setUpdatedUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === userId ? { ...user, role: newRole } : user
            )
        );
    };

    return (
        <table className="min-w-full">
            <thead className="bg-gray-200 border-b">
                <tr>
                    <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                        Email
                    </th>
                    <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                        Nombre completo
                    </th>
                    <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                        Rol
                    </th>
                </tr>
            </thead>
            <tbody>
                {updatedUsers.map((user) => (
                    <tr
                        key={user.id}
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {user.email}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {user.name}
                        </td>
                        <td className="flex items-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <select
                                value={user.role}
                                onChange={(e) => handleChangeRole(user.id, e.target.value)}
                                className="text-sm w-full p-2 text-gray-900"
                            >
                                <option value="admin">Administrador</option>
                                <option value="user">Usuario</option>
                            </select>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
