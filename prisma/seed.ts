import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({ url: 'file:dev.db' });
const prisma = new PrismaClient({ adapter });

async function main() {
  // 1. Clean database
  await prisma.feature.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.business.deleteMany();
  await prisma.category.deleteMany();
  await prisma.accommodation.deleteMany();
  await prisma.admin.deleteMany();

  console.log('Database cleaned.');

  // 2. Seed Categories
  const categoriesData = [
    { title: "Pizzería", link: "/comer#pizzería", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80" },
    { title: "Hamburguesa", link: "/comer#hamburguesa", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80" },
    { title: "Cervecería", link: "/comer#cervecería", image: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&w=400&q=80" },
    { title: "Roticería", link: "/comer#roticería", image: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&w=400&q=80" },
    { title: "Restaurante", link: "/comer#restaurante", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&q=80" },
    { title: "Cabañas", link: "/alojarse#cabañas", image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=400&q=80" },
    { title: "Hoteles", link: "/alojarse#hoteles", image: "/images/hotel_pehuenia.png" },
    { title: "Campings", link: "/alojarse#campings", image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?auto=format&fit=crop&w=400&q=80" },
    { title: "Trekking", link: "/aventuras#trekking", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=400&q=80" },
    { title: "A. Acuaticas", link: "/aventuras#a.-acuaticas", image: "/images/aventura_rafting.png" },
    { title: "Cabalgatas", link: "/aventuras#cabalgatas", image: "/images/aventura_cabalgatas.png" },
    { title: "Nieve", link: "/aventuras#nieve", image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?auto=format&fit=crop&w=400&q=80" },
    { title: "Pesca", link: "/aventuras#pesca", image: "/images/aventura_pesca.png" },
    { title: "Agencia de turismo", link: "/aventuras#agencia-de-turismo", image: "/images/aventura_agencia.png" }
  ];

  for (const cat of categoriesData) {
    await prisma.category.create({ data: cat });
  }
  console.log('Categories seeded.');

  // 3. Seed Businesses
  const businessesData = [
    {
      name: "La Pizzería del Bosque",
      categoryTitle: "Pizzería",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
      whatsapp: "5492942123456",
      menu: [
        { name: "Muzarella Especial", description: "Muzarella, aceitunas y orégano", price: 8500 },
        { name: "Napolitana", description: "Tomate natural, ajo y perejil", price: 9200 },
        { name: "Fugazzeta con Queso", description: "Cebolla y muzarella", price: 8800 }
      ]
    },
    {
      name: "Pehuenia Burger",
      categoryTitle: "Hamburguesa",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80",
      whatsapp: "5492942123456",
      menu: [
        { name: "Pehuen Burger", description: "Doble medallón, cheddar, bacon y salsa especial", price: 7500 },
        { name: "Burger Clásica", description: "Lechuga, tomate y queso", price: 6200 }
      ]
    },
    {
      name: "Cervecería del Lago",
      categoryTitle: "Cervecería",
      image: "https://images.unsplash.com/photo-1550341298-903795d3763d?auto=format&fit=crop&w=400&q=80",
      whatsapp: "5492942123456",
      menu: [
        { name: "IPA Artesanal 1L", description: "Cerveza lupulada de la casa", price: 4500 },
        { name: "Honey 1L", description: "Suave con toque de miel local", price: 4200 }
      ]
    }
  ];

  for (const biz of businessesData) {
    const category = await prisma.category.findUnique({ where: { title: biz.categoryTitle } });
    if (category) {
      await prisma.business.create({
        data: {
          name: biz.name,
          image: biz.image,
          whatsapp: biz.whatsapp,
          categoryId: category.id,
          menu: {
            create: biz.menu
          }
        }
      });
    }
  }
  console.log('Businesses seeded.');

  // 4. Seed Accommodations
  const accommodationsData = [
    {
      name: "Cabañas del Lago Pehuenia",
      type: "Cabañas",
      image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
      whatsapp: "5492942123456",
      features: ["Wi-Fi", "Estacionamiento", "Calefacción", "Parrilla", "Cocina Equipada"]
    },
    {
      name: "Refugio del Bosque",
      type: "Cabañas",
      image: "/images/refugio_bosque.png",
      whatsapp: "5492942123456",
      features: ["Wi-Fi", "Estufa a Leña", "Estacionamiento", "Parrilla"]
    },
    {
      name: "Gran Hotel Pehuenia",
      type: "Hoteles",
      image: "/images/hotel_pehuenia.png",
      whatsapp: "5492942123456",
      features: ["Wi-Fi", "Desayuno Incluido", "Piscina Climatizada", "Spa", "Restaurante"]
    },
    {
      name: "Hostel La Aventura",
      type: "Hostel",
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
      whatsapp: "5492942123456",
      features: ["Wi-Fi", "Cocina Compartida", "Bar", "Lockers", "Ropa Blanca"]
    },
    {
      name: "Camping Pino Hachado",
      type: "Campings",
      image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?auto=format&fit=crop&w=800&q=80",
      whatsapp: "5492942123456",
      features: ["Baños con Duchas", "Electricidad", "Proveeduría", "Parrillas"]
    }
  ];

  for (const acc of accommodationsData) {
    await prisma.accommodation.create({
      data: {
        name: acc.name,
        type: acc.type,
        image: acc.image,
        whatsapp: acc.whatsapp,
        features: {
          create: acc.features.map(f => ({ name: f }))
        }
      }
    });
  }
  console.log('Accommodations seeded.');

  // 5. Create Admin
  await prisma.admin.create({
    data: {
      username: 'admin',
      password: 'admin123' // CAMBIAR EN PRODUCCIÓN
    }
  });
  console.log('Admin user created.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
