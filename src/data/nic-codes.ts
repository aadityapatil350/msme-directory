export interface NICCodeItem {
  code: string // 5-digit or 4-digit code
  division: string // 2-digit division
  sector: 'Manufacturing' | 'Services' | 'Trading'
  description: string
  searchTerms: string
  popular?: boolean
}

export const NIC_CODES_DATA: NICCodeItem[] = [
  // Retail & Wholesale (Trading - Division 45, 46, 47)
  {
    code: '47110',
    division: '47',
    sector: 'Trading',
    description: 'Retail sale in non-specialized stores with food, beverages or tobacco predominating (Kirana, Grocery stores, Supermarkets)',
    searchTerms: 'kirana grocery supermarket food provision store retail shop general store',
    popular: true,
  },
  {
    code: '47711',
    division: '47',
    sector: 'Trading',
    description: 'Retail sale of ready-made garments, hosiery goods and other clothing articles',
    searchTerms: 'cloth garment clothes boutique fashion ready-made shirt saree kurti dress',
    popular: true,
  },
  {
    code: '47721',
    division: '47',
    sector: 'Trading',
    description: 'Retail sale of footwear, shoes, sandals and leather accessories',
    searchTerms: 'footwear shoes chappal slippers sandals leather store',
    popular: true,
  },
  {
    code: '47731',
    division: '47',
    sector: 'Trading',
    description: 'Retail sale of pharmaceuticals, medical and orthopaedic goods (Chemist / Pharmacy)',
    searchTerms: 'medical pharmacy chemist medicines drug store health surgical',
    popular: true,
  },
  {
    code: '47411',
    division: '47',
    sector: 'Trading',
    description: 'Retail sale of computers, peripheral units, telecommunication equipment and mobile phones',
    searchTerms: 'mobile phone computer laptop tablet gadgets accessories mobile shop electronics',
    popular: true,
  },
  {
    code: '47521',
    division: '47',
    sector: 'Trading',
    description: 'Retail sale of hardware, paint, glass and construction materials',
    searchTerms: 'hardware paint sanitary plumbing tools cement building material electrical shop',
    popular: true,
  },
  {
    code: '47911',
    division: '47',
    sector: 'Trading',
    description: 'Retail sale of any kind of product by mail order or internet (E-commerce sellers, Amazon, Flipkart, Shopify store, D2C)',
    searchTerms: 'ecommerce online selling amazon flipkart dropshipping shopify d2c internet store',
    popular: true,
  },
  {
    code: '46301',
    division: '46',
    sector: 'Trading',
    description: 'Wholesale of grains, cereals, pulses, agricultural raw materials and live animals',
    searchTerms: 'wholesale grains pulses mandi trader wheat rice dal seeds',
  },
  {
    code: '46411',
    division: '46',
    sector: 'Trading',
    description: 'Wholesale of textiles, fabrics, yarn and household linen',
    searchTerms: 'textile wholesale cloth fabric yarn bedsheets curtains',
  },

  // Food Products Manufacturing (Division 10)
  {
    code: '10795',
    division: '10',
    sector: 'Manufacturing',
    description: 'Manufacture of spices, condiments, curry powder, seasoning and spice blends (Masala unit)',
    searchTerms: 'spice masala turmeric chilli powder coriander garam masala spices processing',
    popular: true,
  },
  {
    code: '10712',
    division: '10',
    sector: 'Manufacturing',
    description: 'Manufacture of bread, buns, biscuits, cakes, pastries, rusks and bakery products',
    searchTerms: 'bakery bread cake biscuit toast cookies rusk baking commercial bakery',
    popular: true,
  },
  {
    code: '10402',
    division: '10',
    sector: 'Manufacturing',
    description: 'Manufacture of edible vegetable oils (Cold pressed oil, mustard oil, groundnut oil, sesame oil)',
    searchTerms: 'oil edible oil cold pressed kachi ghani mustard oil extraction expeller',
    popular: true,
  },
  {
    code: '10501',
    division: '10',
    sector: 'Manufacturing',
    description: 'Manufacture of dairy products, pasteurized milk, butter, ghee, paneer, and curd',
    searchTerms: 'dairy milk ghee paneer butter curd cheese lassi khoya',
    popular: true,
  },
  {
    code: '10304',
    division: '10',
    sector: 'Manufacturing',
    description: 'Manufacture of fruit pulp, fruit juices, jams, jellies, pickles and tomato sauce',
    searchTerms: 'juice pickle achar sauce jam ketchup fruit pulp food processing',
    popular: true,
  },
  {
    code: '10792',
    division: '10',
    sector: 'Manufacturing',
    description: 'Manufacture of papad, appalam, noodles, pasta and instant snack foods',
    searchTerms: 'papad noodles namkeen snacks chips extruded snacks bhujia',
    popular: true,
  },
  {
    code: '11051',
    division: '11',
    sector: 'Manufacturing',
    description: 'Manufacture of packaged drinking water, mineral water, and non-alcoholic aerated beverages',
    searchTerms: 'packaged drinking water mineral water RO plant soda beverage water bottle',
    popular: true,
  },

  // Textiles & Apparel Manufacturing (Division 13, 14)
  {
    code: '14101',
    division: '14',
    sector: 'Manufacturing',
    description: 'Manufacture of all types of wearing apparel, woven and knitted garments for men, women and children',
    searchTerms: 'apparel garment clothing stitching tailoring t-shirt shirts trousers dress making',
    popular: true,
  },
  {
    code: '13921',
    division: '13',
    sector: 'Manufacturing',
    description: 'Manufacture of made-up textile articles, blankets, bed linen, curtains, and cotton shopping bags',
    searchTerms: 'tote bag cotton bag shopping bag bedsheet curtain quilt textile article',
    popular: true,
  },

  // Paper & Packaging Manufacturing (Division 17)
  {
    code: '17021',
    division: '17',
    sector: 'Manufacturing',
    description: 'Manufacture of corrugated paper and paperboard, boxes, cartons and packaging containers',
    searchTerms: 'corrugated box carton packaging cardboard box packaging box paper board',
    popular: true,
  },
  {
    code: '17092',
    division: '17',
    sector: 'Manufacturing',
    description: 'Manufacture of paper cups, paper plates, disposable tableware and paper straws',
    searchTerms: 'paper cup paper plate paper straw disposable glass biodegradable cutlery',
    popular: true,
  },

  // Chemical & Cleaners Manufacturing (Division 20)
  {
    code: '20231',
    division: '20',
    sector: 'Manufacturing',
    description: 'Manufacture of soap, detergents, dishwash liquids, surface cleaners, and shampoos',
    searchTerms: 'soap detergent floor cleaner liquid handwash shampoo cleaning chemical',
    popular: true,
  },
  {
    code: '20237',
    division: '20',
    sector: 'Manufacturing',
    description: 'Manufacture of agarbatti (incense sticks), dhoop, camphor tablets and perfumes',
    searchTerms: 'agarbatti incense stick dhoop camphor kapoor perfume aromatic',
    popular: true,
  },

  // Metal & Machinery Fabrication (Division 25, 28)
  {
    code: '25111',
    division: '25',
    sector: 'Manufacturing',
    description: 'Manufacture of structural metal products, metal gates, doors, window frames, grilles, and trusses',
    searchTerms: 'fabrication welding metal gate grill rolling shutter window frame steel shed',
    popular: true,
  },
  {
    code: '25931',
    division: '25',
    sector: 'Manufacturing',
    description: 'Manufacture of wire nails, screws, bolts, nuts, washers and metal fasteners',
    searchTerms: 'wire nail fastener screw bolt nut hardware binding wire manufacturing',
  },

  // Information Technology & Software Services (Division 62)
  {
    code: '62011',
    division: '62',
    sector: 'Services',
    description: 'Writing, modifying, testing of computer programs (Software development, Web development, Mobile App creation)',
    searchTerms: 'software web development website developer coding app mobile app python react programmer',
    popular: true,
  },
  {
    code: '62020',
    division: '62',
    sector: 'Services',
    description: 'Computer consultancy and computer facilities management (IT consulting, Cloud management, DevOps)',
    searchTerms: 'it consulting cloud devops sysadmin server infrastructure technical advisory',
  },
  {
    code: '62099',
    division: '62',
    sector: 'Services',
    description: 'Other information technology and computer service activities (AI automation, data analytics, tech support, cyber security)',
    searchTerms: 'ai automation artificial intelligence data science cyber security tech services agency',
    popular: true,
  },

  // Advertising, Media & Design Services (Division 73, 74)
  {
    code: '73100',
    division: '73',
    sector: 'Services',
    description: 'Advertising services, digital marketing agencies, social media management, performance ad campaigns and media planning',
    searchTerms: 'digital marketing social media agency performance marketing meta ads google ads advertising seo',
    popular: true,
  },
  {
    code: '74102',
    division: '74',
    sector: 'Services',
    description: 'Graphic design, UI/UX design, corporate visual branding, and commercial packaging design',
    searchTerms: 'graphic design ui ux web design logo branding creative banner',
    popular: true,
  },
  {
    code: '74201',
    division: '74',
    sector: 'Services',
    description: 'Commercial photography, video production, aerial drone shooting, and studio recording',
    searchTerms: 'photography video editing videography drone photo studio shooting wedding photo',
    popular: true,
  },

  // Professional, Legal & Accounting Services (Division 69, 70)
  {
    code: '69201',
    division: '69',
    sector: 'Services',
    description: 'Accounting, bookkeeping and auditing activities; tax consultancy (Chartered Accountants, Tax consultants)',
    searchTerms: 'accounting tax consultant ca chartered accountant bookkeeping gst filing audit income tax',
    popular: true,
  },
  {
    code: '70200',
    division: '70',
    sector: 'Services',
    description: 'Management consultancy activities (Business consulting, startup advisors, financial planning)',
    searchTerms: 'business consultant management advisor startup mentor strategy financial advisory',
  },

  // Food & Beverage Service (Division 56)
  {
    code: '56101',
    division: '56',
    sector: 'Services',
    description: 'Restaurants and mobile food service activities (Food truck, dining restaurant, cafe, canteen, cloud kitchen)',
    searchTerms: 'food truck restaurant cafe cloud kitchen dining food van canteen dhaba',
    popular: true,
  },
  {
    code: '56210',
    division: '56',
    sector: 'Services',
    description: 'Event catering services for weddings, corporate parties and private functions',
    searchTerms: 'catering event food wedding catering buffet party food supply',
  },

  // Logistics, Warehousing & Transport (Division 49, 52)
  {
    code: '49231',
    division: '49',
    sector: 'Services',
    description: 'Freight transport by road (Trucking, tempo delivery, logistics, cargo movers)',
    searchTerms: 'transport logistics truck tempo goods carrier freight courier delivery movers packers',
    popular: true,
  },
  {
    code: '52109',
    division: '52',
    sector: 'Services',
    description: 'Warehousing and storage activities, general cold storage, agricultural godowns',
    searchTerms: 'cold storage warehouse godown storage agricultural store refrigerated warehouse',
    popular: true,
  },

  // Healthcare, Personal Care & Fitness (Division 86, 96)
  {
    code: '86905',
    division: '86',
    sector: 'Services',
    description: 'Diagnostic laboratories, pathology centers, X-ray scanning clinics and clinical testing',
    searchTerms: 'pathology lab diagnostic clinic blood test medical testing health lab',
  },
  {
    code: '96020',
    division: '96',
    sector: 'Services',
    description: 'Hairdressing, beauty salons, spa, grooming, manicure and cosmetic treatment',
    searchTerms: 'salon beauty parlour spa hair salon makeup grooming barber',
    popular: true,
  },
  {
    code: '93110',
    division: '93',
    sector: 'Services',
    description: 'Operation of sports facilities, fitness centers, gyms, yoga studios and athletic clubs',
    searchTerms: 'gym fitness yoga zumba sports club athletic training workout',
    popular: true,
  },

  // Education & Coaching (Division 85)
  {
    code: '85499',
    division: '85',
    sector: 'Services',
    description: 'Other education not elsewhere classified (Coaching classes, competitive exam tutoring, vocational skill training, online academies)',
    searchTerms: 'coaching classes tuition institute training online course computer coaching study center',
    popular: true,
  },

  // Repair & Installation (Division 33, 95)
  {
    code: '95120',
    division: '95',
    sector: 'Services',
    description: 'Repair of communication equipment (Mobile phone repair, smartphone screen repair, walkie-talkie servicing)',
    searchTerms: 'mobile repair phone servicing screen replacement tablet repair smartphone technician',
    popular: true,
  },
  {
    code: '95221',
    division: '95',
    sector: 'Services',
    description: 'Repair of household appliances and home and garden equipment (AC repair, refrigerator servicing, washing machine repair)',
    searchTerms: 'ac repair refrigerator servicing washing machine repair appliance home technician electrical repair',
    popular: true,
  },
  {
    code: '80200',
    division: '80',
    sector: 'Services',
    description: 'Security systems service activities (CCTV installation, smart security sensors, access control systems, fire alarm setup)',
    searchTerms: 'cctv camera security smart lock surveillance camera installation security alarm',
    popular: true,
  },
]
