import React from 'react';
import { useForm } from 'react-hook-form';

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        console.log('Signup Data:', data);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Sign Up</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Full Name Field */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 
                ${errors.fullname ? 'border-red-500' : 'border-gray-300'}`}
                            {...register('fullname', {
                                required: 'Full name is required',
                                minLength: {
                                    value: 3,
                                    message: 'Full name must be at least 3 characters'
                                }
                            })}
                        />
                        {errors.fullname && (
                            <p className="text-red-500 text-sm mt-1">{errors.fullname.message}</p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 
                ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Invalid email format'
                                }
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Password</label>
                        <input
                            type="password"
                            placeholder="Create a password"
                            className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 
                ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters'
                                }
                            })}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-300"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
