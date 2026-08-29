import { getTranslations } from "next-intl/server";

export default async function Percentages() {
    const t = await getTranslations("comunidades.percentages");

  return (
    <section className="py-10">
        <div className="container mx-auto px-6 space-y-10 lg:flex lg:flex-row lg:items-center lg:justify-center lg:gap-x-20">

            <div className="mx-auto">
                <p className="text-center font-semibold text-red-700 text-4xl">99,9%</p>
                <p className="text-center uppercase font-thin">{t("resolvedIncidents")}</p>
            </div>

            <div className="mx-auto">
                <p className="text-center font-semibold text-red-700 text-4xl">99,9%</p>
                <p className="text-center uppercase font-thin">{t("satisfiedClients")}</p>
            </div>


            <div className="mx-auto">
                <p className="text-center font-semibold text-red-700 text-4xl">99,9%</p>
                <p className="text-center uppercase font-thin">{t("successfulContracts")}</p>
            </div>

        </div>
      
    </section>
  );
}
