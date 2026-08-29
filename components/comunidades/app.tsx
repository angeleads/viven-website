import { CircleCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function App() {
    const t = await getTranslations("comunidades.app");

    return (
        <section className="py-10">
            <div className="container mx-auto px-6 space-y-10 lg:flex lg:flex-row lg:items-center lg:justify-between">

                <img src="/phone.png" alt="App de Viven" className="w-full h-96 object-cover mx-auto md:w-1/2 md:h-auto" />

                <div className="flex-1 space-y-5">
                    <p className="uppercase text-red-700 tracking-widest">{t("eyebrow")}</p>
                    <h1 className="text-4xl text-blue-900 font-semibold mt-4">{t("title")}</h1>

                    <p className="text-neutral-500 my-3">{t("description")}</p>

                    <div className="my-3 space-y-3">
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">{t("features.0")}</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">{t("features.1")}</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">{t("features.2")}</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">{t("features.3")}</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">{t("features.4")}</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">{t("features.5")}</span>
                        </div>
                    </div>



                </div>

            </div>

        </section>
    );
}