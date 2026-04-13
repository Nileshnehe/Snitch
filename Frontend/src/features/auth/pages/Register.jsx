import { useState } from "react"
import { useAuth } from "../hook/useAuth"
import { useNavigate } from "react-router"


const Register = () => {

    const { handleRegister } = useAuth()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        fullName: '',
        contactNumber: '',
        email: '',
        password: '',
        isSeller: false
    });

    const handleChange = (e) => {
        console.log(formData)
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await handleRegister({
            email: formData.email,
            contactNumber: formData.contactNumber,
            password: formData.password,
            isSeller: formData.isSeller,
            fullname: formData.fullName
        })
        
        navigate("/")
    };

    return (
        <div className="min-h-screen bg-[#0e0e0e] text-[#e5e2e1] font-sans selection:bg-[#FFD700] selection:text-[#131313] flex flex-col lg:flex-row">
            {/* Split Screen - Left Image Section (Hidden on mobile, visible on lg screens) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#131313] items-center justify-center overflow-hidden border-r border-[#1c1b1b]">
                <img
                    src="https://images.unsplash.com/photo-1688685567160-9c04fe1edf66?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Snitch Fashion Editorial"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity hover:scale-105 transition-transform duration-[20s] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent opacity-90"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e]/50 via-transparent to-[#0e0e0e] opacity-90"></div>
                <div className="relative z-10 p-16 flex flex-col h-full justify-between w-full max-w-2xl">
                    <h2 className="text-[#FFD700] text-xl font-bold tracking-widest uppercase">Snitch.</h2>
                    <div className="mt-auto">
                        <p className="text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] text-white mb-6">
                            Define your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e9c400] to-[#ffd700]">aesthetic.</span>
                        </p>
                        <p className="text-[#d0c6ab] max-w-md text-lg leading-relaxed">
                            Join the exclusive movement of creators and brands redefining the modern fashion landscape.
                        </p>
                    </div>
                </div>
            </div>

            {/* Split Screen - Right Form Section - FIXED NO SCROLL */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-16 h-screen lg:min-h-screen overflow-hidden">
                <div className="w-full max-w-md h-full lg:h-auto flex flex-col justify-center bg-[#131313] lg:bg-transparent p-6 sm:p-8 md:p-10 lg:p-6 rounded-2xl lg:rounded-none shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)] lg:shadow-none">
                    <div className="mb-6 sm:mb-8 flex-shrink-0">
                        <h2 className="text-xs sm:text-sm uppercase tracking-widest text-[#FFD700] font-medium mb-2 sm:mb-3">Welcome to Snitch</h2>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white leading-tight">Elevate Your Style</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5 flex-1">
                        {/* Full Name */}
                        <div className="flex flex-col">
                            <label className="text-xs sm:text-sm text-[#d0c6ab] mb-1 sm:mb-2 font-medium">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                className="bg-[#1c1b1b] lg:bg-[#0e0e0e] text-white border-b-2 border-[#4d4732] focus:border-[#FFD700] outline-none px-3 sm:px-4 py-2 sm:py-3 text-sm transition-colors duration-300 focus:bg-[#201f1f] lg:focus:bg-[#131313]"
                                placeholder="e.g. John Doe"
                            />
                        </div>

                        {/* Contact Number */}
                        <div className="flex flex-col">
                            <label className="text-xs sm:text-sm text-[#d0c6ab] mb-1 sm:mb-2 font-medium">Contact Number</label>
                            <input
                                type="tel"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                required
                                className="bg-[#1c1b1b] lg:bg-[#0e0e0e] text-white border-b-2 border-[#4d4732] focus:border-[#FFD700] outline-none px-3 sm:px-4 py-2 sm:py-3 text-sm transition-colors duration-300 focus:bg-[#201f1f] lg:focus:bg-[#131313]"
                                placeholder="+1 (555) 000-0000"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col">
                            <label className="text-xs sm:text-sm text-[#d0c6ab] mb-1 sm:mb-2 font-medium">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="bg-[#1c1b1b] lg:bg-[#0e0e0e] text-white border-b-2 border-[#4d4732] focus:border-[#FFD700] outline-none px-3 sm:px-4 py-2 sm:py-3 text-sm transition-colors duration-300 focus:bg-[#201f1f] lg:focus:bg-[#131313]"
                                placeholder="hello@example.com"
                            />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col">
                            <label className="text-xs sm:text-sm text-[#d0c6ab] mb-1 sm:mb-2 font-medium">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="bg-[#1c1b1b] lg:bg-[#0e0e0e] text-white border-b-2 border-[#4d4732] focus:border-[#FFD700] outline-none px-3 sm:px-4 py-2 sm:py-3 text-sm transition-colors duration-300 focus:bg-[#201f1f] lg:focus:bg-[#131313]"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Is Seller Checkbox */}
                        <div className="flex items-center gap-3 sm:gap-4 mt-1 sm:mt-2 group w-max cursor-pointer flex-shrink-0">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    name="isSeller"
                                    id="isSeller"
                                    checked={formData.isSeller}
                                    onChange={handleChange}
                                    className="peer appearance-none w-5 h-5 sm:w-6 sm:h-6 border border-[#4d4732] rounded bg-[#1c1b1b] lg:bg-[#0e0e0e] checked:bg-[#FFD700] checked:border-[#FFD700] cursor-pointer transition-colors duration-300 group-hover:border-[#FFD700]"
                                />
                                <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 pointer-events-none opacity-0 peer-checked:opacity-100 text-[#221b00]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                            <label htmlFor="isSeller" className="text-xs sm:text-sm text-[#e5e2e1] group-hover:text-[#FFD700] cursor-pointer select-none transition-colors duration-300">Register as Seller</label>
                        </div>

                        {/* Submit Button - Fixed position at bottom */}
                        <div className="mt-auto flex flex-col gap-3 sm:gap-4 pt-2 sm:pt-4">
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-[#e9c400] to-[#ffd700] text-[#131313] font-bold tracking-wide py-3 sm:py-4 px-6 sm:px-8 rounded text-sm sm:text-base hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex-shrink-0"
                            >
                                Sign Up
                            </button>

                            <div className="text-center flex-shrink-0">
                                <a href="/login" className="text-xs sm:text-sm text-[#999077] hover:text-[#FFD700] transition-colors border-b border-transparent hover:border-[#FFD700] py-0.5 block">
                                    Already have an account? Sign in
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register