import { client } from "../config/db";
import { productCollection } from "./product.service";

const createOrderCollection = client
  .db("loweCommerce")
  .collection("create_order");

//   export async function CreateOrderService(payload:any) {

//     const slugs = payload.products.map((s: any) => s.slug);

//     console.log("slug", slugs);

//     const productsFromDB = await productCollection.find({
//       slug: { $in: slugs },
//     }).toArray();

//     if (!productsFromDB.length) {
//       throw new Error("No products found in database for given slugs");
//     }

//     console.log("product form the db",productsFromDB)

// const result = await createOrderCollection.insertOne(payload)

// return result;
//   }

export async function CreateOrderService(payload: any) {
  // 1️⃣ Extract slugs from cart
  const slugs = payload.products.map((p: any) => p.slug);

  // 2️⃣ Fetch products from DB
  const productsFromDB = await productCollection
    .find({
      slug: { $in: slugs },
    })
    .toArray();

  if (!productsFromDB.length) {
    throw new Error("No products found in database for given slugs");
  }

  // 3️⃣ Merge frontend cart with DB data & validate price / stock
  const finalProducts = payload.products.map((cartItem: any) => {
    const productDB = productsFromDB.find((p) => p.slug === cartItem.slug);
    if (!productDB) {
      throw new Error(`Product not found: ${cartItem.slug}`);
    }

    // Validate stock
    const availableStock = parseInt(productDB.stockQuantity as string, 10);
    if (cartItem.quantity > availableStock) {
      throw new Error(`Not enough stock for product: ${productDB.title}`);
    }

    // Calculate price after discount
    let basePrice = parseFloat(productDB.basePrice);
    if (productDB.discount?.type === "percentage") {
      basePrice =
        basePrice - (basePrice * parseFloat(productDB.discount.value)) / 100;
    }

    return {
      productId: productDB._id,
      title: productDB.title,
      slug: productDB.slug,
      quantity: cartItem.quantity,
      price: basePrice,
      subtotal: basePrice * cartItem.quantity,
      variant: cartItem.variant, // keep variant info
    };
  });

  // 4️⃣ Calculate order totals
  const subtotal = finalProducts.reduce(
    (sum: any, p: any) => sum + p.subtotal,
    0
  );

  const deliveryCharge = payload.deliveryMethod === "inside" ? 80 : 100;
  const grandTotal = subtotal + deliveryCharge;

  // 5️⃣ Prepare final order object
  const orderData = {
    customerInfo: {
      firstName: payload.customerInfo.firstName,
      lastName: payload.customerInfo.lastName,
      phone: payload.customerInfo.phone,
      email: payload.customerInfo.email,
    },
    shippingAddress: {
      street: payload.shippingAddress.street,
      city: payload.shippingAddress.city,
      region: payload.shippingAddress.region,
      postalCode: payload.shippingAddress.postalCode,
    },
    products: finalProducts,
    subtotal,
    deliveryCharge,
    grandTotal,
    paymentMethod: payload.paymentMethod,
    deliveryMethod: payload.deliveryMethod,
    promoCode: payload.promoCode || "",
    createdAt: new Date(),
  };

  // 6️⃣ Insert order into DB
  const result = await createOrderCollection.insertOne(orderData);

  return {
    success: true,
    orderId: result.insertedId,
    grandTotal,
    message: "Order created successfully",
    paymentMethod: payload.paymentMethod,
  };
}
