const dataCategories = [
    { categoryName: "Cleaning Supplies", categoryId: 1 },
    { categoryName: "Sport Equipment", categoryId: 2 },
    { categoryName: "Wheels", categoryId: 3 },
    { categoryName: "Games", categoryId: 4 },
    { categoryName: "Tools", categoryId: 5 }, 
    { categoryName: "Movies", categoryId: 6 }, 
    { categoryName: "Keys", categoryId: 7 }


    
];

const dataProducts = [
    { productName: "Vacuum Cleaner", productId: 1, categoryId: 1 },
    { productName: "Broom", productId: 2, categoryId: 1 },
    { productName: "Mop", productId: 3, categoryId: 1 },
    { productName: "Cleaning Supplie #4", productId: 2, categoryId: 1 },
    { productName: "Soccer ball", productId: 3, categoryId: 2 },
    { productName: "Tennis Rockets", productId: 4, categoryId: 2 },
    { productName: "Moving Bin #1", productId: 5, categoryId: 3 },
    { productName: "Moving Bin #2", productId: 6, categoryId: 3 }, 
    { productName: "Board Game #1", productId: 5, categoryId: 4 },
    { productName: "Board Game #2", productId: 6, categoryId: 4 }, 
    { productName: "Screwdriver", productId: 5, categoryId: 5 },
    { productName: "Tool #2", productId: 6, categoryId: 5 },
    { productName: "Movie #1", productId: 5, categoryId: 6 },
    { productName: "Movie #2", productId: 6, categoryId: 6 }, 
    { productName: "Movie #3", productId: 5, categoryId: 6 },
    { productName: "Key #1", productId: 6, categoryId: 7 }, 
    { productName: "Key #2", productId: 5, categoryId: 7 },
    { productName: "Key #3", productId: 6, categoryId: 7 }, 
];

const dataOrders = [
    { orderName: "Cunewalde", orderId: 1, productId: 1 },
    { orderName: "Albuquerque", orderId: 2, productId: 1 },
    { orderName: "Geneva", orderId: 3, productId: 2 },
    { orderName: "Graz", orderId: 4, productId: 2 },
    { orderName: "London", orderId: 5, productId: 3 },
    { orderName: "I. de Margarita", orderId: 6, productId: 3 },
    { orderName: "Barquisimeto", orderId: 7, productId: 4 },
    { orderName: "Brandenburg", orderId: 8, productId: 4 },
    { orderName: "Cunewalde", orderId: 9, productId: 5 },
    { orderName: "Mexico D.F.", orderId: 10, productId: 5 },
    { orderName: "Mexico D.F.", orderId: 11, productId: 6 },
    { orderName: "Rio de Janeiro", orderId: 12, productId: 6 }
];

export { dataCategories, dataProducts, dataOrders };
