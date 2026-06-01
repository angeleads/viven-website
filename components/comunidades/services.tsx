import { Building, Building2, CircleCheck, Hammer, House, Scale, TriangleAlert, Wallet } from "lucide-react";

export default function Services() {
  return (
    <section className="py-10">
        <div className="container mx-auto px-6">
            <p className="uppercase text-red-700 tracking-widest">Servicios</p>
            <h1 className="text-4xl text-blue-900 font-semibold mt-4">Una nueva forma de administrar su comunidad</h1>

            <p className="text-neutral-500 my-3">Entendemos las comunidades como pequeñas empresas que merecen un enfoque proactivo, cercano, eficiente y transparente.</p>

            <div className="lg:grid-cols-3 lg:gap-x-6 mt-10 grid grid-cols-1 gap-y-6">
                <div className="bg-white shadow rounded-xl p-6">
                    <div className="bg-blue-900 w-fit p-3 rounded-xl">
                        <Building2 className="text-white" size={24} />
                    </div>
                    <h2 className="text-2xl font-semibold mt-4">Gestión de comunidades</h2>
                    <div className="my-3 space-y-3">
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">Control de incidencias</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">Asesoramiento legal</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">Control presupuestario</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">Control de morosidad</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">Ahorro de costes</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">Gestión de subvenciones</span>
                        </div>
                    </div>
                    
                    
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    <div className="bg-blue-900 w-fit p-3 rounded-xl">
                        <House className="text-white" size={24} />
                    </div>
                    <h2 className="text-2xl font-semibold mt-4">Gestión inmobiliaria</h2>
                    <div className="my-3 space-y-3">
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">Compra y venta</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">Alquiler</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">Todo tipo de inmuebles</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">Inversores</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">Socimis</span>
                        </div>
                    </div>
                    
                    
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    <div className="bg-blue-900 w-fit p-3 rounded-xl">
                        <Hammer className="text-white" size={24} />
                    </div>
                    <h2 className="text-2xl font-semibold mt-4">Servicios de obra nueva</h2>
                    <div className="my-3 space-y-3">
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">Arquitectura</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">Certificaciones</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">Ejecución de obra nueva</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">Reformas</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">Constitución de comunidades</span>
                        </div>
                    </div>
                    
                    
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    <div className="bg-blue-900 w-fit p-3 rounded-xl">
                        <Scale className="text-white" size={24} />
                    </div>
                    <h2 className="text-2xl font-semibold mt-4">Asesoramiento legal</h2>
                    <div className="my-3 space-y-3">
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">Fiscal y jurídico</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">Defensa de intereses de la comunidad</span>
                        </div>
                    </div>
                    
                    
                </div>
                <div className="bg-white shadow rounded-xl p-6">
                    <div className="bg-blue-900 w-fit p-3 rounded-xl">
                        <Wallet className="text-white" size={24} />
                    </div>
                    <h2 className="text-2xl font-semibold mt-4">Control presupuestario</h2>
                    <div className="my-3 space-y-3">
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">Contabilidad transparente</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">Seguimiento de presupuestos</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">Control de desviaciones</span>
                        </div>
                    </div>
                    
                    
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    <div className="bg-blue-900 w-fit p-3 rounded-xl">
                        <TriangleAlert className="text-white" size={24} />
                    </div>
                    <h2 className="text-2xl font-semibold mt-4">Control de incidencias</h2>
                    <div className="my-3 space-y-3">
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">Mantenimiento preventivo</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">Proveedores certificados</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <CircleCheck className="text-green-500" size={20} />
                            <span className="text-neutral-500">Preservación del edificio</span>
                        </div>
                    </div>
                    
                    
                </div>
            </div>

            
        </div>
      
    </section>
  );
}
