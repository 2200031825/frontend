export default function InputField({ placeholder, type, inputValue }) {
    return (
        <div className="relative">
            <input
                type={type}
                placeholder={placeholder}
                onChange={(e) => inputValue(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                required
            />
        </div>
    );
}