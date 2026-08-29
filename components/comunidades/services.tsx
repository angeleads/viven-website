import { Building, Building2, CircleCheck, Hammer, House, Scale, TriangleAlert, Wallet } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function Services() {
    const t = await getTranslations("comunidades.services");

  return (
    <section className="py-10">
        <div className="container mx-auto px-6">
                        <p className="uppercase text-red-700 tracking-widest">{t("eyebrow")}</p>
                        <h1 className="text-4xl text-blue-900 font-semibold mt-4">{t("title")}</h1>

                        <p className="text-neutral-500 my-3">{t("description")}</p>

            <div className="lg:grid-cols-3 lg:gap-x-6 mt-10 grid grid-cols-1 gap-y-6">
                <div className="bg-white shadow rounded-xl p-6">
                    <div className="bg-blue-900 w-fit p-3 rounded-xl">
                        <Building2 className="text-white" size={24} />
                    </div>
                    <h2 className="text-2xl font-semibold mt-4">{t("cards.communityManagement.title")}</h2>
                    <div className="my-3 space-y-3">
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">{t("cards.communityManagement.items.0")}</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">{t("cards.communityManagement.items.1")}</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">{t("cards.communityManagement.items.2")}</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">{t("cards.communityManagement.items.3")}</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">{t("cards.communityManagement.items.4")}</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">{t("cards.communityManagement.items.5")}</span>
                        </div>
                    </div>
                    
                    
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    <div className="bg-blue-900 w-fit p-3 rounded-xl">
                        <House className="text-white" size={24} />
                    </div>
                    <h2 className="text-2xl font-semibold mt-4">{t("cards.realEstateManagement.title")}</h2>
                    <div className="my-3 space-y-3">
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">{t("cards.realEstateManagement.items.0")}</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">{t("cards.realEstateManagement.items.1")}</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">{t("cards.realEstateManagement.items.2")}</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">{t("cards.realEstateManagement.items.3")}</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">{t("cards.realEstateManagement.items.4")}</span>
                        </div>
                    </div>
                    
                    
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    <div className="bg-blue-900 w-fit p-3 rounded-xl">
                        <Hammer className="text-white" size={24} />
                    </div>
                    <h2 className="text-2xl font-semibold mt-4">{t("cards.newConstructionServices.title")}</h2>
                    <div className="my-3 space-y-3">
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">{t("cards.newConstructionServices.items.0")}</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">{t("cards.newConstructionServices.items.1")}</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">{t("cards.newConstructionServices.items.2")}</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">{t("cards.newConstructionServices.items.3")}</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">{t("cards.newConstructionServices.items.4")}</span>
                        </div>
                    </div>
                    
                    
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    <div className="bg-blue-900 w-fit p-3 rounded-xl">
                        <Scale className="text-white" size={24} />
                    </div>
                    <h2 className="text-2xl font-semibold mt-4">{t("cards.legalAdvice.title")}</h2>
                    <div className="my-3 space-y-3">
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">{t("cards.legalAdvice.items.0")}</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">{t("cards.legalAdvice.items.1")}</span>
                        </div>
                    </div>
                    
                    
                </div>
                <div className="bg-white shadow rounded-xl p-6">
                    <div className="bg-blue-900 w-fit p-3 rounded-xl">
                        <Wallet className="text-white" size={24} />
                    </div>
                    <h2 className="text-2xl font-semibold mt-4">{t("cards.budgetControl.title")}</h2>
                    <div className="my-3 space-y-3">
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">{t("cards.budgetControl.items.0")}</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">{t("cards.budgetControl.items.1")}</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">{t("cards.budgetControl.items.2")}</span>
                        </div>
                    </div>
                    
                    
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    <div className="bg-blue-900 w-fit p-3 rounded-xl">
                        <TriangleAlert className="text-white" size={24} />
                    </div>
                    <h2 className="text-2xl font-semibold mt-4">{t("cards.incidentControl.title")}</h2>
                    <div className="my-3 space-y-3">
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">{t("cards.incidentControl.items.0")}</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">{t("cards.incidentControl.items.1")}</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">{t("cards.incidentControl.items.2")}</span>
                        </div>
                    </div>
                    
                    
                </div>
            </div>

            
        </div>
      
    </section>
  );
}
