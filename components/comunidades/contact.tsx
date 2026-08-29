import { Clock, Phone, Smartphone, Watch } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function Contact() {
    const t = await getTranslations("comunidades.contact");

    return (
        <section className="py-10 bg-gradient-to-r from-blue-600  to-blue-800">
            <div className="container mx-auto px-6 space-y-10 lg:flex lg:flex-row lg:items-center lg:justify-between">

                <div className="flex-1 space-y-5">
                    <div className="bg-white/20 rounded-full py-2 px-5  flex flex-row items-center gap-x-1 w-fit">
                        <Clock className="text-white" size={16} />
                        <p className="text-white text-sm">{t("badge")}</p>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-bold text-white">{t("titleStart")}
                        <br />
                        <span className="text-red-500 font-semibold">{t("titleHighlight")}</span>
                    </h2>

                    <p className="text-white">{t("description")}</p>

                    <div className="space-y-2">
                        <a href="tel:930267436" className="flex items-center gap-x-2 bg-white rounded-full py-3 px-5 w-fit">
                            <Phone className="text-blue-800" size={20} />
                            <span className="text-blue-800 text-md">930 267 436</span>
                        </a>

                        <a href="https://wa.me/34611770959" className="flex items-center gap-x-2 bg-green-400 rounded-full py-3 px-5 w-fit">
                            <Smartphone className="text-white" size={20} />
                            <span className="text-white text-md">{t("whatsapp")}</span>
                        </a>
                    </div>
                </div>

                <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-x-4">
                        <div className="bg-white/20 rounded-xl p-6 flex-1 text-center border border-white/30">
                            <p className="text-white">{t("issues.0")}</p>
                        </div>
                        <div className="bg-white/20 rounded-xl p-6 flex-1 text-center border border-white/30">
                            <p className="text-white">{t("issues.1")}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-4">
                        <div className="bg-white/20 rounded-xl p-6 flex-1 text-center border border-white/30">
                            <p className="text-white">{t("issues.2")}</p>
                        </div>
                        <div className="bg-white/20 rounded-xl p-6 flex-1 text-center border border-white/30">
                            <p className="text-white">{t("issues.3")}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-4">
                        <div className="bg-white/20 rounded-xl p-6 flex-1 text-center border border-white/30">
                            <p className="text-white">{t("issues.4")}</p>
                        </div>
                        <div className="bg-white/20 rounded-xl p-6 flex-1 text-center border border-white/30">
                            <p className="text-white">{t("issues.5")}</p>
                        </div>
                    </div>
                </div>

            </div>

        </section>
    );
}
