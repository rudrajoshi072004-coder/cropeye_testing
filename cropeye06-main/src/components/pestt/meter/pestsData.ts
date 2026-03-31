export type RiskLevel = "high" | "moderate" | "low";

export interface Pest {
  name: string;
  months: string[];
  temperature: string;
  humidity: string;
  image: string;
  symptoms: string[];
  identification: string[];
  where: string;
  why: string;
  when: {
    high: string;
    moderate: string;
    low: string;
  };
  organic: string[];
  chemical: string[];
  stage?: {
    minDays: number;
    maxDays: number;
    description: string;
  };
  category?: "chewing" | "sucking" | "soil_borne";
}

export const pestsData: Pest[] = [
  {
    name: "Flea beetle",
    months: ["September", "October"],
    temperature: "25–32",
    humidity: "60–75",
    image: "/Image/flea_beetle.jpg",
    stage: {
      minDays: 10,
      maxDays: 30,
      description: "Bud Break to shoot Development (10–30 DAP)"
    },
    category: "chewing",
    symptoms: [
      "Shot-hole damage on young leaves",
      "Skeletonized leaves",
      "Stunted shoot growth"
    ],
    identification: [
      "Small jumping beetles",
      "Feed on emerging buds and young shoots"
    ],
    where: "Young leaves and shoots",
    why: "Feeding damage during early growth stage",
    when: {
      high: "Present at the field",
      moderate: "In next 3–7 days",
      low: "In next 10–14 days"
    },
    organic: ["Neem oil spray", "Kaolin clay"],
    chemical: ["Thiamethoxam", "Lambda cyhalothrin"]
  },
  {
    name: "Leaf roller",
    months: ["October", "November"],
    temperature: "22–30",
    humidity: "65–85",
    image: "/Image/leaf_roller.jpg",
    stage: {
      minDays: 20,
      maxDays: 45,
      description: "Shoot Development to Flowering (20–45 DAP)"
    },
    category: "chewing",
    symptoms: [
      "Leaves rolled and webbed together",
      "Caterpillar feeding inside rolled leaves",
      "Reduced photosynthesis"
    ],
    identification: [
      "Caterpillars roll leaves and tie with silk",
      "Feed within protected rolled foliage"
    ],
    where: "Leaves",
    why: "Feeding damage during vegetative growth",
    when: {
      high: "Present at the field",
      moderate: "In next 3–7 days",
      low: "In next 10–14 days"
    },
    organic: ["BT (Bacillus thuringiensis)", "Trichogramma release"],
    chemical: ["Chlorantraniliprole", "Emamectin benzoate"]
  },
  {
    name: "Sphingid caterpillar",
    months: ["July", "August", "September"],
    temperature: "24–34",
    humidity: "70–90",
    image: "/Image/sphingid_caterpillar.jpg",
    stage: {
      minDays: 15,
      maxDays: 40,
      description: "Active vegetative growth (15–40 DAP, monsoon pruning)"
    },
    category: "chewing",
    symptoms: [
      "Defoliation of vines",
      "Large irregular holes in leaves",
      "Damage to growing shoots"
    ],
    identification: [
      "Large green or brown hornworm caterpillars",
      "Active during monsoon season"
    ],
    where: "Leaves and shoots",
    why: "Heavy feeding during monsoon vegetative growth",
    when: {
      high: "Present at the field",
      moderate: "In next 3–7 days",
      low: "In next 10–14 days"
    },
    organic: ["Hand picking", "BT spray"],
    chemical: ["Chlorantraniliprole", "Spinosad"]
  },
  {
    name: "Stem girdler",
    months: ["August", "September", "October", "November"],
    temperature: "25–35",
    humidity: "55–75",
    image: "/Image/stem_girdler.jpg",
    stage: {
      minDays: 30,
      maxDays: 70,
      description: "Shoot Development to berry Development (30–70 DAP)"
    },
    category: "chewing",
    symptoms: [
      "Girdled stems causing shoot wilting",
      "Circular feeding damage around stems",
      "Shoots above girdle may die"
    ],
    identification: [
      "Beetle larvae girdle stems",
      "Characteristic circular groove around stem"
    ],
    where: "Stems and shoots",
    why: "Larval feeding girdles the stem",
    when: {
      high: "Present at the field",
      moderate: "In next 3–7 days",
      low: "In next 10–14 days"
    },
    organic: ["Remove and destroy affected shoots", "Neem cake"],
    chemical: ["Chlorantraniliprole", "Imidacloprid"]
  },
  {
    name: "Mealybug",
    months: ["December", "January", "February", "March", "April"],
    temperature: "20–32",
    humidity: "40–65",
    image: "/Image/mealybug.jpg",
    stage: {
      minDays: 65,
      maxDays: 120,
      description: "Berry development to Ripening (65–120 DAP)"
    },
    category: "sucking",
    symptoms: [
      "White cottony masses on stems and berry clusters",
      "Honeydew secretion and sooty mold",
      "Berry quality reduction"
    ],
    identification: [
      "Pinkish oval insects with white waxy coating",
      "Cluster in leaf axils and berry bunches"
    ],
    where: "Stems, leaf axils, and berry clusters",
    why: "Sap feeding during berry development",
    when: {
      high: "Present at the field",
      moderate: "In next 3–7 days",
      low: "In next 10–14 days"
    },
    organic: ["Fish oil resin soap", "Beauveria bassiana"],
    chemical: ["Imidacloprid", "Dimethoate", "Chlorpyriphos"]
  },
  {
    name: "Thrips",
    months: ["October", "November", "December", "January"],
    temperature: "22–30",
    humidity: "40–65",
    image: "/Image/thrips.jpg",
    stage: {
      minDays: 30,
      maxDays: 70,
      description: "Shoot Development to Berry Thinning (30–70 DAP)"
    },
    category: "sucking",
    symptoms: [
      "Silvering or scarring on leaves and berries",
      "Deformed growth",
      "Reduced berry quality"
    ],
    identification: [
      "Tiny slender insects",
      "Feed on developing tissue"
    ],
    where: "Leaves, flowers, and young berries",
    why: "Sap feeding and rasping damage",
    when: {
      high: "Present at the field",
      moderate: "In next 3–7 days",
      low: "In next 10–14 days"
    },
    organic: ["Sticky traps", "Spinosad"],
    chemical: ["Imidacloprid", "Thiamethoxam"]
  },
  {
    name: "Fruit sucking moth",
    months: ["December", "January", "February", "March", "April"],
    temperature: "18–30",
    humidity: "60–80",
    image: "/Image/fruit_sucking_moth.jpg",
    stage: {
      minDays: 90,
      maxDays: 130,
      description: "Ripening stage (90–130 DAP)"
    },
    category: "sucking",
    symptoms: [
      "Puncture marks on ripening berries",
      "Juice oozing from damaged berries",
      "Secondary fungal infections at wound sites"
    ],
    identification: [
      "Medium-sized moths with piercing mouthparts",
      "Active at dusk and night"
    ],
    where: "Ripening berries",
    why: "Moths pierce berries to suck juice",
    when: {
      high: "Present at the field",
      moderate: "In next 3–7 days",
      low: "In next 10–14 days"
    },
    organic: ["Light traps", "Bagging of bunches"],
    chemical: ["Lambda cyhalothrin", "Chlorpyriphos"]
  },
  {
    name: "Grub",
    months: ["June", "July", "August", "September"],
    temperature: "23–32",
    humidity: "70–90",
    image: "/Image/white_grub.jpg",
    stage: {
      minDays: 45,
      maxDays: 80,
      description: "Subcane to topping (45–80 DAP)"
    },
    category: "soil_borne",
    symptoms: [
      "Yellowing and wilting of vines",
      "Root damage and poor nutrient uptake",
      "Stunted growth"
    ],
    identification: [
      "C-shaped whitish grubs in soil",
      "Found near root zone"
    ],
    where: "Roots and soil",
    why: "Root feeding by beetle larvae",
    when: {
      high: "Present at the field",
      moderate: "In next 3–7 days",
      low: "In next 10–14 days"
    },
    organic: ["Metarhizium anisopliae", "Neem cake", "Castor traps"],
    chemical: ["Chlorpyriphos", "Quinalphos soil application"]
  }
];
