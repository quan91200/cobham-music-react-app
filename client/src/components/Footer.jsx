import { motion } from "framer-motion";
import { BtnSocial } from '../components'
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const Footer = () => {
    const { t } = useTranslation()

    return (
        <div>
            <motion.div className="flex items-top justify-between mx-20 my-5 py-10 border-t-2 shadow-inner px-4">
                <motion.div>
                    <h3 className="text-xl font-semibold">{t('company')}</h3>
                    <p className="cursor-pointer hover:underline">{t('About')}</p>
                    <p className="cursor-pointer hover:underline">{t('Jobs')}</p>
                    <p className="cursor-pointer hover:underline">{t('ftrecord')}</p>
                </motion.div>
                <motion.div>
                    <h3 className="text-xl font-semibold">{t('communities')}</h3>
                    <p className="cursor-pointer hover:underline">{t('forartists')}</p>
                    <p className="cursor-pointer hover:underline">{t('dev')}</p>
                    <p className="cursor-pointer hover:underline">{t('adver')}</p>
                </motion.div>
                <motion.div>
                    <h3 className="text-xl font-semibold">{t('uselink')}</h3>
                    <p className="cursor-pointer hover:underline">{t('sp')}</p>
                    <p className="cursor-pointer hover:underline">{t('freeapp')}</p>
                </motion.div>
                <motion.div>
                    <h3 className="text-xl font-semibold">{t('CobhamMusicPlans')}</h3>
                    <p className="cursor-pointer hover:underline"><NavLink to={"/plans"}>Premium Individual</NavLink></p>
                    <p className="cursor-pointer hover:underline"><NavLink to={"/plans"}>Premium Student</NavLink></p>
                    <p className="cursor-pointer hover:underline"><NavLink to={"/plans"}>Cobham Music Free</NavLink></p>
                </motion.div>
                <motion.div>
                    <BtnSocial />
                </motion.div>
            </motion.div>
            <div className="flex items-center mx-20 pt-10 border-t-2 px-2 pb-40 shadow-inner">
                <div className="flex items-center gap-x-5">
                    <p className="opacity-75 hover:font-semibold cursor-pointer">{t('legal')}</p>
                    <p className="opacity-75 hover:font-semibold cursor-pointer">{t('safety')}</p>
                    <p className="opacity-75 hover:font-semibold cursor-pointer">{t('policy')}</p>
                    <p className="opacity-75 hover:font-semibold cursor-pointer">{t('cookie')}</p>
                    <p className="opacity-75 hover:font-semibold cursor-pointer">{t('aads')}</p>
                    <p className="opacity-75 hover:font-semibold cursor-pointer">{t('acc')}</p>
                </div>
                <div className="flex ml-auto">&copy; 2024 Cobham MA</div>
            </div>
        </div>
    );
}

export default Footer;