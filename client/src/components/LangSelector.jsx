import { useTranslation } from "react-i18next";
import { vn, en } from '../assets/img'

const languages = [
    { code: "en", lang: "English" },
    { code: "vn", lang: "Vietnamese" }
]

const LangSelector = () => {
    const { i18n } = useTranslation()

    return (
        <div className="flex items-center gap-x-1">
            {languages.map((lng, index) => {
                const backgroundImage = index === 0 ? `url(${en})` : index === 1 ? `url(${vn})` : 'none'
                const isSelected = lng.code === i18n.language
                return (
                    <button
                        className={
                            `${isSelected ? "selected" : "opacity-55"} 
                            rounded-lg transition cursor-pointer 
                            px-4 py-4 hover:opacity-70
                            ${!isSelected ? "scale-60" : "scale-100"}
                            `
                        }
                        key={lng.code}
                        onClick={() => i18n.changeLanguage(lng.code)}
                        style={{
                            backgroundImage: backgroundImage,
                            backgroundSize: 'cover',
                            transform: `${!isSelected ? "scale(0.6)" : "scale(1)"}`,
                            transition: 'transform 0.3s ease',
                        }}
                    >
                    </button>)
            })}
        </div>
    );
}

export default LangSelector;