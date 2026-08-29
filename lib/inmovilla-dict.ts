export type SupportedLocale = "es" | "en" | "ca" | "fr";

export type PropertyCategory = "residential" | "commercial" | "land" | "garage_storage";

export const INMOVILLA_OPERATIONS: Record<number, Record<SupportedLocale, string>> = {
  1: { es: "Venta", en: "For sale", ca: "Venda", fr: "À vendre" },
  2: { es: "Alquiler", en: "Rent", ca: "Lloguer", fr: "À louer" },
  3: { es: "Traspaso", en: "Transfer", ca: "Traspàs", fr: "Cession" },
  4: { es: "Venta o Alquiler", en: "Sale or Rent", ca: "Venda o Lloguer", fr: "Vente ou Location" },
  5: { es: "Traspaso y Venta", en: "Transfer and Sale", ca: "Traspàs i Venda", fr: "Cession et Vente" },
  6: { es: "Traspaso y Alquiler", en: "Transfer and Rent", ca: "Traspàs i Lloguer", fr: "Cession et Location" },
  7: { es: "Traspaso, Venta o Alquiler", en: "Transfer, Sale or Rent", ca: "Traspàs, Venda o Lloguer", fr: "Cession, Vente ou Location" },
  9: { es: "Alquiler Vacacional", en: "Vacation Rental", ca: "Lloguer Vacacional", fr: "Location de vacances" },
  10: { es: "Permuta", en: "Barter", ca: "Permuta", fr: "Échange" },
  11: { es: "Nuda propiedad", en: "Bare ownership", ca: "Nua propietat", fr: "Nue-propriété" },
  13: { es: "Venta", en: "For sale", ca: "Venda", fr: "À vendre" },
  14: { es: "Venta en Rentabilidad", en: "Sale with Yield", ca: "Venda en Rendibilitat", fr: "Vente avec rentabilité" },
  15: { es: "Alquiler con Opción a Compra", en: "Rent to Own", ca: "Lloguer amb Opció a Compra", fr: "Location avec option d'achat" },
  16: { es: "Alquiler", en: "Rent", ca: "Lloguer", fr: "À louer" },
  17: { es: "Combinada", en: "Combined", ca: "Combinada", fr: "Combinée" },
  18: { es: "Traspaso", en: "Transfer", ca: "Traspàs", fr: "Cession" },
  19: { es: "Ocupado ilegalmente", en: "Illegally occupied", ca: "Ocupat il·legalment", fr: "Occupé illégalement" },
  20: { es: "Alquiler de Temporada", en: "Temporary rental", ca: "Lloguer de Temporada", fr: "Location saisonnière" },
};

export const INMOVILLA_PROPERTY_TYPES: Record<number, { category: PropertyCategory; names: Record<SupportedLocale, string> }> = {
  199: { category: "residential", names: { es: "Adosado", en: "Terraced house", ca: "Adossat", fr: "Maison mitoyenne" } },
  299: { category: "residential", names: { es: "Bungalow", en: "Bungalow", ca: "Bungalou", fr: "Bungalow" } },
  399: { category: "residential", names: { es: "Casa", en: "House", ca: "Casa", fr: "Maison" } },
  499: { category: "residential", names: { es: "Chalet", en: "Single family house / Villa", ca: "Xalet", fr: "Chalet / Villa" } },
  599: { category: "residential", names: { es: "Cortijo", en: "Farmhouse", ca: "Masia andalusa", fr: "Ferme" } },
  699: { category: "residential", names: { es: "Hacienda", en: "Ranch", ca: "Hisenda", fr: "Propriété" } },
  799: { category: "residential", names: { es: "Inmueble singular", en: "Unique property", ca: "Immoble singular", fr: "Propriété singulière" } },
  899: { category: "residential", names: { es: "Masía", en: "Farmhouse / Masia", ca: "Masia", fr: "Mas provençal" } },
  999: { category: "residential", names: { es: "Pareado", en: "Semi-detached house", ca: "Parellat", fr: "Maison jumelée" } },
  1099: { category: "residential", names: { es: "Torre", en: "Tower house", ca: "Torre", fr: "Tour / Villa" } },
  1199: { category: "commercial", names: { es: "Despacho", en: "Office", ca: "Despatx", fr: "Cabinet / Bureau" } },
  1299: { category: "commercial", names: { es: "Local comercial", en: "Commercial Premise", ca: "Local comercial", fr: "Local commercial" } },
  1399: { category: "commercial", names: { es: "Oficina", en: "Office", ca: "Oficina", fr: "Bureau" } },
  1499: { category: "commercial", names: { es: "Albergue", en: "Hostel", ca: "Alberg", fr: "Auberge" } },
  1599: { category: "commercial", names: { es: "Almacén", en: "Warehouse", ca: "Magatzem", fr: "Entrepôt" } },
  1699: { category: "commercial", names: { es: "Edificio", en: "Building", ca: "Edifici", fr: "Immeuble" } },
  1799: { category: "commercial", names: { es: "Fábrica", en: "Factory", ca: "Fàbrica", fr: "Usine" } },
  1899: { category: "commercial", names: { es: "Hostal", en: "Hostel", ca: "Hostal", fr: "Hôtel modeste" } },
  1999: { category: "commercial", names: { es: "Hotel", en: "Hotel", ca: "Hotel", fr: "Hôtel" } },
  2099: { category: "commercial", names: { es: "Nave industrial", en: "Industrial Unit", ca: "Nau industrial", fr: "Bâtiment industriel" } },
  2199: { category: "commercial", names: { es: "Amarre", en: "Boat mooring", ca: "Amarrador", fr: "Anneau d'amarrage" } },
  2299: { category: "commercial", names: { es: "Bodega", en: "Cellar / Winery", ca: "Celler", fr: "Cave à vin" } },
  2399: { category: "garage_storage", names: { es: "Garaje", en: "Garage", ca: "Garatge", fr: "Garage" } },
  2499: { category: "commercial", names: { es: "Lagar", en: "Winery", ca: "Trull", fr: "Pressoir" } },
  2599: { category: "garage_storage", names: { es: "Parking", en: "Parking space", ca: "Aparcament", fr: "Parking" } },
  2699: { category: "garage_storage", names: { es: "Trastero", en: "Storage room", ca: "Traster", fr: "Débarras / Box" } },
  2799: { category: "residential", names: { es: "Apartamento", en: "Apartment", ca: "Apartament", fr: "Appartement" } },
  2899: { category: "residential", names: { es: "Ático", en: "Penthouse", ca: "Àtic", fr: "Attique / Penthouse" } },
  2999: { category: "residential", names: { es: "Dúplex", en: "Duplex", ca: "Dúplex", fr: "Duplex" } },
  3099: { category: "residential", names: { es: "Estudio", en: "Studio", ca: "Estudi", fr: "Studio" } },
  3199: { category: "residential", names: { es: "Habitación", en: "Room", ca: "Habitació", fr: "Chambre" } },
  3299: { category: "residential", names: { es: "Loft", en: "Loft", ca: "Loft", fr: "Loft" } },
  3399: { category: "residential", names: { es: "Piso", en: "Flat / Apartment", ca: "Pis", fr: "Appartement" } },
  3499: { category: "residential", names: { es: "Planta baja", en: "Ground floor apartment", ca: "Planta baixa", fr: "Rez-de-chaussée" } },
  3599: { category: "residential", names: { es: "Tríplex", en: "Triplex", ca: "Tríplex", fr: "Triplex" } },
  3699: { category: "land", names: { es: "Finca rústica", en: "Rustic property", ca: "Finca rústica", fr: "Propriété rustique" } },
  3799: { category: "land", names: { es: "Monte", en: "Mountain plot", ca: "Muntanya", fr: "Terrain de montagne" } },
  3899: { category: "land", names: { es: "Solar", en: "Building site", ca: "Solar", fr: "Terrain constructible" } },
  3999: { category: "land", names: { es: "Terreno industrial", en: "Industrial land", ca: "Terreny industrial", fr: "Terrain industriel" } },
  4099: { category: "land", names: { es: "Terreno rural", en: "Rural land", ca: "Terreny rural", fr: "Terrain rural" } },
  4199: { category: "land", names: { es: "Terreno urbano", en: "Urban plot", ca: "Terreny urbà", fr: "Terrain urbain" } },
  4399: { category: "residential", names: { es: "Ático Dúplex", en: "Duplex Penthouse", ca: "Àtic Dúplex", fr: "Attique Duplex" } },
  4499: { category: "commercial", names: { es: "Negocio", en: "Business", ca: "Negoci", fr: "Fonds de commerce" } },
  4599: { category: "residential", names: { es: "Casa de campo", en: "Country House", ca: "Casa de camp", fr: "Maison de campagne" } },
  4699: { category: "residential", names: { es: "Buhardilla", en: "Attic", ca: "Golfa", fr: "Combles / Grenier" } },
  4799: { category: "residential", names: { es: "Semiático", en: "Semi Attic", ca: "Semiàtic", fr: "Semi-attique" } },
  4899: { category: "residential", names: { es: "Entresuelo", en: "Mezzanine apartment", ca: "Entresòl", fr: "Entresol" } },
  4999: { category: "residential", names: { es: "Villa", en: "Villa", ca: "Vil·la", fr: "Villa" } },
  5099: { category: "land", names: { es: "Parcela", en: "Plot of land", ca: "Parcel·la", fr: "Parcelle" } },
  5199: { category: "residential", names: { es: "Quad", en: "Quad House", ca: "Quad", fr: "Maison quadruple" } },
  5299: { category: "garage_storage", names: { es: "Sótano", en: "Basement storage", ca: "Soterrani", fr: "Sous-sol" } },
  5399: { category: "commercial", names: { es: "Kiosko", en: "Kiosk", ca: "Quiosc", fr: "Kiosque" } },
  5499: { category: "residential", names: { es: "Bungalow Planta Alta", en: "Bungalow Top Floor", ca: "Bungalou Planta Alta", fr: "Bungalow étage" } },
  5699: { category: "residential", names: { es: "Castillo", en: "Castle", ca: "Castell", fr: "Château" } },
  5799: { category: "residential", names: { es: "Casa Cueva", en: "Cave house", ca: "Casa Cova", fr: "Maison troglodyte" } },
  5999: { category: "residential", names: { es: "Casa de madera", en: "Wooden House", ca: "Casa de fusta", fr: "Maison en bois" } },
  6099: { category: "residential", names: { es: "Caserío", en: "Country manor", ca: "Caseriu", fr: "Manoir" } },
  6199: { category: "residential", names: { es: "Casa Solar", en: "Solar house", ca: "Casa Solar", fr: "Maison noble" } },
  6299: { category: "residential", names: { es: "Casa de Pueblo", en: "Village house", ca: "Casa de Poble", fr: "Maison de village" } },
  6399: { category: "residential", names: { es: "Casita Agrícola", en: "Agricultural house", ca: "Caseta Agrícola", fr: "Cabanon agricole" } },
  6499: { category: "residential", names: { es: "Villa de Lujo", en: "Luxury Villa", ca: "Vil·la de Luxe", fr: "Villa de luxe" } },
  6599: { category: "residential", names: { es: "Casa Terrera", en: "Ground House", ca: "Casa Terrera", fr: "Maison de plain-pied" } },
  6699: { category: "residential", names: { es: "Pazo", en: "Pazo House", ca: "Pazo", fr: "Manoir galicien" } },
  6799: { category: "commercial", names: { es: "Camping", en: "Camping", ca: "Càmping", fr: "Camping" } },
  6899: { category: "residential", names: { es: "Casa de piedra", en: "Stone house", ca: "Casa de pedra", fr: "Maison en pierre" } },
  7099: { category: "residential", names: { es: "Cabaña", en: "Cabin", ca: "Cabana", fr: "Cabane / Chalet" } },
  7199: { category: "commercial", names: { es: "Cuadra", en: "Stable", ca: "Quadra", fr: "Écurie" } },
  7299: { category: "commercial", names: { es: "Pajar", en: "Barn", ca: "Paller", fr: "Grange" } },
  7399: { category: "commercial", names: { es: "Invernadero", en: "Greenhouse", ca: "Hivernacle", fr: "Serre" } },
  7499: { category: "residential", names: { es: "Bungalow Planta Baja", en: "Bungalow Ground Floor", ca: "Bungalou Planta Baixa", fr: "Bungalow rez-de-chaussée" } },
  7599: { category: "residential", names: { es: "Casa con terreno", en: "House with land", ca: "Casa amb terreny", fr: "Maison avec terrain" } },
  7699: { category: "commercial", names: { es: "Barraca", en: "Industrial building", ca: "Barraca", fr: "Bâtisse" } },
  7799: { category: "commercial", names: { es: "Bar", en: "Bar / Pub", ca: "Bar", fr: "Bar" } },
  7899: { category: "commercial", names: { es: "Restaurante", en: "Restaurant", ca: "Restaurant", fr: "Restaurant" } },
  7999: { category: "commercial", names: { es: "Cafetería", en: "Cafeteria / Coffee shop", ca: "Cafeteria", fr: "Cafétéria" } },
  8299: { category: "commercial", names: { es: "Discoteca", en: "Nightclub", ca: "Discoteca", fr: "Discothèque" } },
  8699: { category: "land", names: { es: "Olivar", en: "Olive grove", ca: "Oliverar", fr: "Oliveraie" } },
  8799: { category: "land", names: { es: "Tierra Calma", en: "Unseeded land", ca: "Terra Calma", fr: "Terre arable" } },
  8899: { category: "land", names: { es: "Huerta", en: "Orchard", ca: "Hort", fr: "Verger" } },
  8999: { category: "land", names: { es: "Viñedo", en: "Vineyard", ca: "Vinya", fr: "Vignoble" } },
  9099: { category: "land", names: { es: "Terreno urbanizable", en: "Buildable land", ca: "Terreny urbanitzable", fr: "Terrain constructible" } },
  9199: { category: "garage_storage", names: { es: "Parking de moto", en: "Motorcycle parking", ca: "Pàrquing de moto", fr: "Parking moto" } },
  9499: { category: "residential", names: { es: "Vivienda sobre almacén", en: "Housing above warehouse", ca: "Habitatge sobre magatzem", fr: "Logement sur entrepôt" } },
  9599: { category: "commercial", names: { es: "Complejo Turístico", en: "Holiday resort", ca: "Complex Turístic", fr: "Complexe touristique" } },
  9699: { category: "residential", names: { es: "Piso Único", en: "Single floor apartment", ca: "Pis Únic", fr: "Appartement seul à l'étage" } },
  9799: { category: "garage_storage", names: { es: "Nicho", en: "Niche", ca: "Nínxol", fr: "Caveau" } },
  9899: { category: "commercial", names: { es: "Pub", en: "Pub", ca: "Pub", fr: "Pub" } },
  9999: { category: "commercial", names: { es: "Molino", en: "Windmill", ca: "Molí", fr: "Moulin" } },
  10099: { category: "commercial", names: { es: "Merendero", en: "Picnic spot", ca: "Berenador", fr: "Aire de pique-nique" } },
  10199: { category: "commercial", names: { es: "Gasolinera", en: "Fuel station", ca: "Gasolinera", fr: "Station-service" } },
  10299: { category: "residential", names: { es: "Entreplanta", en: "Mezzanine", ca: "Entreplanta", fr: "Mezzanine" } },
  10399: { category: "commercial", names: { es: "Campo de Golf", en: "Golf course", ca: "Camp de Golf", fr: "Terrain de golf" } },
  10499: { category: "residential", names: { es: "Vivienda sobre Local", en: "Housing over shop", ca: "Habitatge sobre Local", fr: "Logement sur local" } },
  10799: { category: "residential", names: { es: "Semisótano", en: "Semi basement", ca: "Semisoterrani", fr: "Semi-sous-sol" } },
  10999: { category: "land", names: { es: "Terreno Rústico", en: "Rustic Land", ca: "Terreny Rústic", fr: "Terrain rustique" } },
  11099: { category: "land", names: { es: "Finca Agrícola", en: "Agricultural Farm", ca: "Finca Agrícola", fr: "Ferme agricole" } },
  11199: { category: "land", names: { es: "Finca Ganadera", en: "Livestock Farm", ca: "Finca Ramadera", fr: "Exploitation d'élevage" } },
  11299: { category: "land", names: { es: "Finca Cinegética", en: "Hunting Estate", ca: "Finca Cinegètica", fr: "Domaine de chasse" } },
  11399: { category: "land", names: { es: "Finca de Recreo", en: "Recreational property", ca: "Finca d'Esbarjo", fr: "Propriété d'agrément" } },
  11499: { category: "commercial", names: { es: "Almazara", en: "Oil mill", ca: "Almàssera", fr: "Moulin à huile" } },
  11599: { category: "commercial", names: { es: "Hotel Rural", en: "Rural hotel", ca: "Hotel Rural", fr: "Hôtel rural" } },
  11699: { category: "commercial", names: { es: "Casa Rural", en: "Rural house", ca: "Casa Rural", fr: "Gîte rural" } },
  11799: { category: "commercial", names: { es: "Nave logística", en: "Logistic storage", ca: "Nau logística", fr: "Plateforme logistique" } },
  11899: { category: "land", names: { es: "Finca con Huerto", en: "Farm with orchard", ca: "Finca amb Hort", fr: "Propriété avec potager" } },
  11999: { category: "commercial", names: { es: "Centro Comercial", en: "Shopping center", ca: "Centre Comercial", fr: "Centre commercial" } },
  20099: { category: "residential", names: { es: "Mansión", en: "Mansion", ca: "Mansió", fr: "Manoir / Demeure" } },
  20199: { category: "residential", names: { es: "Finca Mediterránea", en: "Mediterranean country house", ca: "Finca Mediterrània", fr: "Ferme méditerranéenne" } },
  20299: { category: "residential", names: { es: "Alquería", en: "Farmhouse", ca: "Alqueria", fr: "Bâtisse rurale" } },
  20399: { category: "land", names: { es: "Coto de Caza", en: "Hunting ground", ca: "Vedat de Caça", fr: "Chasse gardée" } },
  20499: { category: "residential", names: { es: "Riad", en: "Riad", ca: "Riad", fr: "Riad" } },
  20599: { category: "land", names: { es: "Finca Urbana", en: "Urban property", ca: "Finca Urbana", fr: "Propriété urbaine" } },
  20699: { category: "residential", names: { es: "Residencia", en: "Residence", ca: "Residència", fr: "Résidence" } },
  20899: { category: "land", names: { es: "Solar Plurifamiliar", en: "Multi-family plot", ca: "Solar Plurifamiliar", fr: "Terrain collectif" } },
  20999: { category: "residential", names: { es: "Sobreático", en: "Top-floor penthouse", ca: "Sobreàtic", fr: "Dernier étage avec terrasse" } },
  21199: { category: "residential", names: { es: "Casa Tipo Dúplex", en: "Duplex House", ca: "Casa Tipus Dúplex", fr: "Maison en duplex" } },
  21299: { category: "residential", names: { es: "Caserón", en: "Large manor", ca: "Caseró", fr: "Grande demeure" } },
  21399: { category: "residential", names: { es: "Palacio", en: "Palace", ca: "Palau", fr: "Palais" } },
};

export const INMOVILLA_ORIENTATIONS: Record<number, Record<SupportedLocale, string>> = {
  1: { es: "Norte", en: "North", ca: "Nord", fr: "Nord" },
  2: { es: "Sur", en: "South", ca: "Sud", fr: "Sud" },
  3: { es: "Este", en: "East", ca: "Est", fr: "Est" },
  4: { es: "Oeste", en: "West", ca: "Oest", fr: "Ouest" },
  5: { es: "Noroeste", en: "Northwest", ca: "Noroest", fr: "Nord-ouest" },
  6: { es: "Suroeste", en: "Southwest", ca: "Sudoest", fr: "Sud-ouest" },
  7: { es: "Este-Oeste", en: "East-West", ca: "Est-Oest", fr: "Est-Ouest" },
  8: { es: "Sureste", en: "Southeast", ca: "Sud-est", fr: "Sud-est" },
  9: { es: "Norte-Sur", en: "North-South", ca: "Nord-Sud", fr: "Nord-Sud" },
  10: { es: "Noreste", en: "Northeast", ca: "Nord-est", fr: "Nord-est" },
};

export const INMOVILLA_CONSERVATION: Record<number, Record<SupportedLocale, string>> = {
  0: { es: "Ninguno", en: "None", ca: "Cap", fr: "Aucun" },
  5: { es: "Para reformar", en: "To refurbish", ca: "Per a reformar", fr: "À rénover" },
  10: { es: "De origen", en: "From origin", ca: "D'origen", fr: "D'origine" },
  15: { es: "Reformar parcialmente", en: "Partially renovate", ca: "Reformar parcialment", fr: "Partiellement rénové" },
  20: { es: "Entrar a vivir", en: "Ready to move in", ca: "Per entrar a viure", fr: "Prêt à emménager" },
  30: { es: "Buen estado", en: "Good condition", ca: "Bon estat", fr: "Bon état" },
  40: { es: "Semireformado", en: "Semi-refurbished", ca: "Semireformat", fr: "Semi-rénové" },
  50: { es: "Reformado", en: "Refurbished", ca: "Reformat", fr: "Rénové" },
  60: { es: "Seminuevo", en: "Semi-new", ca: "Seminou", fr: "Presque neuf" },
  70: { es: "Nuevo", en: "New", ca: "Nou", fr: "Neuf" },
  80: { es: "Obra Nueva", en: "New Build", ca: "Obra Nova", fr: "Programme neuf" },
  90: { es: "En construcción", en: "Under construction", ca: "En construcció", fr: "En construction" },
  100: { es: "En proyecto", en: "Off-plan / Project", ca: "En projecte", fr: "En projet" },
};

export const INMOVILLA_HEATING: Record<number, Record<SupportedLocale, string>> = {
  1: { es: "Sin calefacción", en: "No heating", ca: "Sense calefacció", fr: "Sans chauffage" },
  2: { es: "Otra calefacción", en: "Other heating", ca: "Altra calefacció", fr: "Autre chauffage" },
  3: { es: "Carbón y leña", en: "Coal and wood", ca: "Carbó i llenya", fr: "Charbon et bois" },
  4: { es: "Gas propano", en: "Propane gas", ca: "Gas propà", fr: "Gaz propane" },
  5: { es: "Eléctrica", en: "Electric", ca: "Elèctrica", fr: "Électrique" },
  6: { es: "Acumuladores eléctricos", en: "Electric accumulators", ca: "Acumuladors elèctrics", fr: "Accumulateurs électriques" },
  7: { es: "Bomba de calor", en: "Heat pump", ca: "Bomba de calor", fr: "Pompe à chaleur" },
  8: { es: "Gasoil individual", en: "Individual oil heating", ca: "Gasoil individual", fr: "Fioul individuel" },
  9: { es: "Central", en: "Central", ca: "Central", fr: "Chauffage central" },
  10: { es: "Central con contador", en: "Central metered", ca: "Central amb comptador", fr: "Collectif avec compteur" },
  11: { es: "Gas natural", en: "Natural gas", ca: "Gas natural", fr: "Gaz naturel" },
  12: { es: "Suelo Radiante", en: "Underfloor heating", ca: "Terra radiant", fr: "Plancher chauffant" },
  13: { es: "Pellets", en: "Pellets", ca: "Pèl·lets", fr: "Granulés / Pellets" },
  14: { es: "Chimenea", en: "Fireplace", ca: "Xemeneia", fr: "Cheminée" },
  17: { es: "Aerotermia", en: "Aerothermal", ca: "Aerotèrmia", fr: "Aérothermie" },
  18: { es: "Geotermia", en: "Geothermal", ca: "Geotèrmia", fr: "Géothermie" },
  19: { es: "Radiadores", en: "Radiators", ca: "Radiadors", fr: "Radiateurs" },
  23: { es: "Por conducto", en: "Ducted A/C", ca: "Per conductes", fr: "Gaine / Conduit" },
  25: { es: "Split en pared", en: "Split A/C", ca: "Split a la paret", fr: "Split mural" },
  27: { es: "Gasoil", en: "Diesel oil", ca: "Gasoil", fr: "Fioul" },
  28: { es: "Placas Solares", en: "Solar panels", ca: "Plaques Solars", fr: "Panneaux solaires" },
};

export const INMOVILLA_FLOORS: Record<number, Record<SupportedLocale, string>> = {
  1: { es: "Mármol", en: "Marble", ca: "Màrmol", fr: "Marbre" },
  2: { es: "Tarima flotante", en: "Floating floor", ca: "Tarima flotant", fr: "Parquet flottant" },
  3: { es: "Parquet", en: "Parquet", ca: "Parquet", fr: "Parquet" },
  4: { es: "Granito", en: "Granite", ca: "Granit", fr: "Granit" },
  5: { es: "Cerámico", en: "Ceramic", ca: "Ceràmic", fr: "Céramique" },
  6: { es: "Porcelana", en: "Porcelain", ca: "Porcellana", fr: "Porcelaine" },
  7: { es: "Gres", en: "Stoneware / Gres", ca: "Gres", fr: "Grès" },
  8: { es: "Terrazo", en: "Terrazzo", ca: "Terratzo", fr: "Terrazzo" },
  9: { es: "Madera", en: "Wood", ca: "Fusta", fr: "Bois" },
  12: { es: "Hidráulico", en: "Hydraulic tile", ca: "Hidràulic", fr: "Carreaux de ciment" },
  14: { es: "Cemento", en: "Cement", ca: "Ciment", fr: "Ciment" },
  16: { es: "Hormigón", en: "Concrete", ca: "Formigó", fr: "Béton" },
  22: { es: "Tarima", en: "Solid Wood Floor", ca: "Tarima", fr: "Plancher en bois" },
  23: { es: "Gres porcelánico", en: "Porcelain stoneware", ca: "Gres porcellànic", fr: "Grès cérame" },
  24: { es: "Rústico", en: "Rustic tile", ca: "Rústic", fr: "Terre cuite rustique" },
  28: { es: "Vinilo", en: "Vinyl", ca: "Vinil", fr: "Vinyle" },
  29: { es: "Piedra", en: "Stone", ca: "Pedra", fr: "Pierre" },
  30: { es: "Laminado", en: "Laminate", ca: "Laminat", fr: "Stratifié" },
  34: { es: "Microcemento", en: "Microcement", ca: "Microciment", fr: "Béton ciré / Microciment" },
  35: { es: "Cemento Pulido", en: "Polished Concrete", ca: "Ciment Polit", fr: "Béton poli" },
};

export const INMOVILLA_KITCHENS: Record<number, Record<SupportedLocale, string>> = {
  1: { es: "Independiente", en: "Independent", ca: "Independent", fr: "Indépendante" },
  2: { es: "Exterior", en: "External", ca: "Exterior", fr: "Extérieure" },
  3: { es: "Americana", en: "American open kitchen", ca: "Americana", fr: "Américaine" },
  4: { es: "Salón-Cocina (Open Space)", en: "Open plan kitchen", ca: "Saló-Cuina", fr: "Cuisine ouverte" },
  5: { es: "Francesa", en: "French kitchen", ca: "Francesa", fr: "Française" },
  6: { es: "Cocina Office", en: "Eat-in kitchen (Office)", ca: "Cuina Office", fr: "Cuisine dînatoire" },
  7: { es: "Con isla", en: "With island", ca: "Amb illa", fr: "Avec îlot central" },
};

export const INMOVILLA_VIEWS: Record<number, Record<SupportedLocale, string>> = {
  1: { es: "Al mar", en: "Sea views", ca: "Al mar", fr: "Vue sur mer" },
  2: { es: "Montaña", en: "Mountain views", ca: "Muntanya", fr: "Vue montagne" },
  3: { es: "A la playa", en: "Beach views", ca: "A la platja", fr: "Vue plage" },
  5: { es: "Al parque", en: "Park views", ca: "Al parc", fr: "Vue sur parc" },
  6: { es: "Exterior", en: "Exterior", ca: "Exterior", fr: "Vue extérieure" },
  8: { es: "Avenida", en: "Avenue", ca: "Avinguda", fr: "Sur avenue" },
  9: { es: "Al jardín", en: "Garden views", ca: "Al jardí", fr: "Vue jardin" },
  10: { es: "A la calle", en: "Street view", ca: "Al carrer", fr: "Sur rue" },
  11: { es: "Al puerto", en: "Harbour views", ca: "Al port", fr: "Vue sur le port" },
  13: { es: "A la piscina", en: "Pool views", ca: "A la piscina", fr: "Vue piscine" },
  18: { es: "Despejadas", en: "Clear views", ca: "Degollades", fr: "Vue dégagée" },
  19: { es: "Panorámicas", en: "Panoramic views", ca: "Panoràmiques", fr: "Vue panoramique" },
  24: { es: "Al mar y montaña", en: "Sea and mountain views", ca: "Al mar i muntanya", fr: "Vue mer et montagne" },
};

export const INMOVILLA_EXT_CARPENTRY: Record<number, Record<SupportedLocale, string>> = {
  1: { es: "Aluminio", en: "Aluminum", ca: "Alumini", fr: "Aluminium" },
  2: { es: "Aluminio Lacado", en: "Lacquered aluminum", ca: "Alumini Lacat", fr: "Aluminium laqué" },
  3: { es: "PVC", en: "PVC", ca: "PVC", fr: "PVC" },
  4: { es: "Madera", en: "Wood", ca: "Fusta", fr: "Bois" },
  5: { es: "Hierro", en: "Iron", ca: "Ferro", fr: "Fer" },
  6: { es: "Climalit", en: "Climalit double-glazing", ca: "Climalit", fr: "Double vitrage Climalit" },
  7: { es: "Doble Cristal", en: "Double-glazed", ca: "Doble Vidre", fr: "Double vitrage" },
  8: { es: "Insonorizadas", en: "Soundproof", ca: "Insonoritzades", fr: "Insonorisées" },
  9: { es: "Aluminio / Climalit", en: "Aluminum / Climalit", ca: "Alumini / Climalit", fr: "Aluminium / Climalit" },
  10: { es: "Madera / Climalit", en: "Wood / Climalit", ca: "Fusta / Climalit", fr: "Bois / Climalit" },
  11: { es: "PVC / Climalit", en: "PVC / Climalit", ca: "PVC / Climalit", fr: "PVC / Climalit" },
  12: { es: "Aluminio-Madera", en: "Aluminum-Wood", ca: "Alumini-Fusta", fr: "Alu-Bois" },
  14: { es: "Aluminio Rotura Puente Térmico", en: "Thermal break aluminum", ca: "Alumini Trencament Pont Tèrmic", fr: "Alu rupture de pont thermique" },
  15: { es: "PVC Rotura Puente Térmico", en: "Thermal break PVC", ca: "PVC Trencament Pont Tèrmic", fr: "PVC rupture thermique" },
};

export const INMOVILLA_INT_CARPENTRY: Record<number, Record<SupportedLocale, string>> = {
  1: { es: "Aluminio", en: "Aluminum", ca: "Alumini", fr: "Aluminium" },
  2: { es: "Madera", en: "Wood", ca: "Fusta", fr: "Bois" },
  3: { es: "PVC", en: "PVC", ca: "PVC", fr: "PVC" },
  4: { es: "Pino", en: "Pine", ca: "Pi", fr: "Pin" },
  5: { es: "Haya", en: "Beech", ca: "Faig", fr: "Hêtre" },
  6: { es: "Roble", en: "Oak", ca: "Roure", fr: "Chêne" },
  11: { es: "Madera maciza", en: "Solid wood", ca: "Fusta massissa", fr: "Bois massif" },
  12: { es: "Lacado blanco", en: "White lacquered", ca: "Lacat blanc", fr: "Laqué blanc" },
  13: { es: "Cerezo", en: "Cherry tree", ca: "Cirerer", fr: "Cerisier" },
  14: { es: "Nogal", en: "Walnut", ca: "Noguera", fr: "Noyer" },
  19: { es: "Metálica", en: "Metallic", ca: "Metàl·lica", fr: "Métallique" },
};

export const INMOVILLA_COMMERCIAL_ACTIVITIES: Record<number, Record<SupportedLocale, string>> = {
  0: { es: "Actividad Comercial", en: "Commercial Activity", ca: "Activitat Comercial", fr: "Activité commerciale" },
  1: { es: "Hospedaje / B&B", en: "Bed & Breakfast", ca: "Hostalatge / B&B", fr: "Chambre d'hôtes" },
  2: { es: "Hotel", en: "Hotel", ca: "Hotel", fr: "Hôtel" },
  5: { es: "Bar", en: "Bar", ca: "Bar", fr: "Bar" },
  6: { es: "Bar de Cócteles", en: "Cocktail Bar", ca: "Bar de Còctels", fr: "Bar à cocktails" },
  7: { es: "Cafetería", en: "Coffee Shop", ca: "Cafeteria", fr: "Cafétéria" },
  8: { es: "Discoteca", en: "Nightclub", ca: "Discoteca", fr: "Club / Discothèque" },
  9: { es: "Pub", en: "Pub", ca: "Pub", fr: "Pub" },
  13: { es: "Pizzería", en: "Pizzeria", ca: "Pizzeria", fr: "Pizzeria" },
  14: { es: "Restaurante", en: "Restaurant", ca: "Restaurant", fr: "Restaurant" },
  15: { es: "Comida para llevar", en: "Take Away", ca: "Menjar per emportar", fr: "Plats à emporter" },
  17: { es: "Carnicería", en: "Butcher Shop", ca: "Carnisseria", fr: "Boucherie" },
  18: { es: "Frutería", en: "Fruit Shop", ca: "Fruiteria", fr: "Primeur / Fruits" },
  19: { es: "Heladería", en: "Ice Cream Shop", ca: "Gelateria", fr: "Glacier" },
  20: { es: "Panadería", en: "Bakery", ca: "Fleca / Forn de pa", fr: "Boulangerie" },
  21: { es: "Pastelería", en: "Pastry Shop", ca: "Pastisseria", fr: "Pâtisserie" },
  22: { es: "Supermercado", en: "Supermarket", ca: "Supermercat", fr: "Supermarché" },
  26: { es: "Estanco", en: "Tobacco Shop", ca: "Estanc", fr: "Bureau de tabac" },
  27: { es: "Farmacia", en: "Pharmacy", ca: "Farmàcia", fr: "Pharmacie" },
  28: { es: "Quiosco", en: "Newsstand", ca: "Quiosc", fr: "Kiosque presse" },
  41: { es: "Peluquería", en: "Hair Salon", ca: "Perruqueria", fr: "Salon de coiffure" },
  45: { es: "Agencia Inmobiliaria", en: "Real Estate Agency", ca: "Agència Immobiliària", fr: "Agence immobilière" },
  46: { es: "Clínica", en: "Clinic", ca: "Clínica", fr: "Clinique" },
  47: { es: "Taller Mecánico", en: "Repair Shop", ca: "Taller Mecànic", fr: "Atelier de réparation" },
  50: { es: "Almacén", en: "Storehouse", ca: "Magatzem", fr: "Entrepôt" },
};

export function normalizeLocale(locale?: string): SupportedLocale {
  if (!locale) return "es";
  const lower = locale.toLowerCase().slice(0, 2);
  if (lower === "ca") return "ca";
  if (lower === "en") return "en";
  if (lower === "fr") return "fr";
  return "es";
}

export function getPropertyCategory(keyTipo?: number | string | null): PropertyCategory {
  const num = Number(keyTipo);
  if (num && INMOVILLA_PROPERTY_TYPES[num]) {
    return INMOVILLA_PROPERTY_TYPES[num].category;
  }
  return "residential";
}

export function getPropertyTypeName(keyTipo?: number | string | null, fallback?: string, locale: SupportedLocale = "es"): string {
  const num = Number(keyTipo);
  if (num && INMOVILLA_PROPERTY_TYPES[num]) {
    return INMOVILLA_PROPERTY_TYPES[num].names[locale] || INMOVILLA_PROPERTY_TYPES[num].names.es;
  }
  return fallback || "Inmueble";
}

export function getOperationName(keyacci?: number | string | null, fallback?: string, locale: SupportedLocale = "es"): string {
  const num = Number(keyacci);
  if (num && INMOVILLA_OPERATIONS[num]) {
    return INMOVILLA_OPERATIONS[num][locale] || INMOVILLA_OPERATIONS[num].es;
  }
  return fallback || "Venta";
}

export function getOrientationName(keyori?: number | string | null, locale: SupportedLocale = "es"): string | null {
  const num = Number(keyori);
  if (num && INMOVILLA_ORIENTATIONS[num]) {
    return INMOVILLA_ORIENTATIONS[num][locale] || INMOVILLA_ORIENTATIONS[num].es;
  }
  return null;
}

export function getConservationName(conservacion?: number | string | null, fallback?: string, locale: SupportedLocale = "es"): string {
  const num = Number(conservacion);
  if (num !== undefined && num !== null && INMOVILLA_CONSERVATION[num]) {
    return INMOVILLA_CONSERVATION[num][locale] || INMOVILLA_CONSERVATION[num].es;
  }
  return fallback || "Buen estado";
}

export function getHeatingName(keycalefa?: number | string | null, locale: SupportedLocale = "es"): string | null {
  const num = Number(keycalefa);
  if (num && INMOVILLA_HEATING[num]) {
    return INMOVILLA_HEATING[num][locale] || INMOVILLA_HEATING[num].es;
  }
  return null;
}

export function getFloorTypeName(keysuelo?: number | string | null, locale: SupportedLocale = "es"): string | null {
  const num = Number(keysuelo);
  if (num && INMOVILLA_FLOORS[num]) {
    return INMOVILLA_FLOORS[num][locale] || INMOVILLA_FLOORS[num].es;
  }
  return null;
}

export function getKitchenTypeName(cocinaInde?: number | string | null, locale: SupportedLocale = "es"): string | null {
  const num = Number(cocinaInde);
  if (num && INMOVILLA_KITCHENS[num]) {
    return INMOVILLA_KITCHENS[num][locale] || INMOVILLA_KITCHENS[num].es;
  }
  return null;
}

export function getViewsName(keyvista?: number | string | null, locale: SupportedLocale = "es"): string | null {
  const num = Number(keyvista);
  if (num && INMOVILLA_VIEWS[num]) {
    return INMOVILLA_VIEWS[num][locale] || INMOVILLA_VIEWS[num].es;
  }
  return null;
}

export function getExtCarpentryName(keycarpinext?: number | string | null, locale: SupportedLocale = "es"): string | null {
  const num = Number(keycarpinext);
  if (num && INMOVILLA_EXT_CARPENTRY[num]) {
    return INMOVILLA_EXT_CARPENTRY[num][locale] || INMOVILLA_EXT_CARPENTRY[num].es;
  }
  return null;
}

export function getIntCarpentryName(keycarpin?: number | string | null, locale: SupportedLocale = "es"): string | null {
  const num = Number(keycarpin);
  if (num && INMOVILLA_INT_CARPENTRY[num]) {
    return INMOVILLA_INT_CARPENTRY[num][locale] || INMOVILLA_INT_CARPENTRY[num].es;
  }
  return null;
}

export function getCommercialActivityName(actividad?: number | string | null, locale: SupportedLocale = "es"): string | null {
  const num = Number(actividad);
  if (num !== undefined && num !== null && INMOVILLA_COMMERCIAL_ACTIVITIES[num]) {
    return INMOVILLA_COMMERCIAL_ACTIVITIES[num][locale] || INMOVILLA_COMMERCIAL_ACTIVITIES[num].es;
  }
  return null;
}

export const INMOVILLA_ENTORNO: Record<
  number,
  { key: string; names: Record<SupportedLocale, string> }
> = {
  0: { key: "arboles", names: { es: "Árboles", en: "Trees", ca: "Arbres", fr: "Arbres" } },
  1: { key: "hospitales", names: { es: "Hospitales", en: "Hospitals", ca: "Hospitals", fr: "Hôpitaux" } },
  2: { key: "tren", names: { es: "Tren", en: "Train", ca: "Tren", fr: "Gare / Train" } },
  3: { key: "metro", names: { es: "Metro", en: "Underground", ca: "Metro", fr: "Métro" } },
  4: { key: "golf", names: { es: "Golf", en: "Golf", ca: "Golf", fr: "Golf" } },
  5: { key: "montana", names: { es: "Montaña", en: "Mountain", ca: "Muntanya", fr: "Montagne" } },
  6: { key: "rural", names: { es: "Rural", en: "Rural", ca: "Rural", fr: "Rural" } },
  7: { key: "costa", names: { es: "Costa", en: "Coast", ca: "Costa", fr: "Côte" } },
  8: { key: "vallado", names: { es: "Vallado", en: "Fenced", ca: "Tancat", fr: "Clôturé" } },
  9: { key: "autobuses", names: { es: "Autobuses", en: "Buses", ca: "Autobusos", fr: "Bus" } },
  10: { key: "centros_comerciales", names: { es: "Centros comerciales", en: "Shopping centers", ca: "Centres comercials", fr: "Centres commerciaux" } },
  11: { key: "tranvia", names: { es: "Tranvía", en: "Tram", ca: "Tramvia", fr: "Tramway" } },
  12: { key: "zonasinfantiles", names: { es: "Zonas infantiles", en: "Kids Zone", ca: "Zones infantils", fr: "Aires de jeux" } },
  13: { key: "colegios", names: { es: "Colegios", en: "Schools", ca: "Escoles", fr: "Écoles" } },
  14: { key: "centrico", names: { es: "Céntrico", en: "Central", ca: "Cèntric", fr: "Centre-ville" } },
  15: { key: "centrosalud", names: { es: "Centros médicos", en: "Medical centers", ca: "Centres mèdics", fr: "Centres médicaux" } },
  16: { key: "zona_de_paso", names: { es: "Zona de paso", en: "Transit area", ca: "Zona de pas", fr: "Zone passante" } },
  17: { key: "parques", names: { es: "Parques / Zonas verdes", en: "Parks / Green areas", ca: "Parcs / Zones verdes", fr: "Parcs / Espaces verts" } },
  18: { key: "cerca_de_universidad", names: { es: "Cerca de Universidad", en: "Near University", ca: "A prop de la Universitat", fr: "Proche Université" } },
  19: { key: "supermercados", names: { es: "Supermercados", en: "Supermarket", ca: "Supermercats", fr: "Supermarchés" } },
  20: { key: "vigilancia_24", names: { es: "Vigilancia 24h", en: "24H surveillance", ca: "Vigilància 24h", fr: "Surveillance 24h" } },
};

export function parseXEntorno(raw: any, locale: SupportedLocale = "es"): Array<{ key: string; label: string }> {
  const result: Array<{ key: string; label: string }> = [];
  const addedKeys = new Set<string>();

  const addById = (id: number) => {
    const entry = INMOVILLA_ENTORNO[id];
    if (entry && !addedKeys.has(entry.key)) {
      addedKeys.add(entry.key);
      result.push({
        key: entry.key,
        label: entry.names[locale] || entry.names.es,
      });
    }
  };

  const xEntornoSource = raw?.x_entorno ?? raw?.xentorno ?? raw?.entorno;
  if (Array.isArray(xEntornoSource)) {
    for (const item of xEntornoSource) {
      if (typeof item === "number") addById(item);
      else if (typeof item === "string" && !isNaN(Number(item))) addById(Number(item));
      else if (item && typeof item === "object" && "id" in item) addById(Number(item.id));
    }
  } else if (typeof xEntornoSource === "string" && xEntornoSource.trim()) {
    const tokens = xEntornoSource.split(/[,;\s]+/);
    for (const token of tokens) {
      if (token && !isNaN(Number(token))) addById(Number(token));
    }
  }

  return result;
}
