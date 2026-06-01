import { Clock, Phone, Smartphone, Watch } from "lucide-react";

export default function Contact() {
    return (
        <section className="py-10 bg-gradient-to-r from-blue-600  to-blue-800">
            <div className="container mx-auto px-6 space-y-10 lg:flex lg:flex-row lg:items-center lg:justify-between">

                <div className="flex-1 space-y-5">
                    <div className="bg-white/20 rounded-full py-2 px-5  flex flex-row items-center gap-x-1 w-fit">
                        <Clock className="text-white" size={16} />
                        <p className="text-white text-sm">24H · 365 DÍAS</p>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-bold text-white">Los problemas no tienen horario.
                        <br />
                        <span className="text-red-500 font-semibold">Nosotros tampoco</span>
                    </h2>

                    <p className="text-white">Atención telefónica las 24 horas, los 365 días del año. Cualquier urgencia será atendida por personal cualificado, con respuesta y solución en menos de 4 horas.</p>

                    <div className="space-y-2">
                        <a href="tel:930267436" className="flex items-center gap-x-2 bg-white rounded-full py-3 px-5 w-fit">
                            <Phone className="text-blue-800" size={20} />
                            <span className="text-blue-800 text-md">930 267 436</span>
                        </a>

                        <a href="https://wa.me/34611770959" className="flex items-center gap-x-2 bg-green-400 rounded-full py-3 px-5 w-fit">
                            <Smartphone className="text-white" size={20} />
                            <span className="text-white text-md">WhatsApp urgencias</span>
                        </a>
                    </div>
                </div>

                <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-x-4">
                        <div className="bg-white/20 rounded-xl p-6 flex-1 text-center border border-white/30">
                            <p className="text-white">Fugas de agua</p>
                        </div>
                        <div className="bg-white/20 rounded-xl p-6 flex-1 text-center border border-white/30">
                            <p className="text-white">Cortes eléctricos</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-4">
                        <div className="bg-white/20 rounded-xl p-6 flex-1 text-center border border-white/30">
                            <p className="text-white">Cerrajería</p>
                        </div>
                        <div className="bg-white/20 rounded-xl p-6 flex-1 text-center border border-white/30">
                            <p className="text-white">Ascensores</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-4">
                        <div className="bg-white/20 rounded-xl p-6 flex-1 text-center border border-white/30">
                            <p className="text-white">Climatización</p>
                        </div>
                        <div className="bg-white/20 rounded-xl p-6 flex-1 text-center border border-white/30">
                            <p className="text-white">Seguridad</p>
                        </div>
                    </div>
                </div>

            </div>

        </section>
    );
}
