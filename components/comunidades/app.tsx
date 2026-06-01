import { CircleCheck } from "lucide-react";

export default function App() {
    return (
        <section className="py-10">
            <div className="container mx-auto px-6 space-y-10 lg:flex lg:flex-row lg:items-center lg:justify-between">

                <img src="/phone.png" alt="App de Viven" className="w-full h-96 object-cover mx-auto md:w-1/2 md:h-auto" />

                <div className="flex-1 space-y-5">
                    <p className="uppercase text-red-700 tracking-widest">Viven +Plus app</p>
                    <h1 className="text-4xl text-blue-900 font-semibold mt-4">Su comunidad en la palma de la mano.</h1>

                    <p className="text-neutral-500 my-3">Nuestra app permite a propietarios, administradores y operarios coordinar cada movimiento. La excelencia es nuestro estándar.</p>

                    <div className="my-3 space-y-3">
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">Gestionar incidencias</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">Consultar últimas actas</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">Comprobar recibos</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">Verificar derramas</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">Saldo bancario</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">Aprobar pagos (Presidente)</span>
                        </div>
                    </div>



                </div>

            </div>

        </section>
    );
}