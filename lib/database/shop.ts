export async function getProductByCategory(id: string) {
  return {
    success: true,
    category: {
      id: 1,
      name: "VALORANT ACCOUNT",
    },
    shop: [
      {
        id: 1,
        image:
          "https://img.rdcw.co.th/images/9393c4d2409e1aa71e9a1bfed01dd4ed8a3ecb4ad11b479a8917e2e63b12a0a7.jpeg",
        name: "ไอดี VALORANT",
        price: 89,
        remain: 0,
      },
      {
        id: 2,
        image:
          "https://img.rdcw.co.th/images/9393c4d2409e1aa71e9a1bfed01dd4ed8a3ecb4ad11b479a8917e2e63b12a0a7.jpeg",
        name: "ไอดี VALORANT",
        price: 89,
        remain: 8,
      },
      {
        id: 3,
        image:
          "https://img.rdcw.co.th/images/9393c4d2409e1aa71e9a1bfed01dd4ed8a3ecb4ad11b479a8917e2e63b12a0a7.jpeg",
        name: "ไอดี VALORANT",
        price: 89,
        remain: 8,
      },
      {
        id: 4,
        image:
          "https://img.rdcw.co.th/images/9393c4d2409e1aa71e9a1bfed01dd4ed8a3ecb4ad11b479a8917e2e63b12a0a7.jpeg",
        name: "ไอดี VALORANT",
        price: 89,
        remain: 8,
      },
      {
        id: 5,
        image:
          "https://img.rdcw.co.th/images/9393c4d2409e1aa71e9a1bfed01dd4ed8a3ecb4ad11b479a8917e2e63b12a0a7.jpeg",
        name: "ไอดี VALORANT",
        price: 89,
        remain: 8,
      },
      {
        id: 6,
        image:
          "https://img.rdcw.co.th/images/9393c4d2409e1aa71e9a1bfed01dd4ed8a3ecb4ad11b479a8917e2e63b12a0a7.jpeg",
        name: "ไอดี VALORANT",
        price: 89,
        remain: 8,
      },
      {
        id: 7,
        image:
          "https://img.rdcw.co.th/images/9393c4d2409e1aa71e9a1bfed01dd4ed8a3ecb4ad11b479a8917e2e63b12a0a7.jpeg",
        name: "ไอดี VALORANT",
        price: 89,
        remain: 8,
      },
      {
        id: 8,
        image:
          "https://img.rdcw.co.th/images/9393c4d2409e1aa71e9a1bfed01dd4ed8a3ecb4ad11b479a8917e2e63b12a0a7.jpeg",
        name: "ไอดี VALORANT",
        price: 89,
        remain: 8,
      },
      {
        id: 9,
        image:
          "https://img.rdcw.co.th/images/9393c4d2409e1aa71e9a1bfed01dd4ed8a3ecb4ad11b479a8917e2e63b12a0a7.jpeg",
        name: "ไอดี VALORANT",
        price: 89,
        remain: 8,
      },
      {
        id: 10,
        image:
          "https://img.rdcw.co.th/images/9393c4d2409e1aa71e9a1bfed01dd4ed8a3ecb4ad11b479a8917e2e63b12a0a7.jpeg",
        name: "ไอดี VALORANT",
        price: 89,
        remain: 8,
      },
    ],
  };
}

export async function getProductById(id: string) {
  return {
    success: true,
    product: {
      id: 1,
      image:
        "https://img.rdcw.co.th/images/9393c4d2409e1aa71e9a1bfed01dd4ed8a3ecb4ad11b479a8917e2e63b12a0a7.jpeg",
      name: "ไอดี VALORANT",
      detail: `รายละเอียด
▶️ ประกันจะคงอยู่ 24 ชม. หากยังไม่มีการเคลมภายในวันนั้น
▶️ ประกันสินค้าจะหมดหลังเคลมให้ (สามารถเข้าเล่นได้)
▶️ ไอดีการันตี , ไอดีสุ่ม ทุกราคา ไม่ได้มีประกันให้ (ในกรณีมีซ้อน)
▶️ ไอดีที่สุ่มได้กรณีติดแบนเวลาเล่นไม่ได้ ทางเราจะนับว่าได้รับไอดี อาจจะต้องรอไอดีปลดแบนเพื่อเข้าเล่นอีกครั้ง ไม่มีประกันให้นะครับ
เงื่อนไขการเคลม
▶️ หากไอดีมีซ้อนเยอะมากจนเกินไป สามารถเคลมให้ได้
▶️ ทุกการเคลมจะได้ไอดี ที่มีสกินเยอะใกล้เคียงกันแต่จะไม่เหมือนกัน
▶️ ส่งหลักฐานการโดนซ้อนหรือปัญหาเป็นคลิปหรือวิดิโอ สามารถเคลมได้ตลอดจนกว่าประกันจะหมด
▶️ ไม่มีการขายซ้ำ เพื่อลดการมีปัญหาภายหลังและการมีซ้อนมากขึ้นของลูกค้า
แจ้งเคลม`,
      price: 89,
      remain: 10,
    },
  };
}

export async function getAllProducts() {
  return {
    success: true,
    shop: [
      {
        id: 1,
        image:
          "https://img.rdcw.co.th/images/9393c4d2409e1aa71e9a1bfed01dd4ed8a3ecb4ad11b479a8917e2e63b12a0a7.jpeg",
        name: "ไอดี VALORANT",
        price: 89,
        remain: 0,
      },
      {
        id: 2,
        image:
          "https://img.rdcw.co.th/images/9393c4d2409e1aa71e9a1bfed01dd4ed8a3ecb4ad11b479a8917e2e63b12a0a7.jpeg",
        name: "ไอดี VALORANT",
        price: 89,
        remain: 8,
      },
      {
        id: 3,
        image:
          "https://img.rdcw.co.th/images/9393c4d2409e1aa71e9a1bfed01dd4ed8a3ecb4ad11b479a8917e2e63b12a0a7.jpeg",
        name: "ไอดี VALORANT",
        price: 89,
        remain: 8,
      },
      {
        id: 4,
        image:
          "https://img.rdcw.co.th/images/9393c4d2409e1aa71e9a1bfed01dd4ed8a3ecb4ad11b479a8917e2e63b12a0a7.jpeg",
        name: "ไอดี VALORANT",
        price: 89,
        remain: 8,
      },
      {
        id: 5,
        image:
          "https://img.rdcw.co.th/images/9393c4d2409e1aa71e9a1bfed01dd4ed8a3ecb4ad11b479a8917e2e63b12a0a7.jpeg",
        name: "ไอดี VALORANT",
        price: 89,
        remain: 8,
      },
      {
        id: 6,
        image:
          "https://img.rdcw.co.th/images/9393c4d2409e1aa71e9a1bfed01dd4ed8a3ecb4ad11b479a8917e2e63b12a0a7.jpeg",
        name: "ไอดี VALORANT",
        price: 89,
        remain: 8,
      },
      {
        id: 7,
        image:
          "https://img.rdcw.co.th/images/9393c4d2409e1aa71e9a1bfed01dd4ed8a3ecb4ad11b479a8917e2e63b12a0a7.jpeg",
        name: "ไอดี VALORANT",
        price: 89,
        remain: 8,
      },
      {
        id: 8,
        image:
          "https://img.rdcw.co.th/images/9393c4d2409e1aa71e9a1bfed01dd4ed8a3ecb4ad11b479a8917e2e63b12a0a7.jpeg",
        name: "ไอดี VALORANT",
        price: 89,
        remain: 8,
      },
      {
        id: 9,
        image:
          "https://img.rdcw.co.th/images/9393c4d2409e1aa71e9a1bfed01dd4ed8a3ecb4ad11b479a8917e2e63b12a0a7.jpeg",
        name: "ไอดี VALORANT",
        price: 89,
        remain: 8,
      },
      {
        id: 10,
        image:
          "https://img.rdcw.co.th/images/9393c4d2409e1aa71e9a1bfed01dd4ed8a3ecb4ad11b479a8917e2e63b12a0a7.jpeg",
        name: "ไอดี VALORANT",
        price: 89,
        remain: 8,
      },
    ],
  };
}

export async function getSuggestProducts() {
  return {
    success: true,
    shop: [
      {
        id: 1,
        image:
          "https://img.rdcw.co.th/images/9393c4d2409e1aa71e9a1bfed01dd4ed8a3ecb4ad11b479a8917e2e63b12a0a7.jpeg",
        name: "ไอดี VALORANT",
        price: 89,
        remain: 0,
      },
      {
        id: 2,
        image:
          "https://img.rdcw.co.th/images/9393c4d2409e1aa71e9a1bfed01dd4ed8a3ecb4ad11b479a8917e2e63b12a0a7.jpeg",
        name: "ไอดี VALORANT",
        price: 89,
        remain: 8,
      },
      {
        id: 3,
        image:
          "https://img.rdcw.co.th/images/9393c4d2409e1aa71e9a1bfed01dd4ed8a3ecb4ad11b479a8917e2e63b12a0a7.jpeg",
        name: "ไอดี VALORANT",
        price: 89,
        remain: 8,
      },
      {
        id: 4,
        image:
          "https://img.rdcw.co.th/images/9393c4d2409e1aa71e9a1bfed01dd4ed8a3ecb4ad11b479a8917e2e63b12a0a7.jpeg",
        name: "ไอดี VALORANT",
        price: 89,
        remain: 8,
      },
      {
        id: 5,
        image:
          "https://img.rdcw.co.th/images/9393c4d2409e1aa71e9a1bfed01dd4ed8a3ecb4ad11b479a8917e2e63b12a0a7.jpeg",
        name: "ไอดี VALORANT",
        price: 89,
        remain: 8,
      },
      {
        id: 6,
        image:
          "https://img.rdcw.co.th/images/9393c4d2409e1aa71e9a1bfed01dd4ed8a3ecb4ad11b479a8917e2e63b12a0a7.jpeg",
        name: "ไอดี VALORANT",
        price: 89,
        remain: 8,
      },
      {
        id: 7,
        image:
          "https://img.rdcw.co.th/images/9393c4d2409e1aa71e9a1bfed01dd4ed8a3ecb4ad11b479a8917e2e63b12a0a7.jpeg",
        name: "ไอดี VALORANT",
        price: 89,
        remain: 8,
      },
      {
        id: 8,
        image:
          "https://img.rdcw.co.th/images/9393c4d2409e1aa71e9a1bfed01dd4ed8a3ecb4ad11b479a8917e2e63b12a0a7.jpeg",
        name: "ไอดี VALORANT",
        price: 89,
        remain: 8,
      },
      {
        id: 9,
        image:
          "https://img.rdcw.co.th/images/9393c4d2409e1aa71e9a1bfed01dd4ed8a3ecb4ad11b479a8917e2e63b12a0a7.jpeg",
        name: "ไอดี VALORANT",
        price: 89,
        remain: 8,
      },
      {
        id: 10,
        image:
          "https://img.rdcw.co.th/images/9393c4d2409e1aa71e9a1bfed01dd4ed8a3ecb4ad11b479a8917e2e63b12a0a7.jpeg",
        name: "ไอดี VALORANT",
        price: 89,
        remain: 8,
      },
    ],
  };
}

