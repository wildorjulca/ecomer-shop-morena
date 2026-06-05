
interface Distrito {
    nombre: string;
}

interface Provincia {
    nombre: string;
    distritos: string[];
}

interface SeedCountries {
    departamento: string;
    provincias: Provincia[];
}

export const initialCountrie: SeedCountries[] = [
    {
        departamento: "Amazonas",
        provincias: [
            { nombre: "Chachapoyas", distritos: ["Chachapoyas", "Asunción", "Balsas", "Cheto", "Chiliquin", "Chuquibamba", "Granada", "Huancas", "La Jalca", "Leimebamba", "Levanto", "Magdalena", "Mariscal Castilla", "Molinopampa", "Montevideo", "Olleros", "Quinjalca", "San Francisco de Daguas", "San Isidro de Maino", "Soloco", "Sonche"] },
            { nombre: "Bagua", distritos: ["Bagua", "Cajaruro", "El Parco", "Imaza", "La Peca", "Yamón"] },
            { nombre: "Bongará", distritos: ["Chisquilla", "Churuja", "Cuispes", "Florida", "Jazán", "Jumbilla", "Recta", "San Carlos", "San Francisco de Yeso", "San Luis", "Valera", "Yambrasbamba"] },
            { nombre: "Condorcanqui", distritos: ["Nieva", "El Cenepa", "Río Santiago"] },
            { nombre: "Luya", distritos: ["Luya", "Cocabamba", "San Cristóbal", "Camporredondo", "Conila", "Inguilpata", "Lamuya", "Longuita", "Lonya Chico", "María", "Ocalli", "Ocumal", "Pisuquia", "Providencia", "San Juan de Lopecancha", "Santa Catalina", "Santo Tomás", "Tingo", "Trita"] },
            { nombre: "Rodríguez de Mendoza", distritos: ["Mendoza", "Cochamal", "Chirimoto", "Huambo", "Limabamba", "Longar", "Mariscal Benavides", "Milpuc", "Omia", "San Nicolás", "Santa Rosa", "Totora", "Vista Alegre"] },
            { nombre: "Utcubamba", distritos: ["Bagua Grande", "Cajaruro", "El Milagro", "Jamalca", "Lonya Grande", "Yamon"] }
        ]
    },
    {
        departamento: "Áncash",
        provincias: [
            { nombre: "Huaraz", distritos: ["Huaraz", "Independencia", "Jangas", "La Libertad", "Olleros", "Pampas", "Pariacoto", "Pira", "Tarica"] },
            { nombre: "Aija", distritos: ["Aija", "Coris", "Huacllán", "La Merced", "Succha"] },
            { nombre: "Antonio Raymondi", distritos: ["Chacas", "Aczo", "San Juan de Rontoy", "Santiago de Chilcas"] },
            { nombre: "Asunción", distritos: ["Chacas", "Acochaca"] },
            { nombre: "Bolognesi", distritos: ["Chiquián", "Abelardo Pardo Lezameta", "Antonio Raymondi", "Aquia", "Cajacay", "Canis", "Colquioc", "Huallanca", "Huasta", "Huayllacayán", "La Primavera", "Mangas", "Pacllón", "San Miguel de Corpanqui", "Ticllos"] },
            { nombre: "Carhuaz", distritos: ["Carhuaz", "Acopampa", "Amashca", "Anta", "Ataquero", "Marcará", "Pariahuanca", "San Miguel de Aco", "Shilla", "Tinco", "Yungar"] },
            { nombre: "Carlos Fermín Fitzcarrald", distritos: ["San Luis", "San Nicolás", "Yauya"] },
            { nombre: "Casma", distritos: ["Casma", "Buenavista Alta", "Comandante Noel", "Yaután"] },
            { nombre: "Corongo", distritos: ["Corongo", "Aco", "Bambas", "Cusca", "La Pampa", "Yánac", "Yupán"] },
            { nombre: "Huari", distritos: ["Huari", "Anra", "Cajay", "Chavín de Huántar", "Huacachi", "Huacchis", "Huachis", "Huantar", "Masín", "Paucas", "Ponto", "Rahuapampa", "Rapayán", "San Marcos", "San Pedro de Chana", "Uco"] },
            { nombre: "Huarmey", distritos: ["Huarmey", "Cochapeti", "Culebras", "Huayán", "Malvas"] },
            { nombre: "Huaylas", distritos: ["Caraz", "Huallanca", "Huata", "Huaylas", "Mato", "Pamparomas", "Pueblo Libre", "Santa Cruz", "Yuracmarca"] },
            { nombre: "Mariscal Luzuriaga", distritos: ["Piscobamba", "Casca", "Eleazar Guzmán Barrón", "Fidel Olivas Escudero", "Llama", "Llumpa", "Lucma", "Musga"] },
            { nombre: "Ocros", distritos: ["Ocros", "Acas", "Cajamarquilla", "Carhuapampa", "Cochas", "Congas", "Llipa", "San Cristóbal de Raján", "San Pedro", "Santiago de Chilcas"] },
            { nombre: "Pallasca", distritos: ["Cabana", "Bolognesi", "Conchucos", "Huacaschuque", "Huandoval", "Lacabamba", "Llapo", "Pallasca", "Pampas", "Santa Rosa", "Tauca"] },
            { nombre: "Pomabamba", distritos: ["Pomabamba", "Huayllán", "Parobamba", "Quinuabamba"] },
            { nombre: "Recuay", distritos: ["Recuay", "Catac", "Cotaparaco", "Huayllapampa", "Llacllín", "Marca", "Pampas Chico", "Pararín", "Tapacocha", "Ticapampa"] },
            { nombre: "Santa", distritos: ["Chimbote", "Cáceres del Perú", "Coishco", "Macate", "Moro", "Nepeña", "Samanco", "Santa", "Nuevo Chimbote"] },
            { nombre: "Sihuas", distritos: ["Sihuas", "Acobamba", "Alfonso Ugarte", "Cashapampa", "Chingalpo", "Huayllabamba", "Quiches", "Ragash", "San Juan", "Sicsibamba"] },
            { nombre: "Yungay", distritos: ["Yungay", "Cascapara", "Mancos", "Matacoto", "Quillo", "Ranrahirca", "Shupluy", "Yanama"] }
        ]
    },
    {
        departamento: "Apurímac",
        provincias: [
            { nombre: "Abancay", distritos: ["Abancay", "Chacoche", "Circa", "Curahuasi", "Huanipaca", "Lambrama", "Pichirhua", "San Pedro de Cachora", "Tamburco"] },
            { nombre: "Andahuaylas", distritos: ["Andahuaylas", "Andarapa", "Chiara", "Huancarama", "Huancaray", "Huayana", "Kishuara", "Pacobamba", "Pacucha", "Pampachiri", "Pomacocha", "San Antonio de Cachi", "San Jerónimo", "San Miguel de Chaccrampa", "Santa María de Chicmo", "Talavera", "Tumay Huaraca", "Turpo"] },
            { nombre: "Antabamba", distritos: ["Antabamba", "El Oro", "Huaquirca", "Juan Espinoza Medrano", "Oropesa", "Pachaconas", "Sabaino"] },
            { nombre: "Aymaraes", distritos: ["Chalhuanca", "Capaya", "Caraybamba", "Chapimarca", "Colcabamba", "Cotaruse", "Huayllu", "Justo Apu Sahuaraura", "Lucre", "Pocohuanca", "San Juan de Chacña", "Sañayca", "Soraya", "Tapairihua", "Tintay", "Toraya", "Yanaca"] },
            { nombre: "Cotabambas", distritos: ["Tambobamba", "Cotabambas", "Coyllurqui", "Haquira", "Mara", "Challhuahuacho"] },
            { nombre: "Chincheros", distritos: ["Chincheros", "Anco Huallo", "Cocharcas", "Huaccana", "Ocobamba", "Ongoy", "Uranmarca", "Ranracancha"] },
            { nombre: "Grau", distritos: ["Chuquibambilla", "Curasco", "Mamara", "Mariscal Gamarra", "Micaela Bastidas", "Pataypampa", "Progreso", "San Antonio", "Santa Rosa", "Turpay", "Vilcabamba", "Virundo"] }
        ]
    },
    {
        departamento: "Arequipa",
        provincias: [
            { nombre: "Arequipa", distritos: ["Arequipa", "Alto Selva Alegre", "Cayma", "Cerro Colorado", "Characato", "Chiguata", "Jacobo Hunter", "José Luis Bustamante y Rivero", "La Joya", "Mariano Melgar", "Miraflores", "Mollebaya", "Paucarpata", "Pocsi", "Polobaya", "Quequeña", "Sabandia", "Sachaca", "San Juan de Siguas", "San Juan de Tarucani", "Santa Isabel de Siguas", "Santa Rita de Siguas", "Socabaya", "Tiabaya", "Uchumayo", "Vitor", "Yanahuara", "Yarabamba", "Yura"] },
            { nombre: "Camaná", distritos: ["Camaná", "José María Quimper", "Mariano Nicolás Valcárcel", "Mariscal Cáceres", "Nicolás de Pierola", "Ocoña", "Quilca", "Samuel Pastor"] },
            { nombre: "Caravelí", distritos: ["Caravelí", "Acarí", "Atico", "Atiquipa", "Bella Unión", "Cahuacho", "Chala", "Chaparra", "Huanuhuanu", "Jaqui", "Lomas", "Quicacha", "Yauca"] },
            { nombre: "Castilla", distritos: ["Aplao", "Andagua", "Ayo", "Chachas", "Chilcaymarca", "Choco", "Huancarqui", "Machaguay", "Orcopampa", "Pampacolca", "Tipán", "Uñón", "Uraca", "Viraco"] },
            { nombre: "Caylloma", distritos: ["Chivay", "Achoma", "Cabanaconde", "Callalli", "Caylloma", "Coporaque", "Huambo", "Huanca", "Ichupampa", "Lari", "Lluta", "Maca", "Madrigal", "Majes", "San Antonio de Chuca", "Sibayo", "Tapay", "Tisco", "Tuti", "Yanque"] },
            { nombre: "Condesuyos", distritos: ["Chuquibamba", "Andaray", "Cayarani", "Chichas", "Iray", "Río Grande", "Salamanca", "Yanaquihua"] },
            { nombre: "Islay", distritos: ["Mollendo", "Cocachacra", "Dean Valdivia", "Islay", "Mejía", "Punta de Bombón"] },
            { nombre: "La Unión", distritos: ["Cotahuasi", "Alca", "Charcana", "Huaynacotas", "Pampamarca", "Puyca", "Quechualla", "Sayla", "Tauría", "Tomepampa", "Toro"] }
        ]
    },
    {
        departamento: "Ayacucho",
        provincias: [
            { nombre: "Huamanga", distritos: ["Ayacucho", "Acocro", "Acos Vinchos", "Carmen Alto", "Chiara", "Jesús Nazareno", "Ocros", "Pacaycasa", "Quinua", "San José de Ticllas", "San Juan Bautista", "Santiago de Pischa", "Socos", "Tambillo", "Vinchos"] },
            { nombre: "Cangallo", distritos: ["Cangallo", "Chuschi", "Los Morochucos", "María Parado de Bellido", "Paras", "Totos"] },
            { nombre: "Huanca Sancos", distritos: ["Huanca Sancos", "Carapo", "Sacsamarca", "Santiago de Lucanamarca"] },
            { nombre: "Huanta", distritos: ["Huanta", "Ayahuanco", "Huamanguilla", "Iguain", "Luricocha", "Santillana", "Sivia", "Llochegua"] },
            { nombre: "La Mar", distritos: ["San Miguel", "Anco", "Ayna", "Chilcas", "Chungui", "Luis Carranza", "Santa Rosa", "Tambo"] },
            { nombre: "Lucanas", distritos: ["Puquio", "Aucara", "Cabana", "Carmen Salcedo", "Chaviña", "Chipao", "Huac-Huas", "Laramate", "Leoncio Prado", "Llauta", "Lucanas", "Ocaña", "Otoca", "Saisa", "San Cristóbal", "San Juan", "San Pedro", "San Pedro de Palco", "Sancos", "Santa Ana de Huaycahuacho", "Santa Lucía"] },
            { nombre: "Parinacochas", distritos: ["Coracora", "Chumpi", "Coronel Castañeda", "Pacapausa", "Pullo", "Puyusca", "San Francisco de Ravacayco", "Upahuacho"] },
            { nombre: "Páucar del Sara Sara", distritos: ["Pausa", "Colta", "Corculla", "Lampa", "Marcabamba", "Oyolo", "Pararca", "San Javier de Alpabamba", "San José de Ushua", "Sara Sara"] },
            { nombre: "Sucre", distritos: ["Querobamba", "Belén", "Chalcos", "Chilcayoc", "Huacaña", "Morcolla", "Paico", "San Pedro de Larcay", "San Salvador de Quije", "Santiago de Paucaray", "Soras"] },
            { nombre: "Víctor Fajardo", distritos: ["Huancapi", "Alcamenca", "Apongo", "Asquipata", "Canaria", "Cayara", "Colca", "Huamanquiquia", "Huancaraylla", "Huaya", "Sarhua", "Vilcanchos"] },
            { nombre: "Vilcas Huamán", distritos: ["Vilcas Huamán", "Accomarca", "Carhuanca", "Concepción", "Huambalpa", "Independencia", "Saurama", "Vischongo"] }
        ]
    },
    {
        departamento: "Cajamarca",
        provincias: [
            { nombre: "Cajamarca", distritos: ["Cajamarca", "Asunción", "Chetilla", "Cospán", "Encañada", "Jesús", "Llacanora", "Los Baños del Inca", "Magdalena", "Matará", "Namora", "San Juan"] },
            { nombre: "Cajabamba", distritos: ["Cajabamba", "Cachachi", "Condebamba", "Sitacocha"] },
            { nombre: "Celendín", distritos: ["Celendín", "Chumuch", "Cortegana", "Huasmin", "Jorge Chávez", "José Gálvez", "La Libertad de Pallán", "Miguel Iglesias", "Oxamarca", "Sorochuco", "Sucre", "Utco"] },
            { nombre: "Chota", distritos: ["Chota", "Anguía", "Chadín", "Chalamarca", "Chiguirip", "Chimban", "Choropampa", "Cochabamba", "Conchán", "Huambos", "Lajas", "Llama", "Miracosta", "Paccha", "Pión", "Querocoto", "San Juan de Licupis", "Tacabamba", "Tocmoche"] },
            { nombre: "Contumazá", distritos: ["Contumazá", "Chilete", "Cupisnique", "Guzmango", "San Benito", "Santa Cruz de Toledo", "Tantarica", "Yonán"] },
            { nombre: "Cutervo", distritos: ["Cutervo", "Callayuc", "Choros", "Cujillo", "La Ramada", "Pimpingos", "Querocotillo", "San Andrés de Cutervo", "San Juan de Cutervo", "San Luis de Lucma", "Santa Cruz", "Santo Domingo de la Capilla", "Santo Tomás"] },
            { nombre: "Hualgayoc", distritos: ["Bambamarca", "Chugur", "Hualgayoc"] },
            { nombre: "Jaén", distritos: ["Jaén", "Bellavista", "Chontalí", "Colasay", "Huabal", "Las Pirias", "Pomahuaca", "Pucará", "Sallique", "San Felipe", "San José del Alto", "Santa Rosa"] },
            { nombre: "San Ignacio", distritos: ["San Ignacio", "Chirinos", "Huarango", "La Coipa", "Namballe", "San José de Lourdes", "Tabaconas"] },
            { nombre: "San Marcos", distritos: ["San Marcos", "Chancay", "Eduardo Villanueva", "Gregorio Pita", "Ichocán", "José Manuel Quiroz", "José Sabogal"] },
            { nombre: "San Miguel", distritos: ["San Miguel", "Bolívar", "Calquis", "Catilluc", "El Prado", "La Florida", "Llapa", "Nanchoc", "Niepos", "San Gregorio", "San Silvestre de Cochán", "Tongod", "Unión Agua Blanca"] },
            { nombre: "San Pablo", distritos: ["San Pablo", "San Bernardino", "San Luis", "Tumbadén"] },
            { nombre: "Santa Cruz", distritos: ["Santa Cruz", "Andabamba", "Catache", "Chancay Baños", "La Esperanza", "Ninabamba", "Pulán", "Saucepampa", "Sexi", "Uticyacu", "Yauyucán"] }
        ]
    },
    {
        departamento: "Callao",
        provincias: [
            { nombre: "Callao", distritos: ["Callao", "Bellavista", "Carmen de la Legua Reynoso", "La Perla", "La Punta", "Ventanilla", "Mi Perú"] }
        ]
    },
    {
        departamento: "Cusco",
        provincias: [
            { nombre: "Cusco", distritos: ["Cusco", "Ccorca", "Poroy", "San Jerónimo", "San Sebastián", "Santiago", "Saylla", "Wanchaq"] },
            { nombre: "Acomayo", distritos: ["Acomayo", "Acopia", "Acos", "Mosoc Llacta", "Pomacanchi", "Rondocán", "Sangarará"] },
            { nombre: "Anta", distritos: ["Anta", "Ancahuasi", "Cachimayo", "Chinchaypujio", "Huarocondo", "Limatambo", "Mollepata", "Pucyura", "Zurite"] },
            { nombre: "Calca", distritos: ["Calca", "Coya", "Lamay", "Lares", "Pisac", "San Salvador", "Taray", "Yanatile"] },
            { nombre: "Canas", distritos: ["Yanaoca", "Checca", "Kunturkanki", "Langui", "Layo", "Pampamarca", "Quehue", "Túpac Amaru"] },
            { nombre: "Canchis", distritos: ["Sicuani", "Checacupe", "Combapata", "Marangani", "Pitumarca", "San Pablo", "San Pedro", "Tinta"] },
            { nombre: "Chumbivilcas", distritos: ["Santo Tomás", "Capacmarca", "Chamaca", "Colquemarca", "Livitaca", "Llusco", "Quiñota", "Velille"] },
            { nombre: "Espinar", distritos: ["Yauri", "Condoroma", "Coporaque", "Ocoruro", "Pallpata", "Pichigua", "Suyckutambo", "Alto Pichigua"] },
            { nombre: "La Convención", distritos: ["Quillabamba", "Echarate", "Huayopata", "Inkawasi", "Kimbiri", "Maranura", "Megantoni", "Ocobamba", "Pichari", "Santa Ana", "Vilcabamba", "Villa Kintiarina", "Villa Virgen"] },
            { nombre: "Paruro", distritos: ["Paruro", "Accha", "Ccapi", "Colcha", "Huanoquite", "Omacha", "Paccaritambo", "Pillpinto", "Yaurisque"] },
            { nombre: "Paucartambo", distritos: ["Paucartambo", "Caicay", "Challabamba", "Colquepata", "Huancarani", "Kosñipata"] },
            { nombre: "Quispicanchi", distritos: ["Urcos", "Andahuaylillas", "Camanti", "Ccarhuayo", "Ccatca", "Cusipata", "Huaro", "Lucre", "Marcapata", "Ocongate", "Oropesa", "Quiquijana"] },
            { nombre: "Urubamba", distritos: ["Urubamba", "Chinchero", "Huayllabamba", "Machupicchu", "Maras", "Ollantaytambo", "Yucay"] }
        ]
    },
    {
        departamento: "Huancavelica",
        provincias: [
            { nombre: "Huancavelica", distritos: ["Huancavelica", "Acobambilla", "Acoria", "Conayca", "Cuenca", "Huachocolpa", "Huando", "Huayllahuara", "Izcuchaca", "Laria", "Manta", "Mariscal Cáceres", "Moya", "Nuevo Occoro", "Palca", "Pilchaca", "Vilca", "Yauli"] },
            { nombre: "Acobamba", distritos: ["Acobamba", "Andabamba", "Anta", "Caja", "Marcas", "Paucará", "Pomacocha", "Rosario"] },
            { nombre: "Angaraes", distritos: ["Lircay", "Anchonga", "Callanmarca", "Ccochaccasa", "Chincho", "Congalla", "Huanca-Huanca", "Huayllay Grande", "Julcamarca", "San Antonio de Antaparco", "Santo Tomás de Pata", "Secclla"] },
            { nombre: "Castrovirreyna", distritos: ["Castrovirreyna", "Arma", "Aurahua", "Capillas", "Chupamarca", "Cocas", "Huachos", "Huamatambo", "Mollepampa", "San Juan", "Santa Ana", "Tantara", "Ticrapo"] },
            { nombre: "Churcampa", distritos: ["Churcampa", "Anco", "Chinchihuasi", "El Carmen", "La Merced", "Locroja", "Paucarbamba", "San Miguel de Mayocc", "San Pedro de Coris"] },
            { nombre: "Huaytará", distritos: ["Huaytará", "Ayaví", "Córdova", "Huayacundo Arma", "Laramarca", "Ocoyo", "Pilpichaca", "Querco", "Quito-Arma", "San Antonio de Cusicancha", "San Francisco de Sangayaico", "San Isidro", "Santiago de Chocorvos", "Santiago de Quirahuara", "Santo Domingo de Capillas", "Tambo"] },
            { nombre: "Tayacaja", distritos: ["Pampas", "Acostambo", "Acraquía", "Ahuaycha", "Colcabamba", "Daniel Hernández", "Huachocolpa", "Huaribamba", "Ñahuimpuquio", "Pazos", "Quishuar", "Salcahuasi", "Salcabamba", "San Marcos de Rocchac", "Surcubamba", "Tintay Puncu"] }
        ]
    },
    {
        departamento: "Huánuco",
        provincias: [
            { nombre: "Huánuco", distritos: ["Huánuco", "Amarilis", "Chinchao", "Churubamba", "Margos", "Quisqui", "San Francisco de Cayrán", "San Pedro de Chaulán", "Santa María del Valle", "Yarumayo"] },
            { nombre: "Ambo", distritos: ["Ambo", "Cayna", "Colpas", "Conchamarca", "Huácar", "San Francisco", "San Rafael", "Tomay Kichwa"] },
            { nombre: "Dos de Mayo", distritos: ["La Unión", "Chuquis", "Marias", "Pachas", "Quivilla", "Ripán", "Shunqui", "Sillapata", "Yanas"] },
            { nombre: "Huacaybamba", distritos: ["Huacaybamba", "Canchabamba", "Cochabamba", "Pinra"] },
            { nombre: "Huamalíes", distritos: ["Llata", "Arancay", "Chavín de Pariarca", "Jacas Grande", "Jircan", "Miraflores", "Monzón", "Punchao", "Puños", "Singa", "Tantamayo"] },
            { nombre: "Leoncio Prado", distritos: ["Tingo María", "Castillo Grande", "Daniel Alomías Robles", "Hermilio Valdizán", "José Crespo y Castillo", "Luyando", "Mariano Dámaso Beraún", "Rupa Rupa"] },
            { nombre: "Marañón", distritos: ["Huacrachuco", "Cholón", "San Buenaventura"] },
            { nombre: "Pachitea", distritos: ["Panao", "Chaglla", "Molino", "Umari"] },
            { nombre: "Puerto Inca", distritos: ["Puerto Inca", "Codo del Pozuzo", "Honoria", "Tournavista", "Yuyapichis"] },
            { nombre: "Lauricocha", distritos: ["Jesús", "Baños", "Jivia", "Queropalca", "Rondos", "San Francisco de Asís", "San Miguel de Cauri"] },
            { nombre: "Yarowilca", distritos: ["Chavinillo", "Cahuac", "Chacabamba", "Aparicio Pomares", "Jacas Chico", "Obas", "Pampamarca"] }
        ]
    },
    {
        departamento: "Ica",
        provincias: [
            { nombre: "Ica", distritos: ["Ica", "La Tinguiña", "Los Aquijes", "Ocucaje", "Pachacutec", "Parcona", "Pueblo Nuevo", "Salas", "San José de los Molinos", "San Juan Bautista", "Santiago", "Subtanjalla", "Tate", "Yauca del Rosario"] },
            { nombre: "Chincha", distritos: ["Chincha Alta", "Alto Larán", "Chavín", "Chincha Baja", "El Carmen", "Grocio Prado", "Pueblo Nuevo", "San Juan de Yanac", "San Pedro de Huacarpana", "Sunampe", "Tambo de Mora"] },
            { nombre: "Nazca", distritos: ["Nazca", "Changuillo", "El Ingenio", "Marcona", "Vista Alegre"] },
            { nombre: "Palpa", distritos: ["Palpa", "Llipata", "Río Grande", "Santa Cruz", "Tibillo"] },
            { nombre: "Pisco", distritos: ["Pisco", "Huancano", "Humay", "Independencia", "Paracas", "San Andrés", "San Clemente", "Tupac Amaru Inca"] }
        ]
    },
    {
        departamento: "Junín",
        provincias: [
            { nombre: "Huancayo", distritos: ["Huancayo", "Chilca", "El Tambo", "Hualhuas", "Pariahuanca", "Pilcomayo", "San Agustín", "San Jerónimo de Tunan", "Sapallanga", "Sicaya", "Viques"] },
            { nombre: "Concepción", distritos: ["Concepción", "Aco", "Andamarca", "Chambara", "Cochas", "Comas", "Heroínas Toledo", "Manzanares", "Mariscal Castilla", "Matahuasi", "Mito", "Nueve de Julio", "Orcotuna", "San José de Quero", "Santa Rosa de Ocopa"] },
            { nombre: "Chanchamayo", distritos: ["Chanchamayo", "Perené", "Pichanaqui", "San Luis de Shuaro", "San Ramón", "Vitoc"] },
            { nombre: "Jauja", distritos: ["Jauja", "Acolla", "Apata", "Ataura", "Canchayllo", "Curicaca", "El Mantaro", "Huamalí", "Huaripampa", "Huertas", "Janjaillo", "Julcán", "Leonor Ordóñez", "Llocllapampa", "Marco", "Masma", "Masma Chicche", "Molinos", "Monobamba", "Muqui", "Muquiyauyo", "Paca", "Paccha", "Pancán", "Parco", "Pomacancha", "Ricrán", "San Lorenzo", "San Pedro de Chunan", "Sausa", "Sincos", "Tunan Marca", "Yauli", "Yauyos"] },
            { nombre: "Junín", distritos: ["Junín", "Carhuamayo", "Ondores", "Ulcumayo"] },
            { nombre: "Satipo", distritos: ["Satipo", "Coviriali", "Llaylla", "Mazamari", "Pampa Hermosa", "Pantanga", "Río Negro", "Río Tambo"] },
            { nombre: "Tarma", distritos: ["Tarma", "Acobamba", "Huaricolca", "Huasahuasi", "La Unión", "Palca", "Palcamayo", "San Pedro de Cajas", "Tapo"] },
            { nombre: "Yauli", distritos: ["La Oroya", "Chacapalpa", "Huay-Huay", "Marcapomacocha", "Morococha", "Paccha", "Santa Bárbara de Carhuacayán", "Santa Rosa de Sacco", "Suitucancha", "Yauli"] },
            { nombre: "Chupaca", distritos: ["Chupaca", "Ahuac", "Chongos Bajo", "Huachac", "Huamancaca Chico", "San Juan de Iscos", "San Juan de Yscos", "Tres de Diciembre"] }
        ]
    },
    {
        departamento: "La Libertad",
        provincias: [
            { nombre: "Trujillo", distritos: ["Trujillo", "El Porvenir", "Florencia de Mora", "Huanchaco", "La Esperanza", "Laredo", "Moche", "Poroto", "Salaverry", "Simbal", "Víctor Larco Herrera"] },
            { nombre: "Ascope", distritos: ["Ascope", "Chicama", "Chocope", "Magdalena de Cao", "Paiján", "Rázuri", "Santiago de Cao"] },
            { nombre: "Bolívar", distritos: ["Bolívar", "Bambamarca", "Condormarca", "Longotea", "Uchumarca"] },
            { nombre: "Chepén", distritos: ["Chepén", "Pacanga", "Pueblo Nuevo"] },
            { nombre: "Gran Chimú", distritos: ["Cascas", "Lucma", "Marmot", "Sayapullo"] },
            { nombre: "Julcán", distritos: ["Julcán", "Calamarca", "Carabamba", "Huaso"] },
            { nombre: "Otuzco", distritos: ["Otuzco", "Agallpampa", "Charat", "Huaranchal", "La Cuesta", "Mache", "Paranday", "Salpo", "Sinsicap", "Usquil"] },
            { nombre: "Pacasmayo", distritos: ["San Pedro de Lloc", "Guadalupe", "Jequetepeque", "Pacasmayo", "San José"] },
            { nombre: "Pataz", distritos: ["Tayabamba", "Buldibuyo", "Chillia", "Huancaspata", "Huaylillas", "Huayo", "Ongón", "Parcoy", "Pataz", "Pías", "Santiago de Challas", "Taurija", "Urpay"] },
            { nombre: "Sánchez Carrión", distritos: ["Huamachuco", "Chugay", "Cochorco", "Curgos", "Marcabal", "Sanagorán", "Sarín", "Sartimbamba"] },
            { nombre: "Santiago de Chuco", distritos: ["Santiago de Chuco", "Angasmarca", "Cachicadán", "Mollebamba", "Mollepata", "Quiruvilca", "Santa Cruz de Chuca", "Sitabamba"] },
            { nombre: "Virú", distritos: ["Virú", "Chao", "Guadalupito"] }
        ]
    },
    {
        departamento: "Lambayeque",
        provincias: [
            { nombre: "Chiclayo", distritos: ["Chiclayo", "Cayalti", "Chongoyape", "Eten", "Eten Puerto", "José Leonardo Ortiz", "La Victoria", "Lagunas", "Monsefú", "Nueva Arica", "Oyotún", "Picsi", "Pimentel", "Reque", "Santa Rosa", "Saña", "Tumán"] },
            { nombre: "Ferreñafe", distritos: ["Ferreñafe", "Cañaris", "Incahuasi", "Manuel Antonio Mesones Muro", "Pítipo", "Pueblo Nuevo"] },
            { nombre: "Lambayeque", distritos: ["Lambayeque", "Chóchope", "Illimo", "Jayanca", "Mochumi", "Mórrope", "Motupe", "Olmos", "Pacora", "Salas", "San José", "Túcume"] }
        ]
    },
    {
        departamento: "Lima",
        provincias: [
            { nombre: "Lima", distritos: ["Lima", "Ancón", "Ate", "Barranco", "Breña", "Carabayllo", "Chaclacayo", "Chorrillos", "Cieneguilla", "Comas", "El Agustino", "Independencia", "Jesús María", "La Molina", "La Victoria", "Lince", "Los Olivos", "Lurigancho", "Lurín", "Magdalena del Mar", "Miraflores", "Pachacámac", "Pucusana", "Pueblo Libre", "Puente Piedra", "Punta Hermosa", "Punta Negra", "Rímac", "San Bartolo", "San Borja", "San Isidro", "San Juan de Lurigancho", "San Juan de Miraflores", "San Luis", "San Martín de Porres", "San Miguel", "Santa Anita", "Santa María del Mar", "Santa Rosa", "Santiago de Surco", "Surquillo", "Villa El Salvador", "Villa María del Triunfo"] },
            { nombre: "Barranca", distritos: ["Barranca", "Paramonga", "Pativilca", "Supe", "Supe Puerto"] },
            { nombre: "Cajatambo", distritos: ["Cajatambo", "Copa", "Gorgor", "Huancapón", "Manas"] },
            { nombre: "Canta", distritos: ["Canta", "Arahuay", "Huamantanga", "Huaros", "Lachaqui", "San Buenaventura", "Santa Rosa de Quives"] },
            { nombre: "Cañete", distritos: ["San Vicente de Cañete", "Asia", "Calango", "Cerro Azul", "Chilca", "Coayllo", "Imperial", "Lunahuaná", "Mala", "Nuevo Imperial", "Pacarán", "Quilmaná", "San Antonio", "San Luis", "Santa Cruz de Flores", "Zúñiga"] },
            { nombre: "Huaral", distritos: ["Huaral", "Atavillos Alto", "Atavillos Bajo", "Aucallama", "Chancay", "Ihuarí", "Lampian", "Pacaraos", "San Miguel de Acos", "Santa Cruz de Andamarca", "Sumbilca", "Veintisiete de Noviembre"] },
            { nombre: "Huarochirí", distritos: ["Matucana", "Antioquia", "Callahuanca", "Carampoma", "Chicla", "Cuenca", "Huachupampa", "Huanza", "Huarochirí", "Lahuaytambo", "Langa", "Laraos", "Mariatana", "Ricardo Palma", "San Andrés de Tupicocha", "San Antonio", "San Bartolomé", "San Damián", "San Juan de Iris", "San Juan de Tantaranche", "San Lorenzo de Quinti", "San Mateo", "San Mateo de Otao", "San Pedro de Casta", "San Pedro de Huancayre", "Sangallaya", "Santa Cruz de Cocachacra", "Santa Eulalia", "Santiago de Anchucaya", "Santiago de Tuna", "Santo Domingo de los Olleros", "Surco"] },
            { nombre: "Huaura", distritos: ["Huacho", "Ámbar", "Caleta de Carquín", "Checras", "Hualmay", "Huaura", "Leoncio Prado", "Santa Leonor", "Santa María", "Sayan", "Végueta"] },
            { nombre: "Oyón", distritos: ["Oyón", "Andajes", "Caujul", "Cochamarca", "Navan", "Pachangara"] },
            { nombre: "Yauyos", distritos: ["Yauyos", "Alis", "Ayauca", "Ayaviri", "Azángaro", "Cacra", "Carania", "Catahuasi", "Chocos", "Cochas", "Colonia", "Hongos", "Huampara", "Huancaya", "Huangascar", "Huantán", "Huañec", "Laraos", "Lincha", "Madean", "Miraflores", "Omas", "Putinza", "Quinches", "Quinocay", "San Joaquín", "San Pedro de Pilas", "Tanta", "Tauripampa", "Tomás", "Tupe", "Viñac", "Vitis"] }
        ]
    },
    {
        departamento: "Loreto",
        provincias: [
            { nombre: "Maynas", distritos: ["Iquitos", "Alto Nanay", "Fernando Lores", "Indiana", "Las Amazonas", "Mazán", "Napo", "Punchana", "Torres Causana", "Belén", "San Juan Bautista"] },
            { nombre: "Alto Amazonas", distritos: ["Yurimaguas", "Balsapuerto", "Jeberos", "Lagunas", "Santa Cruz", "Teniente Cesar López Rojas"] },
            { nombre: "Datem del Marañón", distritos: ["San Lorenzo", "Barranca", "Cahuapanas", "Manseriche", "Morona", "Pastaza"] },
            { nombre: "Loreto", distritos: ["Nauta", "Parinari", "Tigre", "Trompeteros", "Urarinas"] },
            { nombre: "Mariscal Ramón Castilla", distritos: ["Caballococha", "Pebas", "Yavarí", "San Pablo"] },
            { nombre: "Putumayo", distritos: ["El Estrecho", "Putumayo", "Yaguas", "Rosa Panduro"] },
            { nombre: "Requena", distritos: ["Requena", "Alto Tapiche", "Capelo", "Emilio San Martín", "Maquía", "Puinahua", "Saquena", "Soplin", "Tapiche", "Jenaro Herrera", "Yaquerana"] },
            { nombre: "Ucayali", distritos: ["Contamana", "Inahuaya", "Padre Márquez", "Pampa Hermosa", "Sarayacu", "Vargas Guerra"] }
        ]
    },
    {
        departamento: "Madre de Dios",
        provincias: [
            { nombre: "Tambopata", distritos: ["Puerto Maldonado", "Inambari", "Laberinto", "Las Piedras"] },
            { nombre: "Manu", distritos: ["Salvación", "Fitzcarrald", "Huepetuhe", "Madre de Dios"] },
            { nombre: "Tahuamanu", distritos: ["Iñapari", "Iberia", "Tahuamanu"] }
        ]
    },
    {
        departamento: "Moquegua",
        provincias: [
            { nombre: "Mariscal Nieto", distritos: ["Moquegua", "Carumas", "Cuchumbaya", "Samegua", "San Cristóbal", "Torata"] },
            { nombre: "General Sánchez Cerro", distritos: ["Omate", "Chojata", "Coalaque", "Ichuña", "La Capilla", "Lloque", "Matalaque", "Puquina", "Quinistaquillas", "Ubinas", "Yunga"] },
            { nombre: "Ilo", distritos: ["Ilo", "El Algarrobal", "Pacocha"] }
        ]
    },
    {
        departamento: "Pasco",
        provincias: [
            { nombre: "Pasco", distritos: ["Cerro de Pasco", "Chaupimarca", "Huachón", "Huariaca", "Huayllay", "Ninacaca", "Pallanchacra", "Paucartambo", "San Francisco de Asís de Yarusyacán", "Simón Bolívar", "Ticlacayán", "Tinyahuarco", "Vicco", "Yanacancha"] },
            { nombre: "Daniel Alcides Carrión", distritos: ["Yanahuanca", "Chacayán", "Goyllarisquizga", "Paucar", "San Pedro de Pillao", "Santa Ana de Tusi", "Tapuc", "Vilcabamba"] },
            { nombre: "Oxapampa", distritos: ["Oxapampa", "Chontabamba", "Constitución", "Huancabamba", "Palcazu", "Pozuzo", "Puerto Bermúdez", "Villa Rica"] }
        ]
    },
    {
        departamento: "Piura",
        provincias: [
            { nombre: "Piura", distritos: ["Piura", "Castilla", "Catacaos", "Cura Mori", "El Tallán", "La Arena", "La Unión", "Las Lomas", "Tambo Grande", "Vea"] },
            { nombre: "Ayabaca", distritos: ["Ayabaca", "Frías", "Jililí", "Lagunas", "Montero", "Pacaipampa", "Paimas", "Sapillica", "Sícchez", "Suyo"] },
            { nombre: "Huancabamba", distritos: ["Huancabamba", "Canchaque", "El Carmen de la Frontera", "Huarmaca", "Lalaquiz", "San Miguel de El Faique", "Sondor", "Sondorillo"] },
            { nombre: "Morropón", distritos: ["Chulucanas", "Buenos Aires", "Chalaco", "La Matanza", "Morropón", "Salitral", "San Juan de Bigote", "Santa Catalina de Mossa", "Santo Domingo", "Yamango"] },
            { nombre: "Paita", distritos: ["Paita", "Amotape", "Arenal", "Colan", "La Huaca", "Tamarindo", "Vichayal"] },
            { nombre: "Sechura", distritos: ["Sechura", "Bellavista de la Unión", "Bernal", "Cristo Nos Valga", "Rinconada Llicuar", "Vice"] },
            { nombre: "Sullana", distritos: ["Sullana", "Bellavista", "Ignacio Escudero", "Lancones", "Marcavelica", "Miguel Checa", "Querecotillo", "Salitral"] },
            { nombre: "Talara", distritos: ["Talara", "El Alto", "La Brea", "Lobitos", "Los Órganos", "Máncora"] }
        ]
    },
    {
        departamento: "Puno",
        provincias: [
            { nombre: "Puno", distritos: ["Puno", "Acora", "Amantaní", "Atuncolla", "Capachica", "Chucuito", "Coata", "Huata", "Mañazo", "Paucarcolla", "Pichacani", "Plateria", "San Antonio", "Tiquillaca", "Vilque"] },
            { nombre: "Azángaro", distritos: ["Azángaro", "Achaya", "Arapa", "Asillo", "Caminaca", "Chupa", "José Domingo Choquehuanca", "Muñani", "Potoni", "Samán", "San Antón", "San José", "San Juan de Salinas", "Santiago de Pupuja", "Tirapata"] },
            { nombre: "Carabaya", distritos: ["Macusani", "Ajoyani", "Ayapata", "Coasa", "Corani", "Crucero", "Ituata", "Ollachea", "San Gaban", "Usicayos"] },
            { nombre: "Chucuito", distritos: ["Juli", "Desaguadero", "Huacullani", "Kelluyo", "Pisacoma", "Pomata", "Zepita"] },
            { nombre: "El Collao", distritos: ["Ilave", "Capazo", "Pilcuyo", "Santa Rosa"] },
            { nombre: "Huancané", distritos: ["Huancané", "Cojata", "Huatasani", "Inchupalla", "Pusi", "Rosaspata", "Taraco", "Vilque Chico"] },
            { nombre: "Lampa", distritos: ["Lampa", "Cabanilla", "Calapuja", "Nicasio", "Ocuviri", "Palca", "Paratía", "Pucará", "Santa Lucía", "Vilavila"] },
            { nombre: "Melgar", distritos: ["Ayaviri", "Antauta", "Cupi", "Llalli", "Macari", "Nuñoa", "Orurillo", "Santa Rosa", "Umachiri"] },
            { nombre: "Moho", distritos: ["Moho", "Conima", "Huayrapata", "Tilali"] },
            { nombre: "San Antonio de Putina", distritos: ["Putina", "Ananea", "Pedro Vilca Apaza", "Quilcapuncu", "Sina"] },
            { nombre: "San Román", distritos: ["Juliaca", "Cabana", "Cabanillas", "Caracoto"] },
            { nombre: "Sandia", distritos: ["Sandia", "Cuyocuyo", "Limbani", "Patambuco", "Phara", "Quiaca", "San Juan del Oro", "Yanahuaya", "Alto Inambari"] },
            { nombre: "Yunguyo", distritos: ["Yunguyo", "Anapia", "Copani", "Cuturapi", "Ollaraya", "Tinicachi", "Unicachi"] }
        ]
    },
    {
        departamento: "San Martín",
        provincias: [
            { nombre: "Moyobamba", distritos: ["Moyobamba", "Calzada", "Habana", "Jepelacio", "Soritor", "Yantaló"] },
            { nombre: "Bellavista", distritos: ["Bellavista", "Alto Biavo", "Bajo Biavo", "Huallaga", "San Pablo", "San Rafael"] },
            { nombre: "El Dorado", distritos: ["San José de Sisa", "Agua Blanca", "San Martín", "Santa Rosa", "Shatoja"] },
            { nombre: "Huallaga", distritos: ["Saposoa", "Alto Saposoa", "El Eslabón", "Piscoyacu", "Sacanche", "Tingo de Saposoa"] },
            { nombre: "Lamas", distritos: ["Lamas", "Alonso de Alvarado", "Barranquita", "Caynarachi", "Cuñumbuqui", "Pinto Recodo", "Rumisapa", "San Roque de Cumbaza", "Shanao", "Tabalosos", "Zapatero"] },
            { nombre: "Mariscal Cáceres", distritos: ["Juanjuí", "Campanilla", "Huicungo", "Pachiza", "Pajarillo"] },
            { nombre: "Picota", distritos: ["Picota", "Buenos Aires", "Caspisapa", "Pilluana", "Pucacaca", "San Cristóbal", "San Hilarión", "Shamboyacu", "Tingo de Ponasa", "Tres Unidos"] },
            { nombre: "Rioja", distritos: ["Rioja", "Awajún", "Elías Soplín Vargas", "Nueva Cajamarca", "Pardo Miguel", "Posic", "San Fernando", "Yorongos", "Yuracyacu"] },
            { nombre: "San Martín", distritos: ["Tarapoto", "Alberto Leveau", "Cacatachi", "Chazuta", "Chipurana", "El Porvenir", "Huimbayoc", "Juan Guerra", "La Banda de Shilcayo", "Morales", "Papaplaya", "San Antonio", "Sauce", "Shapaja"] },
            { nombre: "Tocache", distritos: ["Tocache", "Nuevo Progreso", "Polvora", "Shunte", "Uchiza"] }
        ]
    },
    {
        departamento: "Tacna",
        provincias: [
            { nombre: "Tacna", distritos: ["Tacna", "Alto de la Alianza", "Calana", "Ciudad Nueva", "Coronel Gregorio Albarracín Lanchipa", "Inclán", "La Yarada los Palos", "Pachía", "Palca", "Pocollay", "Sama"] },
            { nombre: "Candarave", distritos: ["Candarave", "Cairani", "Camilaca", "Curibaya", "Huanuara", "Quilahuani"] },
            { nombre: "Jorge Basadre", distritos: ["Locumba", "Ite", "Ilabaya"] },
            { nombre: "Tarata", distritos: ["Tarata", "Estique", "Estique-Pampa", "Héroes Albarracín", "Sitajara", "Susapaya", "Tarucachi", "Ticaco"] }
        ]
    },
    {
        departamento: "Tumbes",
        provincias: [
            { nombre: "Tumbes", distritos: ["Tumbes", "Corrales", "La Cruz", "Pampas de Hospital", "San Jacinto", "San Juan de la Virgen"] },
            { nombre: "Contralmirante Villar", distritos: ["Zorritos", "Casitas", "Canoas de Punta Sal"] },
            { nombre: "Zarumilla", distritos: ["Zarumilla", "Aguas Verdes", "Matapalo", "Papayal"] }
        ]
    },
    {
        departamento: "Ucayali",
        provincias: [
            { nombre: "Coronel Portillo", distritos: ["Callería", "Campoverde", "Iparía", "Masisea", "Nueva Requena", "Manantay", "Yarinacocha"] },
            { nombre: "Atalaya", distritos: ["Atalaya", "Raymondi", "Sepahua", "Tahuanía", "Yurúa"] },
            { nombre: "Padre Abad", distritos: ["Aguaytía", "Curimaná", "Neshuya", "Alexander Von Humboldt"] },
            { nombre: "Purús", distritos: ["Purús"] }
        ]
    }
];