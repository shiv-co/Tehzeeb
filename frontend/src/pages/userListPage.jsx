import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/adminSlice';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';        

// Your Brand's Color Theme
const COLORS = {
  primary: '#B3541E',
  secondary: '#D6A74F',
  accent: '#A5A58D',
  text: '#3E2F1C',
  background: '#F5EBDD',
};

export default function UserListPage() {
  const dispatch = useDispatch();
const { users, userListLoading: loading, userListError: error } = useSelector((state) => state.admin);
console.log('Users:', users);
console.log('Loading:', loading);
console.log('Error:', error);



  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div
      className="min-h-screen p-4 md:p-8"
      style={{ background: COLORS.background }}
    >
      <div className="max-w-7xl mx-auto xl:max-w-[1440px] 2xl:max-w-[1720px] ">
        <Link
          to="/admin/dashboard"
          className="inline-block mb-4 text-sm font-semibold"
          style={{ color: COLORS.accent }}
        >
          &larr; Go Back to Admin Dashboard
        </Link>
        <h1
          className="text-lg md:text-4xl font-bold mb-8 text-center"
          style={{ color: COLORS.primary }}
        >
          Manage Users
        </h1>

        {loading === 'pending' && (
          <div className="text-center" style={{ color: COLORS.text }}>
            Loading users...
          </div>
        )}
        {error && (
          <div className="text-center text-red-600">Error: {error}</div>
        )}
        {loading === 'succeeded' && (
          <div className="bg-white shadow-xl rounded-xl overflow-hidden border" style={{borderColor: COLORS.accent}}>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y" style={{divideColor: COLORS.background}}>
                <thead style={{ background: COLORS.background }}>
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider" style={{color: COLORS.primary}}>
                      User ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider" style={{color: COLORS.primary}}>
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider" style={{color: COLORS.primary}}>
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider" style={{color: COLORS.primary}}>
                      Admin
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y" style={{divideColor: COLORS.background, color: COLORS.text}}>

                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{user._id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {user.isAdmin ? (
                          <FiCheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <FiXCircle className="w-5 h-5 text-red-600" />
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          style={{ color: COLORS.secondary }}
                          className="hover:text-primary transition"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


