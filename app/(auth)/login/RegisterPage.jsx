"use client";
import InputField from "@/app/components/InputField";
import { useState } from "react";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        phone: "",
        dob: "",
        pan_number: "",
        adhaar_number: "",
        address: ""
    });

    const [loading, setLoading] = useState(false);

    // Dynamic handler to update state based on field name
    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Registration failed");

            alert("Account created successfully!");
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black py-12 px-4">
            <div className="w-full max-w-2xl p-8 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl">
                <form onSubmit={handleRegister} className="flex flex-col gap-6">
                    <div className="text-center">
                        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
                            Create Account
                        </h1>
                        <p className="text-gray-400 text-sm mt-2">Join us by filling out the details below</p>
                    </div>

                    {/* Form Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField placeholder="First Name" type="text" inputValue={(v) => updateField('first_name', v)} />
                        <InputField placeholder="Last Name" type="text" inputValue={(v) => updateField('last_name', v)} />
                        
                        <div className="md:col-span-2">
                            <InputField placeholder="Email Address" type="email" inputValue={(v) => updateField('email', v)} />
                        </div>

                        <InputField placeholder="Password" type="password" inputValue={(v) => updateField('password', v)} />
                        <InputField placeholder="Phone Number" type="tel" inputValue={(v) => updateField('phone', v)} />

                        <InputField placeholder="Date of Birth" type="date" inputValue={(v) => updateField('dob', v)} />
                        <InputField placeholder="PAN Number" type="text" inputValue={(v) => updateField('pan_number', v)} />

                        <div className="md:col-span-2">
                            <InputField placeholder="Aadhaar Number" type="text" inputValue={(v) => updateField('adhaar_number', v)} />
                        </div>

                        <div className="md:col-span-2">
                            <InputField placeholder="Full Address" type="text" inputValue={(v) => updateField('address', v)} />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-purple-500 text-white font-bold rounded-xl transition-all hover:bg-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] active:scale-[0.98] disabled:opacity-50"
                    >
                        {loading ? "Creating Account..." : "Register Now"}
                    </button>

                    <p className="text-center text-sm text-gray-400">
                        Already have an account? <a href="/login" className="text-purple-400 hover:underline">Log in</a>
                    </p>
                </form>
            </div>
        </div>
    );
}