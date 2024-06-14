import { IoIosArrowBack } from "react-icons/io"
import { useTranslation } from "react-i18next"
const BackHome = () => {
    const { t } = useTranslation()
    return (
        <div>
            <button className="flex items-center underline decoration-1">
                <IoIosArrowBack />
                {t('home')}
            </button>
        </div>
    )
}

export default BackHome